/*global app*/
var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        songid: 'number',
        setid: 'number',
        request: 'boolean'
    },
    derived: {
        song: {
            deps: ['songid'],
            fn: function() {
                return app.world.songs.get(this.songid)
            }
        }
    }
});
