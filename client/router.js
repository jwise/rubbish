/*global me, app*/
var Router = require('../localmodules/ampersand-router');
var HomePage = require('./pages/home');
var AllSetsPage = require('./pages/all-sets');
var SetViewPage = require('./pages/set-view');
var ArtistViewPage = require('./pages/artist-view');
var SongViewPage = require('./pages/song-view');
var SearchArtistPage = require('./pages/search-artist');
var SearchSongPage = require('./pages/search-song');
var SearchSetPage = require('./pages/search-set');
var SearchPage = require('./pages/search');

module.exports = Router.extend({
    routes: {
        'info': 'home',
        'set/latest': 'latestSet',
        'set/:id': 'setView',
        'set': 'allSets',
        'artist/:id': 'artistView',
        'song/:id': 'songView',
        'search/artist/:query?p=:page': 'searchArtist',
        'search/artist/:query': 'searchArtist',
        'search/song/:query': 'searchSong',
        'search/title/:query': 'searchSong',
        'search/set/:query': 'searchSet',
        'search/(*path)': 'search',
        'search': 'search',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage());
    },

    allSets: function () {
        this.trigger('page', new AllSetsPage({
            collection: app.world.sets
        }));
    },
    
    latestSet: function () {
        app.world.sets.comparator = 'date';
        app.world.sets.sort();
        var set = app.world.sets.at(app.world.sets.length-1);
        this.trigger('page', new SetViewPage({
            id: set.id
        }));
    },

    setView: function (id) {
        this.trigger('page', new SetViewPage({
            id: id
        }));
    },

    artistView: function (id) {
        this.trigger('page', new ArtistViewPage({
            id: id
        }));
    },

    songView: function (id) {
        this.trigger('page', new SongViewPage({
            id: id
        }));
    },
    
    searchArtist: function (query, page) {
        this.trigger('page', new SearchArtistPage({
            query: query,
            curpage: page
        }));
    },

    searchSong: function (query) {
        this.trigger('page', new SearchSongPage({
            query: query
        }));
    },

    searchSet: function (query) {
        this.trigger('page', new SearchSetPage({
            query: query
        }));
    },

    search: function () {
        this.trigger('page', new SearchPage());
    },

    catchAll: function () {
        console.log('warning: catchall!');
        this.redirectTo('set/latest');
    }
});
