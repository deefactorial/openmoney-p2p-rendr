
// Replication Item View
// ---------------------
var Base = require("../base");

// The DOM element for a replication item...
var ReplicationView = Base.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#replication-item-template').html()),

    // The DOM events specific to an item.
    events: {
        "click a.destroy" : "clear"
    },

    // The ReplicationView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Replication** and a **ReplicationView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
    },

    // Re-render the titles of the replication item.
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    // Remove the item, destroy the model.
    clear: function() {
        this.model.destroy();
    }

});

module.exports = ReplicationView;

module.exports.id = "ReplicationView";
