var View = require('ampersand-view');
var dom = require('ampersand-dom');

module.exports = View.extend({
    template: '<div class="text-center"><ul class="pagination"></ul></div>',
    initialize: function (spec) {
        this.npages = spec.npages;
        this.curpage = spec.curpage;
    },
    render: function () {
        this.renderWithTemplate();
        var ul = this.query('ul');
        var self = this;
        
        function mke(text, pg, cl) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            dom.html(a, text);
            dom.addClass(li, cl);
            if (cl != 'disabled' && cl != 'active') {
                a.addEventListener('click', function () { self.trigger('page', pg); });
            }
            li.appendChild(a);
            ul.appendChild(li);
            return a;
        }
        
        mke('&larr;', this.curpage - 1, (this.curpage == 1) ? 'disabled' : '');
        for (var i = 1; i <= this.npages; i++) {
            mke(i, i, (i == this.curpage) ? 'active' : '');
        }
        mke('&rarr;', this.curpage + 1, (this.curpage == this.npages) ? 'disabled' : '');
    }
});
