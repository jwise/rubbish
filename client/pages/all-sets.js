var PageView = require('./base');
var templates = require('../templates');
var SetView = require('./all-sets/set');


module.exports = PageView.extend({
    pageTitle: 'sets',
    template: templates.pages.allSets.page,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, SetView, this.queryByHook('set-list'));
    },
    initialize: function(spec) {
        this.pages = this.collection.length / 20;
    }
});
