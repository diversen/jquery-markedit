<?php

/**
 * @param array $options
 *              array('js' => 'string with javascript to be used in editor');
 */
function jquery_markedit_load_assets ($options = array()){
    // flag to check if editor has been loaded
    static $loaded = null;
    
    template::init('jquery-markedit');
    assets::setJs('/js/jquery.html5_upload.js');
    
    /*
    $h = new html_upload();
    $reference = 'content/article';
    $parent_id = 323;
    $url = "/image/ajax?reference=$reference&parent_id=$parent_id";

    template_assets::setJs('/js/jquery.html5_upload.js');
    $js = $h->getJs($url);
    template_assets::setStringJs($js);
    */
    
    // if some variables are set - we use these. 
    if (isset($options['js'])) {    
        $js = json_encode($options['js']);
        $js = "var markedit_helper = $js;";
        template::setStringJs($js);
    }
    
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
        if (file_exists(_COS_HTDOCS . "/templates/jquery-markedit/lang/markedit.lang.$lang.js")) {
            template::setJs("/templates/jquery-markedit/lang/markedit.lang.$lang.js");
        }
       
        template::setJs( "/templates/jquery-markedit/assets/$editor");
        template::setJs('/templates/jquery-markedit/showdown.js');
        template::setJs('/js/jquery.textarea.js');
        $loaded = 1;
    }
}