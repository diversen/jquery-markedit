


        // Create a MarkEdit editor on page load
        $(function(){
            $('#markdown').markedit({
                'preview': 'below',
                'toolbar' : {
                    'layout' : 'bold italic | link quote code markdown_images | numberlist bulletlist heading line',
                    'buttons' : [
                        { 'id':'markdown_images', 'tip':'Indsæt billede', 'css':'image', 'click': imageUploadClick }
                    ]
                }
            });

            var win = $('<div class="gallery"></div>');
                var searchBox = $('<input type="text" value="tree"></input>');
                var results = $('<div class="results"></div>');
                //var upload = '<iframe id="upload_target" name="upload_target" src="' + iframe_src + '" style="border:0;width:600px;height:220px;"></iframe>';
            
                reference = markedit_helper.reference;
               parent_id = markedit_helper.parent_id;
               iframe_src = '/image/add_ajax/' + parent_id + '/0/' + reference;
               //alert(reference);
               alert(parent_id);
               var upload = $('<iframe id="upload_target" name="upload_target" src="' + iframe_src + '" style="border:0;width:600px;height:320px;"></iframe>');

            
            
            function imageUploadClick() {
                            alert('test');
                appendSearch();
                $(win).append(results);
                $(win).dialog({
                    'autoshow': true,
                    'bgiframe': true,
                    'title': MarkEditLanguage.dialog.insertImage.title,
                    'closeOnEscape': true,
                    'height': 500,
                    'width': 850,
                    
                    buttons: {
                            'Search': function() { 
                            $(results).html('');
                            appendSearch();
                            $(win).html(results);
                        },
                            'Upload': function() {
                            $(results).html('');
                            $(win).html(upload);
                        },
                            'Edit': function () {
                                $(win).html(edit);
                            }
                    }


                });

                
            }
            
            function appendSearch () {
                $(results).html('');
                $(results).html();
                    searchImages($(searchBox).val(), function(i, item) {
                        //alert(item.title);
                        var a = $('<a></a>').attr('href', item.url_m).attr('title', item.title);
                        var img = $('<img />').attr('src', item.url_s);
                        a.append(img);
                        $(results).append(a);
                    }, function() {
                        // Now that the results are done, map the anchors to insert the image
                        $(results).children().filter('a').each(function() {                            
                            $(this).click(function() {
                                $('textarea').markeditSetLinkOrImage(true, $(this).attr('href'), $(this).attr('title'));
                                $(win).dialog('close');
                                $(win).remove();
                                return false; 
                            });
                        });
                    });     
            }
            
          

            
            function searchImages(query, resultCallback, completedCallback) {
                // markedit edit helper is set from PHP
                reference_url = '/image/rpc?reference=' + markedit_helper.reference + '&parent_id=' + markedit_helper.parent_id;
                $.getJSON(reference_url, function(data, textStatus){                    
                    $.each(data.images, function(i, item){                   
                       resultCallback(i, item);
                    });
                    completedCallback();
                });
            }
        });
