/**
 * Created by deefactorial on 25/05/15.
 */
// Todo Collection
// ---------------

var Base = require("./base");
var Todo = require("../models/todo.js");

// The collection of todos is backed by *PouchDB* instead of a remote
// server.
var TodoList = Base.extend({

    // Reference to this collection's model.
    model: Todo,

    // Include todos in Map Reduce response. Order by `order`.
    pouch: {
        options: {
            query: {
                include_docs: true,
                fun: {
                    map: function(doc) {
                        if (doc.type === 'todo') {
                            emit(doc.order, null);
                        }
                    }
                }
            },
            changes: {
                include_docs: true,
                filter: function(doc) {
                    return doc._deleted || doc.type === 'todo';
                }
            }
        }
    },

    // parse view result, use doc property injected via `include_docs`
    parse: function(result) {
        return _.pluck(result.rows, 'doc');
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
        return todo.get('order');
    }

});

module.exports = TodoList;

module.exports.id = "Todos";