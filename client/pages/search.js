/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var SearchBox = require('./search/search-box');

module.exports = PageView.extend({
    pageTitle: 'search',
    template: templates.pages.searchPage,
    render: function() {
        this.renderWithTemplate();
    },
    subviews: {
        searchbox: {
            hook: 'searchbox',
            prepareView: function (el) {
                return new SearchBox({ el: el });
            }
        }
    }
});
