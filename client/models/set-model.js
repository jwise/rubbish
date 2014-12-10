var AmpersandState = require('ampersand-state');
var PlayCollection = require('./play-collection');
var PlayModel = require('./play-model');

module.exports = AmpersandState.extend({
    props: {
        id: 'number',
        date: 'string',
        plays: 'array'
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '#set/' + this.id;
            }
        },
        playCount: {
            deps: ['plays'],
            cache: true,
            fn: function () {
                return this.plays.length;
            }
        },
        playCollection: {
            deps: ['plays'],
            cache: true,
            fn: function() {
                var self = this;
                return new PlayCollection(
                    this.plays.map(function (play, idx) {
                        return new PlayModel({
                            id: idx,
                            songid: play.songid,
                            setid: self.id,
                            request: play.request
                        });
                    })
                );
            }
        }
    }
});
