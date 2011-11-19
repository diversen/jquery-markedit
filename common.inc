<?php

function jquery_markedit_load_assets ($editor = null){
    static $loaded = null;
    
    template::init('jquery-markedit');
    
    $editor = get_module_ini('jquery_markedit_editor');
    if (!isset($editor)) {
        $editor = 'markedit-inline.js';
    }
    if (!$loaded) {
        $editor_css = get_module_ini('jquery_markedit_css');
        template::setCss("/templates/jquery-markedit/assets/$editor_css");    
        template::setCss('/templates/jquery-markedit/jquery.markedit.css');
        template::setJs('/templates/jquery-markedit/jquery.markedit.js');

        $lang = get_main_ini('language');
        if (file_exists(_COS_PATH . "/htdocs/templates/jquery-markedit/lang/markedit.lang.$lang.js")) {
            template::setJs("/templates/jquery-markedit/lang/markedit.lang.$lang.js");
        }
       
        template::setJs( "/templates/jquery-markedit/assets/$editor");
        template::setJs('/templates/jquery-markedit/showdown.js');
        
        $loaded = 1;
    }
}