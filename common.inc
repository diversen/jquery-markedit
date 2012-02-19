<?php

/**
 * @param array $options
 *              array('js' => 'string with javascript to be used in editor');
 */
function jquery_markedit_load_assets ($options = array()){
    static $loaded = null;
    
    template::init('jquery-markedit');
    if (isset($options['js'])) {
        
        $js = json_encode($options['js']);
        $js = "var markedit_helper = $js;";
        
        template::setStringJs($js);
    }
    
    $editor = config::getModuleIni('jquery_markedit_editor');
    if (!$editor) {
        $editor = 'markedit-inline.js';
    }
    if (!$loaded) {
        $editor_css = config::getModuleIni('jquery_markedit_css');
        //template::setJs('/js/jquery.url.js');
        if (isset($editor_css)) {
            template::setCss("/templates/jquery-markedit/assets/$editor_css"); 
        }
           
        template::setCss('/templates/jquery-markedit/jquery.markedit.css');
        template::setJs('/templates/jquery-markedit/jquery.markedit.js');

        $lang = config::getMainIni('language');
        if (file_exists(_COS_PATH . "/htdocs/templates/jquery-markedit/lang/markedit.lang.$lang.js")) {
            template::setJs("/templates/jquery-markedit/lang/markedit.lang.$lang.js");
        }
       
        template::setJs( "/templates/jquery-markedit/assets/$editor");
        template::setJs('/templates/jquery-markedit/showdown.js');
        
        $loaded = 1;
    }
}