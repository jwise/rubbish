var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.setInList,
    bindings: {
        'model.date': '[data-hook~=date]',
        'model.viewUrl': {
            type: 'attribute',
            hook: 'date',
            name: 'href'
        }
    }
});
