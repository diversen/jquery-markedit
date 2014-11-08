

// Create a MarkEdit editor on page load
$(function () {

    $('.markdown').markedit({
        //'preview': 'below',
        'toolbar': {
            'layout': 'bold italic | link_inline quote code uploaded_image | numberlist bulletlist heading line',
            'buttons': [
                {'id': 'uploaded_image', 'tip': MarkEditLanguage.defaultButtons.image.tip, 'css': 'image', 'click': imageUploadClick}
            ]
        }


    });


    function imageUploadClick() {
        var win = $('<div class="gallery"></div>');
        var searchBox = $('<input type="text" value="tree"></input>');
        var results = $('<div class="results"></div>');
        //$(win).append('<span>Search:</span>').append('<button>Go</button>');
        $(win).append(results);
        
        reference = markedit_helper.reference;
        parent_id = markedit_helper.parent_id;
        upload_url = '/image/ajax?reference=' + reference + '&parent_id=' + parent_id;
        //alert(upload_url);
        var form = $('<input type="file" multiple="multiple" id="html5_upload_field">');
        $(form).append('<div id="progress_report"><div id="progress_report_name">');
        $(form).append('</div><div id="progress_report_status" style="font-style: italic;"></div>');
        $(form).append('<div id="progress_report_bar_container" style="width: 90%; height: 5px;"><div id="progress_report_bar" style="background-color: blue; width: 0; height: 100%;"></div></div><div id="progress_report_final"></div></div>');
        $(win).append(form);

        $(win).dialog({
            'autoshow': true,
            'bgiframe': false,
            'title': MarkEditLanguage.dialog.insertImage.title,
            'closeOnEscape': true,
            'height': 500,
            'fluid': true, //new option
            'width': '50%'
        });


        // catch dialog if opened within a viewport smaller than the dialog width
        $(document).on("dialogopen", ".ui-dialog", function (event, ui) {
            fluidDialog();
        });

        function fluidDialog() {
            var $visible = $(".ui-dialog:visible");
            // each open dialog
            $visible.each(function () {
                var $this = $(this);
                var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
                // if fluid option == true
                if (dialog.options.fluid) {
                    var wWidth = $(window).width();
                    // check window width against dialog width
                    if (wWidth < dialog.options.maxWidth + 50) {
                        // keep dialog from filling entire screen
                        $this.css("max-width", "90%");
                    } else {
                        // fix maxWidth bug
                        $this.css("max-width", dialog.options.maxWidth);
                    }
                    //reposition dialog
                    dialog.option("position", dialog.options.position);
                }
            });
        }

        

        $(results).html();
        searchImages($(searchBox).val(), function (i, item) {
            var a = $('<a></a>').attr('href', item.url_m).attr('title', item.title);
            var img = $('<img />').attr('src', item.url_s);
            a.append(img);
            $(results).append(a);
        }, function () {
            // Now that the results are done, map the anchors to insert the image
            $(results).children().filter('a').each(function () {
                $(this).click(function () {
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
        $.getJSON(reference_url, function (data, textStatus) {
            $.each(data.images, function (i, item) {
                resultCallback(i, item);
            });
            completedCallback();
        });
    }
});
