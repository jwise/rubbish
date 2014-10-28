var AmpersandCollection = require('ampersand-collection');
var PlayModel = require('./play-model');

module.exports = AmpersandCollection.extend({
    model: PlayModel
});
