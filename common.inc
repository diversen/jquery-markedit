<?php

function jquery_markedit_load_assets ($editor = null){
    static $loaded = null;

    if (!isset($editor)) {
        $editor = 'markedit-inline.js';
    }
    if (!$loaded) {
        //template::setCss('/templates/jquery-markedit/assets/markedit.css');
        //template::setJs('/templates/jquery-markedit/lang/markedit.lang.da_DK.js');
        template::setJs( "/templates/jquery-markedit/assets/$editor");
        template::setCss('/templates/jquery-markedit/jquery.markedit.css');
        template::setJs('/templates/jquery-markedit/showdown.js');
        template::setJs('/templates/jquery-markedit/jquery.markedit.js');
        $loaded = 1;
    }
}