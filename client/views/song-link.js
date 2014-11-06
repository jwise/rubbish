var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.songLink,
    bindings: {
        'model.title': '[data-hook~=title]',
        'model.artist.artist': '[data-hook~=artist]',
        'model.viewUrl': {
            type: 'attribute',
            hook: 'title',
            name: 'href'
        },
        'model.artist.viewUrl': {
            type: 'attribute',
            hook: 'artist',
            name: 'href'
        }
    }
});
