<?php

function jquery_markedit_load_assets (){
    static $not_loaded = null;
    if ($not_loaded) {
        template::setCss('/templates/jquery-markedit/assets/markedit.css');
        template::setJs( '/templates/jquery-markedit/assets/markedit.js');
        template::setCss('/templates/jquery-markedit/jquery.markedit.css');
        template::setJs('/templates/jquery-markedit/showdown.js');
        template::setJs('/templates/jquery-markedit/jquery.markedit.js');
    }
    $not_loaded = 1;
}