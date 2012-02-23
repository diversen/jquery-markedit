Original NOTE From tstone's fork
--------------------------------

This is a fork of drobbins WMD for Stackoverflow.  It has been modified quite
extensively.  The original wmd.js has been replaced by jquery.markedit.js which
implements customization, a public api, configurability, and internationalization.

Please see the wiki for installation, configuration, and documentation:

http://wiki.github.com/tstone/jquery-markedit

This Forks note:
----------------

drobbins fork can be found at:  

github.com/tstone/jquery-markedit

This is a fork. It has been modified in order to be easily load with the coscms
all you need from your module is to include the template  and then load all assets 

    <?php
        include_template_inc('jquery-markedit');
        jquery_markedit_load_assets();
    ?>

Then all elements with the id = "markdown" should be loaded,
Remember that jquery and jquery-ui also has to be loaded before the markdown
editor. E.g. like this: 

    <textarea id = "markdown">Some text</textarea>

There  is a couple of editors. The default editor is placed in assets, and is
called 'jquery-markedit.js'

I have made another editor to be used with locale images. To use this editor
you can change the ini setting with: 

    jquery_markedit_editor = "markedit-local-images.js"