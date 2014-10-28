var AmpersandState = require('ampersand-state');
var SetCollection = require('./set-collection');
var ArtistCollection = require('./artist-collection');
var SongCollection = require('./song-collection');

module.exports = AmpersandState.extend({
    props: {
    },
    collections: {
        artists: ArtistCollection,
        songs: SongCollection,
        sets: SetCollection
    }
});
