var View = require('ampersand-view');
var templates = require('../../templates');

module.exports = View.extend({
    template: templates.pages.search.artistResults,
    bindings: {
        'model.artist': '[data-hook~=artist]',
        'model.viewUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'artist'
        }
    }
});
