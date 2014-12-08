/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SetCollection = require('../models/set-collection');
var SetView = require('./all-sets/set');
var SearchBox = require('./search/search-box');

module.exports = PageView.extend({
    pageTitle: 'search by date',
    template: templates.pages.searchSet,
    bindings: {
        'query_val': '[data-hook~=query]'
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.results, SetView, this.queryByHook('results'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.query_val = spec.query;
        var re = new RegExp(this.query_val, 'i');
        this.results = new SetCollection(app.world.sets.filter(function (set) { return set.date.match(re); })); 
    },
    subviews: {
        searchbox: {
            hook: 'searchbox',
            prepareView: function (el) {
                return new SearchBox({ el: el, query_val: this.query_val });
            }
        }
    }
});
