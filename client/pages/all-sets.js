var PageView = require('./base');
var templates = require('../templates');
var SetShortView = require('../views/set-short');


module.exports = PageView.extend({
    pageTitle: 'all sets',
    template: templates.pages.allSets,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, SetShortView, this.queryByHook('set-list'));
    }
});
