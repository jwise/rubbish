var View = require('ampersand-view');
var templates = require('../../templates');

module.exports = View.extend({
    template: templates.pages.search.searchbox,
    events: {
        'click [data-hook~=artist]': 'handleArtistSearch',
        'click [data-hook~=songs]': 'handleSongSearch',
        'click [data-hook~=sets]': 'handleSetSearch'
    },
    bindings: {
        'query_val': {
            type: 'attribute',
            name: 'value',
            hook: 'query',
        }
    },
    handleArtistSearch: function (e) {
        app.navigate('/search/artist/' + encodeURIComponent(this.queryByHook('query').value));
    },
    handleSongSearch: function (e) {
        app.navigate('/search/title/' + encodeURIComponent(this.queryByHook('query').value));
    },
    handleSetSearch: function (e) {
        app.navigate('/search/set/' + encodeURIComponent(this.queryByHook('query').value));
    },
    initialize: function (spec) {
        this.query_val = spec.query_val;
    }
});
