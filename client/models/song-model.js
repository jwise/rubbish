var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        artistid: 'number',
        title: 'string'
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '/song/' + this.id;
            }
        },
        artist: {
            deps: ['artistid'],
            cache: false,
            fn: function() {
                return app.world.artists.get(this.artistid)
            }
        }
    }
});
