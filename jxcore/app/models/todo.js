/**
 * Created by deefactorial on 25/05/15.
 */
// Todo Model
// ----------
var Base = require('./base');
var Todos = require('../collections/todos.js');

// Our basic **Todo** model has `title`, `order`, and `done` attributes.
var Todo = Base.extend({

    // Default attributes for the todo item.
    defaults: function() {
        return {
            type: 'todo',
            title: "empty todo...",
            order: Todos.nextOrder(),
            done: false
        };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
        if (!this.get("title")) {
            this.set({"title": this.defaults.title});
        }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
        this.save({done: !this.get("done")});
    },

    // Remove this Todo from *PouchDB* and delete its view.
    clear: function() {
        this.destroy();
    }
});

module.exports = Todo;

module.exports.id = 'Todo';