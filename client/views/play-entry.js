var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.playEntry,
    bindings: {
        'model.id': '[data-hook~=id]',
        'model.song.title': '[data-hook~=title]',
        'model.song.artist.artist': '[data-hook~=artist]',
        'model.request': {
            type: function (el, value) { el.innerHTML = value ? "*" : "" },
            hook: 'request'
        }
    }
});
