<?php

use diversen\template;
use diversen\template\assets;
use diversen\conf;
/**
 * @param array $options
 *              array('js' => 'string with javascript to be used in editor');
 */
function jquery_markedit_load_assets ($options = array()){
    // flag to check if editor has been loaded
    static $loaded = null;
    
    
    if (isset($options['js'])) {    
        $js = json_encode($options['js']);
        $js = "var markedit_helper = $js;";
        template::setStringJs($js);
        // print_r($options);
    }
    
    
    template::init('jquery-markedit');
    
    // check which editor to load. See assets
    if (isset($options['editor'])) {
        $editor = $options['editor'];
    } else {
        $editor = conf::getModuleIni('jquery_markedit_editor');
    }
    
    if (!$editor) {
        $editor = 'markedit-inline.js';
    }
    
    // only load one editor
    if (!$loaded) {
        
        $editor_css = conf::getModuleIni('jquery_markedit_css');
        if (isset($editor_css)) {
            template::setCss("/templates/jquery-markedit/assets/$editor_css", null, array ('no_cache'   => 1, )); 
        }
           
        
        template::setCss('/templates/jquery-markedit/jquery.markedit.css',  null, array ('no_cache'   => 1, ));
        template::setJs('/templates/jquery-markedit/jquery.markedit.js');

        // load lang
        $lang = conf::getMainIni('language');
        if (file_exists(conf::pathHtdocs() . "/templates/jquery-markedit/lang/markedit.lang.$lang.js")) {
            template::setJs("/templates/jquery-markedit/lang/markedit.lang.$lang.js");
        }
       
        template::setJs( "/templates/jquery-markedit/assets/$editor");
        template::setJs('/templates/jquery-markedit/showdown.js');
        template::setJs('/bower_components/Tabby/jquery.textarea.js');
        template::setJs( "/templates/jquery-markedit/js/tabby.js");
        $loaded = 1;
    }
}
