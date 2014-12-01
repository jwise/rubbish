/*global app */
var AmpersandState = require('ampersand-state');
var SongCollection = require('./song-collection');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        artist: 'string'
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '/artist/' + this.id;
            }
        },
        songs: {
            deps: ['id'],
            cache: true,
            fn: function () {
                var self = this;
                return new SongCollection(
                    app.world.songs.filter(function (song) {
                        return song.artistid == self.id;
                    })
                );
            }
        },
        playCount: {
            deps: ['songs'],
            cache: true,
            fn: function () {
                return this.songs.reduce(function (a, song) { return a + song.plays.length; }, 0);
            }
        }
    }
});
