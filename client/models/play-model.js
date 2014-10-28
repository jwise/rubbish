var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        songid: 'number',
        setid: 'number',
        request: 'boolean'
    }
});
