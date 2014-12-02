/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var ArtistCollection = require('../models/artist-collection');
var SearchArtistResults = require('./search/artist-results');
var SearchBox = require('./search/search-box');

module.exports = PageView.extend({
    pageTitle: 'search by artist',
    template: templates.pages.searchArtist,
    bindings: {
        'query_val': '[data-hook~=query]'
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.results, SearchArtistResults, this.queryByHook('results'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.query_val = spec.query;
        var re = new RegExp(this.query_val, 'i');
        this.results = new ArtistCollection(app.world.artists.filter(function (artist) { return artist.artist.match(re); })); 
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
