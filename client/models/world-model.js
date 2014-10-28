var AmpersandModel = require('ampersand-model');
var SetCollection = require('./set-collection');
var ArtistCollection = require('./artist-collection');
var SongCollection = require('./song-collection');

module.exports = AmpersandModel.extend({
    props: {
    },
    collections: {
        artists: ArtistCollection,
        songs: SongCollection,
        sets: SetCollection
    },
    url: 'db.json'
});
