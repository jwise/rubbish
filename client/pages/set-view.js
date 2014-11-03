/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var PlayEntryView = require('../views/play-entry');

module.exports = PageView.extend({
    pageTitle: 'set view',
    template: templates.pages.setView,
    bindings: {
        'model.date': '[data-hook~=date]'
    },
    render: function() {
        this.renderWithTemplate();
        if (!this.model) {
            console.log("brb");
            return;
        }
        app.fuq = this.model;
        console.log("okay, that's better.");
        this.renderCollection(this.model.playCollection, PlayEntryView, this.queryByHook('set-contents'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.model = app.world.sets.get(spec.id);
        if (!this.model) {
            app.world.sets.on('sort', function() {
                self.model = app.world.sets.get(spec.id);
                self.render();
            });
        }
    }
});