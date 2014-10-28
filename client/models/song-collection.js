var AmpersandCollection = require('ampersand-collection');
var SongModel = require('./song-model');

module.exports = AmpersandCollection.extend({
    model: SongModel
});
