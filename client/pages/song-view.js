/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SongViewSet = require('./song-view/set');

module.exports = PageView.extend({
    pageTitle: 'song view',
    template: templates.pages.songView.page,
    bindings: {
        'model.artist.artist': '[data-hook~=artist]',
        'model.artist.viewUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'artist'
        },
        'model.title': '[data-hook~=title]',
        'model.plays': {
            type: function (el, value) { el.innerHTML = value.length; },
            hook: 'playcount'
        }
    },
    render: function() {
        this.renderWithTemplate();
        this.model.plays.comparator = 'date';
        this.model.plays.sort();
        this.renderCollection(this.model.plays, SongViewSet, this.queryByHook('sets'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.model = app.world.songs.get(spec.id);
        this.pageTitle = this.model.title;
    }
});
