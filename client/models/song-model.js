var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        artistid: 'number',
        title: 'string'
    },
    derived: {
        artist: {
            deps: ['artistid'],
            cache: false,
            fn: function() {
                return app.world.artists.get(this.artistid)
            }
        }
    }
});
