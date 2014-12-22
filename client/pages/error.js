var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
    pageTitle: 'error',
    template: templates.pages.error,
    bindings: {
        'spec.err': '[data-hook~=errdesc]'
    },
    render: function() {
        this.renderWithTemplate();
    },
    initialize: function (spec) {
        console.log("*** error page: " + spec);
        this.spec = spec;
    }
});
