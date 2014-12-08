/*global me, app*/
var Router = require('ampersand-router');
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
        '': 'home',
        'sets': 'allSets',
        'set/:id': 'setView',
        'artist/:id': 'artistView',
        'song/:id': 'songView',
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
    
    searchArtist: function (query) {
        this.trigger('page', new SearchArtistPage({
            query: query
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
        this.redirectTo('');
    }
});
