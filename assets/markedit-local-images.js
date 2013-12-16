

// Create a MarkEdit editor on page load
$(function() {
    
    $('.markdown').markedit({
        'preview': 'below',
        'toolbar': {
            'layout': 'bold italic | link_inline quote code uploaded_image | numberlist bulletlist heading line',
            'buttons': [
                {'id': 'uploaded_image', 'tip': 'Insert uploaded image', 'css': 'image', 'click': imageUploadClick}
            ]
        }
    });


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
                    $('textarea').markeditSetLinkOrImageInline(true, $(this).attr('href'), $(this).attr('title'));
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

        //alert(reference_url);
        $.getJSON(reference_url, function(data, textStatus) {
            //alert(dump(data));
            $.each(data.images, function(i, item) {

                resultCallback(i, item);
            });
            completedCallback();
        });
    }
});
