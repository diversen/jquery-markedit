
        // Create a MarkEdit editor on page load
        $(function(){
            $('#markdown').markedit({
                'preview': 'below',
                'toolbar' : {
                    'layout' : 'bold italic | link quote code | numberlist bulletlist heading line'
                }
            });

        });

