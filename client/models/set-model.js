var AmpersandState = require('ampersand-state');
var PlayCollection = require('./play-collection');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        date: 'string'
    },
    collections: {
        plays: PlayCollection
    }
});
