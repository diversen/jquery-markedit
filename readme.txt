Original NOTE From tstone's fork
--------------------------------

This is a fork of drobbins WMD for Stackoverflow.  It has been modified quite
extensively.  The original wmd.js has been replaced by jquery.markedit.js which
implements customization, a public api, configurability, and internationalization.

Please see the wiki for installation, configuration, and documentation:

http://wiki.github.com/tstone/jquery-markedit

Note about this fork
--------------------

### Inline images

This is almost the same as tstones fork with a couple of exceptions. 

tstones markdown editor uses this style when writing the markdown: 

    ![The nightwatch by rembrandt][1]Nice painting.

    ![some alt title][2]

      [1]: /image/download/61/TheNightwatchbyRembrandt.jpg
      [2]: /image/download/65/coscms.jpg

It is confusing for many a user if I want to add a image or link between the above two images 
(the markeditor is not intelligent enough to insert another id between the two ids).

I also thinks this is easier when you have a document where you have e.g. a 100 links. 

Therefor I added a method called `$.fn.markeditSetLinkOrImageInline` 
which will out put the links and images in the this way:

    ![The nightwatch by rembrandt](/image/download/61/TheNightwatchbyRembrandt.jpg)
    ![alt text](/image/download/65/coscms.jpg)


You can use this in the following way: 

In the toolbar you just use `link_inline` instead of `link` and `image_inline` instead of `image`. like this:

    
        $(function(){
            $('textarea').markedit({
                'preview': 'below',
                'toolbar' : {
                    'layout' : 'bold italic | link_inline quote code image_inline | numberlist bulletlist heading line',

                }
            });
        });

### Local uploaded images

The tstone forks has a nice example with loading of images with flikr. 
I have made an example where you load images from local database. 

There is an example in `jquery-markedit/examples/inline-image-links.html`

You can see the source in `jquery-markedit/assets/markedit-local-images.js`

It is much the same as the flikr example but just calls a `/rpc.php` and get
images info from here. 

### CosCMS

This is also the default wysiwyg in the CosCMS: 
It can be loaded like this if the jquery-markedit module is installed: 

    <?php
        include_template_inc('jquery-markedit');
        jquery_markedit_load_assets();
    ?>

