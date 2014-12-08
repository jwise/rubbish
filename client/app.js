/*global app, me, $*/
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');

var Router = require('./router');
var tracking = require('./helpers/metrics');
var MainView = require('./views/main');
var WorldModel = require('./models/world-model');
var LoadingPage = require('./pages/loading');
var domReady = require('domready');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        this.world = new WorldModel();
        this.world.fetch({
            success: function () {
                // *NOW* we can kick off the router.
                self.router.history.start({pushState: false, root: '/'});
            }
        });

        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                el: document.body
            });

            // ...and render it
            mainView.render();
            mainView.handleNewPage(new LoadingPage());
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.blastoff();
