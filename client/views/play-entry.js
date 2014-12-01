var View = require('ampersand-view');
var templates = require('../templates');
var SongLink = require('./song-link');

module.exports = View.extend({
    template: templates.pages.setView.play,
    bindings: {
        'model.id': {
            type: function (el, value) { el.innerHTML = value + 1; },
            hook: 'id'
        },
        'model.request': {
            type: function (el, value) { el.innerHTML = value ? "*" : "" },
            hook: 'request'
        }
    },
    subviews: {
        song: {
            hook: 'song',
            prepareView: function (el) {
                return new SongLink({
                    el: el,
                    model: this.model.song
                });
            }
        }
    }
});
