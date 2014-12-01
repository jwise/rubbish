/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var ArtistViewSong = require('./artist-view/song');

module.exports = PageView.extend({
    pageTitle: 'artist view',
    template: templates.pages.artistView.page,
    bindings: {
        'model.artist': '[data-hook~=artist]',
        'model.playCount': '[data-hook~=playcount]'
    },
    render: function() {
        this.renderWithTemplate();
        this.model.songs.comparator = function (song) { return -song.plays.length; }; /* sort backwards */
        this.model.songs.sort();
        this.renderCollection(this.model.songs, ArtistViewSong, this.queryByHook('songs'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.model = app.world.artists.get(spec.id);
    }
});
