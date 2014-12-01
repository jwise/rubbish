/*global app*/
var AmpersandState = require('ampersand-state');
var SetCollection = require('./set-collection');

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
        },
        plays: {
            deps: ['id'],
            cache: true,
            fn: function () {
                var self = this;
                return new SetCollection(
                    app.world.sets.filter(function (set) {
                        return set.playCollection.some(function (play) { return play.songid == self.id; });
                    })
                );
            }
        }
    }
});
