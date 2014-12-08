/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SongCollection = require('../models/song-collection');
var TitleResultsView = require('./search/title-results');
var SearchBox = require('./search/search-box');

module.exports = PageView.extend({
    pageTitle: 'search by title',
    template: templates.pages.searchSong,
    bindings: {
        'query_val': '[data-hook~=query]'
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.results, TitleResultsView, this.queryByHook('results'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.query_val = spec.query;
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
        }
    }
});
