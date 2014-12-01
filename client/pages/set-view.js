/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var PlayEntryView = require('../views/play-entry');

module.exports = PageView.extend({
    pageTitle: 'set view',
    template: templates.pages.setView.page,
    bindings: {
        'model.date': '[data-hook~=date]'
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.model.playCollection, PlayEntryView, this.queryByHook('set-contents'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.model = app.world.sets.get(spec.id);
    }
});
