
// Replication Collection
// ----------------------
var Base = require("./base");

var ReplicationList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Replication,

    // Include replications in Map Reduce response. Order by `url`.
    pouch: {
        options: {
            query: {
                include_docs: true,
                fun: {
                    map: function(doc) {
                        if (doc.type === 'replication') {
                            emit(doc.url, null);
                        }
                    }
                }
            },
            changes: {
                include_docs: true,
                filter: function(doc) {
                    return doc._deleted || doc.type === 'replication';
                }
            }
        }
    },

    // parse view result, use doc property injected via `include_docs`
    parse: function(result) {
        return _.pluck(result.rows, 'doc');
    },

    // Replications are sorted by url.
    comparator: function(replication) {
        return replication.get('url');
    }

});

module.exports = ReplicationList;

module.exports.id = "Replications";