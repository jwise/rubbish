var AmpersandState = require('ampersand-state');
var PlayCollection = require('./play-collection');

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
                return this.plays.length();
            }
        }
    }
});
