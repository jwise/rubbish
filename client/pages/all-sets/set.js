var View = require('ampersand-view');
var templates = require('../../templates');

module.exports = View.extend({
    template: templates.pages.allSets.set,
    bindings: {
        'model.date': '[data-hook~=date]',
        'model.playCount': '[data-hook~=plays]',
        'model.viewUrl': {
            type: 'attribute',
            hook: 'date',
            name: 'href'
        }
    }
});
