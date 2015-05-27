
// The Application
// ---------------
var Base = require("../base");

// Our overall **ReplicationAppView** is the top-level piece of UI.
var ReplicationAppView = Base.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#sync-app"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#sync-stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "keypress #new-replication":  "createOnEnter"
    },

    // At initialization we bind to the relevant events on the `Replications` and `Replications`
    // collections, when items are added or changed. Kick things off by
    // loading any preexisting replications and replications that might be saved in *PouchDB*.
    initialize: function() {
        this.pushResps = {};
        this.pullResps = {};

        this.input = this.$("#new-replication");

        Replications.bind('add', this.addOne, this);
        Replications.bind('reset', this.addAll, this);
        Replications.bind('all', this.render, this);

        this.stats = this.$('#sync-stats');
        this.main = $('#sync-main');

        Replications.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
        if (Replications.length) {
            this.main.show();
            this.renderStats();
            this.stats.show();
        } else {
            this.main.hide();
            this.stats.hide();
        }
    },

    renderStats: function() {
        var stats = {
            read: _.reduce(this.pullResps, function(sum, resp) {
                return sum + resp.docs_written;
            }, 0),
            written: _.reduce(this.pushResps, function(sum, resp) {
                return sum + resp.docs_written;
            }, 0),
            count: Replications.length
        };

        this.stats.html(this.statsTemplate(stats));
    },

    // Add a single replication item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(replication) {
        var view = new ReplicationView({model: replication});
        this.$("#replication-list").append(view.render().el);
        this.replicate(replication);
    },

    // Add all items in the **Replications** collection at once.
    addAll: function() {
        Replications.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Replication** model,
    // persisting it to *PouchDB*.
    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        Replications.create({url: this.input.val()});
        this.input.val('');
    },

    replicate: function (model) {
        var url = model.get('url'),
            pushResps = this.pushResps,
            pullResps = this.pullResps,
            renderStats = _.bind(this.renderStats, this);

        PouchDB.replicate(dbname, url, {
            continuous: true,
            onChange: function(resp) {
                pushResps[url] = resp;
                renderStats();
            }
        });
        PouchDB.replicate(url, dbname, {
            continuous: true,
            onChange: function(resp) {
                pullResps[url] = resp;
                renderStats();
            }
        });
    }

});