var BaseApp = require('rendr/shared/app')
  , handlebarsHelpers = require('./lib/handlebarsHelpers');
var Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('backbone-pouch/node_modules/pouchdb');
var TodoList = require("./collections/todos");
var TodoAppView = require("./views/todos/index");
var ReplicationList = require("./collections/replications");
var ReplicationAppView = require("./views/repos/index");

/**
 * Extend the `BaseApp` class, adding any custom methods or overrides.
 */
module.exports = BaseApp.extend({



  /**
   * Client and server.
   *
   * `initialize` is called on app initialize, both on the client and server.
   * On the server, an app is instantiated once for each request, and in the
   * client, it's instantiated once on page load.
   *
   * This is a good place to initialize any code that needs to be available to
   * app on both client and server.
   */
  initialize: function() {
    /**
     * Register our Handlebars helpers.
     *
     * `this.templateAdapter` is, by default, the `rendr-handlebars` module.
     * It has a `registerHelpers` method, which allows us to register helper
     * modules that can be used on both client & server.
     */
    this.templateAdapter.registerHelpers(handlebarsHelpers);

    var dbname = 'todos-sync-backbone-0.0.12';

    // Save all of the todo items in the `"todos-backbone"` database.
    Backbone.sync = BackbonePouch.sync({
      // We currently suffix by the PouchDB version here
      // because at the moment PouchDB does not support upgrade
      db: new PouchDB(dbname),
      listen: true,
      fetch: 'query'
    });

    // Adjust id attribute to the one PouchDB uses
    Backbone.Model.prototype.idAttribute = '_id';

    var Todos, TodoApp, Replications, ReplicationApp;

    // Create our global collection of **Todos**.
    Todos = new TodoList;

    // Finally, we kick things off by creating the **App**.
    TodoApp = new TodoAppView;

    // Create global collection of **Replications**.
    Replications = new ReplicationList;

    // Finally, we kick things off by creating the **App**.
    ReplicationApp = new ReplicationAppView;
  },

  /**
   * Client-side only.
   *
   * `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
   * the router and initializes the application.
   *
   * Override this method (remembering to call the superclass' `start` method!)
   * in order to do things like bind events to the router, as shown below.
   */
  start: function() {
    // Show a loading indicator when the app is fetching.
    this.router.on('action:start', function() { this.set({loading: true});  }, this);
    this.router.on('action:end',   function() { this.set({loading: false}); }, this);

    // Call 'super'.
    BaseApp.prototype.start.call(this);
  }
});
