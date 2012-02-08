
        // Create a MarkEdit editor on page load
        $(function(){
            $('#markdown').markedit({
                'preview': 'below',
                'toolbar' : {
                    'layout' : 'bold italic | link quote code flickr-gallery | numberlist bulletlist heading line',
                    'buttons' : [
                        { 'id':'flickr-gallery', 'tip':'Indsæt billede', 'css':'image', 'click': imageUploadClick }
                    ]
                }
            });
            

            //alert(dump(markedit_helper));
            
            function imageUploadClick() {
                var win = $('<div class="gallery"></div>');
                var searchBox = $('<input type="text" value="tree"></input>');
                var results = $('<div class="results"></div>');
                //$(win).append('<span>Search:</span>').append('<button>Go</button>');
                $(win).append(results);
                
                $(win).dialog({
                    'autoshow': true,
                    'bgiframe': true,
                    'title': MarkEditLanguage.dialog.insertImage.title,
                    'closeOnEscape': true,
                    'height': 500,
                    'width': 850
                });
                
                //$(win).children().filter('button').click(function() {
                    $(results).html();
                    searchImages($(searchBox).val(), function(i, item) {                        
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
               // });                
                
            }

            
            function searchImages(query, resultCallback, completedCallback) {
                // markedit edit helper is set from PHP
                reference_url = '/image/rpc?reference=' + markedit_helper.reference + '&parent_id=' + markedit_helper.parent_id;
                
                //alert(reference_url);
                $.getJSON(reference_url, function(data, textStatus){                    
                    //alert(dump(data));
                    $.each(data.images, function(i, item){
                        
                       resultCallback(i, item);
                    });
                    completedCallback();
                });
            }


        });





            function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
/*
 'id' => "6713721189"
    'owner' => "46529794@N06"
    'secret' => "b16085e1a6"
    'server' => "7033"
    'farm' => "8"
    'title' => "Did this make Mr Grumpy smile ;)?"
    'ispublic' => "1"
    'isfriend' => "0"
    'isfamily' => "0"
    'url_s' => "http://farm8.staticflickr.com/7033/6713721189_b16085e1a6_m.jpg"
    'height_s' => "180"
    'width_s' => "240"
    'url_m' => "http://farm8.staticflickr.com/7033/6713721189_b16085e1a6.jpg"
    'height_m' => "375"
    'width_m' => "500"
*/

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


