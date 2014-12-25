/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SetCollection = require('../models/set-collection');
var SetView = require('./all-sets/set');
var SearchBox = require('./search/search-box');
var Pager = require('../views/pager');

var per_page = 50;

module.exports = PageView.extend({
    pageTitle: 'search by date',
    template: templates.pages.searchSet,
    bindings: {
        'query_val': '[data-hook~=query]'
    },
    render: function() {
        this.renderWithTemplate();
        var coll = new SetCollection();
        for (var i = per_page * (this.curpage - 1); i < per_page * this.curpage; i++) {
            var v = this.results.at(i);
            if (v)
                coll.add(v);
        }
        this.renderCollection(coll, SetView, this.queryByHook('results'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.pageTitle = "search results: set: " + spec.query;
        this.query_val = spec.query;
        this.curpage = 1 * (spec.curpage || 1);
        var re = new RegExp(this.query_val, 'i');
        this.results = new SetCollection(app.world.sets.filter(function (set) { return set.date.match(re); })); 
    },
    subviews: {
        searchbox: {
            hook: 'searchbox',
            prepareView: function (el) {
                return new SearchBox({ el: el, query_val: this.query_val });
            }
        },
        pager: {
            hook: 'pager',
            prepareView: function (el) {
                var pg = new Pager({ el: el, npages: Math.floor(this.results.length / per_page) + 1, curpage: this.curpage });
                var self = this;
                pg.on('page', function (pg) { self.gopage(pg); });
                return pg;
            }
        }
    },
    gopage: function (pg) {
        app.navigate('/search/set/' + encodeURIComponent(this.query_val) + '?p=' + pg);
    }
});
