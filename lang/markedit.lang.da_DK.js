//
//  MarkEdit langauge: Chinese
//  MarkEdit (name of language in that language)
//
//  Note:  These translations were created with Google translator.
//  I'm sure they sound really awkwards.  If a native speaker would
//  be interested in polishing it up, it would be a great benefit.
//

MarkEditLanguage = function() {

return {

            'defaultButtons': {
                'bold': {
                    'tip': 'Fed'
                },
                'italic': {
                    'tip': 'Italic'
                },
                'link': {
                    'tip': 'Indsæt Hyperlink'
                },
                'image': {
                    'tip': 'Indsæt Billede'
                },
                'uploaded_image': {
                    'tip': 'Indsæt uploaded billede'
                },
                'code': {
                    'tip': 'Kode prøve'
                },
                'quote': {
                    'tip': 'Citat'
                },
                'numberlist': {
                    'tip': 'Nummer List'
                },
                'bulletlist': {
                    'tip': 'Bullet List'
                },
                'line': {
                    'tip': 'Indsæt streg'
                },
                'heading': {
                    'tip': 'Overskrift'
                },
                'undo': {
                    'tip': 'Undo'
                },
                'redo': {
                    'tip': 'Redo'
                },
                'edit': {
                    'text': 'Compose',
                    'tip': 'View in Edit Mode'
                },
                'preview': {
                    'text': 'Preview',
                    'tip': 'View in Preview Mode'
                }
            },

            'dialog': {
                'insertLink': {
                    'title': 'Indsæt Link',
                    'helpText': 'Indsæt URL som skaber link.',
                    'insertButton': 'Indsæt',
                    'cancelButton': 'Fortryd'
                },
                'insertImage': {
                    'title':'Indsæt billede',
                    'helpText': 'Indtast URL til billede.',
                    'insertButton': 'Indsæt',
                    'cancelButton': 'Fortryd'
                }
            },

            'errors' : {
                'markeditNotTextarea':'MarkEdit tag must be a <textarea>',
                'cannotLocateTextarea':'<textarea> tag could not be located in order to fetch the markeditGetState.'
            }

        };

    }();