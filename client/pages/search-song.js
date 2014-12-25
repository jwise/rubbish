/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SongCollection = require('../models/song-collection');
var TitleResultsView = require('./search/title-results');
var SearchBox = require('./search/search-box');
var Pager = require('../views/pager');

var per_page = 50;

module.exports = PageView.extend({
    pageTitle: 'search by title',
    template: templates.pages.searchSong,
    bindings: {
        'query_val': '[data-hook~=query]'
    },
    render: function() {
        this.renderWithTemplate();
        var coll = new SongCollection();
        for (var i = per_page * (this.curpage - 1); i < per_page * this.curpage; i++) {
            var v = this.results.at(i);
            if (v)
                coll.add(v);
        }
        this.renderCollection(coll, TitleResultsView, this.queryByHook('results'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.pageTitle = "search results: title: " + spec.query;
        this.query_val = spec.query;
        this.curpage = 1 * (spec.curpage || 1);
        var re = new RegExp(this.query_val, 'i');
        this.results = new SongCollection(app.world.songs.filter(function (song) { return song.title.match(re); })); 
        this.results.comparator = function (song) { return -song.plays.length; };
        this.results.sort();
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
        app.navigate('/search/title/' + encodeURIComponent(this.query_val) + '?p=' + pg);
    }
});
