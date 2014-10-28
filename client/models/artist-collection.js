var AmpersandCollection = require('ampersand-collection');
var ArtistModel = require('./artist-model');

module.exports = AmpersandCollection.extend({
    model: ArtistModel
});
