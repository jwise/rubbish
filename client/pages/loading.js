var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
    pageTitle: 'loading...',
    template: templates.pages.loading
});
