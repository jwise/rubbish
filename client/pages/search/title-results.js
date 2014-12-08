var View = require('ampersand-view');
var templates = require('../../templates');
var SongLink = require('../../views/song-link');

module.exports = View.extend({
    template: templates.pages.search.titleResults,
    bindings: {
        'model.plays': {
            type: function (el, value) { el.innerHTML = value.length; },
            hook: 'plays'
        }
    },
    subviews: {
        song: {
            hook: 'song',
            prepareView: function (el) {
                return new SongLink({
                    el: el,
                    model: this.model
                });
            }
        }
    }

});
