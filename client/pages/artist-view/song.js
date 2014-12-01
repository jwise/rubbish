var View = require('ampersand-view');
var templates = require('../../templates');

module.exports = View.extend({
    template: templates.pages.artistView.song,
    bindings: {
        'model.title': '[data-hook~=title]',
        'model.viewUrl': {
            type: 'attribute',
            hook: 'title',
            name: 'href'
        },
        'model.plays': {
            type: function (el, value) { el.innerHTML = value.length; },
            hook: 'plays'
        }
    }
});
