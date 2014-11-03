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
            cache: false,
            fn: function() {
                console.log('evaluating song on id '+this.id+', songid is '+this.songid);
                console.log(app.world.songs.get(this.songid));
                return app.world.songs.get(this.songid)
            }
        }
    }
});
