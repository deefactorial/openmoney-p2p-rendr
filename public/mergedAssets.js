require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"LentoW":[function(require,module,exports){
var BaseApp = require('rendr/shared/app')
  , handlebarsHelpers = require('./lib/handlebarsHelpers');

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

},{"./lib/handlebarsHelpers":"Cu+0Ho","rendr/shared/app":76}],"app/app":[function(require,module,exports){
module.exports=require('LentoW');
},{}],"rCVOCK":[function(require,module,exports){
var RendrBase = require('rendr/shared/base/collection');

module.exports = RendrBase.extend({});

},{"rendr/shared/base/collection":77}],"app/collections/base":[function(require,module,exports){
module.exports=require('rCVOCK');
},{}],"app/collections/repos":[function(require,module,exports){
module.exports=require('clZNru');
},{}],"clZNru":[function(require,module,exports){
var Repo = require('../models/repo')
  , Base = require('./base');

module.exports = Base.extend({
  model: Repo,
  url: function() {
    if (this.params.user != null) {
      return '/users/:user/repos';
    } else {
      return '/repositories';
    }
  }
});
module.exports.id = 'Repos';

},{"../models/repo":"WQcoKQ","./base":"rCVOCK"}],"IELbLo":[function(require,module,exports){
var User = require('../models/user')
  , Base = require('./base');

module.exports = Base.extend({
  model: User,
  url: '/users'
});
module.exports.id = 'Users';

},{"../models/user":"pLMDjU","./base":"rCVOCK"}],"app/collections/users":[function(require,module,exports){
module.exports=require('IELbLo');
},{}],"n5JPJf":[function(require,module,exports){
module.exports = {
  index: function(params, callback) {
    callback();
  }
};

},{}],"app/controllers/home_controller":[function(require,module,exports){
module.exports=require('n5JPJf');
},{}],"qk854H":[function(require,module,exports){
module.exports = {
  index: function(params, callback) {
    var spec = {
      collection: {collection: 'Repos', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  },

  show: function(params, callback) {
    var spec = {
      model: {model: 'Repo', params: params, ensureKeys: ['language', 'watchers_count']},
      build: {model: 'Build', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  }
};

},{}],"app/controllers/repos_controller":[function(require,module,exports){
module.exports=require('qk854H');
},{}],"app/controllers/users_controller":[function(require,module,exports){
module.exports=require('SZ6WoB');
},{}],"SZ6WoB":[function(require,module,exports){
var _ = require('underscore');

module.exports = {
  index: function(params, callback) {
    var spec = {
      collection: {collection: 'Users', params: params}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  },

  show: function(params, callback) {
    var spec = {
      model: {model: 'User', params: params},
      repos: {collection: 'Repos', params: {user: params.login}}
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  }
};

},{"underscore":87}],"Cu+0Ho":[function(require,module,exports){
/**
 * We inject the Handlebars instance, because this module doesn't know where
 * the actual Handlebars instance will come from.
 */
module.exports = function(Handlebars) {
  return {
    copyright: function(year) {
      return new Handlebars.SafeString("&copy;" + year);
    }
  };
};

},{}],"app/lib/handlebarsHelpers":[function(require,module,exports){
module.exports=require('Cu+0Ho');
},{}],"app/models/base":[function(require,module,exports){
module.exports=require('qnrstJ');
},{}],"qnrstJ":[function(require,module,exports){
var RendrBase = require('rendr/shared/base/model');

module.exports = RendrBase.extend({});

},{"rendr/shared/base/model":78}],"Lkugus":[function(require,module,exports){
var Base = require('./base');

module.exports = Base.extend({
  url: '/repos/:owner/:name',
  api: 'travis-ci'
});
module.exports.id = 'Build';

},{"./base":"qnrstJ"}],"app/models/build":[function(require,module,exports){
module.exports=require('Lkugus');
},{}],"WQcoKQ":[function(require,module,exports){
var Base = require('./base');

module.exports = Base.extend({
  url: '/repos/:owner/:name',
  idAttribute: 'name'
});
module.exports.id = 'Repo';

},{"./base":"qnrstJ"}],"app/models/repo":[function(require,module,exports){
module.exports=require('WQcoKQ');
},{}],"pLMDjU":[function(require,module,exports){
var Base = require('./base');

module.exports = Base.extend({
  url: '/users/:login',
  idAttribute: 'login'
});
module.exports.id = 'User';

},{"./base":"qnrstJ"}],"app/models/user":[function(require,module,exports){
module.exports=require('pLMDjU');
},{}],"86KJBY":[function(require,module,exports){
var BaseClientRouter = require('rendr/client/router');

var Router = module.exports = function Router(options) {
  BaseClientRouter.call(this, options);
};

/**
 * Set up inheritance.
 */
Router.prototype = Object.create(BaseClientRouter.prototype);
Router.prototype.constructor = BaseClientRouter;

Router.prototype.initialize = function() {
  this.on('action:start', this.trackImpression, this);
};

Router.prototype.trackImpression = function() {
  if (window._gaq) {
    _gaq.push(['_trackPageview']);
  }
};

},{"rendr/client/router":74}],"app/router":[function(require,module,exports){
module.exports=require('86KJBY');
},{}],"bbl2t2":[function(require,module,exports){
module.exports = function(match) {
  match('',                   'home#index');
  match('repos',              'repos#index');
  match('repos/:owner/:name', 'repos#show');
  match('users'       ,       'users#index');
  match('users/:login',       'users#show');
};

},{}],"app/routes":[function(require,module,exports){
module.exports=require('bbl2t2');
},{}],"rFRVhs":[function(require,module,exports){
module.exports = function(Handlebars) {

var templates = {};

templates["home/index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h1>Wecome to GitHub Browser!</h1>\n<p>This is a little app that demonstrates how to use Rendr by consuming GitHub's public Api.</p>\n<p>Check out <a href=\"/repos\">Repos</a> or <a href=\"/users\">Users</a>.</p>\n\n<p>There have been "
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + " requests to this app in your session.</p>\n\n<p>"
    + escapeExpression(((helpers.copyright || (depth0 && depth0.copyright) || helperMissing).call(depth0, "2013", {"name":"copyright","hash":{},"data":data})))
    + "</p>\n";
},"useData":true});

templates["repos/index"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "  <li>\n    <a href=\"/repos/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "/"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>, by <a href=\"/users/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "</a>\n  </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h1>Repos</h1>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.models : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});

templates["repos/show"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "  <br>\n  <p><a href=\"https://travis-ci.org/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "/"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "/builds/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.build : depth0)) != null ? stack1.last_build_id : stack1), depth0))
    + "\">Latest TravisCI build</a></p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a href=\"/users/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "</a> / "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "<br>\n\n\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.build : depth0)) != null ? stack1.last_build_id : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<h3>Stats</h3>\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <table class=\"table\">\n      <tr>\n        <th>Description</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n      <tr>\n        <th>Language</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.language || (depth0 != null ? depth0.language : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"language","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n      <tr>\n        <th>Watchers</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.watchers_count || (depth0 != null ? depth0.watchers_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"watchers_count","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n      <tr>\n        <th>Forks</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.forks_count || (depth0 != null ? depth0.forks_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"forks_count","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n      <tr>\n        <th>Open Issues</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.open_issues_count || (depth0 != null ? depth0.open_issues_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"open_issues_count","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

templates["user_repos_view"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <tr>\n      <td><a href=\"/repos/"
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a></td>\n      <td>"
    + escapeExpression(((helper = (helper = helpers.watchers_count || (depth0 != null ? depth0.watchers_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"watchers_count","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + escapeExpression(((helper = (helper = helpers.forks_count || (depth0 != null ? depth0.forks_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"forks_count","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h3>Repos</h3>\n<table class=\"repos-table table\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Watchers</th>\n      <th>Forks</th>\n    </tr>\n  </thead>\n  <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.models : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </tbody>\n</table>\n";
},"useData":true});

templates["users/index"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <li>\n    <a href=\"/users/"
    + escapeExpression(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"login","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"login","hash":{},"data":data}) : helper)))
    + "</a>\n  </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<h1>Users</h1>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.models : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});

templates["users/show"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<img src=\""
    + escapeExpression(((helper = (helper = helpers.avatar_url || (depth0 != null ? depth0.avatar_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"avatar_url","hash":{},"data":data}) : helper)))
    + "\" width=80 height=80> "
    + escapeExpression(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"login","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.public_repos || (depth0 != null ? depth0.public_repos : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"public_repos","hash":{},"data":data}) : helper)))
    + " public repos)\n\n<br>\n\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    "
    + escapeExpression(((helpers.view || (depth0 && depth0.view) || helperMissing).call(depth0, "user_repos_view", {"name":"view","hash":{
    'collection': ((depth0 != null ? depth0.repos : depth0))
  },"data":data})))
    + "\n  </div>\n\n  <div class=\"span6\">\n    <h3>Info</h3>\n    <br>\n    <table class=\"info-table table\">\n      <tr>\n        <th>Location</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n      <tr>\n        <th>Blog</th>\n        <td>"
    + escapeExpression(((helper = (helper = helpers.blog || (depth0 != null ? depth0.blog : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"blog","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

return templates;

};
},{}],"app/templates/compiledTemplates":[function(require,module,exports){
module.exports=require('rFRVhs');
},{}],"6kWBjj":[function(require,module,exports){
var RendrView = require('rendr/shared/base/view');

// Create a base view, for adding common extensions to our
// application's views.
module.exports = RendrView.extend({});

},{"rendr/shared/base/view":80}],"app/views/base":[function(require,module,exports){
module.exports=require('6kWBjj');
},{}],"to5G6a":[function(require,module,exports){
var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'home_index_view',

  getTemplateData: function() {
    return {
      count: this.app.get('session').count
    };
  }
});
module.exports.id = 'home/index';

},{"../base":"6kWBjj"}],"app/views/home/index":[function(require,module,exports){
module.exports=require('to5G6a');
},{}],"app/views/repos/index":[function(require,module,exports){
module.exports=require('T6DCWR');
},{}],"T6DCWR":[function(require,module,exports){
var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'repos_index_view'
});
module.exports.id = 'repos/index';

},{"../base":"6kWBjj"}],"app/views/repos/show":[function(require,module,exports){
module.exports=require('u40/HK');
},{}],"u40/HK":[function(require,module,exports){
var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'repos_show_view',

  getTemplateData: function() {
    var data = BaseView.prototype.getTemplateData.call(this);
    data.build = this.options.build.toJSON();
    return data;
  }
});
module.exports.id = 'repos/show';

},{"../base":"6kWBjj"}],"app/views/user_repos_view":[function(require,module,exports){
module.exports=require('67Yhfb');
},{}],"67Yhfb":[function(require,module,exports){
var BaseView = require('./base');

module.exports = BaseView.extend({
  className: 'user_repos_view'
});
module.exports.id = 'user_repos_view';

},{"./base":"6kWBjj"}],"ARwkjH":[function(require,module,exports){
var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'users_index_view'
});
module.exports.id = 'users/index';

},{"../base":"6kWBjj"}],"app/views/users/index":[function(require,module,exports){
module.exports=require('ARwkjH');
},{}],"/O4NWC":[function(require,module,exports){
var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'users_show_view',

  getTemplateData: function() {
    var data = BaseView.prototype.getTemplateData.call(this);
    data.repos = this.options.repos;
    return data;
  }
});
module.exports.id = 'users/show';

},{"../base":"6kWBjj"}],"app/views/users/show":[function(require,module,exports){
module.exports=require('/O4NWC');
},{}],"EoZ3ID":[function(require,module,exports){
(function (global){
(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"jquery":[function(require,module,exports){
module.exports=require('EoZ3ID');
},{}],47:[function(require,module,exports){
(function (process){
/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(done) );
        });
        function done(err) {
          if (err) {
              callback(err);
              callback = function () {};
          }
          else {
              completed += 1;
              if (completed >= arr.length) {
                  callback();
              }
          }
        }
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        if (!callback) {
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err) {
                    callback(err);
                });
            });
        } else {
            var results = [];
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err, v) {
                    results[x.index] = v;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        var remainingTasks = keys.length
        if (!remainingTasks) {
            return callback();
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            remainingTasks--
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (!remainingTasks) {
                var theCallback = callback;
                // prevent final callback from calling itself if it errors
                callback = function () {};

                theCallback(null, results);
            }
        });

        _each(keys, function (k) {
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var attempts = [];
        // Use defaults if times not passed
        if (typeof times === 'function') {
            callback = task;
            task = times;
            times = DEFAULT_TIMES;
        }
        // Make sure times is a number
        times = parseInt(times, 10) || DEFAULT_TIMES;
        var wrappedTask = function(wrappedCallback, wrappedResults) {
            var retryAttempt = function(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            };
            while (times) {
                attempts.push(retryAttempt(task, !(times-=1)));
            }
            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || callback)(data.err, data.result);
            });
        }
        // If a callback is passed, run this as a controll flow
        return callback ? wrappedTask() : wrappedTask
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!_isArray(tasks)) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (test.apply(null, args)) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (!test.apply(null, args)) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            started: false,
            paused: false,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            kill: function () {
              q.drain = null;
              q.tasks = [];
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (!q.paused && workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                if (q.paused === true) { return; }
                q.paused = true;
                q.process();
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                q.process();
            }
        };
        return q;
    };
    
    async.priorityQueue = function (worker, concurrency) {
        
        function _compareTasks(a, b){
          return a.priority - b.priority;
        };
        
        function _binarySearch(sequence, item, compare) {
          var beg = -1,
              end = sequence.length - 1;
          while (beg < end) {
            var mid = beg + ((end - beg + 1) >>> 1);
            if (compare(item, sequence[mid]) >= 0) {
              beg = mid;
            } else {
              end = mid - 1;
            }
          }
          return beg;
        }
        
        function _insert(q, data, priority, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  priority: priority,
                  callback: typeof callback === 'function' ? callback : null
              };
              
              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }
        
        // Start with a normal queue
        var q = async.queue(worker, concurrency);
        
        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
          _insert(q, data, priority, callback);
        };
        
        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            drained: true,
            push: function (data, callback) {
                if (!_isArray(data)) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    cargo.drained = false;
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain && !cargo.drained) cargo.drain();
                    cargo.drained = true;
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0, tasks.length);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                async.nextTick(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    async.compose = function (/* functions... */) {
      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

}).call(this,require("JkpR2F"))
},{"JkpR2F":48}],48:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"k+WLb7":[function(require,module,exports){
var Handlebars = require('handlebars');

if (Handlebars['default']) {
  // If we only have the Handlebars runtime available, use that here.
  // Until Handlebars 3, we have to use 'default' instead of just requiring 'handlebars'.
  Handlebars = Handlebars['default'];
}

module.exports = function(options){
  var localExports = {},
      templateFinder = options.templateFinder || require('./shared/templateFinder')(Handlebars);

  /**
   * Export the `Handlebars` object, so other modules can add helpers, partials, etc.
   */
  localExports.Handlebars = Handlebars;

  /**
   * `getTemplate` is available on both client and server.
   */
  localExports.getTemplate = templateFinder.getTemplate;

  /**
   * Expose `templatePatterns` for manipulating how `getTemplate` finds templates.
   */
  localExports.templatePatterns = templateFinder.templatePatterns;

  /**
   * The default pattern `/.+/` is very greedy; it matches anything, including nested paths.
   * To add rules that should match before this default rule, `unshift` them from this array.
   */
  localExports.templatePatterns.push({pattern: /.+/, src: options.entryPath + 'app/templates/compiledTemplates'})

  /**
   * `getLayout` should only be used on the server.
   */
  if (typeof window === 'undefined') {
    // server only, "hide" it from r.js compiler
    // by having require statement with variable
    var serverOnlyLayoutFinderPath = './server/layoutFinder';
    localExports.getLayout = require(serverOnlyLayoutFinderPath)(Handlebars).getLayout;
  } else {
    localExports.getLayout = function() {
      throw new Error('getLayout is only available on the server.');
    };
  }

  /**
   * Register helpers, available on both client and server.
   *
   * Export it so other modules can register helpers as well.
   */
  localExports.registerHelpers = function registerHelpers(helpersModule) {
    var helpers = helpersModule(Handlebars, localExports.getTemplate);

    for (var key in helpers) {
      if (!helpers.hasOwnProperty(key)) continue;
      Handlebars.registerHelper(key, helpers[key]);
    }
  };

  /**
   * Register the pre-bundled Rendr helpers.
   */
  var rendrHelpers = require('./shared/helpers');
  localExports.registerHelpers(rendrHelpers);

  return localExports;
}

},{"./shared/helpers":65,"./shared/templateFinder":72,"handlebars":61}],"rendr-handlebars":[function(require,module,exports){
module.exports=require('k+WLb7');
},{}],51:[function(require,module,exports){
/**
 * Grab important underscored properties from the current context.
 * These properties come from BaseView::decorateTemplateData().
 */
module.exports = function (obj) {
  var options, keys, value;

  keys = [
    '_app',
    '_view',
    '_model',
    '_collection',
    '_block'
  ];

  options = keys.reduce(function(memo, key) {
    value = obj[key];
    if (value) {
      memo[key] = value;
    }
    return memo;
  }, {});

  return options;
};

},{}],52:[function(require,module,exports){
/**
 * Get a property that is being passed down through helpers, such as `_app`
 * or `_view`. It can either live on the context, i.e. `this._app`, or in the
 * `options.data` object passed to the helper, i.e. `options.data._app`, in the
 * case of a block helper like `each`.
 */
module.exports = function (key, context, options) {
  return context[key] || (options.data || {})[key];
}

},{}],53:[function(require,module,exports){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

},{"underscore":64}],54:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = require('./handlebars/base');

var base = _interopRequireWildcard(_import);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _SafeString = require('./handlebars/safe-string');

var _SafeString2 = _interopRequireWildcard(_SafeString);

var _Exception = require('./handlebars/exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var _import2 = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_import2);

var _import3 = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_import3);

var _noConflict = require('./handlebars/no-conflict');

var _noConflict2 = _interopRequireWildcard(_noConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _SafeString2['default'];
  hb.Exception = _Exception2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_noConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
},{"./handlebars/base":55,"./handlebars/exception":56,"./handlebars/no-conflict":57,"./handlebars/runtime":58,"./handlebars/safe-string":59,"./handlebars/utils":60}],55:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
exports.createFrame = createFrame;

var _import = require('./utils');

var Utils = _interopRequireWildcard(_import);

var _Exception = require('./exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var VERSION = '3.0.1';
exports.VERSION = VERSION;
var COMPILER_REVISION = 6;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function registerHelper(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) {
        throw new _Exception2['default']('Arg not supported with multiple helpers');
      }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _Exception2['default']('Attempting to register a partial as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function () {
    if (arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });

  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _Exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (isArray(context)) {
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function (conditional, options) {
    if (isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });

  instance.registerHelper('with', function (context, options) {
    if (isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = { data: data };
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function (message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 1,

  // Can be overridden in the host environment
  log: function log(level, message) {
    if (typeof console !== 'undefined' && logger.level <= level) {
      var method = logger.methodMap[level];
      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
    }
  }
};

exports.logger = logger;
var log = logger.log;

exports.log = log;

function createFrame(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
}

/* [args, ]options */
},{"./exception":56,"./utils":60}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
},{}],57:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
/*global window */

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
  };
};

module.exports = exports['default'];
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],58:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports.checkRevision = checkRevision;

// TODO: Remove this line and break up compilePartial

exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;

var _import = require('./utils');

var Utils = _interopRequireWildcard(_import);

var _Exception = require('./exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var _COMPILER_REVISION$REVISION_CHANGES$createFrame = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _Exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _Exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _Exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
  }
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    partial = options.partials[options.name];
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;

  if (partial === undefined) {
    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":55,"./exception":56,"./utils":60}],59:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
},{}],60:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '`': '&#x60;'
};

var badChars = /[&<>"'`]/g,
    possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/*eslint-disable func-style, no-var */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/*eslint-enable func-style, no-var */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};exports.isArray = isArray;

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
},{}],61:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":54}],62:[function(require,module,exports){
module.exports=require(47)
},{"JkpR2F":48}],63:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls
 */
var requireAMD = require;

var _ = require('underscore'),
    Backbone = require('backbone'),
    async = require('async'),
    isServer = (typeof window === 'undefined'),
    BaseView;

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

module.exports = BaseView = Backbone.View.extend({
  constructor: function(options) {
    this.options = _.extend( this.options || {}, options || {} );

    this.parseOptions(options);
    this.name = this.name || this.app.modelUtils.underscorize(this.constructor.id || this.constructor.name);

    // parseOptions deals w/ models and collections, but the BaseView will override those changes
    Backbone.View.call(this, _.omit(options, ['model', 'collection']));

    this.render = this.render.bind(this);
  },

  parseOptions: function(options) {
    /**
     * Populate `this.options` and alias as `options`.
     */
    var obj;
    options = _.extend(this.options, options || {});

    if (options.app != null) {
      this.app = this.options.app;
    } else {
      throw new Error("options.app expected when initializing a new view")
    }

    if (options.parentView != null) {
      this.parentView = options.parentView;
    }

    options = BaseView.parseModelAndCollection(this.app.modelUtils, _.extend({ parse: true }, options));
    this.model = options.model;
    this.collection = options.collection;
  },

  /**
   * Key for the template
   */
  name: null,

  /**
   * Parent of the current view.
   * We make sure to stick this on the prototype as a runtime optimization
   * for V8. It's best not to add properties to the instance after initialization.
   */
  parentView: null,

  /**
   * Children of the current view.
   */
  childViews: null,

  /**
   * Flag whether or not the view is currently being viewed
   */
  viewing: false,

  /**
   * Gets array of child views by their name
   * Empty array is returned when no match is found
   */
  getChildViewsByName: function(name) {
    return _.where(this.childViews, {name: name});
  },

  /**
   * Get data for template.  This also acts as a view-model.
   * Try to return proper data if model or collection is available.
   */
  getTemplateData: function() {
    var retVal, parsedOptions;

    if (this.model) {
      retVal = this.model.toJSON();
    } else if (this.collection) {
      retVal = {
        models: this.collection.toJSON(),
        meta: this.collection.meta,
        params: this.collection.params
      };
    }

    // Remove options that are duplicates in the templates
    parsedOptions = _.omit(this.options, ['model', 'collection', 'app']);
    return _.extend({}, retVal, parsedOptions);
  },

  /**
   * Add special properties `_app` and `_model` or `_collection` to pass to
   * the templates.
   */
  decorateTemplateData: function(data) {
    if (this.app) {
      data._app = this.app;
    }
    if (this.model) {
      data._model = this.model;
    }
    if (this.collection) {
      data._collection = this.collection;
    }
    data._view = this;
    return data;
  },

  getTemplateName: function() {
    return this.options.template_name || this.name;
  },

  /**
   * Get template function
   */
  getTemplate: function() {
    return this.app.templateAdapter.getTemplate(this.getTemplateName());
  },

  /**
   * Any options not to create data-attributes for.
   */
  nonAttributeOptions: ['id', 'className', 'tagName'],

  /**
   * Get HTML attributes to add to el.
   */
  getAttributes: function() {
    var attributes = {},
        fetchSummary = {},
        modelUtils = this.app.modelUtils,
        nonAttributeOptions = this.nonAttributeOptions;

    if (this.attributes) {
      _.extend(attributes, _.result(this, 'attributes'));
    }
    if (this.id) {
      attributes.id = _.result(this, "id");
    }
    if (this.className) {
      attributes['class'] = _.result(this, "className");
    }

    // Add `data-view` attribute with view key.
    // For now, view key is same as template.
    attributes['data-view'] = this.name;

    // Add model & collection meta data from options,
    // as well as any non-object option values.
    _.each(this.options, function(value, key) {

        if (!_.isObject(value) && !_.include(nonAttributeOptions, key)) {
          attributes["data-" + key] = value;
        }
    });
    fetchSummary = BaseView.extractFetchSummary(modelUtils, this.options);

    if (!_.isEmpty(fetchSummary)) {
      attributes['data-fetch_summary'] = JSON.stringify(fetchSummary);
    }
    return attributes;
  },

  /**
   * Turn template into HTML, minus the wrapper element.
   */
  getInnerHtml: function() {
    var template = this.getTemplate(),
        data;

    this._preRender();
    data = this.getTemplateData();
    data = this.decorateTemplateData(data);
    if (template == null) {
      throw new Error(this.name + ": template \"" + this.getTemplateName() + "\" not found.");
    }
    return template(data);
  },

  /**
   * Get the HTML for the view, including the wrapper element.
   */
  getHtml: function() {
    var html = this.getInnerHtml(),
        attributes = this.getAttributes(),
        tagName = _.result(this, "tagName"),
        attrString;

    attrString = _.inject(attributes, function(memo, value, key) {
      return memo += " " + key + "=\"" + _.escape(value) + "\"";
    }, '');

    return "<" + tagName + attrString + ">" + html + "</" + tagName + ">";
  },

  render: function() {
    var html = this.getInnerHtml();
    this.$el.html(html);

    // Because we only set the attributes of the outer element
    // when calling getHtml() (server), let's make sure it also
    // happens during render() (client).

    this.$el.attr(this.getAttributes());
    this._postRender();
    return this;
  },

  /**
   * If rendered on the client missing its data,
   * fetch it based on the parameters passed in.
   */
  fetchLazy: function() {
    var params = {},
        fetchSpec;

    if (this.options.fetch_params) {
      if (!_.isObject(this.options.fetch_params)) {
        throw new Error('fetch_params must be an object for lazy loaded views')
      }

      params = this.options.fetch_params;
    } else if (this.options.param_name) {
      params[this.options.param_name] = this.options.param_value;
    }

    if (this.options.model_id != null) {
      params.id = this.options.model_id;
    }

    if (this.options.model_name != null) {
      fetchSpec = {
        model: {
          model: this.options.model_name,
          params: params
        }
      };
    } else if (this.options.collection_name != null) {
      fetchSpec = {
        collection: {
          collection: this.options.collection_name,
          params: params
        }
      };
    }

    this.setLoading(true);

    this._preRender();
    this.app.fetch(fetchSpec, this._fetchLazyCallback.bind(this));
  },

  _fetchLazyCallback: function(err, results) {
    this.setLoading(false);
    if (err) {
      console.log("FETCH ERR: " + err);
    } else if (this.viewing) {
      // It's possible that by the time the XHR returns, the user has navigated
      // away to a new page, check for whether we are viewing first
      this.parseOptions(results);
      this.render();
    }
  },

  /**
   * Anything to do before rendering on the client or server.
   * This is useful for i.e. accessing @model in the client after
   * @hydrate() is called, but before @getTemplateData() is called.
   */
  _preRender: function() {
    this.preRender();
    this.trigger('preRender');
  },

  /**
   * Anything to do after rendering on the client, such initializing jQuery
   * plugins like sliders, slideshows, etc.
   */
  _postRender: function() {
    this.attachChildViews();
    this.postRender();
    this.trigger('postRender');
  },

  /**
   * To be overridden by subclasses.
   */
  preRender: _.noop,

  /**
   * To be overridden by subclasses.
   */
  postRender: _.noop,

  setLoading: function(loading) {
    this.$el.toggleClass('loading', loading);
    this.trigger('loading', loading);
  },

  attachOrRender: function(element, parentView) {
    var $el = Backbone.$(element);

    this.parentView = parentView;
    this.viewing = true;

    if (this.options.lazy === true && this.options.collection == null && this.options.model == null) {
      $el.attr('data-view-attached', true);
      this.setElement($el);

      return this.fetchLazy();
    }

    if ($el.data('render')) {
      $el.replaceWith(this.$el);
      this.render();
    } else {
      $el.attr('data-view-attached', true);
      this.setElement($el);
      this.attach();
    }
  },

  /**
   * When HTML is already present (rendered by server),
   * this is what gets called to bind to the element.
   */
  attach: function() {
    /**
     * Call preRender() so we can access things setup by @hydrate()
     * (like @model) in i.e. @getTemplateData().
     */
    this._preRender();

    /**
     * We have to call postRender() so client-only things happen,
     * i.e. initialize slideshows, etc.
     */
    this._postRender();

    this.trigger('attach');
  },

  /**
   * Happens client-side.
   * Find all of sub view DOM elements
   * Get the view key
   * Call this.getView()
   * Attach childView
   */
  attachChildViews: function() {
    var _baseView = this;

    // Remove all child views in case we are re-rendering through
    // manual .render() or 'refresh' being triggered on the view.
    this.removeChildViews();
    BaseView.getChildViews(this.app, this, function(views) {
      _baseView.childViews = views;
    });
  },

  removeChildViews: function() {
    (this.childViews || []).forEach(function(view) {
      view.remove();
    });
  },

  remove: function() {
    // Remove reference to this view from its parentView
    if (this.parentView && this.parentView.childViews) {
      this.parentView.childViews = _.without(this.parentView.childViews, this);
    }

    this.removeChildViews();
    this.childViews = null;
    this.parentView = null;
    this.viewing = false;

    var obj = this.model || this.collection;

    if (obj) {
      obj.off(null, null, this);
    }
    BaseView.__super__.remove.apply(this, arguments);
    this.trigger('remove');
  }
});

/**
 * Class methods
 * -------------
 */

BaseView.getView = function(viewName, entryPath, callback) {
  var viewPath;

  if (!entryPath) entryPath = '';

  viewPath = entryPath + "app/views/" + viewName;
  // check for AMD environment
  if (typeof callback == 'function') {
    // Only used in AMD environment
    if (typeof define != 'undefined') {
      requireAMD([viewPath], callback);
    } else {
      callback(require(viewPath));
    }
  } else {
    return require(viewPath);
  }
};

BaseView.createChildView = function (ViewClass, options, $el, parentView, cb) {
  if (!$el.data('view-attached')) {
    var view = BaseView.attachNewChildView(ViewClass, options, $el, parentView);
    cb(null, view);
  } else {
    cb(null, null);
  }
};

BaseView.getViewOptions = function ($el) {
  var parsed,
    options = $el.data();

  _.each(options, function(value, key) {
    if (_.isString(value)) {
      parsed = _.unescape(value);
      try {
        parsed = JSON.parse(parsed);
      } catch (err) {}
      options[key] = parsed;
    }
  });

  return options;
};

BaseView.attachNewChildView = function(ViewClass, options, $el, parentView) {
  var view = new ViewClass(options);
  view.attachOrRender($el, parentView);

  return view;
};

BaseView.getChildViews = function(app, parentView, callback) {
  var scope = parentView ? parentView.$el : null,
      list = Backbone.$('[data-view]', scope).toArray();

  async.map(list, function(el, cb) {
    var $el, options, viewName, fetchSummary;
    $el = Backbone.$(el);
    if (!$el.data('view-attached')) {
      options = BaseView.getViewOptions($el);
      options.app = app;

      viewName = options.view;

      fetchSummary = options.fetch_summary || {};
      app.fetcher.hydrate(fetchSummary, { app: app }, function (err, results) {
        options = _.extend(options, results);
        BaseView.getView(viewName, app.options.entryPath, function(ViewClass) {
          BaseView.createChildView(ViewClass, options, $el, parentView, cb);
        });
      });
    } else {
      cb(null, null);
    }
  }, function(err, views) {
    // no error handling originally
    callback(_.compact(views));
  });
};

BaseView.parseModelAndCollection = function(modelUtils, options) {
  if (options.model != null) {
    if (!(options.model instanceof Backbone.Model) && options.model_name) {
      options.model = modelUtils.getModel(options.model_name, options.model, {
        parse: !!options.parse,
        app: options.app
      });
    }
    options.model_name = options.model_name || modelUtils.modelName(options.model.constructor);
    options.model_id = options.model.id;
  }

  if (options.collection != null) {
    if (!(options.collection instanceof Backbone.Collection) && options.collection_name) {
      options.collection = modelUtils.getCollection(options.collection_name, options.collection, {
        parse: !!options.parse,
        app: options.app,
        params: options.collection_params
      });
    }
    options.collection_name = options.collection_name || modelUtils.modelName(options.collection.constructor);
    options.collection_params = options.collection_params || options.collection.params;
  }

  return options;
};

BaseView.extractFetchSummary = function (modelUtils, options) {
    var fetchSummary = {};

    _.each(options, function(value, key) {
        var id, modelOrCollectionId;

        if (value != null) {
            if (_.isFunction(value.constructor) && value.constructor.id != null) {
                modelOrCollectionId = value.constructor.id;
                if (modelUtils.isModel(value)) {
                    id = value.get(value.idAttribute);
                    if (id == null) {
                        // Bail if there's no ID; someone's using `this.model` in a
                        // non-standard way, and that's okay.
                        return;
                    }
                    // Cast the `id` attribute to string to ensure it's included in attributes.
                    // On the server, it can be i.e. an `ObjectId` from Mongoose.
                    value = id.toString();
                    fetchSummary[key] = {model: modelOrCollectionId, id: value};
                    return;
                }
                if (modelUtils.isCollection(value) && value.params != null) {
                    fetchSummary[key] = {collection: modelOrCollectionId, params: value.params};
                    return;
                }
            }
        }
    });

    return fetchSummary;
}

/**
 * Noops on the server, because they do DOM stuff.
 */
if (typeof window === 'undefined') {
  BaseView.prototype._ensureElement = _.noop;
  BaseView.prototype.delegateEvents = _.noop;
}

},{"async":62,"backbone":53,"jquery":"EoZ3ID","underscore":64}],64:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],65:[function(require,module,exports){
module.exports = function(Handlebars, getTemplate) {
  return {
    view: require('./helpers/view')(Handlebars),
    partial: require('./helpers/partial')(Handlebars, getTemplate),
    json: require('./helpers/json')(Handlebars),
    each: require('./helpers/each')(Handlebars),
    serverToClientJson: require('./helpers/serverToClientJson')(Handlebars),
    forEach: require('./helpers/forEach')
  };
};

},{"./helpers/each":66,"./helpers/forEach":67,"./helpers/json":68,"./helpers/partial":69,"./helpers/serverToClientJson":70,"./helpers/view":71}],66:[function(require,module,exports){
/**
* Extend `each` to pass through important context.
*/

var _ = require('underscore'),
    getOptionsFromContext = require('../../lib/getOptions'),
    oldEach;

module.exports = function(Handlebars) {
  oldEach = oldEach || Handlebars.helpers.each;

  return function (context, options) {
    options.data = Handlebars.createFrame(options.data || {});

    // Make sure `this._app`, `this._view`, etc are available.
    _.extend(options.data, getOptionsFromContext(this));

    // Call the original helper with new context.
    return oldEach.call(this, context, options);
  }
};

},{"../../lib/getOptions":51,"underscore":64}],67:[function(require,module,exports){
/**
* Create a `forEach` helper that works on a few more cases and gives more flexibility
* when dealing with arrays, objects, or collections
*/
var _ = require('underscore');

module.exports = function (collection, opts) {
  var len = collection && collection.length,
      app = this._app || this.app,
      isCollection = app.modelUtils.isCollection(collection),
      buffer = '';

  if (_.isEmpty(collection)) {
    return opts.inverse(_.extend({}, this, {
      _app: app,
      _model: this._model || this.model,
      _collection: this._collection || this.collection,
      _view: this._view || this.view
    }));
  }

  // iterate the models on a collection
  if (isCollection) {
    collection = collection.models
  }

  _.each(collection, function (value, key) {
    if (isCollection && opts.hash.toJSON) {
      value = value.toJSON();
    }

    var item = _.extend({
      key: key,
      value: value,
      _app: this._app || this.app,
      _model: this._model || this.model,
      _collection: this._collection || this.collection,
      _view: this._view || this.view
    }, opts.hash);

    // adding extra attributes to an item for array traversal
    if (_.isArray(collection) || isCollection) {
      item = _.extend(item, {
        _total: len,
        _isFirst: key === 0,
        _isLast: key === (len - 1)
      });
    }

    buffer += opts.fn(item);
  }.bind(this));

  return buffer;
};

},{"underscore":64}],68:[function(require,module,exports){
module.exports = function (Handlebars) {
  return function (object, spacing) {
    return new Handlebars.SafeString(JSON.stringify(object, null, spacing) || 'null');
  }
}

},{}],69:[function(require,module,exports){
/**
 * create an html partial
 */
var getProperty = require('../../lib/getProperty'),
    _ = require('underscore');

module.exports = function (Handlebars, getTemplate) {
  return function (templateName, options) {
    var data, html, context, template;

    template = getTemplate(templateName);
    context = options.hash || {};

    // First try to use Handlebars' hash arguments as the context for the
    // partial, if present.
    //
    // ex: `{{partial "users/photo" user=user}}`
    if (_.isEmpty(context)) {
      // If there are no hash arguments given, then inherit the parent context.
      //
      // ex: `{{partial "users/photo"}}`
      context = this;
    } else {
      // If a hash argument is given with key `context`, then use that as the context.
      //
      // ex: `{{partial "users/photo" context=user}}`
      if (context.hasOwnProperty('context')) {
        context = context.context;
      }
    }

    context = _.clone(context);
    context._app = getProperty('_app', this, options);
    if (_.isFunction(options.fn)) {
      context._block = options.fn(context);
    }

    html = template(context);
    return new Handlebars.SafeString(html);
  };
};

},{"../../lib/getProperty":52,"underscore":64}],70:[function(require,module,exports){
module.exports = function (Handlebars) {
  return function (obj) {
    var data = escape(JSON.stringify(obj));
    return new Handlebars.SafeString('JSON.parse(unescape("' + data + '"))');
  };
};

},{}],71:[function(require,module,exports){
/**
 * Helper to create new views in the templates
 */

var _ = require('underscore'),
    getProperty = require('../../lib/getProperty'),
    BaseView;

module.exports = function (Handlebars) {
  return function (viewName, options) {
    var isServer = typeof window === 'undefined',
        html, viewOptions, view, app;

    viewOptions = options.hash || {};
    app = getProperty('_app', this, options);

    // Pass through a reference to the app.
    if (app) {
      viewOptions.app = app;
      viewName = app.modelUtils.underscorize(viewName);
    } else{
      throw new Error("An App instance is required when rendering a view, it could not be extracted from the options.")
    }

    // allow views to be passed optional block elements
    if (_.isFunction(options.fn)) {
      var blockOptions = _.extend({}, this, viewOptions);
      viewOptions._block = options.fn(blockOptions);
    }

    if (isServer) {
      var parentView = getProperty('_view', this, options);
      html = getServerHtml(viewName, viewOptions, parentView);
    } else {
      html = getClientPlaceholder(viewName, viewOptions);
    }

    return new Handlebars.SafeString(html);
  };
};

function getServerHtml(viewName, viewOptions, parentView) {
  var ViewClass, view;

  if (!BaseView) { BaseView = require('rendr/shared/base/view'); }

  // Pass through a reference to the parent view.
  if (parentView) { viewOptions.parentView = parentView; }

  // get the Backbone.View based on viewName
  ViewClass = BaseView.getView(viewName, viewOptions.app.options.entryPath);
  view = new ViewClass(viewOptions);

  // create the outerHTML using className, tagName
  return view.getHtml();
}

function getClientPlaceholder(viewName, viewOptions) {
  if (!BaseView) { BaseView = require('rendr/shared/base/view'); }
  var fetchSummary;

  // Builds a fetch_summary attribute
  viewOptions = BaseView.parseModelAndCollection(viewOptions.app.modelUtils, viewOptions);
  fetchSummary = BaseView.extractFetchSummary(viewOptions.app.modelUtils, viewOptions);
  viewOptions['fetch_summary'] = fetchSummary
  viewOptions = _.omit(viewOptions, _.keys(fetchSummary).concat(['model', 'collection', 'app']));

  // create a list of data attributes
  var attrString = _.inject(viewOptions, function(memo, value, key) {
    if (_.isArray(value) || _.isObject(value)) { value = JSON.stringify(value); }
    return memo += " data-" + key + "=\"" + _.escape(value) + "\"";
  }, '');

  return '<div data-render="true"' + attrString +' data-view="'+ viewName +'"></div>';
}

},{"../../lib/getProperty":52,"rendr/shared/base/view":63,"underscore":64}],72:[function(require,module,exports){
var cachedTemplates = {};

module.exports = function(Handlebars) {

  /**
   * Provide a way for apps to specify that different template name patterns
   * should use different compiled template files.
   *
   */
  var templatePatterns = [];

  /**
   * Given a template name, return the compiled Handlebars template.
   */
  function getTemplate(templateName) {
    /**
     * Find the correct source file for this template.
     */
    var src = getSrcForTemplate(templateName);

    /**
    * Allow compiledTemplates to be created asynchronously by lazy-requiring it.
    */
    if (!cachedTemplates[src]) {
      cachedTemplates[src] = require(src);

      /**
       * Make it play nicely with both AMD and CommonJS.
       * The `grunt-contrib-handlebars` module  produces different stucture
       * of compiled templates with `amd` vs `commonjs` options. Accommodate
       * both options here. the `amd` option results in templates as an Object,
       * whereas the `commonjs` option results in templates as a Function.
       */
      if (typeof cachedTemplates[src] == 'function') {
        cachedTemplates[src] = cachedTemplates[src](Handlebars);
      }
    }

    return cachedTemplates[src][templateName];
  }

  /**
   * For a given template name, find the correct compiled templates source file
   * based on pattern matching on the template name.
   */
  function getSrcForTemplate(templateName) {
    var currentPattern = templatePatterns.filter(function(obj) {
      return obj.pattern.test(templateName);
    })[0];

    if (currentPattern == null) {
      throw new Error('No pattern found to match template "' + templateName + '".');
    }

    return currentPattern.src;
  }

  return {
    getTemplate: getTemplate,
    getSrcForTemplate: getSrcForTemplate,
    templatePatterns: templatePatterns
  }
};

},{}],73:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    BaseView = require('../shared/base/view'),
    isServer = (typeof window === 'undefined');


if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

module.exports = BaseView.extend({
  el: 'body',

  constructor: function() {
    BaseView.apply(this, arguments);

    _.defaults(this.options, {
      contentEl: '#content'
    });

    /**
     * Grab the element that contains the main view.
     */
    this.$content = Backbone.$(this.options.contentEl);
    this._bindInterceptClick();
  },

  hasPushState: typeof window !== "undefined" && window.history.pushState != null,

  render: function() {},

  setCurrentView: function(view) {
    this.$content.html(view.el);
    view.render();
  },

  _bindInterceptClick: function() {
    this.$el.on('click', 'a:not([data-pass-thru])', this._interceptClick.bind(this));
  },

  _interceptClick: function(e) {
    /**
     * We want the actual value of the attribute, rather than the
     * full URL, so we use jQuery instead of just e.currentTarget.href
     */
    var href = Backbone.$(e.currentTarget).attr('href');
    if (this.shouldInterceptClick(href, e.currentTarget, e)) {
      e.preventDefault();
      this.app.router.redirectTo(href);
    }
  },

  shouldInterceptClick: function(href, el, e) {
    var hashParts, isHashClick;

    if (!(href && this.hasPushState) || e.metaKey || e.shiftKey) {
      return false;
    }

    hashParts = href.split('#');
    isHashClick = hashParts.length > 1 && hashParts[0] === window.location.pathname;
    return !isHashClick && href.slice(0, 1) === '/' && href.slice(0, 2) !== '//';
  }

});

},{"../shared/base/view":80,"backbone":75,"jquery":"EoZ3ID","underscore":87}],74:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls
 */
var requireAMD = require;

var _ = require('underscore'),
    Backbone = require('backbone'),
    BaseRouter = require('../shared/base/router'),
    BaseView = require('../shared/base/view'),
    $ = (typeof window !== 'undefined' && window.$) || require('jquery'),
    extractParamNamesRe = /:(\w+)/g,
    plusRe = /\+/g,
    firstRender = true,
    defaultRootPath = '';

Backbone.$ = $;

module.exports = ClientRouter;

function ClientRouter(options) {
  this._router = new Backbone.Router();
  BaseRouter.apply(this, arguments);

  this.app = options.app;

  var AppView = this.options.appViewClass;

  // We do this here so that it's available in AppView initialization.
  this.app.router = this;

  this.on('route:add', this.addBackboneRoute, this);
  this.on('action:start', this.trackAction, this);
  this.app.on('reload', this.renderView, this);

  this.appView = new AppView({
    app: this.app
  });

  this.appView.render();
  this.buildRoutes();
  this.initialize(options);
}

/**
 * Set up inheritance.
 */
ClientRouter.prototype = Object.create(BaseRouter.prototype);
ClientRouter.prototype.constructor = ClientRouter;

ClientRouter.prototype.currentFragment = null;

ClientRouter.prototype.previousFragment = null;

/**
 * In a controller action, can access the current route
 * definition with `this.currentRoute`.
 */
ClientRouter.prototype.currentRoute = null;

/**
 * Instance of Backbone.Router used to manage browser history.
 */
ClientRouter.prototype._router = null;

/**
 * We need to reverse the routes in the client because
 * Backbone.History matches in reverse.
 */
ClientRouter.prototype.reverseRoutes = true;

ClientRouter.prototype.initialize = _.noop;

/**
 * Piggyback on adding new route definition events
 * to also add to Backbone.Router.
 */
ClientRouter.prototype.addBackboneRoute = function(routeObj) {
  var handler, name, pattern, route;

  // Backbone.History wants no leading slash on strings.
  pattern = (routeObj[0] instanceof RegExp) ? routeObj[0] : routeObj[0].slice(1);
  route = routeObj[1];
  handler = routeObj[2];
  name = route.controller + ":" + route.action;

  this._router.route(pattern, name, handler);
};

ClientRouter.prototype.getHandler = function(action, pattern, route) {
  var router = this;

  // abstract action call
  function actionCall(action, params) {
    action.call(router, params, router.getRenderCallback(route));
  }

  // This returns a function which is called by Backbone.history.
  return function() {
    var params, paramsArray, redirect;

    router.trigger('action:start', route, firstRender);
    router.currentRoute = route;

    if (firstRender) {
      firstRender = false;
      BaseView.getChildViews(router.app, null, function(views) {
        router.currentView = router.getMainView(views);
        router.trigger('action:end', route, true);
      });
    } else {
      paramsArray = _.toArray(arguments);
      params = router.getParamsHash(pattern, paramsArray, window.location.search);

      redirect = router.getRedirect(route, params);
      /**
       * If `redirect` is present, then do a redirect and return.
       */
      if (redirect != null) {
        router.redirectTo(redirect, {replace: true});
      } else {
        if (!action) {
          throw new Error("Missing action \"" + route.action + "\" for controller \"" + route.controller + "\"");
        } else {
          actionCall(action, params);
        }
      }
    }
  };
};

/**
 * Can be overridden by applications
 * if the initial render is more complicated.
 */
ClientRouter.prototype.getMainView = function(views) {
  var $content = this.appView.$content;
  return _.find(views, function(view) {
    return view.$el.parent().is($content);
  });
};

/**
 * Proxy to Backbone.Router.
 */
ClientRouter.prototype.navigate = function(path, options) {
  var fragment = Backbone.history.getFragment(path);

  // check if local router can handle route
  if (this.matchesAnyRoute(fragment)) {
    this._router.navigate.apply(this._router, arguments);
  } else {
    this.redirectTo(fragment, {pushState: false});
  }
};

ClientRouter.prototype.getParamsHash = function(pattern, paramsArray, search) {
  var paramNames, params, query;

  if (pattern instanceof RegExp) {
    paramNames = paramsArray.map(function(val, i) { return String(i); });
  } else {
    paramNames = (pattern.match(extractParamNamesRe) || []).map(function(name) {
      return name.slice(1);
    });
  }

  params = (paramNames || []).reduce(function(memo, name, i) {
    memo[name] = decodeURIComponent(paramsArray[i]);
    return memo;
  }, {});

  query = search.slice(1).split('&').reduce(function(memo, queryPart) {
    var parts = queryPart.split('=');
    if (parts.length > 1) {
      memo[parts[0]] = decodeURIComponent(parts[1].replace(plusRe, ' '));
    }
    return memo;
  }, {});

  return _.extend(query, params);
};

ClientRouter.prototype.matchingRoute = function(path) {
  return _.find(Backbone.history.handlers, function(handler) {
    return handler.route.test(path);
  });
};

ClientRouter.prototype.matchesAnyRoute = function(path) {
  return this.matchingRoute(path) != null;
};

ClientRouter.prototype.redirectTo = function(path, options) {
  var hashParts;

  if (options == null) {
    options = {};
  }
  _.defaults(options, {
    trigger: true,
    pushState: true,
    replace: false
  });

  if (options.pushState === false) {
    // Do a full-page redirect.
    window.location.href = path;
  } else {
    // Do a pushState navigation.
    hashParts = path.split('#');
    path = hashParts[0];

    // But then trigger the hash afterwards.
    if (hashParts.length > 1) {
      this.once('action:end', function() {
        window.location.hash = hashParts[1];
      });
    }

    // Ignore hash for routing.
    this.navigate(path, options);
  }
};

ClientRouter.prototype.handleErr = function(err, route) {
  this.trigger('action:error', err, route);
}

ClientRouter.prototype.getRenderCallback = function(route) {
  return function(err, viewPath, locals) {
    if (err) return this.handleErr(err, route);

    var View, _router = this;

    if (this.currentView) {
      this.currentView.remove();
    }

    var defaults = this.defaultHandlerParams(viewPath, locals, route);
    viewPath = defaults[0];
    locals = defaults[1];

    locals = locals || {};
    _.extend(locals, { fetch_summary: BaseView.extractFetchSummary(this.app.modelUtils, locals) });

    // Inject the app.
    locals.app = this.app;
    this.getView(viewPath, this.options.entryPath, function(View) {
      _router.currentView = new View(locals);
      _router.renderView();

      _router.trigger('action:end', route, firstRender);
    });
  }.bind(this);
};

ClientRouter.prototype.renderView = function() {
  this.appView.setCurrentView(this.currentView);
};

ClientRouter.prototype.start = function() {
  Backbone.history.start({
    pushState: true,
    hashChange: false,
    root: this.options.rootPath || defaultRootPath
  });
};

ClientRouter.prototype.trackAction = function() {
  this.previousFragment = this.currentFragment;
  this.currentFragment = Backbone.history.getFragment();
};

ClientRouter.prototype.getView = function(key, entryPath, callback) {
  var View = BaseView.getView(key, entryPath, function(View) {
    // TODO: Make it function (err, View)
    if (!_.isFunction(View)) {
      throw new Error("View '" + key + "' not found.");
    }

    callback(View);
  });
};

},{"../shared/base/router":79,"../shared/base/view":80,"backbone":75,"jquery":"EoZ3ID","underscore":87}],75:[function(require,module,exports){
module.exports=require(53)
},{"underscore":87}],76:[function(require,module,exports){
/**
 * This is the app instance that is shared between client and server.
 * The client also subclasses it for client-specific stuff.
 */

var Backbone = require('backbone'),
    _ = require('underscore'),
    Fetcher = require('./fetcher'),
    ModelUtils = require('./modelUtils'),
    isServer = (typeof window === 'undefined'),
    ClientRouter;

if (!isServer) {
  ClientRouter = require('app/router');
  Backbone.$ = window.$ || require('jquery');
}

module.exports = Backbone.Model.extend({

  defaults: {
    loading: false,
    templateEngine: 'handlebars',
    templateAdapter: 'rendr-handlebars'
  },

  // Set keys to undefined so runtime V8 is happier
  templateAdapter: undefined,
  req: undefined,
  modelUtils: undefined,
  fetcher: undefined,

  /**
   * @shared
   */
  constructor: function(attributes, options) {
    attributes = attributes || {};
    this.options = options || {};

    var entryPath = this.options.entryPath || '';
    if (!isServer) {
      // the entry path must always be empty for the client
      entryPath =  '';
    }

    this.modelUtils = this.options.modelUtils || new ModelUtils(entryPath);

    /**
     * On the server-side, you can access the Express request, `req`.
     */
    if (this.options.req) {
      this.req = this.options.req;
    }

    this.initializeTemplateAdapter(entryPath, attributes);

    /**
     * Instantiate the `Fetcher`, which is used on client and server.
     */
    this.fetcher = new Fetcher({
      app: this
    });

    /**
     * Initialize the `ClientRouter` on the client-side.
     */
    if (!isServer) {
      if (this.options.ClientRouter) {
        ClientRouter = this.options.ClientRouter;
      }

      new ClientRouter({
        app: this,
        entryPath: entryPath,
        appViewClass: this.getAppViewClass(),
        rootPath: attributes.rootPath
      });
    }

    Backbone.Model.apply(this, arguments);
  },

  /**
   * @shared
   *
   * Initialize the `templateAdapter`, allowing application developers to use whichever
   * templating system they want.
   *
   * We can't use `this.get('templateAdapter')` here because `Backbone.Model`'s
   * constructor has not yet been called.
   */
  initializeTemplateAdapter: function(entryPath, attributes) {
    if (this.options.templateAdapterInstance) {
      this.templateAdapter = this.options.templateAdapterInstance;
    } else {
      var templateAdapterModule = attributes.templateAdapter || this.defaults.templateAdapter,
        templateAdapterOptions = {entryPath: entryPath},
        templateEngine = require(attributes.templateEngine || this.defaults.templateEngine);

      templateAdapterOptions = this.setTemplateFinder(templateAdapterOptions);
      this.templateAdapter = require(templateAdapterModule)(templateAdapterOptions, templateEngine);
    }
  },

  /**
   * @shared
   * Override this in app/app to return a custom template finder
   */
  getTemplateFinder: _.noop,

  /**
   * @shared
   */
  setTemplateFinder: function(templateAdapterOptions) {
    if (_.isFunction(this.getTemplateFinder) && this.getTemplateFinder !== _.noop) {
      templateAdapterOptions.templateFinder = this.getTemplateFinder();
    }
    return templateAdapterOptions;
  },

  /**
   * @shared
   */
  fetch: function() {
    this.fetcher.fetch.apply(this.fetcher, arguments);
  },

  /**
   * @client
   */
  getAppViewClass: function () {
    return require('../client/app_view');
  },

  /**
   * @client
   */
  bootstrapData: function(modelMap, callback) {
    this.fetcher.bootstrapData(modelMap, callback);
  },

  /**
   * @client
   */
  start: function() {
    this.router.start();
    this.trigger('start');
  }
});

},{"../client/app_view":73,"./fetcher":81,"./modelUtils":82,"app/router":"86KJBY","backbone":75,"jquery":"EoZ3ID","underscore":87}],77:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    syncer = require('../syncer'),
    BaseModel = require('./model'),
    Super = Backbone.Collection,
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

var BaseCollection = Super.extend({

  model: BaseModel,
  params: undefined,
  meta: undefined,

  /**
   * Provide the ability to set default params for every 'fetch' call.
   */
  defaultParams: null,

  constructor: function(models, options) {
    /**
     * Capture the options as instance variable.
     */
    this.options = options || {};

    /**
     * Store a reference to the app instance.
     */
    this.app = this.options.app;

    /**
     * Store a reference to the params that were used to
     * query for these models.
     */
    this.params = this.options.params || {};
    _.defaults(this.params, this.defaultParams || {});

    /**
     * Add 'meta' property to store the parts of the response
     * that aren't part of the jsonKey.
     */
    this.meta = {};
    if (_.isObject(this.options.meta)) {
      _.extend(this.meta, this.options.meta);
      delete this.options.meta;
    }

    Super.apply(this, arguments);

    this.store();
  },

  /**
   * Make sure that `model.app` is set for all operations like
   * `this.add()`, `this.reset()`, `this.set()`, `this.push()`, etc.
   */
  _prepareModel: function() {
    var model;
    model = Super.prototype._prepareModel.apply(this, arguments);
    model.app = this.app;
    return model;
  },

  /**
   * Idempotent parse
   */
  parse: function(resp, modifyInstance) {
    var jsonResp, meta, parsed;

    if (modifyInstance == null) {
      modifyInstance = true;
    }
    if (resp != null && this.jsonKey && (jsonResp = resp[this.jsonKey])) {
      if (modifyInstance) {
        meta = _.omit(resp, this.jsonKey);
        _.extend(this.meta, meta);
      }
      parsed = jsonResp;
    } else {
      parsed = resp;
    }
    return this.parseModels(parsed);
  },

  parseModels: function(resp) {
    var jsonKey, jsonKeyResp;

    resp = _.clone(resp);
    jsonKey = this.model.prototype.jsonKey;
    _.each(resp, function(modelResp, i) {
      jsonKeyResp = modelResp[jsonKey];
      if (jsonKeyResp) {
        resp[i] = jsonKeyResp;
      }
    });
    return resp;
  },

  fetch: function(options) {
    options = options || {};

    // Each time new models are fetched, store the params used.
    if (options.data) {
      _.defaults(options.data, this.defaultParams || {});
      this.params = options.data;
    }

    return Super.prototype.fetch.apply(this, arguments);
  },

  /**
   * Instance method to store the collection and its models.
   */
  store: function() {
    if (this.app && this.app.fetcher) {
      this.each(function(model) {
        model.store();
      });
      this.app.fetcher.collectionStore.set(this);
    }
  }
});

/**
 * Mix-in the `syncer`, shared between `BaseModel` and `BaseCollection`, which
 * encapsulates logic for fetching data from the API.
 */
_.extend(BaseCollection.prototype, syncer);

module.exports = BaseCollection;

},{"../syncer":86,"./model":78,"backbone":75,"jquery":"EoZ3ID","underscore":87}],78:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    syncer = require('../syncer'),
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

var BaseModel = Backbone.Model.extend({

  constructor: function(attributes, options) {
    // Capture the options as instance variable.
    this.options = options || {};

    // Store a reference to the app instance.
    this.app = this.options.app;

    if (!this.app && this.options.collection) {
      this.app = this.options.collection.app;
    }

    Backbone.Model.apply(this, arguments);

    this.store();
    this.on('change:' + this.idAttribute, this.store, this);
  },

  /**
   * Idempotent parse
   */
  parse: function(resp) {
    if (resp != null && this.jsonKey) {
      return resp[this.jsonKey] || resp;
    } else {
      return resp;
    }
  },

  /**
   * Instance method to store in the modelStore.
   */
  store: function() {
    if (this.id !== undefined && this.app && this.app.fetcher) {
      this.app.fetcher.modelStore.set(this);
    }
  }
});

/**
 * Mix-in the `syncer`, shared between `BaseModel` and `BaseCollection`, which
 * encapsulates logic for fetching data from the API.
 */
_.extend(BaseModel.prototype, syncer);

module.exports = BaseModel;

},{"../syncer":86,"backbone":75,"jquery":"EoZ3ID","underscore":87}],79:[function(require,module,exports){
var _ = require('underscore'),
  Backbone = require('backbone'),
  isServer = (typeof window === 'undefined'),
  isAMDEnvironment = !isServer && (typeof define !== 'undefined'),
  loadNumber = 0;

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}


function stringRouteDefinitionToObject(element) {
  var parts = element.split('#');
  return {
    controller: parts[0],
    action: parts[1]
  };
}

function parseRouteDefinitions(definitions) {
  return definitions.reduce(function(route, element) {
    if (_.isString(element)) {
      element = stringRouteDefinitionToObject(element);
    }
    return _.extend(route, element);
  }, {});
}

/**
 * Base router class shared between ClientRouter and ServerRouter.
 */
function BaseRouter(options) {
  this.route = this.route.bind(this);
  this._routes = [];
  this._initOptions(options);
}

_.extend(BaseRouter.prototype, Backbone.Events, {
  /**
   * Config
   *   - errorHandler: function to correctly handle error
   *   - paths
   *     - entryPath (required)
   *     - routes (optional)
   *     - controllerDir (optional)
   */
  options: null,

  /**
   * Internally stored route definitions.
   */
  _routes: null,

  reverseRoutes: false,

  initialize: _.noop,

  _initOptions: function(options) {
    var entryPath;

    options = options || {};
    options.paths = options.paths || {};

    entryPath = options.paths.entryPath || options.entryPath;
    options.paths = _.defaults(options.paths, {
      entryPath: entryPath,
      routes: entryPath + 'app/routes',
      controllerDir: entryPath + 'app/controllers'
    });

    this.options = options;
  },

  getControllerPath: function(controllerName) {
    var controllerDir = this.options.paths.controllerDir;
    return controllerDir + '/' + controllerName + '_controller';
  },

  loadController: function(controllerName) {
    var controllerPath = this.getControllerPath(controllerName);
    return require(controllerPath);
  },

  getAction: function(route) {
    var controller, action;

    if (route.controller) {
      if (isAMDEnvironment) {
        action = this.getControllerPath(route.controller);
      } else {
        controller = this.loadController(route.controller);
        action = controller[route.action];
      }
    }

    return action;
  },

  getRedirect: function(route, params) {
    var redirect = route.redirect;

    if (typeof redirect === 'function') {
      redirect = redirect(params);
    }

    return redirect;
  },

  getRouteBuilder: function() {
    return require(this.options.paths.routes);
  },

  buildRoutes: function() {
    var routeBuilder = this.getRouteBuilder(),
      routes = [];

    function captureRoutes() {
      routes.push(_.toArray(arguments));
    }

    routeBuilder(captureRoutes);
    if (this.reverseRoutes) {
      routes = routes.reverse();
    }

    routes.forEach(this.addRouteDefinition, this);

    return this.routes();
  },

  addRouteDefinition: function(route) {
    try {
      this.route.apply(this, route);
    } catch (error) {
      error.message = 'Error building routes (' + error.message + ')';
      throw error;
    }
  },

  /**
   * Returns a copy of current route definitions.
   */
  routes: function() {
    return this._routes.slice().map(function(route) {
      return route.slice();
    });
  },

  /**
   * Method passed to routes file to build up routes definition.
   * Adds a single route definition.
   */
  route: function(pattern, controller, options) {
    var realAction, action, handler, route, routeObj, routerContext = this;

    route = parseRouteDefinitions([controller, options]);
    realAction = this.getAction(route);

    if (isServer) {
      action = realAction;
    } else {
      action = function(params, callback) {
        var self = this;
        var myLoadNumber = ++loadNumber;
        function next() {
          // To prevent race conditions we ensure that no future requests have been processed in the mean time.
          if (myLoadNumber === loadNumber) {
            callback.apply(self, arguments);
          }
        }
        // in AMD environment realAction is the string containing path to the controller
        // which will be loaded async (might be preloaded)
        // Only used in AMD environment
        if (typeof realAction === 'string') {
          routerContext._requireAMD([realAction], function(controller) {
            // check we have everything we need
            if (typeof controller[route.action] != 'function') {
              throw new Error("Missing action \"" + route.action + "\" for controller \"" + route.controller + "\"");
            }
            controller[route.action].call(self, params, next);
          });
        }
        else {
          realAction.call(self, params, next);
        }
      }
    }

    if (!(pattern instanceof RegExp) && pattern.slice(0, 1) !== '/') {
      pattern = "/" + pattern;
    }

    handler = this.getHandler(action, pattern, route);
    routeObj = [pattern, route, handler];

    this._routes.push(routeObj);
    this.trigger('route:add', routeObj);

    return routeObj;
  },

  /**
   * exposing for mocking in test
   */
  _requireAMD: require,

  /**
   * Support omitting view path; default it to ":controller/:action".
   */
  defaultHandlerParams: function(viewPath, locals, route) {
    if (typeof viewPath !== 'string') {
      locals = viewPath;
      viewPath = route.controller + '/' + route.action;
    }
    return [viewPath, locals];
  },

  /**
   * Methods to be extended by subclasses.
   * -------------------------------------
   */

  /**
   * This is the method that renders the request.
   */
  getHandler: _.noop
});

module.exports = BaseRouter;
module.exports.setAMDEnvironment = function(flag) {
  isAMDEnvironment = flag;
};

},{"backbone":75,"jquery":"EoZ3ID","underscore":87}],80:[function(require,module,exports){
module.exports=require(63)
},{"async":47,"backbone":75,"jquery":"EoZ3ID","underscore":87}],81:[function(require,module,exports){
var _ = require('underscore'),
    Backbone = require('backbone'),
    async = require('async'),
    ModelStore = require('./store/model_store'),
    CollectionStore = require('./store/collection_store'),
    isServer = (typeof window === 'undefined');

if (!isServer) {
  Backbone.$ = window.$ || require('jquery');
}

module.exports = Fetcher;

function Fetcher(options) {
  this.options = options;
  this.app = this.options.app;
  this.modelUtils = this.app.modelUtils;
  this.modelStore = new ModelStore({
    app: this.app,
    modelUtils: this.modelUtils
  });
  this.collectionStore = new CollectionStore({
    app: this.app,
    modelUtils: this.modelUtils
  });
}

Fetcher.prototype.buildOptions = function(additionalOptions, params) {
  var options = {app: this.app, parse: true};
  _.defaults(options, additionalOptions);
  _.defaults(options, params);
  return options;
};

/**
 * Returns an instance of Model or Collection.
 */
Fetcher.prototype.getModelOrCollectionForSpec = function(spec, attrsOrModels, options, callback) {
  if (spec.model) {
    return this.getModelForSpec(spec, attrsOrModels, options, callback);
  } else {
    return this.getCollectionForSpec(spec, attrsOrModels, options, callback);
  }
};

/**
 * Returns an instance of Collection.
 */
Fetcher.prototype.getCollectionForSpec = function(spec, models, options, callback) {
  var collectionOptions = this.buildOptions(options, _.extend({params: spec.params}, spec.params));
  models = models || [];
  return this.modelUtils.getCollection(spec.collection, models, collectionOptions, callback);
};

/**
 * Returns an instance of Model.
 */
Fetcher.prototype.getModelForSpec = function(spec, attributes, options, callback) {
  var modelOptions = this.buildOptions(options);

  attributes = attributes || {};
  _.defaults(attributes, spec.params);

  return this.modelUtils.getModel(spec.model, attributes, modelOptions, callback);
};


/**
 * map fetchSpecs to models and fetch data in parallel
 */
Fetcher.prototype._retrieve = function(fetchSpecs, options, callback) {
  var batchedRequests = {};

  _.each(fetchSpecs, function(spec, name) {
    batchedRequests[name] = function(cb) {
      var model;

      var readFromCache = options.readFromCache;

      // If present, the individual spec can overwrite the fetchSpec.
      if (!_.isUndefined(spec.readFromCache) && !_.isNull(spec.readFromCache)) {
        readFromCache = spec.readFromCache;
      }

      if (!readFromCache) {
        this.fetchFromApi(spec, options, cb);
      } else {
        model = null;

        // First, see if we have stored the model or collection.
        if (spec.model != null) {

          this._retrieveModel(spec, function(err, model) {
            this._refreshData(spec, model, options, cb);
          }.bind(this));

        } else if (spec.collection != null) {
          this.collectionStore.get(spec.collection, spec.params, function(collection) {
            this._refreshData(spec, collection, options, cb);
          }.bind(this));

        }

      }
    }.bind(this);
  }, this);
  async.parallel(batchedRequests, callback);
};

Fetcher.prototype._refreshData = function(spec, modelOrCollection, options, cb) {

  // If we found the model/collection in the store, then return that.
  if (!this.needsFetch(modelOrCollection, spec)) {
    cb(null, modelOrCollection);
  } else {
    /**
     * Else, fetch anew.
     */
    this.fetchFromApi(spec, options, cb);
  }
}

Fetcher.prototype._retrieveModel = function(spec, callback) {
  var fetcher = this;

  // Attempt to fetch from the modelStore based on the idAttribute
  this.modelUtils.modelIdAttribute(spec.model, function(idAttribute) {
    var model = fetcher.modelStore.get(spec.model, spec.params[idAttribute]);
    if (model) return callback(null, model);

    // if there are no other keys than the id in the params, return null;
    if (_.isEmpty(_.omit(spec.params, idAttribute)))
      return callback(null, null);

    // Attempt to fetch the model in the modelStore based on the other params
    return callback(null, fetcher.modelStore.find(spec.model, spec.params));
  });
};

Fetcher.prototype.needsFetch = function(modelOrCollection, spec) {
  if (modelOrCollection == null) return true;

  if (this.modelUtils.isModel(modelOrCollection) && this.isMissingKeys(modelOrCollection.attributes, spec.ensureKeys)) {
    return true;
  }

  if (spec.needsFetch === true) return true;
  if (typeof spec.needsFetch === 'function' && spec.needsFetch(modelOrCollection)) return true;
  return false;
};

Fetcher.prototype.isMissingKeys = function(modelData, keys) {
  var key;

  if (keys == null) {
    return false;
  }

  if (!_.isArray(keys)) {
    keys = [keys];
  }

  for (var i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    if (modelData[key] == null) {
      return true;
    }
  }
  return false;
};

Fetcher.prototype.fetchFromApi = function(spec, options, callback) {
  var model = this.getModelOrCollectionForSpec(spec),
      fetcher = this;

  model.fetch({
    headers: options.headers || {},
    data: spec.params,
    success: function(model, body) {
      callback(null, model);
    },
    error: function(model, resp, options) {
      var body, respOutput, err;

      body = resp.body;
      resp.body = typeof body === 'string' ? body.slice(0, 150) : body;
      respOutput = JSON.stringify(resp);
      err = new Error("ERROR fetching model '" + fetcher.modelUtils.modelName(model.constructor) + "' with options '" + JSON.stringify(options) + "'. Response: " + respOutput);
      err.status = resp.status;
      err.body = body;
      callback(err);
    }
  });
};

Fetcher.prototype.retrieveModelsForCollectionName = function(collectionName, modelIds) {
  var modelName = this.modelUtils.getModelNameForCollectionName(collectionName);
  return this.retrieveModels(modelName, modelIds);
};

Fetcher.prototype.retrieveModels = function(modelName, modelIds) {
  return modelIds.map(function(id) {
    return this.modelStore.get(modelName, id);
  }, this);
};

Fetcher.prototype.summarize = function(modelOrCollection) {
  var summary = {},
      idAttribute;

  if (this.modelUtils.isCollection(modelOrCollection)) {
    idAttribute = modelOrCollection.model.prototype.idAttribute;
    summary = {
      collection: this.modelUtils.modelName(modelOrCollection.constructor),
      ids: modelOrCollection.pluck(idAttribute),
      params: modelOrCollection.params,
      meta: modelOrCollection.meta
    };
  } else if (this.modelUtils.isModel(modelOrCollection)) {
    summary = {
      model: this.modelUtils.modelName(modelOrCollection.constructor),
      id: modelOrCollection.id
    };
  }
  return summary;
};

Fetcher.prototype.storeResults = function(results) {
  _.each(results, function(modelOrCollection) {
    modelOrCollection.store();
  });
};

Fetcher.prototype.bootstrapData = function(modelMap, callback) {
  var results = {},
      fetcher = this;

  async.forEach(_.keys(modelMap), function(name, cb) {
    var map = modelMap[name];
    fetcher.getModelOrCollectionForSpec(map.summary, map.data, _.pick(map.summary, 'params', 'meta'), function(modelOrCollection) {
      results[name] = modelOrCollection;
      cb(null);
    });
  }, function(err) {
    if (_.isFunction(callback)) {
      callback(results);
    }
  });
};

Fetcher.prototype.hydrate = function(summaries, options, callback) {
  var results = {},
      fetcher = this;

  /**
   * Support both (summaries, options, callback)
   * and (summaries, callback).
   */
  if (arguments.length === 2) {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  async.forEach(_.keys(summaries), function(name, cb) {
    var summary = summaries[name];
    if (summary.model != null) {
      results[name] = fetcher.modelStore.get(summary.model, summary.id);

      if ((results[name] != null) && (options.app != null)) {
        results[name].app = options.app;
      }

      cb(null);

    } else if (summary.collection != null) {
      // Also support getting all models for a collection.
      fetcher.collectionStore.get(summary.collection, summary.params, function(collection) {
        if (collection == null) {
          throw new Error("Collection of type \"" + summary.collection + "\" not found for params: " + JSON.stringify(summary.params));
        }

        results[name] = collection;

        cb(null);
      });
    }
  }, function(err) {
    callback(err, results);
  });
};

Fetcher.prototype.pendingFetches = 0;

Fetcher.prototype.fetch = function(fetchSpecs, options, callback) {
  var fetcher = this;

  /**
   * Support both (fetchSpecs, options, callback)
   * and (fetchSpecs, callback).
   */
  if (arguments.length === 2) {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  // Different defaults for client v server.
  if (isServer) {
    if (options.readFromCache == null) {
      options.readFromCache = false;
    }
    if (options.writeToCache == null) {
      options.writeToCache = false;
    }
  } else {
    if (options.readFromCache == null) {
      options.readFromCache = true;
    }
    if (options.writeToCache == null) {
      options.writeToCache = true;
    }
  }

  this.pendingFetches++;
  this.trigger('fetch:start', fetchSpecs);
  this._retrieve(fetchSpecs, options, function(err, results) {
    fetcher.pendingFetches--;
    fetcher.trigger('fetch:end', fetchSpecs, err, results);
    if (err) return callback(err);
    if (options.writeToCache) {
      fetcher.storeResults(results);
    }
    callback(null, results);
  });
};

// Mixin Backbone.Events for events that work in client & server.
_.extend(Fetcher.prototype, Backbone.Events);

},{"./store/collection_store":83,"./store/model_store":85,"async":47,"backbone":75,"jquery":"EoZ3ID","underscore":87}],82:[function(require,module,exports){
/**
 * Since we make rendr files AMD friendly on app setup stage
 * we need to pretend that this code is pure commonjs
 * means no AMD-style require calls.
 */
var BaseModel = require("./base/model"),
    BaseCollection = require("./base/collection");

var typePath = {
  model: "app/models/",
  collection: "app/collections/"
};

module.exports = ModelUtils;

function ModelUtils(entryPath) {
  this.entryPath = entryPath;
  this._classMap = {};
}

ModelUtils.prototype.getModel = function(path, attrs, options, callback) {
  var Model;
  attrs = attrs || {};
  options = options || {};
  if (typeof callback == 'function') {
    this.getModelConstructor(path, function(Model) {
      callback(new Model(attrs, options));
    });
  } else {
    Model = this.getModelConstructor(path);
    return new Model(attrs, options);
  }
};

ModelUtils.prototype.getCollection = function(path, models, options, callback) {
  var Collection;
  models = models || [];
  options = options || {};
  if (typeof callback == 'function') {
    this.getCollectionConstructor(path, function(Collection) {
      callback(new Collection(models, options));
    });
  } else {
    Collection = this.getCollectionConstructor(path);
    return new Collection(models, options);
  }
};

ModelUtils.prototype.getModelConstructor = function(path, callback) {
  return this.fetchConstructor('model', path, callback);
};

ModelUtils.prototype.getCollectionConstructor = function(path, callback) {
  return this.fetchConstructor('collection', path, callback);
};

ModelUtils.prototype.getFullPath = function(type, path) {
  return this.entryPath + typePath[type] + path;
};

ModelUtils.prototype.fetchConstructor = function(type, path, callback) {
  path = this.underscorize(path);

  var fullPath = this.getFullPath(type, path);

  if (this._classMap[path]) {
    return (typeof callback == 'function') ? callback(this._classMap[path]) : this._classMap[path];
  } else if (typeof callback == 'function') {
    // Only used in AMD environment
    if (typeof define != 'undefined') {
      this._requireAMD([fullPath], callback);
    } else {
      callback(this._require(fullPath));
    }
    return;
  } else {
    return this._require(fullPath);
  }
};

ModelUtils.prototype._require = require;

ModelUtils.prototype._requireAMD = require;

ModelUtils.prototype.isModel = function(obj) {
  return obj instanceof BaseModel;
};

ModelUtils.prototype.isCollection = function(obj) {
  return obj instanceof BaseCollection;
};

ModelUtils.prototype.getModelNameForCollectionName = function(collectionName) {
  var Collection;
  Collection = this.getCollectionConstructor(collectionName);
  return this.modelName(Collection.prototype.model);
};

ModelUtils.uppercaseRe = /([A-Z])/g;

ModelUtils.prototype.underscorize = function(name) {
  if (name == null) {
    return undefined;
  }
  name = name.replace(ModelUtils.uppercaseRe, function(c) {
    return "_" + c.toLowerCase();
  });
  if (name[0] === "_") {
    name = name.slice(1);
  }
  return name;
};

/**
 * The 'name' property is added to the constructor when using a named function,
 * and it cannot be changed.  I.e.:
 *
 * function MyClass(){}
 * MyClass.name
 * -> "MyClass"
 *
 * We first look for the 'id' property of the constructor, which is compatible
 * with standard Backbone-style class inheritance.
 *
 * var MyClass = Backbone.Model.extend({});
 * MyClass.name
 * -> ""
 * MyClass.id = "MyClass"
 */
ModelUtils.prototype.modelName = function(modelOrCollectionClass) {
  return this.underscorize(modelOrCollectionClass.id || modelOrCollectionClass.name);
};

ModelUtils.prototype.modelIdAttribute = function(modelName, callback) {
  this.getModelConstructor(modelName, function(constructor) {
    callback(constructor.prototype.idAttribute);
  });
};

},{"./base/collection":77,"./base/model":78}],83:[function(require,module,exports){
var _ = require('underscore'),
    Super = require('./memory_store');

module.exports = CollectionStore;

function CollectionStore() {
  Super.apply(this, arguments);
}

_.extend(CollectionStore.prototype, Super.prototype, {
  expireSeconds: null,

  set: function(collection, params) {
    var key = this._getStoreKeyForCollection(collection, params);
    return Super.prototype.set.call(this, key, collection, this.expireSeconds);
  },

  get: function(collectionName, params, callback) {
    var self = this,
      cachedCollection;

    this.mergeParams(collectionName, params, function (mergedParams) {
      var key = self._getStoreKey(collectionName, mergedParams);
      cachedCollection = Super.prototype.get.call(self, key);

      if (_.isFunction(callback)) {
        callback(cachedCollection);
      }
    });

    return cachedCollection;
  },

  clear: function(collectionName, params) {
    if (!_.isUndefined(collectionName) && params) {
      var key = this._getStoreKey(collectionName, params);
      return Super.prototype.clear.call(this, key);      
    } else if (!_.isUndefined(collectionName) && !params) {
      var cachedItems = this._getCachedItemsByCollection(collectionName),
        self = this,
        storeKey;
       _.each(cachedItems, function (item) {
          storeKey = self._getStoreKey(collectionName, item.value.params);
          Super.prototype.clear.call(self, storeKey);
        });
    } else {
      return Super.prototype.clear.call(this, null);
    }
  },

  mergeParams: function(collectionName, params, callback) {
    this.modelUtils.getCollectionConstructor(collectionName, function(Collection) {
      var mergedParams = _.extend({}, Collection.prototype.defaultParams, params);
      callback(mergedParams);
    });
  },

  _getCachedItemsByCollection:function(collectionName) {
    var prefix = this._formatKey(this.modelUtils.underscorize(collectionName));

    return _.filter(this.cache, function(val, key) {
      return startsWith(key, prefix);
    });
  },

  _getStoreKeyForCollection: function(collection, params) {
    var collectionName = this.modelUtils.modelName(collection.constructor);

    params = params || collection.params;
    return this._getStoreKey(collectionName, params);
  },

  _getStoreKey: function(collectionName, params) {
    var underscored = this.modelUtils.underscorize(collectionName);
    return underscored + ":" + JSON.stringify(sortParams(params));
  }
});

function sortParams(params) {
  var sorted = {};
  _.chain(params).keys().sort().forEach(function(key) {
    sorted[key] = params[key];
  });
  return sorted;
}

function startsWith(string, prefix) {
  return string.slice(0, prefix.length) == prefix;
}

},{"./memory_store":84,"underscore":87}],84:[function(require,module,exports){
module.exports = MemoryStore;

function MemoryStore(options) {
  this.options = options || {};
  this.app = this.options.app;
  this.modelUtils = this.options.modelUtils;
  this.cache = {};
}

MemoryStore.prototype.cacheVersion = '';

MemoryStore.prototype.get = function(key) {
  if (!key) {
    return;
  }
  return this.validateExpiration(key, this._get(key));
};

MemoryStore.prototype.validateExpiration = function(key, data) {
  if (data && data.expires && Date.now() > data.expires) {
    if (typeof console !== "undefined") {
      console.log("MemoryStore: Expiring key \"" + key + "\".");
    }
    this.clear(key);
    data = undefined;
  } else if (data && data.value) {
    data = data.value;
  }
  return data;
};

MemoryStore.prototype.set = function(key, value, ttlSec) {
  var expires;

  if (!key || value === undefined) {
    return false;
  }
  expires = ttlSec ? Date.now() + ttlSec * 1000 : null;
  this._set(key, {
    value: value,
    expires: expires
  });
  return true;
};

MemoryStore.prototype._get = function(key) {
  return this.cache[this._formatKey(key)];
};

MemoryStore.prototype._set = function(key, data) {
  this.cache[this._formatKey(key)] = data;
};

MemoryStore.prototype._clear = function(key) {
  delete this.cache[this._formatKey(key)];
};

MemoryStore.prototype._clearAll = function() {
  this.cache = {};
};

MemoryStore.prototype.clear = function(key) {
  if (key != null) {
    return this._clear(key);
  } else {
    return this._clearAll();
  }
};

MemoryStore.prototype._versionKey = function(key) {
  return key + ":" + this.cacheVersion;
};

MemoryStore.prototype._formatKey = function(key) {
  return this._versionKey(key);
};

},{}],85:[function(require,module,exports){
var _ = require('underscore'),
    Super = require('./memory_store');

module.exports = ModelStore;

function ModelStore() {
  Super.apply(this, arguments);
}

_.extend(ModelStore.prototype, Super.prototype, {
  expireSeconds: null,

  set: function(model) {
    var key, modelName;

    modelName = this.modelUtils.modelName(model.constructor);
    if (modelName == null) {
      throw new Error('Undefined modelName for model');
    }

    key = this._getModelStoreKey(modelName, model.id);

    // Make sure we have a fully parsed model before we store the attributes
    model.parse(model.attributes);

    return Super.prototype.set.call(this, key, model, this.expireSeconds);
  },

  get: function(modelName, id) {
    var key, model;

    key = this._getModelStoreKey(modelName, id);
    return Super.prototype.get.call(this, key);
  },

  clear: function(modelName, id) {
    if (modelName && id) {
      var key = this._getModelStoreKey(modelName, id);
      return Super.prototype.clear.call(this, key);
    } else if (modelName && !id) {
      var cachedItems = this._getCachedItemsByModel(modelName),
        self = this,
        modelStoreKey;
        _.each(cachedItems, function (item) {
          modelStoreKey = self._getModelStoreKey(modelName, item.value.id);
          Super.prototype.clear.call(self, modelStoreKey);
        });
    } else {
      return Super.prototype.clear.call(this, null);
    }
  },

  find: function(modelName, params) {
    var prefix = this._formatKey(this._keyPrefix(modelName)),
      keys = Object.keys(this.cache),
      affectedKeys = keys.filter(getStartsWithFilter(prefix)),
      self = this,
      foundKey;

    foundKey = _.find(affectedKeys, function (key) {
      var cachedModel = self.cache[key].value,
        modelStoreKey = self._getModelStoreKey(modelName, cachedModel.id),
        model = Super.prototype.get.call(self, modelStoreKey);

      return model && isObjectSubset(params, model.toJSON());
    });

    if (foundKey) {
      return this.cache[foundKey].value;
    }
  },

  _getCachedItemsByModel:function(modelName) {
    var prefix = this._formatKey(this._keyPrefix(modelName));
    return _.filter(this.cache, function(val, key) {
      return startsWith(key, prefix);
    });
  },

  _formatKey: function(key) {
    return Super.prototype._formatKey.call(this, "_ms:" + key);
  },

  _keyPrefix: function(modelName) {
    return this.modelUtils.underscorize(modelName);
  },

  _getModelStoreKey: function(modelName, id) {
    return this._keyPrefix(modelName) + ":" + id;
  }
});

function getStartsWithFilter(prefix) {
  return function (string) {
    return startsWith(string, prefix);
  };
}

function startsWith(string, prefix) {
  return string.slice(0, prefix.length) == prefix;
}

function isObjectSubset(potentialSubset, objectToTest) {
  // check all the keys of the subset, and sure their values are the same in the objectToTest
  return _.all(potentialSubset, function(value, key) {
    return objectToTest[key] == value;
  });
}

},{"./memory_store":84,"underscore":87}],86:[function(require,module,exports){
/**
 * `syncer` is a collection of instance methods that are mixed into the prototypes
 * of `BaseModel` and `BaseCollection`. The purpose is to encapsulate shared logic
 * for fetching data from the API.
 */

var _ = require('underscore'),
    Backbone = require('backbone'),

    // Pull out params in path, like '/users/:id'.
    extractParamNamesRe = /:([a-z_-]+)/ig,

    methodMap = {
      'create': 'POST',
      'update': 'PUT',
      'delete': 'DELETE',
      'read': 'GET'
    },

    isServer = (typeof window === 'undefined');

if (isServer) {
  // hide it from requirejs since it's server only
  var serverOnly_qs = 'qs2';
  var qs = require(serverOnly_qs);
} else {
  var $ = window.$ || require('jquery');
  Backbone.$ = $;
}

var syncer = module.exports;

function clientSync(method, model, options) {
  var error;
  options = _.clone(options);
  if (!_.isUndefined(options.data)) options.data = _.clone(options.data);
  options.url = this.getUrl(options.url, true, options.data);
  error = options.error;
  if (error) {
    options.error = function(xhr) {
      var body = xhr.responseText,
          contentType = xhr.getResponseHeader('content-type'),
          resp;
      if (contentType && contentType.indexOf('application/json') !== -1) {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }
      resp = {
        body: body,
        status: xhr.status
      };
      error(resp);
    }
  }
  return Backbone.sync(method, model, options);
}

function serverSync(method, model, options) {
  var api, urlParts, verb, req, queryStr;

  options = _.clone(options);
  if (!_.isUndefined(options.data)) options.data = _.clone(options.data);
  options.url = this.getUrl(options.url, false, options.data);
  verb = methodMap[method];
  urlParts = options.url.split('?');
  req = this.app.req;
  queryStr = urlParts[1] || '';
  if (!_.isEmpty(options.data)) queryStr += '&' + qs.stringify(options.data);
  /**
   * if queryStr is initially an empty string, leading '&' will still get parsed correctly by qs.parse below.
   * e.g.  qs.parse('&baz=quux') => { baz: 'quux' }
   */

  api = {
    method: verb,
    path: urlParts[0],
    query: qs.parse(queryStr),
    headers: options.headers || {},
    api: _.result(this, 'api'),
    body: {}
  };

  if (verb === 'POST' || verb === 'PUT') {
    api.body = model.toJSON();
  }

  req.dataAdapter.request(req, api, function(err, response, body) {
    var resp;
    if (err) {
      resp = {
        body: body,
        // Pass through the statusCode, so lower-level code can handle i.e. 401 properly.
        status: err.status
      };

      if (options.error) {
        // This `error` has signature of $.ajax, not Backbone.sync.
        options.error(resp);
      } else {
        throw err;
      }
    } else {
      // This `success` has signature of $.ajax, not Backbone.sync.
      options.success(body);
    }
  });
}

syncer.clientSync = clientSync;
syncer.serverSync = serverSync;
syncer.sync = function sync() {
  var syncMethod = isServer ? serverSync : clientSync;
  return syncMethod.apply(this, arguments);
};

/**
 * 'model' is either a model or collection that
 * has a 'url' property, which can be a string or function.
 */
syncer.getUrl = function getUrl(url, clientPrefix, params) {
  if (clientPrefix == null) {
    clientPrefix = false;
  }
  params = params || {};
  url = url || _.result(this, 'url');
  if (clientPrefix && !~url.indexOf('://')) {
    url = this.formatClientUrl(url, _.result(this, 'api'));
  }
  return this.interpolateParams(this, url, params);
};

syncer.formatClientUrl = function(url, api) {
  var prefix = this.app.get('apiPath') || '/api';
  if (api) {
    prefix += '/' + api;
  }
  prefix += '/-';
  return prefix + url;
};

/**
 * Deeply-compare two objects to see if they differ.
 */
syncer.objectsDiffer = function objectsDiffer(data1, data2) {
  var changed = false,
      keys,
      key,
      value1,
      value2;

  keys = _.unique(_.keys(data1).concat(_.keys(data2)));
  for (var i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    value1 = data1[key];
    value2 = data2[key];

    // If attribute is an object recurse
    if (_.isObject(value1) && _.isObject(value2)) {
      changed = this.objectsDiffer(value1, value2);
    // Test for equality
    } else if (!_.isEqual(value1, value2)) {
      changed = true;
    }
  }
  return changed;
};

/**
 * This maps i.e. '/listings/:id' to '/listings/3' if
 * the model you supply has model.get('id') == 3.
 */
syncer.interpolateParams = function interpolateParams(model, url, params) {
  var matches = url.match(extractParamNamesRe);

  params = params || {};

  if (matches) {
    matches.forEach(function(param) {
      var property = param.slice(1),
          value;

      // Is collection? Then use options.
      if (model.length != null) {
        value = model.options[property];

      // Otherwise it's a model; use attrs.
      } else {
        value = model.get(property);
      }
      url = url.replace(param, value);

      /**
       * Delete the param from params hash, so we don't get urls like:
       * /v1/threads/1234?id=1234...
       */
      delete params[property];
    });
  }
  /**
   * Separate deletion of idAttribute from params hash necessary if using urlRoot in the model
   * so we don't get urls like: /v1/threads/1234?id=1234
   */
  delete params[model.idAttribute]
  return url;
};

},{"backbone":75,"jquery":"EoZ3ID","underscore":87}],87:[function(require,module,exports){
module.exports=require(64)
},{}]},{},["LentoW","rCVOCK","clZNru","IELbLo","n5JPJf","qk854H","SZ6WoB","Cu+0Ho","qnrstJ","Lkugus","WQcoKQ","pLMDjU","86KJBY","bbl2t2","rFRVhs","6kWBjj","to5G6a","T6DCWR","u40/HK","67Yhfb","ARwkjH","/O4NWC"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvYXBwLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL2NvbGxlY3Rpb25zL2Jhc2UuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvY29sbGVjdGlvbnMvcmVwb3MuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvY29sbGVjdGlvbnMvdXNlcnMuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvY29udHJvbGxlcnMvaG9tZV9jb250cm9sbGVyLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL2NvbnRyb2xsZXJzL3JlcG9zX2NvbnRyb2xsZXIuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvY29udHJvbGxlcnMvdXNlcnNfY29udHJvbGxlci5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC9saWIvaGFuZGxlYmFyc0hlbHBlcnMuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvbW9kZWxzL2Jhc2UuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvbW9kZWxzL2J1aWxkLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL21vZGVscy9yZXBvLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL21vZGVscy91c2VyLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL3JvdXRlci5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC9yb3V0ZXMuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvdGVtcGxhdGVzL2NvbXBpbGVkVGVtcGxhdGVzLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL3ZpZXdzL2Jhc2UuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9hcHAvdmlld3MvaG9tZS9pbmRleC5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC92aWV3cy9yZXBvcy9pbmRleC5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC92aWV3cy9yZXBvcy9zaG93LmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXBwL3ZpZXdzL3VzZXJfcmVwb3Nfdmlldy5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC92aWV3cy91c2Vycy9pbmRleC5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL2FwcC92aWV3cy91c2Vycy9zaG93LmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvYXNzZXRzL3ZlbmRvci9qcXVlcnktMS45LjEubWluLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL2FzeW5jL2xpYi9hc3luYy5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9pbmRleC5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci1oYW5kbGViYXJzL2xpYi9nZXRPcHRpb25zLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbGliL2dldFByb3BlcnR5LmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2JhY2tib25lL2JhY2tib25lLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci1oYW5kbGViYXJzL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvdXRpbHMuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9iYXNlL3ZpZXcuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvdW5kZXJzY29yZS91bmRlcnNjb3JlLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvc2hhcmVkL2hlbHBlcnMuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9zaGFyZWQvaGVscGVycy9lYWNoLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvc2hhcmVkL2hlbHBlcnMvZm9yRWFjaC5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci1oYW5kbGViYXJzL3NoYXJlZC9oZWxwZXJzL2pzb24uanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHItaGFuZGxlYmFycy9zaGFyZWQvaGVscGVycy9wYXJ0aWFsLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvc2hhcmVkL2hlbHBlcnMvc2VydmVyVG9DbGllbnRKc29uLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyLWhhbmRsZWJhcnMvc2hhcmVkL2hlbHBlcnMvdmlldy5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci1oYW5kbGViYXJzL3NoYXJlZC90ZW1wbGF0ZUZpbmRlci5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci9jbGllbnQvYXBwX3ZpZXcuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHIvY2xpZW50L3JvdXRlci5qcyIsIi9ob21lL2RlZWZhY3RvcmlhbC9kZXZlbG9wbWVudC9qcy9vcGVubW9uZXktcDJwLXJlbmRyL25vZGVfbW9kdWxlcy9yZW5kci9zaGFyZWQvYXBwLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9iYXNlL2NvbGxlY3Rpb24uanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHIvc2hhcmVkL2Jhc2UvbW9kZWwuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHIvc2hhcmVkL2Jhc2Uvcm91dGVyLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9mZXRjaGVyLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9tb2RlbFV0aWxzLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9zdG9yZS9jb2xsZWN0aW9uX3N0b3JlLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9zdG9yZS9tZW1vcnlfc3RvcmUuanMiLCIvaG9tZS9kZWVmYWN0b3JpYWwvZGV2ZWxvcG1lbnQvanMvb3Blbm1vbmV5LXAycC1yZW5kci9ub2RlX21vZHVsZXMvcmVuZHIvc2hhcmVkL3N0b3JlL21vZGVsX3N0b3JlLmpzIiwiL2hvbWUvZGVlZmFjdG9yaWFsL2RldmVsb3BtZW50L2pzL29wZW5tb25leS1wMnAtcmVuZHIvbm9kZV9tb2R1bGVzL3JlbmRyL3NoYXJlZC9zeW5jZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hrREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Z0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQmFzZUFwcCA9IHJlcXVpcmUoJ3JlbmRyL3NoYXJlZC9hcHAnKVxuICAsIGhhbmRsZWJhcnNIZWxwZXJzID0gcmVxdWlyZSgnLi9saWIvaGFuZGxlYmFyc0hlbHBlcnMnKTtcblxuLyoqXG4gKiBFeHRlbmQgdGhlIGBCYXNlQXBwYCBjbGFzcywgYWRkaW5nIGFueSBjdXN0b20gbWV0aG9kcyBvciBvdmVycmlkZXMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gQmFzZUFwcC5leHRlbmQoe1xuXG4gIC8qKlxuICAgKiBDbGllbnQgYW5kIHNlcnZlci5cbiAgICpcbiAgICogYGluaXRpYWxpemVgIGlzIGNhbGxlZCBvbiBhcHAgaW5pdGlhbGl6ZSwgYm90aCBvbiB0aGUgY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAqIE9uIHRoZSBzZXJ2ZXIsIGFuIGFwcCBpcyBpbnN0YW50aWF0ZWQgb25jZSBmb3IgZWFjaCByZXF1ZXN0LCBhbmQgaW4gdGhlXG4gICAqIGNsaWVudCwgaXQncyBpbnN0YW50aWF0ZWQgb25jZSBvbiBwYWdlIGxvYWQuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBnb29kIHBsYWNlIHRvIGluaXRpYWxpemUgYW55IGNvZGUgdGhhdCBuZWVkcyB0byBiZSBhdmFpbGFibGUgdG9cbiAgICogYXBwIG9uIGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIuXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBvdXIgSGFuZGxlYmFycyBoZWxwZXJzLlxuICAgICAqXG4gICAgICogYHRoaXMudGVtcGxhdGVBZGFwdGVyYCBpcywgYnkgZGVmYXVsdCwgdGhlIGByZW5kci1oYW5kbGViYXJzYCBtb2R1bGUuXG4gICAgICogSXQgaGFzIGEgYHJlZ2lzdGVySGVscGVyc2AgbWV0aG9kLCB3aGljaCBhbGxvd3MgdXMgdG8gcmVnaXN0ZXIgaGVscGVyXG4gICAgICogbW9kdWxlcyB0aGF0IGNhbiBiZSB1c2VkIG9uIGJvdGggY2xpZW50ICYgc2VydmVyLlxuICAgICAqL1xuICAgIHRoaXMudGVtcGxhdGVBZGFwdGVyLnJlZ2lzdGVySGVscGVycyhoYW5kbGViYXJzSGVscGVycyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsaWVudC1zaWRlIG9ubHkuXG4gICAqXG4gICAqIGBzdGFydGAgaXMgY2FsbGVkIGF0IHRoZSBib3R0b20gb2YgYF9fbGF5b3V0Lmhic2AuIENhbGxpbmcgdGhpcyBraWNrcyBvZmZcbiAgICogdGhlIHJvdXRlciBhbmQgaW5pdGlhbGl6ZXMgdGhlIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCAocmVtZW1iZXJpbmcgdG8gY2FsbCB0aGUgc3VwZXJjbGFzcycgYHN0YXJ0YCBtZXRob2QhKVxuICAgKiBpbiBvcmRlciB0byBkbyB0aGluZ3MgbGlrZSBiaW5kIGV2ZW50cyB0byB0aGUgcm91dGVyLCBhcyBzaG93biBiZWxvdy5cbiAgICovXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAvLyBTaG93IGEgbG9hZGluZyBpbmRpY2F0b3Igd2hlbiB0aGUgYXBwIGlzIGZldGNoaW5nLlxuICAgIHRoaXMucm91dGVyLm9uKCdhY3Rpb246c3RhcnQnLCBmdW5jdGlvbigpIHsgdGhpcy5zZXQoe2xvYWRpbmc6IHRydWV9KTsgIH0sIHRoaXMpO1xuICAgIHRoaXMucm91dGVyLm9uKCdhY3Rpb246ZW5kJywgICBmdW5jdGlvbigpIHsgdGhpcy5zZXQoe2xvYWRpbmc6IGZhbHNlfSk7IH0sIHRoaXMpO1xuXG4gICAgLy8gQ2FsbCAnc3VwZXInLlxuICAgIEJhc2VBcHAucHJvdG90eXBlLnN0YXJ0LmNhbGwodGhpcyk7XG4gIH1cbn0pO1xuIiwidmFyIFJlbmRyQmFzZSA9IHJlcXVpcmUoJ3JlbmRyL3NoYXJlZC9iYXNlL2NvbGxlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kckJhc2UuZXh0ZW5kKHt9KTtcbiIsInZhciBSZXBvID0gcmVxdWlyZSgnLi4vbW9kZWxzL3JlcG8nKVxuICAsIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlLmV4dGVuZCh7XG4gIG1vZGVsOiBSZXBvLFxuICB1cmw6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBhcmFtcy51c2VyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiAnL3VzZXJzLzp1c2VyL3JlcG9zJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcvcmVwb3NpdG9yaWVzJztcbiAgICB9XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMuaWQgPSAnUmVwb3MnO1xuIiwidmFyIFVzZXIgPSByZXF1aXJlKCcuLi9tb2RlbHMvdXNlcicpXG4gICwgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2UuZXh0ZW5kKHtcbiAgbW9kZWw6IFVzZXIsXG4gIHVybDogJy91c2Vycydcbn0pO1xubW9kdWxlLmV4cG9ydHMuaWQgPSAnVXNlcnMnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluZGV4OiBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbmRleDogZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHZhciBzcGVjID0ge1xuICAgICAgY29sbGVjdGlvbjoge2NvbGxlY3Rpb246ICdSZXBvcycsIHBhcmFtczogcGFyYW1zfVxuICAgIH07XG4gICAgdGhpcy5hcHAuZmV0Y2goc3BlYywgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNwZWMgPSB7XG4gICAgICBtb2RlbDoge21vZGVsOiAnUmVwbycsIHBhcmFtczogcGFyYW1zLCBlbnN1cmVLZXlzOiBbJ2xhbmd1YWdlJywgJ3dhdGNoZXJzX2NvdW50J119LFxuICAgICAgYnVpbGQ6IHttb2RlbDogJ0J1aWxkJywgcGFyYW1zOiBwYXJhbXN9XG4gICAgfTtcbiAgICB0aGlzLmFwcC5mZXRjaChzcGVjLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgIH0pO1xuICB9XG59O1xuIiwidmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbmRleDogZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHZhciBzcGVjID0ge1xuICAgICAgY29sbGVjdGlvbjoge2NvbGxlY3Rpb246ICdVc2VycycsIHBhcmFtczogcGFyYW1zfVxuICAgIH07XG4gICAgdGhpcy5hcHAuZmV0Y2goc3BlYywgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNwZWMgPSB7XG4gICAgICBtb2RlbDoge21vZGVsOiAnVXNlcicsIHBhcmFtczogcGFyYW1zfSxcbiAgICAgIHJlcG9zOiB7Y29sbGVjdGlvbjogJ1JlcG9zJywgcGFyYW1zOiB7dXNlcjogcGFyYW1zLmxvZ2lufX1cbiAgICB9O1xuICAgIHRoaXMuYXBwLmZldGNoKHNwZWMsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCIvKipcbiAqIFdlIGluamVjdCB0aGUgSGFuZGxlYmFycyBpbnN0YW5jZSwgYmVjYXVzZSB0aGlzIG1vZHVsZSBkb2Vzbid0IGtub3cgd2hlcmVcbiAqIHRoZSBhY3R1YWwgSGFuZGxlYmFycyBpbnN0YW5jZSB3aWxsIGNvbWUgZnJvbS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIHJldHVybiB7XG4gICAgY29weXJpZ2h0OiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhcIiZjb3B5O1wiICsgeWVhcik7XG4gICAgfVxuICB9O1xufTtcbiIsInZhciBSZW5kckJhc2UgPSByZXF1aXJlKCdyZW5kci9zaGFyZWQvYmFzZS9tb2RlbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRyQmFzZS5leHRlbmQoe30pO1xuIiwidmFyIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlLmV4dGVuZCh7XG4gIHVybDogJy9yZXBvcy86b3duZXIvOm5hbWUnLFxuICBhcGk6ICd0cmF2aXMtY2knXG59KTtcbm1vZHVsZS5leHBvcnRzLmlkID0gJ0J1aWxkJztcbiIsInZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZS5leHRlbmQoe1xuICB1cmw6ICcvcmVwb3MvOm93bmVyLzpuYW1lJyxcbiAgaWRBdHRyaWJ1dGU6ICduYW1lJ1xufSk7XG5tb2R1bGUuZXhwb3J0cy5pZCA9ICdSZXBvJztcbiIsInZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZS5leHRlbmQoe1xuICB1cmw6ICcvdXNlcnMvOmxvZ2luJyxcbiAgaWRBdHRyaWJ1dGU6ICdsb2dpbidcbn0pO1xubW9kdWxlLmV4cG9ydHMuaWQgPSAnVXNlcic7XG4iLCJ2YXIgQmFzZUNsaWVudFJvdXRlciA9IHJlcXVpcmUoJ3JlbmRyL2NsaWVudC9yb3V0ZXInKTtcblxudmFyIFJvdXRlciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUm91dGVyKG9wdGlvbnMpIHtcbiAgQmFzZUNsaWVudFJvdXRlci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBTZXQgdXAgaW5oZXJpdGFuY2UuXG4gKi9cblJvdXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VDbGllbnRSb3V0ZXIucHJvdG90eXBlKTtcblJvdXRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXNlQ2xpZW50Um91dGVyO1xuXG5Sb3V0ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbignYWN0aW9uOnN0YXJ0JywgdGhpcy50cmFja0ltcHJlc3Npb24sIHRoaXMpO1xufTtcblxuUm91dGVyLnByb3RvdHlwZS50cmFja0ltcHJlc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgaWYgKHdpbmRvdy5fZ2FxKSB7XG4gICAgX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnXSk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIG1hdGNoKCcnLCAgICAgICAgICAgICAgICAgICAnaG9tZSNpbmRleCcpO1xuICBtYXRjaCgncmVwb3MnLCAgICAgICAgICAgICAgJ3JlcG9zI2luZGV4Jyk7XG4gIG1hdGNoKCdyZXBvcy86b3duZXIvOm5hbWUnLCAncmVwb3Mjc2hvdycpO1xuICBtYXRjaCgndXNlcnMnICAgICAgICwgICAgICAgJ3VzZXJzI2luZGV4Jyk7XG4gIG1hdGNoKCd1c2Vycy86bG9naW4nLCAgICAgICAndXNlcnMjc2hvdycpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSGFuZGxlYmFycykge1xuXG52YXIgdGVtcGxhdGVzID0ge307XG5cbnRlbXBsYXRlc1tcImhvbWUvaW5kZXhcIl0gPSBIYW5kbGViYXJzLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIjxoMT5XZWNvbWUgdG8gR2l0SHViIEJyb3dzZXIhPC9oMT5cXG48cD5UaGlzIGlzIGEgbGl0dGxlIGFwcCB0aGF0IGRlbW9uc3RyYXRlcyBob3cgdG8gdXNlIFJlbmRyIGJ5IGNvbnN1bWluZyBHaXRIdWIncyBwdWJsaWMgQXBpLjwvcD5cXG48cD5DaGVjayBvdXQgPGEgaHJlZj1cXFwiL3JlcG9zXFxcIj5SZXBvczwvYT4gb3IgPGEgaHJlZj1cXFwiL3VzZXJzXFxcIj5Vc2VyczwvYT4uPC9wPlxcblxcbjxwPlRoZXJlIGhhdmUgYmVlbiBcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNvdW50IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jb3VudCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJjb3VudFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCIgcmVxdWVzdHMgdG8gdGhpcyBhcHAgaW4geW91ciBzZXNzaW9uLjwvcD5cXG5cXG48cD5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlcnMuY29weXJpZ2h0IHx8IChkZXB0aDAgJiYgZGVwdGgwLmNvcHlyaWdodCkgfHwgaGVscGVyTWlzc2luZykuY2FsbChkZXB0aDAsIFwiMjAxM1wiLCB7XCJuYW1lXCI6XCJjb3B5cmlnaHRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkpKVxuICAgICsgXCI8L3A+XFxuXCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxudGVtcGxhdGVzW1wicmVwb3MvaW5kZXhcIl0gPSBIYW5kbGViYXJzLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHZhciBzdGFjazEsIGhlbHBlciwgbGFtYmRhPXRoaXMubGFtYmRhLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3Npbmc7XG4gIHJldHVybiBcIiAgPGxpPlxcbiAgICA8YSBocmVmPVxcXCIvcmVwb3MvXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24obGFtYmRhKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm93bmVyIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5sb2dpbiA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIi9cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYT4sIGJ5IDxhIGhyZWY9XFxcIi91c2Vycy9cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbihsYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub3duZXIgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxvZ2luIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbihsYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub3duZXIgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxvZ2luIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiPC9hPlxcbiAgPC9saT5cXG5cIjtcbn0sXCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgYnVmZmVyID0gXCI8aDE+UmVwb3M8L2gxPlxcblxcbjx1bD5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubW9kZWxzIDogZGVwdGgwKSwge1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjp0aGlzLnByb2dyYW0oMSwgZGF0YSksXCJpbnZlcnNlXCI6dGhpcy5ub29wLFwiZGF0YVwiOmRhdGF9KTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiPC91bD5cXG5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG50ZW1wbGF0ZXNbXCJyZXBvcy9zaG93XCJdID0gSGFuZGxlYmFycy50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBoZWxwZXIsIGxhbWJkYT10aGlzLmxhbWJkYSwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nO1xuICByZXR1cm4gXCIgIDxicj5cXG4gIDxwPjxhIGhyZWY9XFxcImh0dHBzOi8vdHJhdmlzLWNpLm9yZy9cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbihsYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub3duZXIgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxvZ2luIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiL1wiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIi9idWlsZHMvXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24obGFtYmRhKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmJ1aWxkIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5sYXN0X2J1aWxkX2lkIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIj5MYXRlc3QgVHJhdmlzQ0kgYnVpbGQ8L2E+PC9wPlxcblwiO1xufSxcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBoZWxwZXIsIGxhbWJkYT10aGlzLmxhbWJkYSwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBidWZmZXIgPSBcIjxhIGhyZWY9XFxcIi91c2Vycy9cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbihsYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub3duZXIgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxvZ2luIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbihsYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub3duZXIgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxvZ2luIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiPC9hPiAvIFwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjxicj5cXG5cXG5cXG5cIjtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYnVpbGQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmxhc3RfYnVpbGRfaWQgOiBzdGFjazEpLCB7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjp0aGlzLnByb2dyYW0oMSwgZGF0YSksXCJpbnZlcnNlXCI6dGhpcy5ub29wLFwiZGF0YVwiOmRhdGF9KTtcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiXFxuPGgzPlN0YXRzPC9oMz5cXG48ZGl2IGNsYXNzPVxcXCJyb3ctZmx1aWRcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwic3BhbjZcXFwiPlxcbiAgICA8dGFibGUgY2xhc3M9XFxcInRhYmxlXFxcIj5cXG4gICAgICA8dHI+XFxuICAgICAgICA8dGg+RGVzY3JpcHRpb248L3RoPlxcbiAgICAgICAgPHRkPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvdGQ+XFxuICAgICAgPC90cj5cXG4gICAgICA8dHI+XFxuICAgICAgICA8dGg+TGFuZ3VhZ2U8L3RoPlxcbiAgICAgICAgPHRkPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubGFuZ3VhZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxhbmd1YWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImxhbmd1YWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvdGQ+XFxuICAgICAgPC90cj5cXG4gICAgICA8dHI+XFxuICAgICAgICA8dGg+V2F0Y2hlcnM8L3RoPlxcbiAgICAgICAgPHRkPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud2F0Y2hlcnNfY291bnQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndhdGNoZXJzX2NvdW50IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcIndhdGNoZXJzX2NvdW50XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvdGQ+XFxuICAgICAgPC90cj5cXG4gICAgICA8dHI+XFxuICAgICAgICA8dGg+Rm9ya3M8L3RoPlxcbiAgICAgICAgPHRkPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZm9ya3NfY291bnQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmZvcmtzX2NvdW50IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImZvcmtzX2NvdW50XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvdGQ+XFxuICAgICAgPC90cj5cXG4gICAgICA8dHI+XFxuICAgICAgICA8dGg+T3BlbiBJc3N1ZXM8L3RoPlxcbiAgICAgICAgPHRkPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMub3Blbl9pc3N1ZXNfY291bnQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9wZW5faXNzdWVzX2NvdW50IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcIm9wZW5faXNzdWVzX2NvdW50XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvdGQ+XFxuICAgICAgPC90cj5cXG4gICAgPC90YWJsZT5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cbnRlbXBsYXRlc1tcInVzZXJfcmVwb3Nfdmlld1wiXSA9IEhhbmRsZWJhcnMudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuICByZXR1cm4gXCIgICAgPHRyPlxcbiAgICAgIDx0ZD48YSBocmVmPVxcXCIvcmVwb3MvXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5mdWxsX25hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmZ1bGxfbmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJmdWxsX25hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+PC90ZD5cXG4gICAgICA8dGQ+XCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53YXRjaGVyc19jb3VudCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAud2F0Y2hlcnNfY291bnQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwid2F0Y2hlcnNfY291bnRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC90ZD5cXG4gICAgICA8dGQ+XCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5mb3Jrc19jb3VudCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZm9ya3NfY291bnQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiZm9ya3NfY291bnRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC90ZD5cXG4gICAgPC90cj5cXG5cIjtcbn0sXCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdmFyIHN0YWNrMSwgYnVmZmVyID0gXCI8aDM+UmVwb3M8L2gzPlxcbjx0YWJsZSBjbGFzcz1cXFwicmVwb3MtdGFibGUgdGFibGVcXFwiPlxcbiAgPHRoZWFkPlxcbiAgICA8dHI+XFxuICAgICAgPHRoPk5hbWU8L3RoPlxcbiAgICAgIDx0aD5XYXRjaGVyczwvdGg+XFxuICAgICAgPHRoPkZvcmtzPC90aD5cXG4gICAgPC90cj5cXG4gIDwvdGhlYWQ+XFxuICA8dGJvZHk+XFxuXCI7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm1vZGVscyA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDEsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIiAgPC90Ym9keT5cXG48L3RhYmxlPlxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cbnRlbXBsYXRlc1tcInVzZXJzL2luZGV4XCJdID0gSGFuZGxlYmFycy50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIiAgPGxpPlxcbiAgICA8YSBocmVmPVxcXCIvdXNlcnMvXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sb2dpbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubG9naW4gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibG9naW5cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmxvZ2luIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5sb2dpbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJsb2dpblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxuICA8L2xpPlxcblwiO1xufSxcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgc3RhY2sxLCBidWZmZXIgPSBcIjxoMT5Vc2VyczwvaDE+XFxuXFxuPHVsPlxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5tb2RlbHMgOiBkZXB0aDApLCB7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgxLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxuICByZXR1cm4gYnVmZmVyICsgXCI8L3VsPlxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cbnRlbXBsYXRlc1tcInVzZXJzL3Nob3dcIl0gPSBIYW5kbGViYXJzLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XG4gIHJldHVybiBcIjxpbWcgc3JjPVxcXCJcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmF2YXRhcl91cmwgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmF2YXRhcl91cmwgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiYXZhdGFyX3VybFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIHdpZHRoPTgwIGhlaWdodD04MD4gXCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sb2dpbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubG9naW4gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibG9naW5cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiIChcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnB1YmxpY19yZXBvcyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucHVibGljX3JlcG9zIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInB1YmxpY19yZXBvc1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCIgcHVibGljIHJlcG9zKVxcblxcbjxicj5cXG5cXG48ZGl2IGNsYXNzPVxcXCJyb3ctZmx1aWRcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwic3BhbjZcXFwiPlxcbiAgICBcIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlcnMudmlldyB8fCAoZGVwdGgwICYmIGRlcHRoMC52aWV3KSB8fCBoZWxwZXJNaXNzaW5nKS5jYWxsKGRlcHRoMCwgXCJ1c2VyX3JlcG9zX3ZpZXdcIiwge1wibmFtZVwiOlwidmlld1wiLFwiaGFzaFwiOntcbiAgICAnY29sbGVjdGlvbic6ICgoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVwb3MgOiBkZXB0aDApKVxuICB9LFwiZGF0YVwiOmRhdGF9KSkpXG4gICAgKyBcIlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJzcGFuNlxcXCI+XFxuICAgIDxoMz5JbmZvPC9oMz5cXG4gICAgPGJyPlxcbiAgICA8dGFibGUgY2xhc3M9XFxcImluZm8tdGFibGUgdGFibGVcXFwiPlxcbiAgICAgIDx0cj5cXG4gICAgICAgIDx0aD5Mb2NhdGlvbjwvdGg+XFxuICAgICAgICA8dGQ+XCJcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sb2NhdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubG9jYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibG9jYXRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC90ZD5cXG4gICAgICA8L3RyPlxcbiAgICAgIDx0cj5cXG4gICAgICAgIDx0aD5CbG9nPC90aD5cXG4gICAgICAgIDx0ZD5cIlxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmJsb2cgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmJsb2cgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwiYmxvZ1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3RkPlxcbiAgICAgIDwvdHI+XFxuICAgIDwvdGFibGU+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5yZXR1cm4gdGVtcGxhdGVzO1xuXG59OyIsInZhciBSZW5kclZpZXcgPSByZXF1aXJlKCdyZW5kci9zaGFyZWQvYmFzZS92aWV3Jyk7XG5cbi8vIENyZWF0ZSBhIGJhc2UgdmlldywgZm9yIGFkZGluZyBjb21tb24gZXh0ZW5zaW9ucyB0byBvdXJcbi8vIGFwcGxpY2F0aW9uJ3Mgdmlld3MuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRyVmlldy5leHRlbmQoe30pO1xuIiwidmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi4vYmFzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3LmV4dGVuZCh7XG4gIGNsYXNzTmFtZTogJ2hvbWVfaW5kZXhfdmlldycsXG5cbiAgZ2V0VGVtcGxhdGVEYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IHRoaXMuYXBwLmdldCgnc2Vzc2lvbicpLmNvdW50XG4gICAgfTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cy5pZCA9ICdob21lL2luZGV4JztcbiIsInZhciBCYXNlVmlldyA9IHJlcXVpcmUoJy4uL2Jhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldy5leHRlbmQoe1xuICBjbGFzc05hbWU6ICdyZXBvc19pbmRleF92aWV3J1xufSk7XG5tb2R1bGUuZXhwb3J0cy5pZCA9ICdyZXBvcy9pbmRleCc7XG4iLCJ2YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuLi9iYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXcuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lOiAncmVwb3Nfc2hvd192aWV3JyxcblxuICBnZXRUZW1wbGF0ZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gQmFzZVZpZXcucHJvdG90eXBlLmdldFRlbXBsYXRlRGF0YS5jYWxsKHRoaXMpO1xuICAgIGRhdGEuYnVpbGQgPSB0aGlzLm9wdGlvbnMuYnVpbGQudG9KU09OKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMuaWQgPSAncmVwb3Mvc2hvdyc7XG4iLCJ2YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldy5leHRlbmQoe1xuICBjbGFzc05hbWU6ICd1c2VyX3JlcG9zX3ZpZXcnXG59KTtcbm1vZHVsZS5leHBvcnRzLmlkID0gJ3VzZXJfcmVwb3Nfdmlldyc7XG4iLCJ2YXIgQmFzZVZpZXcgPSByZXF1aXJlKCcuLi9iYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXcuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lOiAndXNlcnNfaW5kZXhfdmlldydcbn0pO1xubW9kdWxlLmV4cG9ydHMuaWQgPSAndXNlcnMvaW5kZXgnO1xuIiwidmFyIEJhc2VWaWV3ID0gcmVxdWlyZSgnLi4vYmFzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3LmV4dGVuZCh7XG4gIGNsYXNzTmFtZTogJ3VzZXJzX3Nob3dfdmlldycsXG5cbiAgZ2V0VGVtcGxhdGVEYXRhOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSA9IEJhc2VWaWV3LnByb3RvdHlwZS5nZXRUZW1wbGF0ZURhdGEuY2FsbCh0aGlzKTtcbiAgICBkYXRhLnJlcG9zID0gdGhpcy5vcHRpb25zLnJlcG9zO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzLmlkID0gJ3VzZXJzL3Nob3cnO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuKGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyohIGpRdWVyeSB2MS45LjEgfCAoYykgMjAwNSwgMjAxMiBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiB8IGpxdWVyeS5vcmcvbGljZW5zZVxuKi8oZnVuY3Rpb24oZSx0KXt2YXIgbixyLGk9dHlwZW9mIHQsbz1lLmRvY3VtZW50LGE9ZS5sb2NhdGlvbixzPWUualF1ZXJ5LHU9ZS4kLGw9e30sYz1bXSxwPVwiMS45LjFcIixmPWMuY29uY2F0LGQ9Yy5wdXNoLGg9Yy5zbGljZSxnPWMuaW5kZXhPZixtPWwudG9TdHJpbmcseT1sLmhhc093blByb3BlcnR5LHY9cC50cmltLGI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IGIuZm4uaW5pdChlLHQscil9LHg9L1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlLHc9L1xcUysvZyxUPS9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxOPS9eKD86KDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sQz0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8saz0vXltcXF0sOnt9XFxzXSokLyxFPS8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZyxTPS9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1W1xcZGEtZkEtRl17NH0pL2csQT0vXCJbXlwiXFxcXFxcclxcbl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/KD86XFxkK1xcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS9nLGo9L14tbXMtLyxEPS8tKFtcXGRhLXpdKS9naSxMPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQudG9VcHBlckNhc2UoKX0sSD1mdW5jdGlvbihlKXsoby5hZGRFdmVudExpc3RlbmVyfHxcImxvYWRcIj09PWUudHlwZXx8XCJjb21wbGV0ZVwiPT09by5yZWFkeVN0YXRlKSYmKHEoKSxiLnJlYWR5KCkpfSxxPWZ1bmN0aW9uKCl7by5hZGRFdmVudExpc3RlbmVyPyhvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsSCwhMSksZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLEgsITEpKTooby5kZXRhY2hFdmVudChcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLEgpLGUuZGV0YWNoRXZlbnQoXCJvbmxvYWRcIixIKSl9O2IuZm49Yi5wcm90b3R5cGU9e2pxdWVyeTpwLGNvbnN0cnVjdG9yOmIsaW5pdDpmdW5jdGlvbihlLG4scil7dmFyIGksYTtpZighZSlyZXR1cm4gdGhpcztpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7aWYoaT1cIjxcIj09PWUuY2hhckF0KDApJiZcIj5cIj09PWUuY2hhckF0KGUubGVuZ3RoLTEpJiZlLmxlbmd0aD49Mz9bbnVsbCxlLG51bGxdOk4uZXhlYyhlKSwhaXx8IWlbMV0mJm4pcmV0dXJuIW58fG4uanF1ZXJ5PyhufHxyKS5maW5kKGUpOnRoaXMuY29uc3RydWN0b3IobikuZmluZChlKTtpZihpWzFdKXtpZihuPW4gaW5zdGFuY2VvZiBiP25bMF06bixiLm1lcmdlKHRoaXMsYi5wYXJzZUhUTUwoaVsxXSxuJiZuLm5vZGVUeXBlP24ub3duZXJEb2N1bWVudHx8bjpvLCEwKSksQy50ZXN0KGlbMV0pJiZiLmlzUGxhaW5PYmplY3QobikpZm9yKGkgaW4gbiliLmlzRnVuY3Rpb24odGhpc1tpXSk/dGhpc1tpXShuW2ldKTp0aGlzLmF0dHIoaSxuW2ldKTtyZXR1cm4gdGhpc31pZihhPW8uZ2V0RWxlbWVudEJ5SWQoaVsyXSksYSYmYS5wYXJlbnROb2RlKXtpZihhLmlkIT09aVsyXSlyZXR1cm4gci5maW5kKGUpO3RoaXMubGVuZ3RoPTEsdGhpc1swXT1hfXJldHVybiB0aGlzLmNvbnRleHQ9byx0aGlzLnNlbGVjdG9yPWUsdGhpc31yZXR1cm4gZS5ub2RlVHlwZT8odGhpcy5jb250ZXh0PXRoaXNbMF09ZSx0aGlzLmxlbmd0aD0xLHRoaXMpOmIuaXNGdW5jdGlvbihlKT9yLnJlYWR5KGUpOihlLnNlbGVjdG9yIT09dCYmKHRoaXMuc2VsZWN0b3I9ZS5zZWxlY3Rvcix0aGlzLmNvbnRleHQ9ZS5jb250ZXh0KSxiLm1ha2VBcnJheShlLHRoaXMpKX0sc2VsZWN0b3I6XCJcIixsZW5ndGg6MCxzaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RofSx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIGguY2FsbCh0aGlzKX0sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT1lP3RoaXMudG9BcnJheSgpOjA+ZT90aGlzW3RoaXMubGVuZ3RoK2VdOnRoaXNbZV19LHB1c2hTdGFjazpmdW5jdGlvbihlKXt2YXIgdD1iLm1lcmdlKHRoaXMuY29uc3RydWN0b3IoKSxlKTtyZXR1cm4gdC5wcmV2T2JqZWN0PXRoaXMsdC5jb250ZXh0PXRoaXMuY29udGV4dCx0fSxlYWNoOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGIuZWFjaCh0aGlzLGUsdCl9LHJlYWR5OmZ1bmN0aW9uKGUpe3JldHVybiBiLnJlYWR5LnByb21pc2UoKS5kb25lKGUpLHRoaXN9LHNsaWNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGguYXBwbHkodGhpcyxhcmd1bWVudHMpKX0sZmlyc3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lcSgwKX0sbGFzdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVxKC0xKX0sZXE6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5sZW5ndGgsbj0rZSsoMD5lP3Q6MCk7cmV0dXJuIHRoaXMucHVzaFN0YWNrKG4+PTAmJnQ+bj9bdGhpc1tuXV06W10pfSxtYXA6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGIubWFwKHRoaXMsZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5jYWxsKHQsbix0KX0pKX0sZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucHJldk9iamVjdHx8dGhpcy5jb25zdHJ1Y3RvcihudWxsKX0scHVzaDpkLHNvcnQ6W10uc29ydCxzcGxpY2U6W10uc3BsaWNlfSxiLmZuLmluaXQucHJvdG90eXBlPWIuZm4sYi5leHRlbmQ9Yi5mbi5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgZSxuLHIsaSxvLGEscz1hcmd1bWVudHNbMF18fHt9LHU9MSxsPWFyZ3VtZW50cy5sZW5ndGgsYz0hMTtmb3IoXCJib29sZWFuXCI9PXR5cGVvZiBzJiYoYz1zLHM9YXJndW1lbnRzWzFdfHx7fSx1PTIpLFwib2JqZWN0XCI9PXR5cGVvZiBzfHxiLmlzRnVuY3Rpb24ocyl8fChzPXt9KSxsPT09dSYmKHM9dGhpcywtLXUpO2w+dTt1KyspaWYobnVsbCE9KG89YXJndW1lbnRzW3VdKSlmb3IoaSBpbiBvKWU9c1tpXSxyPW9baV0scyE9PXImJihjJiZyJiYoYi5pc1BsYWluT2JqZWN0KHIpfHwobj1iLmlzQXJyYXkocikpKT8obj8obj0hMSxhPWUmJmIuaXNBcnJheShlKT9lOltdKTphPWUmJmIuaXNQbGFpbk9iamVjdChlKT9lOnt9LHNbaV09Yi5leHRlbmQoYyxhLHIpKTpyIT09dCYmKHNbaV09cikpO3JldHVybiBzfSxiLmV4dGVuZCh7bm9Db25mbGljdDpmdW5jdGlvbih0KXtyZXR1cm4gZS4kPT09YiYmKGUuJD11KSx0JiZlLmpRdWVyeT09PWImJihlLmpRdWVyeT1zKSxifSxpc1JlYWR5OiExLHJlYWR5V2FpdDoxLGhvbGRSZWFkeTpmdW5jdGlvbihlKXtlP2IucmVhZHlXYWl0Kys6Yi5yZWFkeSghMCl9LHJlYWR5OmZ1bmN0aW9uKGUpe2lmKGU9PT0hMD8hLS1iLnJlYWR5V2FpdDohYi5pc1JlYWR5KXtpZighby5ib2R5KXJldHVybiBzZXRUaW1lb3V0KGIucmVhZHkpO2IuaXNSZWFkeT0hMCxlIT09ITAmJi0tYi5yZWFkeVdhaXQ+MHx8KG4ucmVzb2x2ZVdpdGgobyxbYl0pLGIuZm4udHJpZ2dlciYmYihvKS50cmlnZ2VyKFwicmVhZHlcIikub2ZmKFwicmVhZHlcIikpfX0saXNGdW5jdGlvbjpmdW5jdGlvbihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PT1iLnR5cGUoZSl9LGlzQXJyYXk6QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJhcnJheVwiPT09Yi50eXBlKGUpfSxpc1dpbmRvdzpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZSYmZT09ZS53aW5kb3d9LGlzTnVtZXJpYzpmdW5jdGlvbihlKXtyZXR1cm4haXNOYU4ocGFyc2VGbG9hdChlKSkmJmlzRmluaXRlKGUpfSx0eXBlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT1lP2UrXCJcIjpcIm9iamVjdFwiPT10eXBlb2YgZXx8XCJmdW5jdGlvblwiPT10eXBlb2YgZT9sW20uY2FsbChlKV18fFwib2JqZWN0XCI6dHlwZW9mIGV9LGlzUGxhaW5PYmplY3Q6ZnVuY3Rpb24oZSl7aWYoIWV8fFwib2JqZWN0XCIhPT1iLnR5cGUoZSl8fGUubm9kZVR5cGV8fGIuaXNXaW5kb3coZSkpcmV0dXJuITE7dHJ5e2lmKGUuY29uc3RydWN0b3ImJiF5LmNhbGwoZSxcImNvbnN0cnVjdG9yXCIpJiYheS5jYWxsKGUuY29uc3RydWN0b3IucHJvdG90eXBlLFwiaXNQcm90b3R5cGVPZlwiKSlyZXR1cm4hMX1jYXRjaChuKXtyZXR1cm4hMX12YXIgcjtmb3IociBpbiBlKTtyZXR1cm4gcj09PXR8fHkuY2FsbChlLHIpfSxpc0VtcHR5T2JqZWN0OmZ1bmN0aW9uKGUpe3ZhciB0O2Zvcih0IGluIGUpcmV0dXJuITE7cmV0dXJuITB9LGVycm9yOmZ1bmN0aW9uKGUpe3Rocm93IEVycm9yKGUpfSxwYXJzZUhUTUw6ZnVuY3Rpb24oZSx0LG4pe2lmKCFlfHxcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4gbnVsbDtcImJvb2xlYW5cIj09dHlwZW9mIHQmJihuPXQsdD0hMSksdD10fHxvO3ZhciByPUMuZXhlYyhlKSxpPSFuJiZbXTtyZXR1cm4gcj9bdC5jcmVhdGVFbGVtZW50KHJbMV0pXToocj1iLmJ1aWxkRnJhZ21lbnQoW2VdLHQsaSksaSYmYihpKS5yZW1vdmUoKSxiLm1lcmdlKFtdLHIuY2hpbGROb2RlcykpfSxwYXJzZUpTT046ZnVuY3Rpb24obil7cmV0dXJuIGUuSlNPTiYmZS5KU09OLnBhcnNlP2UuSlNPTi5wYXJzZShuKTpudWxsPT09bj9uOlwic3RyaW5nXCI9PXR5cGVvZiBuJiYobj1iLnRyaW0obiksbiYmay50ZXN0KG4ucmVwbGFjZShTLFwiQFwiKS5yZXBsYWNlKEEsXCJdXCIpLnJlcGxhY2UoRSxcIlwiKSkpP0Z1bmN0aW9uKFwicmV0dXJuIFwiK24pKCk6KGIuZXJyb3IoXCJJbnZhbGlkIEpTT046IFwiK24pLHQpfSxwYXJzZVhNTDpmdW5jdGlvbihuKXt2YXIgcixpO2lmKCFufHxcInN0cmluZ1wiIT10eXBlb2YgbilyZXR1cm4gbnVsbDt0cnl7ZS5ET01QYXJzZXI/KGk9bmV3IERPTVBhcnNlcixyPWkucGFyc2VGcm9tU3RyaW5nKG4sXCJ0ZXh0L3htbFwiKSk6KHI9bmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpLHIuYXN5bmM9XCJmYWxzZVwiLHIubG9hZFhNTChuKSl9Y2F0Y2gobyl7cj10fXJldHVybiByJiZyLmRvY3VtZW50RWxlbWVudCYmIXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJzZXJlcnJvclwiKS5sZW5ndGh8fGIuZXJyb3IoXCJJbnZhbGlkIFhNTDogXCIrbikscn0sbm9vcDpmdW5jdGlvbigpe30sZ2xvYmFsRXZhbDpmdW5jdGlvbih0KXt0JiZiLnRyaW0odCkmJihlLmV4ZWNTY3JpcHR8fGZ1bmN0aW9uKHQpe2UuZXZhbC5jYWxsKGUsdCl9KSh0KX0sY2FtZWxDYXNlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlcGxhY2UoaixcIm1zLVwiKS5yZXBsYWNlKEQsTCl9LG5vZGVOYW1lOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUubm9kZU5hbWUmJmUubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXQudG9Mb3dlckNhc2UoKX0sZWFjaDpmdW5jdGlvbihlLHQsbil7dmFyIHIsaT0wLG89ZS5sZW5ndGgsYT1NKGUpO2lmKG4pe2lmKGEpe2Zvcig7bz5pO2krKylpZihyPXQuYXBwbHkoZVtpXSxuKSxyPT09ITEpYnJlYWt9ZWxzZSBmb3IoaSBpbiBlKWlmKHI9dC5hcHBseShlW2ldLG4pLHI9PT0hMSlicmVha31lbHNlIGlmKGEpe2Zvcig7bz5pO2krKylpZihyPXQuY2FsbChlW2ldLGksZVtpXSkscj09PSExKWJyZWFrfWVsc2UgZm9yKGkgaW4gZSlpZihyPXQuY2FsbChlW2ldLGksZVtpXSkscj09PSExKWJyZWFrO3JldHVybiBlfSx0cmltOnYmJiF2LmNhbGwoXCJcXHVmZWZmXFx1MDBhMFwiKT9mdW5jdGlvbihlKXtyZXR1cm4gbnVsbD09ZT9cIlwiOnYuY2FsbChlKX06ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWU/XCJcIjooZStcIlwiKS5yZXBsYWNlKFQsXCJcIil9LG1ha2VBcnJheTpmdW5jdGlvbihlLHQpe3ZhciBuPXR8fFtdO3JldHVybiBudWxsIT1lJiYoTShPYmplY3QoZSkpP2IubWVyZ2UobixcInN0cmluZ1wiPT10eXBlb2YgZT9bZV06ZSk6ZC5jYWxsKG4sZSkpLG59LGluQXJyYXk6ZnVuY3Rpb24oZSx0LG4pe3ZhciByO2lmKHQpe2lmKGcpcmV0dXJuIGcuY2FsbCh0LGUsbik7Zm9yKHI9dC5sZW5ndGgsbj1uPzA+bj9NYXRoLm1heCgwLHIrbik6bjowO3I+bjtuKyspaWYobiBpbiB0JiZ0W25dPT09ZSlyZXR1cm4gbn1yZXR1cm4tMX0sbWVyZ2U6ZnVuY3Rpb24oZSxuKXt2YXIgcj1uLmxlbmd0aCxpPWUubGVuZ3RoLG89MDtpZihcIm51bWJlclwiPT10eXBlb2Ygcilmb3IoO3I+bztvKyspZVtpKytdPW5bb107ZWxzZSB3aGlsZShuW29dIT09dCllW2krK109bltvKytdO3JldHVybiBlLmxlbmd0aD1pLGV9LGdyZXA6ZnVuY3Rpb24oZSx0LG4pe3ZhciByLGk9W10sbz0wLGE9ZS5sZW5ndGg7Zm9yKG49ISFuO2E+bztvKyspcj0hIXQoZVtvXSxvKSxuIT09ciYmaS5wdXNoKGVbb10pO3JldHVybiBpfSxtYXA6ZnVuY3Rpb24oZSx0LG4pe3ZhciByLGk9MCxvPWUubGVuZ3RoLGE9TShlKSxzPVtdO2lmKGEpZm9yKDtvPmk7aSsrKXI9dChlW2ldLGksbiksbnVsbCE9ciYmKHNbcy5sZW5ndGhdPXIpO2Vsc2UgZm9yKGkgaW4gZSlyPXQoZVtpXSxpLG4pLG51bGwhPXImJihzW3MubGVuZ3RoXT1yKTtyZXR1cm4gZi5hcHBseShbXSxzKX0sZ3VpZDoxLHByb3h5OmZ1bmN0aW9uKGUsbil7dmFyIHIsaSxvO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBuJiYobz1lW25dLG49ZSxlPW8pLGIuaXNGdW5jdGlvbihlKT8ocj1oLmNhbGwoYXJndW1lbnRzLDIpLGk9ZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseShufHx0aGlzLHIuY29uY2F0KGguY2FsbChhcmd1bWVudHMpKSl9LGkuZ3VpZD1lLmd1aWQ9ZS5ndWlkfHxiLmd1aWQrKyxpKTp0fSxhY2Nlc3M6ZnVuY3Rpb24oZSxuLHIsaSxvLGEscyl7dmFyIHU9MCxsPWUubGVuZ3RoLGM9bnVsbD09cjtpZihcIm9iamVjdFwiPT09Yi50eXBlKHIpKXtvPSEwO2Zvcih1IGluIHIpYi5hY2Nlc3MoZSxuLHUsclt1XSwhMCxhLHMpfWVsc2UgaWYoaSE9PXQmJihvPSEwLGIuaXNGdW5jdGlvbihpKXx8KHM9ITApLGMmJihzPyhuLmNhbGwoZSxpKSxuPW51bGwpOihjPW4sbj1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGMuY2FsbChiKGUpLG4pfSkpLG4pKWZvcig7bD51O3UrKyluKGVbdV0scixzP2k6aS5jYWxsKGVbdV0sdSxuKGVbdV0scikpKTtyZXR1cm4gbz9lOmM/bi5jYWxsKGUpOmw/bihlWzBdLHIpOmF9LG5vdzpmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfX0pLGIucmVhZHkucHJvbWlzZT1mdW5jdGlvbih0KXtpZighbilpZihuPWIuRGVmZXJyZWQoKSxcImNvbXBsZXRlXCI9PT1vLnJlYWR5U3RhdGUpc2V0VGltZW91dChiLnJlYWR5KTtlbHNlIGlmKG8uYWRkRXZlbnRMaXN0ZW5lcilvLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsSCwhMSksZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLEgsITEpO2Vsc2V7by5hdHRhY2hFdmVudChcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLEgpLGUuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIixIKTt2YXIgcj0hMTt0cnl7cj1udWxsPT1lLmZyYW1lRWxlbWVudCYmby5kb2N1bWVudEVsZW1lbnR9Y2F0Y2goaSl7fXImJnIuZG9TY3JvbGwmJmZ1bmN0aW9uIGEoKXtpZighYi5pc1JlYWR5KXt0cnl7ci5kb1Njcm9sbChcImxlZnRcIil9Y2F0Y2goZSl7cmV0dXJuIHNldFRpbWVvdXQoYSw1MCl9cSgpLGIucmVhZHkoKX19KCl9cmV0dXJuIG4ucHJvbWlzZSh0KX0sYi5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihlLHQpe2xbXCJbb2JqZWN0IFwiK3QrXCJdXCJdPXQudG9Mb3dlckNhc2UoKX0pO2Z1bmN0aW9uIE0oZSl7dmFyIHQ9ZS5sZW5ndGgsbj1iLnR5cGUoZSk7cmV0dXJuIGIuaXNXaW5kb3coZSk/ITE6MT09PWUubm9kZVR5cGUmJnQ/ITA6XCJhcnJheVwiPT09bnx8XCJmdW5jdGlvblwiIT09biYmKDA9PT10fHxcIm51bWJlclwiPT10eXBlb2YgdCYmdD4wJiZ0LTEgaW4gZSl9cj1iKG8pO3ZhciBfPXt9O2Z1bmN0aW9uIEYoZSl7dmFyIHQ9X1tlXT17fTtyZXR1cm4gYi5lYWNoKGUubWF0Y2godyl8fFtdLGZ1bmN0aW9uKGUsbil7dFtuXT0hMH0pLHR9Yi5DYWxsYmFja3M9ZnVuY3Rpb24oZSl7ZT1cInN0cmluZ1wiPT10eXBlb2YgZT9fW2VdfHxGKGUpOmIuZXh0ZW5kKHt9LGUpO3ZhciBuLHIsaSxvLGEscyx1PVtdLGw9IWUub25jZSYmW10sYz1mdW5jdGlvbih0KXtmb3Iocj1lLm1lbW9yeSYmdCxpPSEwLGE9c3x8MCxzPTAsbz11Lmxlbmd0aCxuPSEwO3UmJm8+YTthKyspaWYodVthXS5hcHBseSh0WzBdLHRbMV0pPT09ITEmJmUuc3RvcE9uRmFsc2Upe3I9ITE7YnJlYWt9bj0hMSx1JiYobD9sLmxlbmd0aCYmYyhsLnNoaWZ0KCkpOnI/dT1bXTpwLmRpc2FibGUoKSl9LHA9e2FkZDpmdW5jdGlvbigpe2lmKHUpe3ZhciB0PXUubGVuZ3RoOyhmdW5jdGlvbiBpKHQpe2IuZWFjaCh0LGZ1bmN0aW9uKHQsbil7dmFyIHI9Yi50eXBlKG4pO1wiZnVuY3Rpb25cIj09PXI/ZS51bmlxdWUmJnAuaGFzKG4pfHx1LnB1c2gobik6biYmbi5sZW5ndGgmJlwic3RyaW5nXCIhPT1yJiZpKG4pfSl9KShhcmd1bWVudHMpLG4/bz11Lmxlbmd0aDpyJiYocz10LGMocikpfXJldHVybiB0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdSYmYi5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihlLHQpe3ZhciByO3doaWxlKChyPWIuaW5BcnJheSh0LHUscikpPi0xKXUuc3BsaWNlKHIsMSksbiYmKG8+PXImJm8tLSxhPj1yJiZhLS0pfSksdGhpc30saGFzOmZ1bmN0aW9uKGUpe3JldHVybiBlP2IuaW5BcnJheShlLHUpPi0xOiEoIXV8fCF1Lmxlbmd0aCl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHU9W10sdGhpc30sZGlzYWJsZTpmdW5jdGlvbigpe3JldHVybiB1PWw9cj10LHRoaXN9LGRpc2FibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIXV9LGxvY2s6ZnVuY3Rpb24oKXtyZXR1cm4gbD10LHJ8fHAuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFsfSxmaXJlV2l0aDpmdW5jdGlvbihlLHQpe3JldHVybiB0PXR8fFtdLHQ9W2UsdC5zbGljZT90LnNsaWNlKCk6dF0sIXV8fGkmJiFsfHwobj9sLnB1c2godCk6Yyh0KSksdGhpc30sZmlyZTpmdW5jdGlvbigpe3JldHVybiBwLmZpcmVXaXRoKHRoaXMsYXJndW1lbnRzKSx0aGlzfSxmaXJlZDpmdW5jdGlvbigpe3JldHVybiEhaX19O3JldHVybiBwfSxiLmV4dGVuZCh7RGVmZXJyZWQ6ZnVuY3Rpb24oZSl7dmFyIHQ9W1tcInJlc29sdmVcIixcImRvbmVcIixiLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLFwicmVzb2x2ZWRcIl0sW1wicmVqZWN0XCIsXCJmYWlsXCIsYi5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxcInJlamVjdGVkXCJdLFtcIm5vdGlmeVwiLFwicHJvZ3Jlc3NcIixiLkNhbGxiYWNrcyhcIm1lbW9yeVwiKV1dLG49XCJwZW5kaW5nXCIscj17c3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm4gbn0sYWx3YXlzOmZ1bmN0aW9uKCl7cmV0dXJuIGkuZG9uZShhcmd1bWVudHMpLmZhaWwoYXJndW1lbnRzKSx0aGlzfSx0aGVuOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzO3JldHVybiBiLkRlZmVycmVkKGZ1bmN0aW9uKG4pe2IuZWFjaCh0LGZ1bmN0aW9uKHQsbyl7dmFyIGE9b1swXSxzPWIuaXNGdW5jdGlvbihlW3RdKSYmZVt0XTtpW29bMV1dKGZ1bmN0aW9uKCl7dmFyIGU9cyYmcy5hcHBseSh0aGlzLGFyZ3VtZW50cyk7ZSYmYi5pc0Z1bmN0aW9uKGUucHJvbWlzZSk/ZS5wcm9taXNlKCkuZG9uZShuLnJlc29sdmUpLmZhaWwobi5yZWplY3QpLnByb2dyZXNzKG4ubm90aWZ5KTpuW2ErXCJXaXRoXCJdKHRoaXM9PT1yP24ucHJvbWlzZSgpOnRoaXMscz9bZV06YXJndW1lbnRzKX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSxwcm9taXNlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP2IuZXh0ZW5kKGUscik6cn19LGk9e307cmV0dXJuIHIucGlwZT1yLnRoZW4sYi5lYWNoKHQsZnVuY3Rpb24oZSxvKXt2YXIgYT1vWzJdLHM9b1szXTtyW29bMV1dPWEuYWRkLHMmJmEuYWRkKGZ1bmN0aW9uKCl7bj1zfSx0WzFeZV1bMl0uZGlzYWJsZSx0WzJdWzJdLmxvY2spLGlbb1swXV09ZnVuY3Rpb24oKXtyZXR1cm4gaVtvWzBdK1wiV2l0aFwiXSh0aGlzPT09aT9yOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxpW29bMF0rXCJXaXRoXCJdPWEuZmlyZVdpdGh9KSxyLnByb21pc2UoaSksZSYmZS5jYWxsKGksaSksaX0sd2hlbjpmdW5jdGlvbihlKXt2YXIgdD0wLG49aC5jYWxsKGFyZ3VtZW50cykscj1uLmxlbmd0aCxpPTEhPT1yfHxlJiZiLmlzRnVuY3Rpb24oZS5wcm9taXNlKT9yOjAsbz0xPT09aT9lOmIuRGVmZXJyZWQoKSxhPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZnVuY3Rpb24ocil7dFtlXT10aGlzLG5bZV09YXJndW1lbnRzLmxlbmd0aD4xP2guY2FsbChhcmd1bWVudHMpOnIsbj09PXM/by5ub3RpZnlXaXRoKHQsbik6LS1pfHxvLnJlc29sdmVXaXRoKHQsbil9fSxzLHUsbDtpZihyPjEpZm9yKHM9QXJyYXkociksdT1BcnJheShyKSxsPUFycmF5KHIpO3I+dDt0Kyspblt0XSYmYi5pc0Z1bmN0aW9uKG5bdF0ucHJvbWlzZSk/blt0XS5wcm9taXNlKCkuZG9uZShhKHQsbCxuKSkuZmFpbChvLnJlamVjdCkucHJvZ3Jlc3MoYSh0LHUscykpOi0taTtyZXR1cm4gaXx8by5yZXNvbHZlV2l0aChsLG4pLG8ucHJvbWlzZSgpfX0pLGIuc3VwcG9ydD1mdW5jdGlvbigpe3ZhciB0LG4scixhLHMsdSxsLGMscCxmLGQ9by5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKGQuc2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIsXCJ0XCIpLGQuaW5uZXJIVE1MPVwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCIsbj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSxyPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWzBdLCFufHwhcnx8IW4ubGVuZ3RoKXJldHVybnt9O3M9by5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpLGw9cy5hcHBlbmRDaGlsZChvLmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikpLGE9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdLHIuc3R5bGUuY3NzVGV4dD1cInRvcDoxcHg7ZmxvYXQ6bGVmdDtvcGFjaXR5Oi41XCIsdD17Z2V0U2V0QXR0cmlidXRlOlwidFwiIT09ZC5jbGFzc05hbWUsbGVhZGluZ1doaXRlc3BhY2U6Mz09PWQuZmlyc3RDaGlsZC5ub2RlVHlwZSx0Ym9keTohZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRib2R5XCIpLmxlbmd0aCxodG1sU2VyaWFsaXplOiEhZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIikubGVuZ3RoLHN0eWxlOi90b3AvLnRlc3Qoci5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSksaHJlZk5vcm1hbGl6ZWQ6XCIvYVwiPT09ci5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLG9wYWNpdHk6L14wLjUvLnRlc3Qoci5zdHlsZS5vcGFjaXR5KSxjc3NGbG9hdDohIXIuc3R5bGUuY3NzRmxvYXQsY2hlY2tPbjohIWEudmFsdWUsb3B0U2VsZWN0ZWQ6bC5zZWxlY3RlZCxlbmN0eXBlOiEhby5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKS5lbmN0eXBlLGh0bWw1Q2xvbmU6XCI8Om5hdj48LzpuYXY+XCIhPT1vLmNyZWF0ZUVsZW1lbnQoXCJuYXZcIikuY2xvbmVOb2RlKCEwKS5vdXRlckhUTUwsYm94TW9kZWw6XCJDU1MxQ29tcGF0XCI9PT1vLmNvbXBhdE1vZGUsZGVsZXRlRXhwYW5kbzohMCxub0Nsb25lRXZlbnQ6ITAsaW5saW5lQmxvY2tOZWVkc0xheW91dDohMSxzaHJpbmtXcmFwQmxvY2tzOiExLHJlbGlhYmxlTWFyZ2luUmlnaHQ6ITAsYm94U2l6aW5nUmVsaWFibGU6ITAscGl4ZWxQb3NpdGlvbjohMX0sYS5jaGVja2VkPSEwLHQubm9DbG9uZUNoZWNrZWQ9YS5jbG9uZU5vZGUoITApLmNoZWNrZWQscy5kaXNhYmxlZD0hMCx0Lm9wdERpc2FibGVkPSFsLmRpc2FibGVkO3RyeXtkZWxldGUgZC50ZXN0fWNhdGNoKGgpe3QuZGVsZXRlRXhwYW5kbz0hMX1hPW8uY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGEuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiKSx0LmlucHV0PVwiXCI9PT1hLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpLGEudmFsdWU9XCJ0XCIsYS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJyYWRpb1wiKSx0LnJhZGlvVmFsdWU9XCJ0XCI9PT1hLnZhbHVlLGEuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLFwidFwiKSxhLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcInRcIiksdT1vLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSx1LmFwcGVuZENoaWxkKGEpLHQuYXBwZW5kQ2hlY2tlZD1hLmNoZWNrZWQsdC5jaGVja0Nsb25lPXUuY2xvbmVOb2RlKCEwKS5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5jaGVja2VkLGQuYXR0YWNoRXZlbnQmJihkLmF0dGFjaEV2ZW50KFwib25jbGlja1wiLGZ1bmN0aW9uKCl7dC5ub0Nsb25lRXZlbnQ9ITF9KSxkLmNsb25lTm9kZSghMCkuY2xpY2soKSk7Zm9yKGYgaW57c3VibWl0OiEwLGNoYW5nZTohMCxmb2N1c2luOiEwfSlkLnNldEF0dHJpYnV0ZShjPVwib25cIitmLFwidFwiKSx0W2YrXCJCdWJibGVzXCJdPWMgaW4gZXx8ZC5hdHRyaWJ1dGVzW2NdLmV4cGFuZG89PT0hMTtyZXR1cm4gZC5zdHlsZS5iYWNrZ3JvdW5kQ2xpcD1cImNvbnRlbnQtYm94XCIsZC5jbG9uZU5vZGUoITApLnN0eWxlLmJhY2tncm91bmRDbGlwPVwiXCIsdC5jbGVhckNsb25lU3R5bGU9XCJjb250ZW50LWJveFwiPT09ZC5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCxiKGZ1bmN0aW9uKCl7dmFyIG4scixhLHM9XCJwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDstd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7XCIsdT1vLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTt1JiYobj1vLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksbi5zdHlsZS5jc3NUZXh0PVwiYm9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0Oi05OTk5cHg7bWFyZ2luLXRvcDoxcHhcIix1LmFwcGVuZENoaWxkKG4pLmFwcGVuZENoaWxkKGQpLGQuaW5uZXJIVE1MPVwiPHRhYmxlPjx0cj48dGQ+PC90ZD48dGQ+dDwvdGQ+PC90cj48L3RhYmxlPlwiLGE9ZC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpLGFbMF0uc3R5bGUuY3NzVGV4dD1cInBhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtkaXNwbGF5Om5vbmVcIixwPTA9PT1hWzBdLm9mZnNldEhlaWdodCxhWzBdLnN0eWxlLmRpc3BsYXk9XCJcIixhWzFdLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdC5yZWxpYWJsZUhpZGRlbk9mZnNldHM9cCYmMD09PWFbMF0ub2Zmc2V0SGVpZ2h0LGQuaW5uZXJIVE1MPVwiXCIsZC5zdHlsZS5jc3NUZXh0PVwiYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6MXB4O2JvcmRlcjoxcHg7ZGlzcGxheTpibG9jazt3aWR0aDo0cHg7bWFyZ2luLXRvcDoxJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MSU7XCIsdC5ib3hTaXppbmc9ND09PWQub2Zmc2V0V2lkdGgsdC5kb2VzTm90SW5jbHVkZU1hcmdpbkluQm9keU9mZnNldD0xIT09dS5vZmZzZXRUb3AsZS5nZXRDb21wdXRlZFN0eWxlJiYodC5waXhlbFBvc2l0aW9uPVwiMSVcIiE9PShlLmdldENvbXB1dGVkU3R5bGUoZCxudWxsKXx8e30pLnRvcCx0LmJveFNpemluZ1JlbGlhYmxlPVwiNHB4XCI9PT0oZS5nZXRDb21wdXRlZFN0eWxlKGQsbnVsbCl8fHt3aWR0aDpcIjRweFwifSkud2lkdGgscj1kLmFwcGVuZENoaWxkKG8uY3JlYXRlRWxlbWVudChcImRpdlwiKSksci5zdHlsZS5jc3NUZXh0PWQuc3R5bGUuY3NzVGV4dD1zLHIuc3R5bGUubWFyZ2luUmlnaHQ9ci5zdHlsZS53aWR0aD1cIjBcIixkLnN0eWxlLndpZHRoPVwiMXB4XCIsdC5yZWxpYWJsZU1hcmdpblJpZ2h0PSFwYXJzZUZsb2F0KChlLmdldENvbXB1dGVkU3R5bGUocixudWxsKXx8e30pLm1hcmdpblJpZ2h0KSksdHlwZW9mIGQuc3R5bGUuem9vbSE9PWkmJihkLmlubmVySFRNTD1cIlwiLGQuc3R5bGUuY3NzVGV4dD1zK1wid2lkdGg6MXB4O3BhZGRpbmc6MXB4O2Rpc3BsYXk6aW5saW5lO3pvb206MVwiLHQuaW5saW5lQmxvY2tOZWVkc0xheW91dD0zPT09ZC5vZmZzZXRXaWR0aCxkLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLGQuaW5uZXJIVE1MPVwiPGRpdj48L2Rpdj5cIixkLmZpcnN0Q2hpbGQuc3R5bGUud2lkdGg9XCI1cHhcIix0LnNocmlua1dyYXBCbG9ja3M9MyE9PWQub2Zmc2V0V2lkdGgsdC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0JiYodS5zdHlsZS56b29tPTEpKSx1LnJlbW92ZUNoaWxkKG4pLG49ZD1hPXI9bnVsbCl9KSxuPXM9dT1sPXI9YT1udWxsLHR9KCk7dmFyIE89Lyg/Olxce1tcXHNcXFNdKlxcfXxcXFtbXFxzXFxTXSpcXF0pJC8sQj0vKFtBLVpdKS9nO2Z1bmN0aW9uIFAoZSxuLHIsaSl7aWYoYi5hY2NlcHREYXRhKGUpKXt2YXIgbyxhLHM9Yi5leHBhbmRvLHU9XCJzdHJpbmdcIj09dHlwZW9mIG4sbD1lLm5vZGVUeXBlLHA9bD9iLmNhY2hlOmUsZj1sP2Vbc106ZVtzXSYmcztpZihmJiZwW2ZdJiYoaXx8cFtmXS5kYXRhKXx8IXV8fHIhPT10KXJldHVybiBmfHwobD9lW3NdPWY9Yy5wb3AoKXx8Yi5ndWlkKys6Zj1zKSxwW2ZdfHwocFtmXT17fSxsfHwocFtmXS50b0pTT049Yi5ub29wKSksKFwib2JqZWN0XCI9PXR5cGVvZiBufHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKSYmKGk/cFtmXT1iLmV4dGVuZChwW2ZdLG4pOnBbZl0uZGF0YT1iLmV4dGVuZChwW2ZdLmRhdGEsbikpLG89cFtmXSxpfHwoby5kYXRhfHwoby5kYXRhPXt9KSxvPW8uZGF0YSksciE9PXQmJihvW2IuY2FtZWxDYXNlKG4pXT1yKSx1PyhhPW9bbl0sbnVsbD09YSYmKGE9b1tiLmNhbWVsQ2FzZShuKV0pKTphPW8sYX19ZnVuY3Rpb24gUihlLHQsbil7aWYoYi5hY2NlcHREYXRhKGUpKXt2YXIgcixpLG8sYT1lLm5vZGVUeXBlLHM9YT9iLmNhY2hlOmUsdT1hP2VbYi5leHBhbmRvXTpiLmV4cGFuZG87aWYoc1t1XSl7aWYodCYmKG89bj9zW3VdOnNbdV0uZGF0YSkpe2IuaXNBcnJheSh0KT90PXQuY29uY2F0KGIubWFwKHQsYi5jYW1lbENhc2UpKTp0IGluIG8/dD1bdF06KHQ9Yi5jYW1lbENhc2UodCksdD10IGluIG8/W3RdOnQuc3BsaXQoXCIgXCIpKTtmb3Iocj0wLGk9dC5sZW5ndGg7aT5yO3IrKylkZWxldGUgb1t0W3JdXTtpZighKG4/JDpiLmlzRW1wdHlPYmplY3QpKG8pKXJldHVybn0obnx8KGRlbGV0ZSBzW3VdLmRhdGEsJChzW3VdKSkpJiYoYT9iLmNsZWFuRGF0YShbZV0sITApOmIuc3VwcG9ydC5kZWxldGVFeHBhbmRvfHxzIT1zLndpbmRvdz9kZWxldGUgc1t1XTpzW3VdPW51bGwpfX19Yi5leHRlbmQoe2NhY2hlOnt9LGV4cGFuZG86XCJqUXVlcnlcIisocCtNYXRoLnJhbmRvbSgpKS5yZXBsYWNlKC9cXEQvZyxcIlwiKSxub0RhdGE6e2VtYmVkOiEwLG9iamVjdDpcImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiLGFwcGxldDohMH0saGFzRGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gZT1lLm5vZGVUeXBlP2IuY2FjaGVbZVtiLmV4cGFuZG9dXTplW2IuZXhwYW5kb10sISFlJiYhJChlKX0sZGF0YTpmdW5jdGlvbihlLHQsbil7cmV0dXJuIFAoZSx0LG4pfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIFIoZSx0KX0sX2RhdGE6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBQKGUsdCxuLCEwKX0sX3JlbW92ZURhdGE6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gUihlLHQsITApfSxhY2NlcHREYXRhOmZ1bmN0aW9uKGUpe2lmKGUubm9kZVR5cGUmJjEhPT1lLm5vZGVUeXBlJiY5IT09ZS5ub2RlVHlwZSlyZXR1cm4hMTt2YXIgdD1lLm5vZGVOYW1lJiZiLm5vRGF0YVtlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldO3JldHVybiF0fHx0IT09ITAmJmUuZ2V0QXR0cmlidXRlKFwiY2xhc3NpZFwiKT09PXR9fSksYi5mbi5leHRlbmQoe2RhdGE6ZnVuY3Rpb24oZSxuKXt2YXIgcixpLG89dGhpc1swXSxhPTAscz1udWxsO2lmKGU9PT10KXtpZih0aGlzLmxlbmd0aCYmKHM9Yi5kYXRhKG8pLDE9PT1vLm5vZGVUeXBlJiYhYi5fZGF0YShvLFwicGFyc2VkQXR0cnNcIikpKXtmb3Iocj1vLmF0dHJpYnV0ZXM7ci5sZW5ndGg+YTthKyspaT1yW2FdLm5hbWUsaS5pbmRleE9mKFwiZGF0YS1cIil8fChpPWIuY2FtZWxDYXNlKGkuc2xpY2UoNSkpLFcobyxpLHNbaV0pKTtiLl9kYXRhKG8sXCJwYXJzZWRBdHRyc1wiLCEwKX1yZXR1cm4gc31yZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZT90aGlzLmVhY2goZnVuY3Rpb24oKXtiLmRhdGEodGhpcyxlKX0pOmIuYWNjZXNzKHRoaXMsZnVuY3Rpb24obil7cmV0dXJuIG49PT10P28/VyhvLGUsYi5kYXRhKG8sZSkpOm51bGw6KHRoaXMuZWFjaChmdW5jdGlvbigpe2IuZGF0YSh0aGlzLGUsbil9KSx0KX0sbnVsbCxuLGFyZ3VtZW50cy5sZW5ndGg+MSxudWxsLCEwKX0scmVtb3ZlRGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7Yi5yZW1vdmVEYXRhKHRoaXMsZSl9KX19KTtmdW5jdGlvbiBXKGUsbixyKXtpZihyPT09dCYmMT09PWUubm9kZVR5cGUpe3ZhciBpPVwiZGF0YS1cIituLnJlcGxhY2UoQixcIi0kMVwiKS50b0xvd2VyQ2FzZSgpO2lmKHI9ZS5nZXRBdHRyaWJ1dGUoaSksXCJzdHJpbmdcIj09dHlwZW9mIHIpe3RyeXtyPVwidHJ1ZVwiPT09cj8hMDpcImZhbHNlXCI9PT1yPyExOlwibnVsbFwiPT09cj9udWxsOityK1wiXCI9PT1yPytyOk8udGVzdChyKT9iLnBhcnNlSlNPTihyKTpyfWNhdGNoKG8pe31iLmRhdGEoZSxuLHIpfWVsc2Ugcj10fXJldHVybiByfWZ1bmN0aW9uICQoZSl7dmFyIHQ7Zm9yKHQgaW4gZSlpZigoXCJkYXRhXCIhPT10fHwhYi5pc0VtcHR5T2JqZWN0KGVbdF0pKSYmXCJ0b0pTT05cIiE9PXQpcmV0dXJuITE7cmV0dXJuITB9Yi5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGUsbixyKXt2YXIgaTtyZXR1cm4gZT8obj0obnx8XCJmeFwiKStcInF1ZXVlXCIsaT1iLl9kYXRhKGUsbiksciYmKCFpfHxiLmlzQXJyYXkocik/aT1iLl9kYXRhKGUsbixiLm1ha2VBcnJheShyKSk6aS5wdXNoKHIpKSxpfHxbXSk6dH0sZGVxdWV1ZTpmdW5jdGlvbihlLHQpe3Q9dHx8XCJmeFwiO3ZhciBuPWIucXVldWUoZSx0KSxyPW4ubGVuZ3RoLGk9bi5zaGlmdCgpLG89Yi5fcXVldWVIb29rcyhlLHQpLGE9ZnVuY3Rpb24oKXtiLmRlcXVldWUoZSx0KX07XCJpbnByb2dyZXNzXCI9PT1pJiYoaT1uLnNoaWZ0KCksci0tKSxvLmN1cj1pLGkmJihcImZ4XCI9PT10JiZuLnVuc2hpZnQoXCJpbnByb2dyZXNzXCIpLGRlbGV0ZSBvLnN0b3AsaS5jYWxsKGUsYSxvKSksIXImJm8mJm8uZW1wdHkuZmlyZSgpfSxfcXVldWVIb29rczpmdW5jdGlvbihlLHQpe3ZhciBuPXQrXCJxdWV1ZUhvb2tzXCI7cmV0dXJuIGIuX2RhdGEoZSxuKXx8Yi5fZGF0YShlLG4se2VtcHR5OmIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCl7Yi5fcmVtb3ZlRGF0YShlLHQrXCJxdWV1ZVwiKSxiLl9yZW1vdmVEYXRhKGUsbil9KX0pfX0pLGIuZm4uZXh0ZW5kKHtxdWV1ZTpmdW5jdGlvbihlLG4pe3ZhciByPTI7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIGUmJihuPWUsZT1cImZ4XCIsci0tKSxyPmFyZ3VtZW50cy5sZW5ndGg/Yi5xdWV1ZSh0aGlzWzBdLGUpOm49PT10P3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9Yi5xdWV1ZSh0aGlzLGUsbik7Yi5fcXVldWVIb29rcyh0aGlzLGUpLFwiZnhcIj09PWUmJlwiaW5wcm9ncmVzc1wiIT09dFswXSYmYi5kZXF1ZXVlKHRoaXMsZSl9KX0sZGVxdWV1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7Yi5kZXF1ZXVlKHRoaXMsZSl9KX0sZGVsYXk6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT1iLmZ4P2IuZnguc3BlZWRzW2VdfHxlOmUsdD10fHxcImZ4XCIsdGhpcy5xdWV1ZSh0LGZ1bmN0aW9uKHQsbil7dmFyIHI9c2V0VGltZW91dCh0LGUpO24uc3RvcD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChyKX19KX0sY2xlYXJRdWV1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5xdWV1ZShlfHxcImZ4XCIsW10pfSxwcm9taXNlOmZ1bmN0aW9uKGUsbil7dmFyIHIsaT0xLG89Yi5EZWZlcnJlZCgpLGE9dGhpcyxzPXRoaXMubGVuZ3RoLHU9ZnVuY3Rpb24oKXstLWl8fG8ucmVzb2x2ZVdpdGgoYSxbYV0pfTtcInN0cmluZ1wiIT10eXBlb2YgZSYmKG49ZSxlPXQpLGU9ZXx8XCJmeFwiO3doaWxlKHMtLSlyPWIuX2RhdGEoYVtzXSxlK1wicXVldWVIb29rc1wiKSxyJiZyLmVtcHR5JiYoaSsrLHIuZW1wdHkuYWRkKHUpKTtyZXR1cm4gdSgpLG8ucHJvbWlzZShuKX19KTt2YXIgSSx6LFg9L1tcXHRcXHJcXG5dL2csVT0vXFxyL2csVj0vXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b258b2JqZWN0KSQvaSxZPS9eKD86YXxhcmVhKSQvaSxKPS9eKD86Y2hlY2tlZHxzZWxlY3RlZHxhdXRvZm9jdXN8YXV0b3BsYXl8YXN5bmN8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWQpJC9pLEc9L14oPzpjaGVja2VkfHNlbGVjdGVkKSQvaSxRPWIuc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUsSz1iLnN1cHBvcnQuaW5wdXQ7Yi5mbi5leHRlbmQoe2F0dHI6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYi5hY2Nlc3ModGhpcyxiLmF0dHIsZSx0LGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2IucmVtb3ZlQXR0cih0aGlzLGUpfSl9LHByb3A6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYi5hY2Nlc3ModGhpcyxiLnByb3AsZSx0LGFyZ3VtZW50cy5sZW5ndGg+MSl9LHJlbW92ZVByb3A6ZnVuY3Rpb24oZSl7cmV0dXJuIGU9Yi5wcm9wRml4W2VdfHxlLHRoaXMuZWFjaChmdW5jdGlvbigpe3RyeXt0aGlzW2VdPXQsZGVsZXRlIHRoaXNbZV19Y2F0Y2gobil7fX0pfSxhZGRDbGFzczpmdW5jdGlvbihlKXt2YXIgdCxuLHIsaSxvLGE9MCxzPXRoaXMubGVuZ3RoLHU9XCJzdHJpbmdcIj09dHlwZW9mIGUmJmU7aWYoYi5pc0Z1bmN0aW9uKGUpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24odCl7Yih0aGlzKS5hZGRDbGFzcyhlLmNhbGwodGhpcyx0LHRoaXMuY2xhc3NOYW1lKSl9KTtpZih1KWZvcih0PShlfHxcIlwiKS5tYXRjaCh3KXx8W107cz5hO2ErKylpZihuPXRoaXNbYV0scj0xPT09bi5ub2RlVHlwZSYmKG4uY2xhc3NOYW1lPyhcIiBcIituLmNsYXNzTmFtZStcIiBcIikucmVwbGFjZShYLFwiIFwiKTpcIiBcIikpe289MDt3aGlsZShpPXRbbysrXSkwPnIuaW5kZXhPZihcIiBcIitpK1wiIFwiKSYmKHIrPWkrXCIgXCIpO24uY2xhc3NOYW1lPWIudHJpbShyKX1yZXR1cm4gdGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSl7dmFyIHQsbixyLGksbyxhPTAscz10aGlzLmxlbmd0aCx1PTA9PT1hcmd1bWVudHMubGVuZ3RofHxcInN0cmluZ1wiPT10eXBlb2YgZSYmZTtpZihiLmlzRnVuY3Rpb24oZSkpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbih0KXtiKHRoaXMpLnJlbW92ZUNsYXNzKGUuY2FsbCh0aGlzLHQsdGhpcy5jbGFzc05hbWUpKX0pO2lmKHUpZm9yKHQ9KGV8fFwiXCIpLm1hdGNoKHcpfHxbXTtzPmE7YSsrKWlmKG49dGhpc1thXSxyPTE9PT1uLm5vZGVUeXBlJiYobi5jbGFzc05hbWU/KFwiIFwiK24uY2xhc3NOYW1lK1wiIFwiKS5yZXBsYWNlKFgsXCIgXCIpOlwiXCIpKXtvPTA7d2hpbGUoaT10W28rK10pd2hpbGUoci5pbmRleE9mKFwiIFwiK2krXCIgXCIpPj0wKXI9ci5yZXBsYWNlKFwiIFwiK2krXCIgXCIsXCIgXCIpO24uY2xhc3NOYW1lPWU/Yi50cmltKHIpOlwiXCJ9cmV0dXJuIHRoaXN9LHRvZ2dsZUNsYXNzOmZ1bmN0aW9uKGUsdCl7dmFyIG49dHlwZW9mIGUscj1cImJvb2xlYW5cIj09dHlwZW9mIHQ7cmV0dXJuIGIuaXNGdW5jdGlvbihlKT90aGlzLmVhY2goZnVuY3Rpb24obil7Yih0aGlzKS50b2dnbGVDbGFzcyhlLmNhbGwodGhpcyxuLHRoaXMuY2xhc3NOYW1lLHQpLHQpfSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7aWYoXCJzdHJpbmdcIj09PW4pe3ZhciBvLGE9MCxzPWIodGhpcyksdT10LGw9ZS5tYXRjaCh3KXx8W107d2hpbGUobz1sW2ErK10pdT1yP3U6IXMuaGFzQ2xhc3Mobyksc1t1P1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKG8pfWVsc2Uobj09PWl8fFwiYm9vbGVhblwiPT09bikmJih0aGlzLmNsYXNzTmFtZSYmYi5fZGF0YSh0aGlzLFwiX19jbGFzc05hbWVfX1wiLHRoaXMuY2xhc3NOYW1lKSx0aGlzLmNsYXNzTmFtZT10aGlzLmNsYXNzTmFtZXx8ZT09PSExP1wiXCI6Yi5fZGF0YSh0aGlzLFwiX19jbGFzc05hbWVfX1wiKXx8XCJcIil9KX0saGFzQ2xhc3M6ZnVuY3Rpb24oZSl7dmFyIHQ9XCIgXCIrZStcIiBcIixuPTAscj10aGlzLmxlbmd0aDtmb3IoO3I+bjtuKyspaWYoMT09PXRoaXNbbl0ubm9kZVR5cGUmJihcIiBcIit0aGlzW25dLmNsYXNzTmFtZStcIiBcIikucmVwbGFjZShYLFwiIFwiKS5pbmRleE9mKHQpPj0wKXJldHVybiEwO3JldHVybiExfSx2YWw6ZnVuY3Rpb24oZSl7dmFyIG4scixpLG89dGhpc1swXTt7aWYoYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gaT1iLmlzRnVuY3Rpb24oZSksdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe3ZhciBvLGE9Yih0aGlzKTsxPT09dGhpcy5ub2RlVHlwZSYmKG89aT9lLmNhbGwodGhpcyxuLGEudmFsKCkpOmUsbnVsbD09bz9vPVwiXCI6XCJudW1iZXJcIj09dHlwZW9mIG8/bys9XCJcIjpiLmlzQXJyYXkobykmJihvPWIubWFwKG8sZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PWU/XCJcIjplK1wiXCJ9KSkscj1iLnZhbEhvb2tzW3RoaXMudHlwZV18fGIudmFsSG9va3NbdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSxyJiZcInNldFwiaW4gciYmci5zZXQodGhpcyxvLFwidmFsdWVcIikhPT10fHwodGhpcy52YWx1ZT1vKSl9KTtpZihvKXJldHVybiByPWIudmFsSG9va3Nbby50eXBlXXx8Yi52YWxIb29rc1tvLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldLHImJlwiZ2V0XCJpbiByJiYobj1yLmdldChvLFwidmFsdWVcIikpIT09dD9uOihuPW8udmFsdWUsXCJzdHJpbmdcIj09dHlwZW9mIG4/bi5yZXBsYWNlKFUsXCJcIik6bnVsbD09bj9cIlwiOm4pfX19KSxiLmV4dGVuZCh7dmFsSG9va3M6e29wdGlvbjp7Z2V0OmZ1bmN0aW9uKGUpe3ZhciB0PWUuYXR0cmlidXRlcy52YWx1ZTtyZXR1cm4hdHx8dC5zcGVjaWZpZWQ/ZS52YWx1ZTplLnRleHR9fSxzZWxlY3Q6e2dldDpmdW5jdGlvbihlKXt2YXIgdCxuLHI9ZS5vcHRpb25zLGk9ZS5zZWxlY3RlZEluZGV4LG89XCJzZWxlY3Qtb25lXCI9PT1lLnR5cGV8fDA+aSxhPW8/bnVsbDpbXSxzPW8/aSsxOnIubGVuZ3RoLHU9MD5pP3M6bz9pOjA7Zm9yKDtzPnU7dSsrKWlmKG49clt1XSwhKCFuLnNlbGVjdGVkJiZ1IT09aXx8KGIuc3VwcG9ydC5vcHREaXNhYmxlZD9uLmRpc2FibGVkOm51bGwhPT1uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpKXx8bi5wYXJlbnROb2RlLmRpc2FibGVkJiZiLm5vZGVOYW1lKG4ucGFyZW50Tm9kZSxcIm9wdGdyb3VwXCIpKSl7aWYodD1iKG4pLnZhbCgpLG8pcmV0dXJuIHQ7YS5wdXNoKHQpfXJldHVybiBhfSxzZXQ6ZnVuY3Rpb24oZSx0KXt2YXIgbj1iLm1ha2VBcnJheSh0KTtyZXR1cm4gYihlKS5maW5kKFwib3B0aW9uXCIpLmVhY2goZnVuY3Rpb24oKXt0aGlzLnNlbGVjdGVkPWIuaW5BcnJheShiKHRoaXMpLnZhbCgpLG4pPj0wfSksbi5sZW5ndGh8fChlLnNlbGVjdGVkSW5kZXg9LTEpLG59fX0sYXR0cjpmdW5jdGlvbihlLG4scil7dmFyIG8sYSxzLHU9ZS5ub2RlVHlwZTtpZihlJiYzIT09dSYmOCE9PXUmJjIhPT11KXJldHVybiB0eXBlb2YgZS5nZXRBdHRyaWJ1dGU9PT1pP2IucHJvcChlLG4scik6KGE9MSE9PXV8fCFiLmlzWE1MRG9jKGUpLGEmJihuPW4udG9Mb3dlckNhc2UoKSxvPWIuYXR0ckhvb2tzW25dfHwoSi50ZXN0KG4pP3o6SSkpLHI9PT10P28mJmEmJlwiZ2V0XCJpbiBvJiZudWxsIT09KHM9by5nZXQoZSxuKSk/czoodHlwZW9mIGUuZ2V0QXR0cmlidXRlIT09aSYmKHM9ZS5nZXRBdHRyaWJ1dGUobikpLG51bGw9PXM/dDpzKTpudWxsIT09cj9vJiZhJiZcInNldFwiaW4gbyYmKHM9by5zZXQoZSxyLG4pKSE9PXQ/czooZS5zZXRBdHRyaWJ1dGUobixyK1wiXCIpLHIpOihiLnJlbW92ZUF0dHIoZSxuKSx0KSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oZSx0KXt2YXIgbixyLGk9MCxvPXQmJnQubWF0Y2godyk7aWYobyYmMT09PWUubm9kZVR5cGUpd2hpbGUobj1vW2krK10pcj1iLnByb3BGaXhbbl18fG4sSi50ZXN0KG4pPyFRJiZHLnRlc3Qobik/ZVtiLmNhbWVsQ2FzZShcImRlZmF1bHQtXCIrbildPWVbcl09ITE6ZVtyXT0hMTpiLmF0dHIoZSxuLFwiXCIpLGUucmVtb3ZlQXR0cmlidXRlKFE/bjpyKX0sYXR0ckhvb2tzOnt0eXBlOntzZXQ6ZnVuY3Rpb24oZSx0KXtpZighYi5zdXBwb3J0LnJhZGlvVmFsdWUmJlwicmFkaW9cIj09PXQmJmIubm9kZU5hbWUoZSxcImlucHV0XCIpKXt2YXIgbj1lLnZhbHVlO3JldHVybiBlLnNldEF0dHJpYnV0ZShcInR5cGVcIix0KSxuJiYoZS52YWx1ZT1uKSx0fX19fSxwcm9wRml4Ont0YWJpbmRleDpcInRhYkluZGV4XCIscmVhZG9ubHk6XCJyZWFkT25seVwiLFwiZm9yXCI6XCJodG1sRm9yXCIsXCJjbGFzc1wiOlwiY2xhc3NOYW1lXCIsbWF4bGVuZ3RoOlwibWF4TGVuZ3RoXCIsY2VsbHNwYWNpbmc6XCJjZWxsU3BhY2luZ1wiLGNlbGxwYWRkaW5nOlwiY2VsbFBhZGRpbmdcIixyb3dzcGFuOlwicm93U3BhblwiLGNvbHNwYW46XCJjb2xTcGFuXCIsdXNlbWFwOlwidXNlTWFwXCIsZnJhbWVib3JkZXI6XCJmcmFtZUJvcmRlclwiLGNvbnRlbnRlZGl0YWJsZTpcImNvbnRlbnRFZGl0YWJsZVwifSxwcm9wOmZ1bmN0aW9uKGUsbixyKXt2YXIgaSxvLGEscz1lLm5vZGVUeXBlO2lmKGUmJjMhPT1zJiY4IT09cyYmMiE9PXMpcmV0dXJuIGE9MSE9PXN8fCFiLmlzWE1MRG9jKGUpLGEmJihuPWIucHJvcEZpeFtuXXx8bixvPWIucHJvcEhvb2tzW25dKSxyIT09dD9vJiZcInNldFwiaW4gbyYmKGk9by5zZXQoZSxyLG4pKSE9PXQ/aTplW25dPXI6byYmXCJnZXRcImluIG8mJm51bGwhPT0oaT1vLmdldChlLG4pKT9pOmVbbl19LHByb3BIb29rczp7dGFiSW5kZXg6e2dldDpmdW5jdGlvbihlKXt2YXIgbj1lLmdldEF0dHJpYnV0ZU5vZGUoXCJ0YWJpbmRleFwiKTtyZXR1cm4gbiYmbi5zcGVjaWZpZWQ/cGFyc2VJbnQobi52YWx1ZSwxMCk6Vi50ZXN0KGUubm9kZU5hbWUpfHxZLnRlc3QoZS5ub2RlTmFtZSkmJmUuaHJlZj8wOnR9fX19KSx6PXtnZXQ6ZnVuY3Rpb24oZSxuKXt2YXIgcj1iLnByb3AoZSxuKSxpPVwiYm9vbGVhblwiPT10eXBlb2YgciYmZS5nZXRBdHRyaWJ1dGUobiksbz1cImJvb2xlYW5cIj09dHlwZW9mIHI/SyYmUT9udWxsIT1pOkcudGVzdChuKT9lW2IuY2FtZWxDYXNlKFwiZGVmYXVsdC1cIituKV06ISFpOmUuZ2V0QXR0cmlidXRlTm9kZShuKTtyZXR1cm4gbyYmby52YWx1ZSE9PSExP24udG9Mb3dlckNhc2UoKTp0fSxzZXQ6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiB0PT09ITE/Yi5yZW1vdmVBdHRyKGUsbik6SyYmUXx8IUcudGVzdChuKT9lLnNldEF0dHJpYnV0ZSghUSYmYi5wcm9wRml4W25dfHxuLG4pOmVbYi5jYW1lbENhc2UoXCJkZWZhdWx0LVwiK24pXT1lW25dPSEwLG59fSxLJiZRfHwoYi5hdHRySG9va3MudmFsdWU9e2dldDpmdW5jdGlvbihlLG4pe3ZhciByPWUuZ2V0QXR0cmlidXRlTm9kZShuKTtyZXR1cm4gYi5ub2RlTmFtZShlLFwiaW5wdXRcIik/ZS5kZWZhdWx0VmFsdWU6ciYmci5zcGVjaWZpZWQ/ci52YWx1ZTp0fSxzZXQ6ZnVuY3Rpb24oZSxuLHIpe3JldHVybiBiLm5vZGVOYW1lKGUsXCJpbnB1dFwiKT8oZS5kZWZhdWx0VmFsdWU9bix0KTpJJiZJLnNldChlLG4scil9fSksUXx8KEk9Yi52YWxIb29rcy5idXR0b249e2dldDpmdW5jdGlvbihlLG4pe3ZhciByPWUuZ2V0QXR0cmlidXRlTm9kZShuKTtyZXR1cm4gciYmKFwiaWRcIj09PW58fFwibmFtZVwiPT09bnx8XCJjb29yZHNcIj09PW4/XCJcIiE9PXIudmFsdWU6ci5zcGVjaWZpZWQpP3IudmFsdWU6dH0sc2V0OmZ1bmN0aW9uKGUsbixyKXt2YXIgaT1lLmdldEF0dHJpYnV0ZU5vZGUocik7cmV0dXJuIGl8fGUuc2V0QXR0cmlidXRlTm9kZShpPWUub3duZXJEb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUocikpLGkudmFsdWU9bis9XCJcIixcInZhbHVlXCI9PT1yfHxuPT09ZS5nZXRBdHRyaWJ1dGUocik/bjp0fX0sYi5hdHRySG9va3MuY29udGVudGVkaXRhYmxlPXtnZXQ6SS5nZXQsc2V0OmZ1bmN0aW9uKGUsdCxuKXtJLnNldChlLFwiXCI9PT10PyExOnQsbil9fSxiLmVhY2goW1wid2lkdGhcIixcImhlaWdodFwiXSxmdW5jdGlvbihlLG4pe2IuYXR0ckhvb2tzW25dPWIuZXh0ZW5kKGIuYXR0ckhvb2tzW25dLHtzZXQ6ZnVuY3Rpb24oZSxyKXtyZXR1cm5cIlwiPT09cj8oZS5zZXRBdHRyaWJ1dGUobixcImF1dG9cIikscik6dH19KX0pKSxiLnN1cHBvcnQuaHJlZk5vcm1hbGl6ZWR8fChiLmVhY2goW1wiaHJlZlwiLFwic3JjXCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLGZ1bmN0aW9uKGUsbil7Yi5hdHRySG9va3Nbbl09Yi5leHRlbmQoYi5hdHRySG9va3Nbbl0se2dldDpmdW5jdGlvbihlKXt2YXIgcj1lLmdldEF0dHJpYnV0ZShuLDIpO3JldHVybiBudWxsPT1yP3Q6cn19KX0pLGIuZWFjaChbXCJocmVmXCIsXCJzcmNcIl0sZnVuY3Rpb24oZSx0KXtiLnByb3BIb29rc1t0XT17Z2V0OmZ1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZSh0LDQpfX19KSksYi5zdXBwb3J0LnN0eWxlfHwoYi5hdHRySG9va3Muc3R5bGU9e2dldDpmdW5jdGlvbihlKXtyZXR1cm4gZS5zdHlsZS5jc3NUZXh0fHx0fSxzZXQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5zdHlsZS5jc3NUZXh0PXQrXCJcIn19KSxiLnN1cHBvcnQub3B0U2VsZWN0ZWR8fChiLnByb3BIb29rcy5zZWxlY3RlZD1iLmV4dGVuZChiLnByb3BIb29rcy5zZWxlY3RlZCx7Z2V0OmZ1bmN0aW9uKGUpe3ZhciB0PWUucGFyZW50Tm9kZTtyZXR1cm4gdCYmKHQuc2VsZWN0ZWRJbmRleCx0LnBhcmVudE5vZGUmJnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4KSxudWxsfX0pKSxiLnN1cHBvcnQuZW5jdHlwZXx8KGIucHJvcEZpeC5lbmN0eXBlPVwiZW5jb2RpbmdcIiksYi5zdXBwb3J0LmNoZWNrT258fGIuZWFjaChbXCJyYWRpb1wiLFwiY2hlY2tib3hcIl0sZnVuY3Rpb24oKXtiLnZhbEhvb2tzW3RoaXNdPXtnZXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PT1lLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpP1wib25cIjplLnZhbHVlfX19KSxiLmVhY2goW1wicmFkaW9cIixcImNoZWNrYm94XCJdLGZ1bmN0aW9uKCl7Yi52YWxIb29rc1t0aGlzXT1iLmV4dGVuZChiLnZhbEhvb2tzW3RoaXNdLHtzZXQ6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gYi5pc0FycmF5KG4pP2UuY2hlY2tlZD1iLmluQXJyYXkoYihlKS52YWwoKSxuKT49MDp0fX0pfSk7dmFyIFo9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLGV0PS9ea2V5Lyx0dD0vXig/Om1vdXNlfGNvbnRleHRtZW51KXxjbGljay8sbnQ9L14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLHJ0PS9eKFteLl0qKSg/OlxcLiguKyl8KSQvO2Z1bmN0aW9uIGl0KCl7cmV0dXJuITB9ZnVuY3Rpb24gb3QoKXtyZXR1cm4hMX1iLmV2ZW50PXtnbG9iYWw6e30sYWRkOmZ1bmN0aW9uKGUsbixyLG8sYSl7dmFyIHMsdSxsLGMscCxmLGQsaCxnLG0seSx2PWIuX2RhdGEoZSk7aWYodil7ci5oYW5kbGVyJiYoYz1yLHI9Yy5oYW5kbGVyLGE9Yy5zZWxlY3Rvciksci5ndWlkfHwoci5ndWlkPWIuZ3VpZCsrKSwodT12LmV2ZW50cyl8fCh1PXYuZXZlbnRzPXt9KSwoZj12LmhhbmRsZSl8fChmPXYuaGFuZGxlPWZ1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgYj09PWl8fGUmJmIuZXZlbnQudHJpZ2dlcmVkPT09ZS50eXBlP3Q6Yi5ldmVudC5kaXNwYXRjaC5hcHBseShmLmVsZW0sYXJndW1lbnRzKX0sZi5lbGVtPWUpLG49KG58fFwiXCIpLm1hdGNoKHcpfHxbXCJcIl0sbD1uLmxlbmd0aDt3aGlsZShsLS0pcz1ydC5leGVjKG5bbF0pfHxbXSxnPXk9c1sxXSxtPShzWzJdfHxcIlwiKS5zcGxpdChcIi5cIikuc29ydCgpLHA9Yi5ldmVudC5zcGVjaWFsW2ddfHx7fSxnPShhP3AuZGVsZWdhdGVUeXBlOnAuYmluZFR5cGUpfHxnLHA9Yi5ldmVudC5zcGVjaWFsW2ddfHx7fSxkPWIuZXh0ZW5kKHt0eXBlOmcsb3JpZ1R5cGU6eSxkYXRhOm8saGFuZGxlcjpyLGd1aWQ6ci5ndWlkLHNlbGVjdG9yOmEsbmVlZHNDb250ZXh0OmEmJmIuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdChhKSxuYW1lc3BhY2U6bS5qb2luKFwiLlwiKX0sYyksKGg9dVtnXSl8fChoPXVbZ109W10saC5kZWxlZ2F0ZUNvdW50PTAscC5zZXR1cCYmcC5zZXR1cC5jYWxsKGUsbyxtLGYpIT09ITF8fChlLmFkZEV2ZW50TGlzdGVuZXI/ZS5hZGRFdmVudExpc3RlbmVyKGcsZiwhMSk6ZS5hdHRhY2hFdmVudCYmZS5hdHRhY2hFdmVudChcIm9uXCIrZyxmKSkpLHAuYWRkJiYocC5hZGQuY2FsbChlLGQpLGQuaGFuZGxlci5ndWlkfHwoZC5oYW5kbGVyLmd1aWQ9ci5ndWlkKSksYT9oLnNwbGljZShoLmRlbGVnYXRlQ291bnQrKywwLGQpOmgucHVzaChkKSxiLmV2ZW50Lmdsb2JhbFtnXT0hMDtlPW51bGx9fSxyZW1vdmU6ZnVuY3Rpb24oZSx0LG4scixpKXt2YXIgbyxhLHMsdSxsLGMscCxmLGQsaCxnLG09Yi5oYXNEYXRhKGUpJiZiLl9kYXRhKGUpO2lmKG0mJihjPW0uZXZlbnRzKSl7dD0odHx8XCJcIikubWF0Y2godyl8fFtcIlwiXSxsPXQubGVuZ3RoO3doaWxlKGwtLSlpZihzPXJ0LmV4ZWModFtsXSl8fFtdLGQ9Zz1zWzFdLGg9KHNbMl18fFwiXCIpLnNwbGl0KFwiLlwiKS5zb3J0KCksZCl7cD1iLmV2ZW50LnNwZWNpYWxbZF18fHt9LGQ9KHI/cC5kZWxlZ2F0ZVR5cGU6cC5iaW5kVHlwZSl8fGQsZj1jW2RdfHxbXSxzPXNbMl0mJlJlZ0V4cChcIihefFxcXFwuKVwiK2guam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpK1wiKFxcXFwufCQpXCIpLHU9bz1mLmxlbmd0aDt3aGlsZShvLS0pYT1mW29dLCFpJiZnIT09YS5vcmlnVHlwZXx8biYmbi5ndWlkIT09YS5ndWlkfHxzJiYhcy50ZXN0KGEubmFtZXNwYWNlKXx8ciYmciE9PWEuc2VsZWN0b3ImJihcIioqXCIhPT1yfHwhYS5zZWxlY3Rvcil8fChmLnNwbGljZShvLDEpLGEuc2VsZWN0b3ImJmYuZGVsZWdhdGVDb3VudC0tLHAucmVtb3ZlJiZwLnJlbW92ZS5jYWxsKGUsYSkpO3UmJiFmLmxlbmd0aCYmKHAudGVhcmRvd24mJnAudGVhcmRvd24uY2FsbChlLGgsbS5oYW5kbGUpIT09ITF8fGIucmVtb3ZlRXZlbnQoZSxkLG0uaGFuZGxlKSxkZWxldGUgY1tkXSl9ZWxzZSBmb3IoZCBpbiBjKWIuZXZlbnQucmVtb3ZlKGUsZCt0W2xdLG4sciwhMCk7Yi5pc0VtcHR5T2JqZWN0KGMpJiYoZGVsZXRlIG0uaGFuZGxlLGIuX3JlbW92ZURhdGEoZSxcImV2ZW50c1wiKSl9fSx0cmlnZ2VyOmZ1bmN0aW9uKG4scixpLGEpe3ZhciBzLHUsbCxjLHAsZixkLGg9W2l8fG9dLGc9eS5jYWxsKG4sXCJ0eXBlXCIpP24udHlwZTpuLG09eS5jYWxsKG4sXCJuYW1lc3BhY2VcIik/bi5uYW1lc3BhY2Uuc3BsaXQoXCIuXCIpOltdO2lmKGw9Zj1pPWl8fG8sMyE9PWkubm9kZVR5cGUmJjghPT1pLm5vZGVUeXBlJiYhbnQudGVzdChnK2IuZXZlbnQudHJpZ2dlcmVkKSYmKGcuaW5kZXhPZihcIi5cIik+PTAmJihtPWcuc3BsaXQoXCIuXCIpLGc9bS5zaGlmdCgpLG0uc29ydCgpKSx1PTA+Zy5pbmRleE9mKFwiOlwiKSYmXCJvblwiK2csbj1uW2IuZXhwYW5kb10/bjpuZXcgYi5FdmVudChnLFwib2JqZWN0XCI9PXR5cGVvZiBuJiZuKSxuLmlzVHJpZ2dlcj0hMCxuLm5hbWVzcGFjZT1tLmpvaW4oXCIuXCIpLG4ubmFtZXNwYWNlX3JlPW4ubmFtZXNwYWNlP1JlZ0V4cChcIihefFxcXFwuKVwiK20uam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpK1wiKFxcXFwufCQpXCIpOm51bGwsbi5yZXN1bHQ9dCxuLnRhcmdldHx8KG4udGFyZ2V0PWkpLHI9bnVsbD09cj9bbl06Yi5tYWtlQXJyYXkocixbbl0pLHA9Yi5ldmVudC5zcGVjaWFsW2ddfHx7fSxhfHwhcC50cmlnZ2VyfHxwLnRyaWdnZXIuYXBwbHkoaSxyKSE9PSExKSl7aWYoIWEmJiFwLm5vQnViYmxlJiYhYi5pc1dpbmRvdyhpKSl7Zm9yKGM9cC5kZWxlZ2F0ZVR5cGV8fGcsbnQudGVzdChjK2cpfHwobD1sLnBhcmVudE5vZGUpO2w7bD1sLnBhcmVudE5vZGUpaC5wdXNoKGwpLGY9bDtmPT09KGkub3duZXJEb2N1bWVudHx8bykmJmgucHVzaChmLmRlZmF1bHRWaWV3fHxmLnBhcmVudFdpbmRvd3x8ZSl9ZD0wO3doaWxlKChsPWhbZCsrXSkmJiFuLmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpbi50eXBlPWQ+MT9jOnAuYmluZFR5cGV8fGcscz0oYi5fZGF0YShsLFwiZXZlbnRzXCIpfHx7fSlbbi50eXBlXSYmYi5fZGF0YShsLFwiaGFuZGxlXCIpLHMmJnMuYXBwbHkobCxyKSxzPXUmJmxbdV0scyYmYi5hY2NlcHREYXRhKGwpJiZzLmFwcGx5JiZzLmFwcGx5KGwscik9PT0hMSYmbi5wcmV2ZW50RGVmYXVsdCgpO2lmKG4udHlwZT1nLCEoYXx8bi5pc0RlZmF1bHRQcmV2ZW50ZWQoKXx8cC5fZGVmYXVsdCYmcC5fZGVmYXVsdC5hcHBseShpLm93bmVyRG9jdW1lbnQscikhPT0hMXx8XCJjbGlja1wiPT09ZyYmYi5ub2RlTmFtZShpLFwiYVwiKXx8IWIuYWNjZXB0RGF0YShpKXx8IXV8fCFpW2ddfHxiLmlzV2luZG93KGkpKSl7Zj1pW3VdLGYmJihpW3VdPW51bGwpLGIuZXZlbnQudHJpZ2dlcmVkPWc7dHJ5e2lbZ10oKX1jYXRjaCh2KXt9Yi5ldmVudC50cmlnZ2VyZWQ9dCxmJiYoaVt1XT1mKX1yZXR1cm4gbi5yZXN1bHR9fSxkaXNwYXRjaDpmdW5jdGlvbihlKXtlPWIuZXZlbnQuZml4KGUpO3ZhciBuLHIsaSxvLGEscz1bXSx1PWguY2FsbChhcmd1bWVudHMpLGw9KGIuX2RhdGEodGhpcyxcImV2ZW50c1wiKXx8e30pW2UudHlwZV18fFtdLGM9Yi5ldmVudC5zcGVjaWFsW2UudHlwZV18fHt9O2lmKHVbMF09ZSxlLmRlbGVnYXRlVGFyZ2V0PXRoaXMsIWMucHJlRGlzcGF0Y2h8fGMucHJlRGlzcGF0Y2guY2FsbCh0aGlzLGUpIT09ITEpe3M9Yi5ldmVudC5oYW5kbGVycy5jYWxsKHRoaXMsZSxsKSxuPTA7d2hpbGUoKG89c1tuKytdKSYmIWUuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSl7ZS5jdXJyZW50VGFyZ2V0PW8uZWxlbSxhPTA7d2hpbGUoKGk9by5oYW5kbGVyc1thKytdKSYmIWUuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkoIWUubmFtZXNwYWNlX3JlfHxlLm5hbWVzcGFjZV9yZS50ZXN0KGkubmFtZXNwYWNlKSkmJihlLmhhbmRsZU9iaj1pLGUuZGF0YT1pLmRhdGEscj0oKGIuZXZlbnQuc3BlY2lhbFtpLm9yaWdUeXBlXXx8e30pLmhhbmRsZXx8aS5oYW5kbGVyKS5hcHBseShvLmVsZW0sdSksciE9PXQmJihlLnJlc3VsdD1yKT09PSExJiYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCkpKX1yZXR1cm4gYy5wb3N0RGlzcGF0Y2gmJmMucG9zdERpc3BhdGNoLmNhbGwodGhpcyxlKSxlLnJlc3VsdH19LGhhbmRsZXJzOmZ1bmN0aW9uKGUsbil7dmFyIHIsaSxvLGEscz1bXSx1PW4uZGVsZWdhdGVDb3VudCxsPWUudGFyZ2V0O2lmKHUmJmwubm9kZVR5cGUmJighZS5idXR0b258fFwiY2xpY2tcIiE9PWUudHlwZSkpZm9yKDtsIT10aGlzO2w9bC5wYXJlbnROb2RlfHx0aGlzKWlmKDE9PT1sLm5vZGVUeXBlJiYobC5kaXNhYmxlZCE9PSEwfHxcImNsaWNrXCIhPT1lLnR5cGUpKXtmb3Iobz1bXSxhPTA7dT5hO2ErKylpPW5bYV0scj1pLnNlbGVjdG9yK1wiIFwiLG9bcl09PT10JiYob1tyXT1pLm5lZWRzQ29udGV4dD9iKHIsdGhpcykuaW5kZXgobCk+PTA6Yi5maW5kKHIsdGhpcyxudWxsLFtsXSkubGVuZ3RoKSxvW3JdJiZvLnB1c2goaSk7by5sZW5ndGgmJnMucHVzaCh7ZWxlbTpsLGhhbmRsZXJzOm99KX1yZXR1cm4gbi5sZW5ndGg+dSYmcy5wdXNoKHtlbGVtOnRoaXMsaGFuZGxlcnM6bi5zbGljZSh1KX0pLHN9LGZpeDpmdW5jdGlvbihlKXtpZihlW2IuZXhwYW5kb10pcmV0dXJuIGU7dmFyIHQsbixyLGk9ZS50eXBlLGE9ZSxzPXRoaXMuZml4SG9va3NbaV07c3x8KHRoaXMuZml4SG9va3NbaV09cz10dC50ZXN0KGkpP3RoaXMubW91c2VIb29rczpldC50ZXN0KGkpP3RoaXMua2V5SG9va3M6e30pLHI9cy5wcm9wcz90aGlzLnByb3BzLmNvbmNhdChzLnByb3BzKTp0aGlzLnByb3BzLGU9bmV3IGIuRXZlbnQoYSksdD1yLmxlbmd0aDt3aGlsZSh0LS0pbj1yW3RdLGVbbl09YVtuXTtyZXR1cm4gZS50YXJnZXR8fChlLnRhcmdldD1hLnNyY0VsZW1lbnR8fG8pLDM9PT1lLnRhcmdldC5ub2RlVHlwZSYmKGUudGFyZ2V0PWUudGFyZ2V0LnBhcmVudE5vZGUpLGUubWV0YUtleT0hIWUubWV0YUtleSxzLmZpbHRlcj9zLmZpbHRlcihlLGEpOmV9LHByb3BzOlwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZXZlbnRQaGFzZSBtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIuc3BsaXQoXCIgXCIpLGZpeEhvb2tzOnt9LGtleUhvb2tzOntwcm9wczpcImNoYXIgY2hhckNvZGUga2V5IGtleUNvZGVcIi5zcGxpdChcIiBcIiksZmlsdGVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIG51bGw9PWUud2hpY2gmJihlLndoaWNoPW51bGwhPXQuY2hhckNvZGU/dC5jaGFyQ29kZTp0LmtleUNvZGUpLGV9fSxtb3VzZUhvb2tzOntwcm9wczpcImJ1dHRvbiBidXR0b25zIGNsaWVudFggY2xpZW50WSBmcm9tRWxlbWVudCBvZmZzZXRYIG9mZnNldFkgcGFnZVggcGFnZVkgc2NyZWVuWCBzY3JlZW5ZIHRvRWxlbWVudFwiLnNwbGl0KFwiIFwiKSxmaWx0ZXI6ZnVuY3Rpb24oZSxuKXt2YXIgcixpLGEscz1uLmJ1dHRvbix1PW4uZnJvbUVsZW1lbnQ7cmV0dXJuIG51bGw9PWUucGFnZVgmJm51bGwhPW4uY2xpZW50WCYmKGk9ZS50YXJnZXQub3duZXJEb2N1bWVudHx8byxhPWkuZG9jdW1lbnRFbGVtZW50LHI9aS5ib2R5LGUucGFnZVg9bi5jbGllbnRYKyhhJiZhLnNjcm9sbExlZnR8fHImJnIuc2Nyb2xsTGVmdHx8MCktKGEmJmEuY2xpZW50TGVmdHx8ciYmci5jbGllbnRMZWZ0fHwwKSxlLnBhZ2VZPW4uY2xpZW50WSsoYSYmYS5zY3JvbGxUb3B8fHImJnIuc2Nyb2xsVG9wfHwwKS0oYSYmYS5jbGllbnRUb3B8fHImJnIuY2xpZW50VG9wfHwwKSksIWUucmVsYXRlZFRhcmdldCYmdSYmKGUucmVsYXRlZFRhcmdldD11PT09ZS50YXJnZXQ/bi50b0VsZW1lbnQ6dSksZS53aGljaHx8cz09PXR8fChlLndoaWNoPTEmcz8xOjImcz8zOjQmcz8yOjApLGV9fSxzcGVjaWFsOntsb2FkOntub0J1YmJsZTohMH0sY2xpY2s6e3RyaWdnZXI6ZnVuY3Rpb24oKXtyZXR1cm4gYi5ub2RlTmFtZSh0aGlzLFwiaW5wdXRcIikmJlwiY2hlY2tib3hcIj09PXRoaXMudHlwZSYmdGhpcy5jbGljaz8odGhpcy5jbGljaygpLCExKTp0fX0sZm9jdXM6e3RyaWdnZXI6ZnVuY3Rpb24oKXtpZih0aGlzIT09by5hY3RpdmVFbGVtZW50JiZ0aGlzLmZvY3VzKXRyeXtyZXR1cm4gdGhpcy5mb2N1cygpLCExfWNhdGNoKGUpe319LGRlbGVnYXRlVHlwZTpcImZvY3VzaW5cIn0sYmx1cjp7dHJpZ2dlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzPT09by5hY3RpdmVFbGVtZW50JiZ0aGlzLmJsdXI/KHRoaXMuYmx1cigpLCExKTp0fSxkZWxlZ2F0ZVR5cGU6XCJmb2N1c291dFwifSxiZWZvcmV1bmxvYWQ6e3Bvc3REaXNwYXRjaDpmdW5jdGlvbihlKXtlLnJlc3VsdCE9PXQmJihlLm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWU9ZS5yZXN1bHQpfX19LHNpbXVsYXRlOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPWIuZXh0ZW5kKG5ldyBiLkV2ZW50LG4se3R5cGU6ZSxpc1NpbXVsYXRlZDohMCxvcmlnaW5hbEV2ZW50Ont9fSk7cj9iLmV2ZW50LnRyaWdnZXIoaSxudWxsLHQpOmIuZXZlbnQuZGlzcGF0Y2guY2FsbCh0LGkpLGkuaXNEZWZhdWx0UHJldmVudGVkKCkmJm4ucHJldmVudERlZmF1bHQoKX19LGIucmVtb3ZlRXZlbnQ9by5yZW1vdmVFdmVudExpc3RlbmVyP2Z1bmN0aW9uKGUsdCxuKXtlLnJlbW92ZUV2ZW50TGlzdGVuZXImJmUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LG4sITEpfTpmdW5jdGlvbihlLHQsbil7dmFyIHI9XCJvblwiK3Q7ZS5kZXRhY2hFdmVudCYmKHR5cGVvZiBlW3JdPT09aSYmKGVbcl09bnVsbCksZS5kZXRhY2hFdmVudChyLG4pKX0sYi5FdmVudD1mdW5jdGlvbihlLG4pe3JldHVybiB0aGlzIGluc3RhbmNlb2YgYi5FdmVudD8oZSYmZS50eXBlPyh0aGlzLm9yaWdpbmFsRXZlbnQ9ZSx0aGlzLnR5cGU9ZS50eXBlLHRoaXMuaXNEZWZhdWx0UHJldmVudGVkPWUuZGVmYXVsdFByZXZlbnRlZHx8ZS5yZXR1cm5WYWx1ZT09PSExfHxlLmdldFByZXZlbnREZWZhdWx0JiZlLmdldFByZXZlbnREZWZhdWx0KCk/aXQ6b3QpOnRoaXMudHlwZT1lLG4mJmIuZXh0ZW5kKHRoaXMsbiksdGhpcy50aW1lU3RhbXA9ZSYmZS50aW1lU3RhbXB8fGIubm93KCksdGhpc1tiLmV4cGFuZG9dPSEwLHQpOm5ldyBiLkV2ZW50KGUsbil9LGIuRXZlbnQucHJvdG90eXBlPXtpc0RlZmF1bHRQcmV2ZW50ZWQ6b3QsaXNQcm9wYWdhdGlvblN0b3BwZWQ6b3QsaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6b3QscHJldmVudERlZmF1bHQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQ9aXQsZSYmKGUucHJldmVudERlZmF1bHQ/ZS5wcmV2ZW50RGVmYXVsdCgpOmUucmV0dXJuVmFsdWU9ITEpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgZT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD1pdCxlJiYoZS5zdG9wUHJvcGFnYXRpb24mJmUuc3RvcFByb3BhZ2F0aW9uKCksZS5jYW5jZWxCdWJibGU9ITApfSxzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkPWl0LHRoaXMuc3RvcFByb3BhZ2F0aW9uKCl9fSxiLmVhY2goe21vdXNlZW50ZXI6XCJtb3VzZW92ZXJcIixtb3VzZWxlYXZlOlwibW91c2VvdXRcIn0sZnVuY3Rpb24oZSx0KXtiLmV2ZW50LnNwZWNpYWxbZV09e2RlbGVnYXRlVHlwZTp0LGJpbmRUeXBlOnQsaGFuZGxlOmZ1bmN0aW9uKGUpe3ZhciBuLHI9dGhpcyxpPWUucmVsYXRlZFRhcmdldCxvPWUuaGFuZGxlT2JqO1xucmV0dXJuKCFpfHxpIT09ciYmIWIuY29udGFpbnMocixpKSkmJihlLnR5cGU9by5vcmlnVHlwZSxuPW8uaGFuZGxlci5hcHBseSh0aGlzLGFyZ3VtZW50cyksZS50eXBlPXQpLG59fX0pLGIuc3VwcG9ydC5zdWJtaXRCdWJibGVzfHwoYi5ldmVudC5zcGVjaWFsLnN1Ym1pdD17c2V0dXA6ZnVuY3Rpb24oKXtyZXR1cm4gYi5ub2RlTmFtZSh0aGlzLFwiZm9ybVwiKT8hMTooYi5ldmVudC5hZGQodGhpcyxcImNsaWNrLl9zdWJtaXQga2V5cHJlc3MuX3N1Ym1pdFwiLGZ1bmN0aW9uKGUpe3ZhciBuPWUudGFyZ2V0LHI9Yi5ub2RlTmFtZShuLFwiaW5wdXRcIil8fGIubm9kZU5hbWUobixcImJ1dHRvblwiKT9uLmZvcm06dDtyJiYhYi5fZGF0YShyLFwic3VibWl0QnViYmxlc1wiKSYmKGIuZXZlbnQuYWRkKHIsXCJzdWJtaXQuX3N1Ym1pdFwiLGZ1bmN0aW9uKGUpe2UuX3N1Ym1pdF9idWJibGU9ITB9KSxiLl9kYXRhKHIsXCJzdWJtaXRCdWJibGVzXCIsITApKX0pLHQpfSxwb3N0RGlzcGF0Y2g6ZnVuY3Rpb24oZSl7ZS5fc3VibWl0X2J1YmJsZSYmKGRlbGV0ZSBlLl9zdWJtaXRfYnViYmxlLHRoaXMucGFyZW50Tm9kZSYmIWUuaXNUcmlnZ2VyJiZiLmV2ZW50LnNpbXVsYXRlKFwic3VibWl0XCIsdGhpcy5wYXJlbnROb2RlLGUsITApKX0sdGVhcmRvd246ZnVuY3Rpb24oKXtyZXR1cm4gYi5ub2RlTmFtZSh0aGlzLFwiZm9ybVwiKT8hMTooYi5ldmVudC5yZW1vdmUodGhpcyxcIi5fc3VibWl0XCIpLHQpfX0pLGIuc3VwcG9ydC5jaGFuZ2VCdWJibGVzfHwoYi5ldmVudC5zcGVjaWFsLmNoYW5nZT17c2V0dXA6ZnVuY3Rpb24oKXtyZXR1cm4gWi50ZXN0KHRoaXMubm9kZU5hbWUpPygoXCJjaGVja2JveFwiPT09dGhpcy50eXBlfHxcInJhZGlvXCI9PT10aGlzLnR5cGUpJiYoYi5ldmVudC5hZGQodGhpcyxcInByb3BlcnR5Y2hhbmdlLl9jaGFuZ2VcIixmdW5jdGlvbihlKXtcImNoZWNrZWRcIj09PWUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUmJih0aGlzLl9qdXN0X2NoYW5nZWQ9ITApfSksYi5ldmVudC5hZGQodGhpcyxcImNsaWNrLl9jaGFuZ2VcIixmdW5jdGlvbihlKXt0aGlzLl9qdXN0X2NoYW5nZWQmJiFlLmlzVHJpZ2dlciYmKHRoaXMuX2p1c3RfY2hhbmdlZD0hMSksYi5ldmVudC5zaW11bGF0ZShcImNoYW5nZVwiLHRoaXMsZSwhMCl9KSksITEpOihiLmV2ZW50LmFkZCh0aGlzLFwiYmVmb3JlYWN0aXZhdGUuX2NoYW5nZVwiLGZ1bmN0aW9uKGUpe3ZhciB0PWUudGFyZ2V0O1oudGVzdCh0Lm5vZGVOYW1lKSYmIWIuX2RhdGEodCxcImNoYW5nZUJ1YmJsZXNcIikmJihiLmV2ZW50LmFkZCh0LFwiY2hhbmdlLl9jaGFuZ2VcIixmdW5jdGlvbihlKXshdGhpcy5wYXJlbnROb2RlfHxlLmlzU2ltdWxhdGVkfHxlLmlzVHJpZ2dlcnx8Yi5ldmVudC5zaW11bGF0ZShcImNoYW5nZVwiLHRoaXMucGFyZW50Tm9kZSxlLCEwKX0pLGIuX2RhdGEodCxcImNoYW5nZUJ1YmJsZXNcIiwhMCkpfSksdCl9LGhhbmRsZTpmdW5jdGlvbihlKXt2YXIgbj1lLnRhcmdldDtyZXR1cm4gdGhpcyE9PW58fGUuaXNTaW11bGF0ZWR8fGUuaXNUcmlnZ2VyfHxcInJhZGlvXCIhPT1uLnR5cGUmJlwiY2hlY2tib3hcIiE9PW4udHlwZT9lLmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp0fSx0ZWFyZG93bjpmdW5jdGlvbigpe3JldHVybiBiLmV2ZW50LnJlbW92ZSh0aGlzLFwiLl9jaGFuZ2VcIiksIVoudGVzdCh0aGlzLm5vZGVOYW1lKX19KSxiLnN1cHBvcnQuZm9jdXNpbkJ1YmJsZXN8fGIuZWFjaCh7Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGZ1bmN0aW9uKGUsdCl7dmFyIG49MCxyPWZ1bmN0aW9uKGUpe2IuZXZlbnQuc2ltdWxhdGUodCxlLnRhcmdldCxiLmV2ZW50LmZpeChlKSwhMCl9O2IuZXZlbnQuc3BlY2lhbFt0XT17c2V0dXA6ZnVuY3Rpb24oKXswPT09bisrJiZvLmFkZEV2ZW50TGlzdGVuZXIoZSxyLCEwKX0sdGVhcmRvd246ZnVuY3Rpb24oKXswPT09LS1uJiZvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxyLCEwKX19fSksYi5mbi5leHRlbmQoe29uOmZ1bmN0aW9uKGUsbixyLGksbyl7dmFyIGEscztpZihcIm9iamVjdFwiPT10eXBlb2YgZSl7XCJzdHJpbmdcIiE9dHlwZW9mIG4mJihyPXJ8fG4sbj10KTtmb3IoYSBpbiBlKXRoaXMub24oYSxuLHIsZVthXSxvKTtyZXR1cm4gdGhpc31pZihudWxsPT1yJiZudWxsPT1pPyhpPW4scj1uPXQpOm51bGw9PWkmJihcInN0cmluZ1wiPT10eXBlb2Ygbj8oaT1yLHI9dCk6KGk9cixyPW4sbj10KSksaT09PSExKWk9b3Q7ZWxzZSBpZighaSlyZXR1cm4gdGhpcztyZXR1cm4gMT09PW8mJihzPWksaT1mdW5jdGlvbihlKXtyZXR1cm4gYigpLm9mZihlKSxzLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0saS5ndWlkPXMuZ3VpZHx8KHMuZ3VpZD1iLmd1aWQrKykpLHRoaXMuZWFjaChmdW5jdGlvbigpe2IuZXZlbnQuYWRkKHRoaXMsZSxpLHIsbil9KX0sb25lOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiB0aGlzLm9uKGUsdCxuLHIsMSl9LG9mZjpmdW5jdGlvbihlLG4scil7dmFyIGksbztpZihlJiZlLnByZXZlbnREZWZhdWx0JiZlLmhhbmRsZU9iailyZXR1cm4gaT1lLmhhbmRsZU9iaixiKGUuZGVsZWdhdGVUYXJnZXQpLm9mZihpLm5hbWVzcGFjZT9pLm9yaWdUeXBlK1wiLlwiK2kubmFtZXNwYWNlOmkub3JpZ1R5cGUsaS5zZWxlY3RvcixpLmhhbmRsZXIpLHRoaXM7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUpe2ZvcihvIGluIGUpdGhpcy5vZmYobyxuLGVbb10pO3JldHVybiB0aGlzfXJldHVybihuPT09ITF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pJiYocj1uLG49dCkscj09PSExJiYocj1vdCksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7Yi5ldmVudC5yZW1vdmUodGhpcyxlLHIsbil9KX0sYmluZDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIHRoaXMub24oZSxudWxsLHQsbil9LHVuYmluZDpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLm9mZihlLG51bGwsdCl9LGRlbGVnYXRlOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiB0aGlzLm9uKHQsZSxuLHIpfSx1bmRlbGVnYXRlOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5vZmYoZSxcIioqXCIpOnRoaXMub2ZmKHQsZXx8XCIqKlwiLG4pfSx0cmlnZ2VyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe2IuZXZlbnQudHJpZ2dlcihlLHQsdGhpcyl9KX0sdHJpZ2dlckhhbmRsZXI6ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzWzBdO3JldHVybiByP2IuZXZlbnQudHJpZ2dlcihlLG4sciwhMCk6dH19KSxmdW5jdGlvbihlLHQpe3ZhciBuLHIsaSxvLGEscyx1LGwsYyxwLGYsZCxoLGcsbSx5LHYseD1cInNpenpsZVwiKy1uZXcgRGF0ZSx3PWUuZG9jdW1lbnQsVD17fSxOPTAsQz0wLGs9aXQoKSxFPWl0KCksUz1pdCgpLEE9dHlwZW9mIHQsaj0xPDwzMSxEPVtdLEw9RC5wb3AsSD1ELnB1c2gscT1ELnNsaWNlLE09RC5pbmRleE9mfHxmdW5jdGlvbihlKXt2YXIgdD0wLG49dGhpcy5sZW5ndGg7Zm9yKDtuPnQ7dCsrKWlmKHRoaXNbdF09PT1lKXJldHVybiB0O3JldHVybi0xfSxfPVwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixGPVwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFxcXHgwMC1cXFxceGEwXSkrXCIsTz1GLnJlcGxhY2UoXCJ3XCIsXCJ3I1wiKSxCPVwiKFsqXiR8IX5dPz0pXCIsUD1cIlxcXFxbXCIrXytcIiooXCIrRitcIilcIitfK1wiKig/OlwiK0IrXytcIiooPzooWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfChcIitPK1wiKXwpfClcIitfK1wiKlxcXFxdXCIsUj1cIjooXCIrRitcIikoPzpcXFxcKCgoWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIitQLnJlcGxhY2UoMyw4KStcIikqKXwuKilcXFxcKXwpXCIsVz1SZWdFeHAoXCJeXCIrXytcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIrXytcIiskXCIsXCJnXCIpLCQ9UmVnRXhwKFwiXlwiK18rXCIqLFwiK18rXCIqXCIpLEk9UmVnRXhwKFwiXlwiK18rXCIqKFtcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGY+K35dKVwiK18rXCIqXCIpLHo9UmVnRXhwKFIpLFg9UmVnRXhwKFwiXlwiK08rXCIkXCIpLFU9e0lEOlJlZ0V4cChcIl4jKFwiK0YrXCIpXCIpLENMQVNTOlJlZ0V4cChcIl5cXFxcLihcIitGK1wiKVwiKSxOQU1FOlJlZ0V4cChcIl5cXFxcW25hbWU9WydcXFwiXT8oXCIrRitcIilbJ1xcXCJdP1xcXFxdXCIpLFRBRzpSZWdFeHAoXCJeKFwiK0YucmVwbGFjZShcIndcIixcIncqXCIpK1wiKVwiKSxBVFRSOlJlZ0V4cChcIl5cIitQKSxQU0VVRE86UmVnRXhwKFwiXlwiK1IpLENISUxEOlJlZ0V4cChcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIrXytcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiK18rXCIqKD86KFsrLV18KVwiK18rXCIqKFxcXFxkKyl8KSlcIitfK1wiKlxcXFwpfClcIixcImlcIiksbmVlZHNDb250ZXh0OlJlZ0V4cChcIl5cIitfK1wiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIitfK1wiKigoPzotXFxcXGQpP1xcXFxkKilcIitfK1wiKlxcXFwpfCkoPz1bXi1dfCQpXCIsXCJpXCIpfSxWPS9bXFx4MjBcXHRcXHJcXG5cXGZdKlsrfl0vLFk9L15bXntdK1xce1xccypcXFtuYXRpdmUgY29kZS8sSj0vXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxHPS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksUT0vXmhcXGQkL2ksSz0vJ3xcXFxcL2csWj0vXFw9W1xceDIwXFx0XFxyXFxuXFxmXSooW14nXCJcXF1dKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcXS9nLGV0PS9cXFxcKFtcXGRhLWZBLUZdezEsNn1bXFx4MjBcXHRcXHJcXG5cXGZdP3wuKS9nLHR0PWZ1bmN0aW9uKGUsdCl7dmFyIG49XCIweFwiK3QtNjU1MzY7cmV0dXJuIG4hPT1uP3Q6MD5uP1N0cmluZy5mcm9tQ2hhckNvZGUobis2NTUzNik6U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxuPj4xMCw1NjMyMHwxMDIzJm4pfTt0cnl7cS5jYWxsKHcuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXMsMClbMF0ubm9kZVR5cGV9Y2F0Y2gobnQpe3E9ZnVuY3Rpb24oZSl7dmFyIHQsbj1bXTt3aGlsZSh0PXRoaXNbZSsrXSluLnB1c2godCk7cmV0dXJuIG59fWZ1bmN0aW9uIHJ0KGUpe3JldHVybiBZLnRlc3QoZStcIlwiKX1mdW5jdGlvbiBpdCgpe3ZhciBlLHQ9W107cmV0dXJuIGU9ZnVuY3Rpb24obixyKXtyZXR1cm4gdC5wdXNoKG4rPVwiIFwiKT5pLmNhY2hlTGVuZ3RoJiZkZWxldGUgZVt0LnNoaWZ0KCldLGVbbl09cn19ZnVuY3Rpb24gb3QoZSl7cmV0dXJuIGVbeF09ITAsZX1mdW5jdGlvbiBhdChlKXt2YXIgdD1wLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dHJ5e3JldHVybiBlKHQpfWNhdGNoKG4pe3JldHVybiExfWZpbmFsbHl7dD1udWxsfX1mdW5jdGlvbiBzdChlLHQsbixyKXt2YXIgaSxvLGEscyx1LGwsZixnLG0sdjtpZigodD90Lm93bmVyRG9jdW1lbnR8fHQ6dykhPT1wJiZjKHQpLHQ9dHx8cCxuPW58fFtdLCFlfHxcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4gbjtpZigxIT09KHM9dC5ub2RlVHlwZSkmJjkhPT1zKXJldHVybltdO2lmKCFkJiYhcil7aWYoaT1KLmV4ZWMoZSkpaWYoYT1pWzFdKXtpZig5PT09cyl7aWYobz10LmdldEVsZW1lbnRCeUlkKGEpLCFvfHwhby5wYXJlbnROb2RlKXJldHVybiBuO2lmKG8uaWQ9PT1hKXJldHVybiBuLnB1c2gobyksbn1lbHNlIGlmKHQub3duZXJEb2N1bWVudCYmKG89dC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpKSYmeSh0LG8pJiZvLmlkPT09YSlyZXR1cm4gbi5wdXNoKG8pLG59ZWxzZXtpZihpWzJdKXJldHVybiBILmFwcGx5KG4scS5jYWxsKHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSksMCkpLG47aWYoKGE9aVszXSkmJlQuZ2V0QnlDbGFzc05hbWUmJnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSlyZXR1cm4gSC5hcHBseShuLHEuY2FsbCh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYSksMCkpLG59aWYoVC5xc2EmJiFoLnRlc3QoZSkpe2lmKGY9ITAsZz14LG09dCx2PTk9PT1zJiZlLDE9PT1zJiZcIm9iamVjdFwiIT09dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKXtsPWZ0KGUpLChmPXQuZ2V0QXR0cmlidXRlKFwiaWRcIikpP2c9Zi5yZXBsYWNlKEssXCJcXFxcJCZcIik6dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLGcpLGc9XCJbaWQ9J1wiK2crXCInXSBcIix1PWwubGVuZ3RoO3doaWxlKHUtLSlsW3VdPWcrZHQobFt1XSk7bT1WLnRlc3QoZSkmJnQucGFyZW50Tm9kZXx8dCx2PWwuam9pbihcIixcIil9aWYodil0cnl7cmV0dXJuIEguYXBwbHkobixxLmNhbGwobS5xdWVyeVNlbGVjdG9yQWxsKHYpLDApKSxufWNhdGNoKGIpe31maW5hbGx5e2Z8fHQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIil9fX1yZXR1cm4gd3QoZS5yZXBsYWNlKFcsXCIkMVwiKSx0LG4scil9YT1zdC5pc1hNTD1mdW5jdGlvbihlKXt2YXIgdD1lJiYoZS5vd25lckRvY3VtZW50fHxlKS5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIHQ/XCJIVE1MXCIhPT10Lm5vZGVOYW1lOiExfSxjPXN0LnNldERvY3VtZW50PWZ1bmN0aW9uKGUpe3ZhciBuPWU/ZS5vd25lckRvY3VtZW50fHxlOnc7cmV0dXJuIG4hPT1wJiY5PT09bi5ub2RlVHlwZSYmbi5kb2N1bWVudEVsZW1lbnQ/KHA9bixmPW4uZG9jdW1lbnRFbGVtZW50LGQ9YShuKSxULnRhZ05hbWVOb0NvbW1lbnRzPWF0KGZ1bmN0aW9uKGUpe3JldHVybiBlLmFwcGVuZENoaWxkKG4uY3JlYXRlQ29tbWVudChcIlwiKSksIWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aH0pLFQuYXR0cmlidXRlcz1hdChmdW5jdGlvbihlKXtlLmlubmVySFRNTD1cIjxzZWxlY3Q+PC9zZWxlY3Q+XCI7dmFyIHQ9dHlwZW9mIGUubGFzdENoaWxkLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpO3JldHVyblwiYm9vbGVhblwiIT09dCYmXCJzdHJpbmdcIiE9PXR9KSxULmdldEJ5Q2xhc3NOYW1lPWF0KGZ1bmN0aW9uKGUpe3JldHVybiBlLmlubmVySFRNTD1cIjxkaXYgY2xhc3M9J2hpZGRlbiBlJz48L2Rpdj48ZGl2IGNsYXNzPSdoaWRkZW4nPjwvZGl2PlwiLGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZVwiKS5sZW5ndGg/KGUubGFzdENoaWxkLmNsYXNzTmFtZT1cImVcIiwyPT09ZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZVwiKS5sZW5ndGgpOiExfSksVC5nZXRCeU5hbWU9YXQoZnVuY3Rpb24oZSl7ZS5pZD14KzAsZS5pbm5lckhUTUw9XCI8YSBuYW1lPSdcIit4K1wiJz48L2E+PGRpdiBuYW1lPSdcIit4K1wiJz48L2Rpdj5cIixmLmluc2VydEJlZm9yZShlLGYuZmlyc3RDaGlsZCk7dmFyIHQ9bi5nZXRFbGVtZW50c0J5TmFtZSYmbi5nZXRFbGVtZW50c0J5TmFtZSh4KS5sZW5ndGg9PT0yK24uZ2V0RWxlbWVudHNCeU5hbWUoeCswKS5sZW5ndGg7cmV0dXJuIFQuZ2V0SWROb3ROYW1lPSFuLmdldEVsZW1lbnRCeUlkKHgpLGYucmVtb3ZlQ2hpbGQoZSksdH0pLGkuYXR0ckhhbmRsZT1hdChmdW5jdGlvbihlKXtyZXR1cm4gZS5pbm5lckhUTUw9XCI8YSBocmVmPScjJz48L2E+XCIsZS5maXJzdENoaWxkJiZ0eXBlb2YgZS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSE9PUEmJlwiI1wiPT09ZS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIil9KT97fTp7aHJlZjpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIsMil9LHR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKFwidHlwZVwiKX19LFQuZ2V0SWROb3ROYW1lPyhpLmZpbmQuSUQ9ZnVuY3Rpb24oZSx0KXtpZih0eXBlb2YgdC5nZXRFbGVtZW50QnlJZCE9PUEmJiFkKXt2YXIgbj10LmdldEVsZW1lbnRCeUlkKGUpO3JldHVybiBuJiZuLnBhcmVudE5vZGU/W25dOltdfX0saS5maWx0ZXIuSUQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5yZXBsYWNlKGV0LHR0KTtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKFwiaWRcIik9PT10fX0pOihpLmZpbmQuSUQ9ZnVuY3Rpb24oZSxuKXtpZih0eXBlb2Ygbi5nZXRFbGVtZW50QnlJZCE9PUEmJiFkKXt2YXIgcj1uLmdldEVsZW1lbnRCeUlkKGUpO3JldHVybiByP3IuaWQ9PT1lfHx0eXBlb2Ygci5nZXRBdHRyaWJ1dGVOb2RlIT09QSYmci5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIikudmFsdWU9PT1lP1tyXTp0OltdfX0saS5maWx0ZXIuSUQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5yZXBsYWNlKGV0LHR0KTtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIG49dHlwZW9mIGUuZ2V0QXR0cmlidXRlTm9kZSE9PUEmJmUuZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO3JldHVybiBuJiZuLnZhbHVlPT09dH19KSxpLmZpbmQuVEFHPVQudGFnTmFtZU5vQ29tbWVudHM/ZnVuY3Rpb24oZSxuKXtyZXR1cm4gdHlwZW9mIG4uZ2V0RWxlbWVudHNCeVRhZ05hbWUhPT1BP24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dH06ZnVuY3Rpb24oZSx0KXt2YXIgbixyPVtdLGk9MCxvPXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk7aWYoXCIqXCI9PT1lKXt3aGlsZShuPW9baSsrXSkxPT09bi5ub2RlVHlwZSYmci5wdXNoKG4pO3JldHVybiByfXJldHVybiBvfSxpLmZpbmQuTkFNRT1ULmdldEJ5TmFtZSYmZnVuY3Rpb24oZSxuKXtyZXR1cm4gdHlwZW9mIG4uZ2V0RWxlbWVudHNCeU5hbWUhPT1BP24uZ2V0RWxlbWVudHNCeU5hbWUobmFtZSk6dH0saS5maW5kLkNMQVNTPVQuZ2V0QnlDbGFzc05hbWUmJmZ1bmN0aW9uKGUsbil7cmV0dXJuIHR5cGVvZiBuLmdldEVsZW1lbnRzQnlDbGFzc05hbWU9PT1BfHxkP3Q6bi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGUpfSxnPVtdLGg9W1wiOmZvY3VzXCJdLChULnFzYT1ydChuLnF1ZXJ5U2VsZWN0b3JBbGwpKSYmKGF0KGZ1bmN0aW9uKGUpe2UuaW5uZXJIVE1MPVwiPHNlbGVjdD48b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiLGUucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RofHxoLnB1c2goXCJcXFxcW1wiK18rXCIqKD86Y2hlY2tlZHxkaXNhYmxlZHxpc21hcHxtdWx0aXBsZXxyZWFkb25seXxzZWxlY3RlZHx2YWx1ZSlcIiksZS5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RofHxoLnB1c2goXCI6Y2hlY2tlZFwiKX0pLGF0KGZ1bmN0aW9uKGUpe2UuaW5uZXJIVE1MPVwiPGlucHV0IHR5cGU9J2hpZGRlbicgaT0nJy8+XCIsZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2lePScnXVwiKS5sZW5ndGgmJmgucHVzaChcIlsqXiRdPVwiK18rXCIqKD86XFxcIlxcXCJ8JycpXCIpLGUucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aHx8aC5wdXNoKFwiOmVuYWJsZWRcIixcIjpkaXNhYmxlZFwiKSxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpLGgucHVzaChcIiwuKjpcIil9KSksKFQubWF0Y2hlc1NlbGVjdG9yPXJ0KG09Zi5tYXRjaGVzU2VsZWN0b3J8fGYubW96TWF0Y2hlc1NlbGVjdG9yfHxmLndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8Zi5vTWF0Y2hlc1NlbGVjdG9yfHxmLm1zTWF0Y2hlc1NlbGVjdG9yKSkmJmF0KGZ1bmN0aW9uKGUpe1QuZGlzY29ubmVjdGVkTWF0Y2g9bS5jYWxsKGUsXCJkaXZcIiksbS5jYWxsKGUsXCJbcyE9JyddOnhcIiksZy5wdXNoKFwiIT1cIixSKX0pLGg9UmVnRXhwKGguam9pbihcInxcIikpLGc9UmVnRXhwKGcuam9pbihcInxcIikpLHk9cnQoZi5jb250YWlucyl8fGYuY29tcGFyZURvY3VtZW50UG9zaXRpb24/ZnVuY3Rpb24oZSx0KXt2YXIgbj05PT09ZS5ub2RlVHlwZT9lLmRvY3VtZW50RWxlbWVudDplLHI9dCYmdC5wYXJlbnROb2RlO3JldHVybiBlPT09cnx8ISghcnx8MSE9PXIubm9kZVR5cGV8fCEobi5jb250YWlucz9uLmNvbnRhaW5zKHIpOmUuY29tcGFyZURvY3VtZW50UG9zaXRpb24mJjE2JmUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ocikpKX06ZnVuY3Rpb24oZSx0KXtpZih0KXdoaWxlKHQ9dC5wYXJlbnROb2RlKWlmKHQ9PT1lKXJldHVybiEwO3JldHVybiExfSx2PWYuY29tcGFyZURvY3VtZW50UG9zaXRpb24/ZnVuY3Rpb24oZSx0KXt2YXIgcjtyZXR1cm4gZT09PXQ/KHU9ITAsMCk6KHI9dC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbih0KSk/MSZyfHxlLnBhcmVudE5vZGUmJjExPT09ZS5wYXJlbnROb2RlLm5vZGVUeXBlP2U9PT1ufHx5KHcsZSk/LTE6dD09PW58fHkodyx0KT8xOjA6NCZyPy0xOjE6ZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbj8tMToxfTpmdW5jdGlvbihlLHQpe3ZhciByLGk9MCxvPWUucGFyZW50Tm9kZSxhPXQucGFyZW50Tm9kZSxzPVtlXSxsPVt0XTtpZihlPT09dClyZXR1cm4gdT0hMCwwO2lmKCFvfHwhYSlyZXR1cm4gZT09PW4/LTE6dD09PW4/MTpvPy0xOmE/MTowO2lmKG89PT1hKXJldHVybiB1dChlLHQpO3I9ZTt3aGlsZShyPXIucGFyZW50Tm9kZSlzLnVuc2hpZnQocik7cj10O3doaWxlKHI9ci5wYXJlbnROb2RlKWwudW5zaGlmdChyKTt3aGlsZShzW2ldPT09bFtpXSlpKys7cmV0dXJuIGk/dXQoc1tpXSxsW2ldKTpzW2ldPT09dz8tMTpsW2ldPT09dz8xOjB9LHU9ITEsWzAsMF0uc29ydCh2KSxULmRldGVjdER1cGxpY2F0ZXM9dSxwKTpwfSxzdC5tYXRjaGVzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHN0KGUsbnVsbCxudWxsLHQpfSxzdC5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24oZSx0KXtpZigoZS5vd25lckRvY3VtZW50fHxlKSE9PXAmJmMoZSksdD10LnJlcGxhY2UoWixcIj0nJDEnXVwiKSwhKCFULm1hdGNoZXNTZWxlY3Rvcnx8ZHx8ZyYmZy50ZXN0KHQpfHxoLnRlc3QodCkpKXRyeXt2YXIgbj1tLmNhbGwoZSx0KTtpZihufHxULmRpc2Nvbm5lY3RlZE1hdGNofHxlLmRvY3VtZW50JiYxMSE9PWUuZG9jdW1lbnQubm9kZVR5cGUpcmV0dXJuIG59Y2F0Y2gocil7fXJldHVybiBzdCh0LHAsbnVsbCxbZV0pLmxlbmd0aD4wfSxzdC5jb250YWlucz1mdW5jdGlvbihlLHQpe3JldHVybihlLm93bmVyRG9jdW1lbnR8fGUpIT09cCYmYyhlKSx5KGUsdCl9LHN0LmF0dHI9ZnVuY3Rpb24oZSx0KXt2YXIgbjtyZXR1cm4oZS5vd25lckRvY3VtZW50fHxlKSE9PXAmJmMoZSksZHx8KHQ9dC50b0xvd2VyQ2FzZSgpKSwobj1pLmF0dHJIYW5kbGVbdF0pP24oZSk6ZHx8VC5hdHRyaWJ1dGVzP2UuZ2V0QXR0cmlidXRlKHQpOigobj1lLmdldEF0dHJpYnV0ZU5vZGUodCkpfHxlLmdldEF0dHJpYnV0ZSh0KSkmJmVbdF09PT0hMD90Om4mJm4uc3BlY2lmaWVkP24udmFsdWU6bnVsbH0sc3QuZXJyb3I9ZnVuY3Rpb24oZSl7dGhyb3cgRXJyb3IoXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIitlKX0sc3QudW5pcXVlU29ydD1mdW5jdGlvbihlKXt2YXIgdCxuPVtdLHI9MSxpPTA7aWYodT0hVC5kZXRlY3REdXBsaWNhdGVzLGUuc29ydCh2KSx1KXtmb3IoO3Q9ZVtyXTtyKyspdD09PWVbci0xXSYmKGk9bi5wdXNoKHIpKTt3aGlsZShpLS0pZS5zcGxpY2UobltpXSwxKX1yZXR1cm4gZX07ZnVuY3Rpb24gdXQoZSx0KXt2YXIgbj10JiZlLHI9biYmKH50LnNvdXJjZUluZGV4fHxqKS0ofmUuc291cmNlSW5kZXh8fGopO2lmKHIpcmV0dXJuIHI7aWYobil3aGlsZShuPW4ubmV4dFNpYmxpbmcpaWYobj09PXQpcmV0dXJuLTE7cmV0dXJuIGU/MTotMX1mdW5jdGlvbiBsdChlKXtyZXR1cm4gZnVuY3Rpb24odCl7dmFyIG49dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PW4mJnQudHlwZT09PWV9fWZ1bmN0aW9uIGN0KGUpe3JldHVybiBmdW5jdGlvbih0KXt2YXIgbj10Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuKFwiaW5wdXRcIj09PW58fFwiYnV0dG9uXCI9PT1uKSYmdC50eXBlPT09ZX19ZnVuY3Rpb24gcHQoZSl7cmV0dXJuIG90KGZ1bmN0aW9uKHQpe3JldHVybiB0PSt0LG90KGZ1bmN0aW9uKG4scil7dmFyIGksbz1lKFtdLG4ubGVuZ3RoLHQpLGE9by5sZW5ndGg7d2hpbGUoYS0tKW5baT1vW2FdXSYmKG5baV09IShyW2ldPW5baV0pKX0pfSl9bz1zdC5nZXRUZXh0PWZ1bmN0aW9uKGUpe3ZhciB0LG49XCJcIixyPTAsaT1lLm5vZGVUeXBlO2lmKGkpe2lmKDE9PT1pfHw5PT09aXx8MTE9PT1pKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZS50ZXh0Q29udGVudClyZXR1cm4gZS50ZXh0Q29udGVudDtmb3IoZT1lLmZpcnN0Q2hpbGQ7ZTtlPWUubmV4dFNpYmxpbmcpbis9byhlKX1lbHNlIGlmKDM9PT1pfHw0PT09aSlyZXR1cm4gZS5ub2RlVmFsdWV9ZWxzZSBmb3IoO3Q9ZVtyXTtyKyspbis9byh0KTtyZXR1cm4gbn0saT1zdC5zZWxlY3RvcnM9e2NhY2hlTGVuZ3RoOjUwLGNyZWF0ZVBzZXVkbzpvdCxtYXRjaDpVLGZpbmQ6e30scmVsYXRpdmU6e1wiPlwiOntkaXI6XCJwYXJlbnROb2RlXCIsZmlyc3Q6ITB9LFwiIFwiOntkaXI6XCJwYXJlbnROb2RlXCJ9LFwiK1wiOntkaXI6XCJwcmV2aW91c1NpYmxpbmdcIixmaXJzdDohMH0sXCJ+XCI6e2RpcjpcInByZXZpb3VzU2libGluZ1wifX0scHJlRmlsdGVyOntBVFRSOmZ1bmN0aW9uKGUpe3JldHVybiBlWzFdPWVbMV0ucmVwbGFjZShldCx0dCksZVszXT0oZVs0XXx8ZVs1XXx8XCJcIikucmVwbGFjZShldCx0dCksXCJ+PVwiPT09ZVsyXSYmKGVbM109XCIgXCIrZVszXStcIiBcIiksZS5zbGljZSgwLDQpfSxDSElMRDpmdW5jdGlvbihlKXtyZXR1cm4gZVsxXT1lWzFdLnRvTG93ZXJDYXNlKCksXCJudGhcIj09PWVbMV0uc2xpY2UoMCwzKT8oZVszXXx8c3QuZXJyb3IoZVswXSksZVs0XT0rKGVbNF0/ZVs1XSsoZVs2XXx8MSk6MiooXCJldmVuXCI9PT1lWzNdfHxcIm9kZFwiPT09ZVszXSkpLGVbNV09KyhlWzddK2VbOF18fFwib2RkXCI9PT1lWzNdKSk6ZVszXSYmc3QuZXJyb3IoZVswXSksZX0sUFNFVURPOmZ1bmN0aW9uKGUpe3ZhciB0LG49IWVbNV0mJmVbMl07cmV0dXJuIFUuQ0hJTEQudGVzdChlWzBdKT9udWxsOihlWzRdP2VbMl09ZVs0XTpuJiZ6LnRlc3QobikmJih0PWZ0KG4sITApKSYmKHQ9bi5pbmRleE9mKFwiKVwiLG4ubGVuZ3RoLXQpLW4ubGVuZ3RoKSYmKGVbMF09ZVswXS5zbGljZSgwLHQpLGVbMl09bi5zbGljZSgwLHQpKSxlLnNsaWNlKDAsMykpfX0sZmlsdGVyOntUQUc6ZnVuY3Rpb24oZSl7cmV0dXJuXCIqXCI9PT1lP2Z1bmN0aW9uKCl7cmV0dXJuITB9OihlPWUucmVwbGFjZShldCx0dCkudG9Mb3dlckNhc2UoKSxmdW5jdGlvbih0KXtyZXR1cm4gdC5ub2RlTmFtZSYmdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09ZX0pfSxDTEFTUzpmdW5jdGlvbihlKXt2YXIgdD1rW2UrXCIgXCJdO3JldHVybiB0fHwodD1SZWdFeHAoXCIoXnxcIitfK1wiKVwiK2UrXCIoXCIrXytcInwkKVwiKSkmJmsoZSxmdW5jdGlvbihlKXtyZXR1cm4gdC50ZXN0KGUuY2xhc3NOYW1lfHx0eXBlb2YgZS5nZXRBdHRyaWJ1dGUhPT1BJiZlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKX0pfSxBVFRSOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIGk9c3QuYXR0cihyLGUpO3JldHVybiBudWxsPT1pP1wiIT1cIj09PXQ6dD8oaSs9XCJcIixcIj1cIj09PXQ/aT09PW46XCIhPVwiPT09dD9pIT09bjpcIl49XCI9PT10P24mJjA9PT1pLmluZGV4T2Yobik6XCIqPVwiPT09dD9uJiZpLmluZGV4T2Yobik+LTE6XCIkPVwiPT09dD9uJiZpLnNsaWNlKC1uLmxlbmd0aCk9PT1uOlwifj1cIj09PXQ/KFwiIFwiK2krXCIgXCIpLmluZGV4T2Yobik+LTE6XCJ8PVwiPT09dD9pPT09bnx8aS5zbGljZSgwLG4ubGVuZ3RoKzEpPT09bitcIi1cIjohMSk6ITB9fSxDSElMRDpmdW5jdGlvbihlLHQsbixyLGkpe3ZhciBvPVwibnRoXCIhPT1lLnNsaWNlKDAsMyksYT1cImxhc3RcIiE9PWUuc2xpY2UoLTQpLHM9XCJvZi10eXBlXCI9PT10O3JldHVybiAxPT09ciYmMD09PWk/ZnVuY3Rpb24oZSl7cmV0dXJuISFlLnBhcmVudE5vZGV9OmZ1bmN0aW9uKHQsbix1KXt2YXIgbCxjLHAsZixkLGgsZz1vIT09YT9cIm5leHRTaWJsaW5nXCI6XCJwcmV2aW91c1NpYmxpbmdcIixtPXQucGFyZW50Tm9kZSx5PXMmJnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSx2PSF1JiYhcztpZihtKXtpZihvKXt3aGlsZShnKXtwPXQ7d2hpbGUocD1wW2ddKWlmKHM/cC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09eToxPT09cC5ub2RlVHlwZSlyZXR1cm4hMTtoPWc9XCJvbmx5XCI9PT1lJiYhaCYmXCJuZXh0U2libGluZ1wifXJldHVybiEwfWlmKGg9W2E/bS5maXJzdENoaWxkOm0ubGFzdENoaWxkXSxhJiZ2KXtjPW1beF18fChtW3hdPXt9KSxsPWNbZV18fFtdLGQ9bFswXT09PU4mJmxbMV0sZj1sWzBdPT09TiYmbFsyXSxwPWQmJm0uY2hpbGROb2Rlc1tkXTt3aGlsZShwPSsrZCYmcCYmcFtnXXx8KGY9ZD0wKXx8aC5wb3AoKSlpZigxPT09cC5ub2RlVHlwZSYmKytmJiZwPT09dCl7Y1tlXT1bTixkLGZdO2JyZWFrfX1lbHNlIGlmKHYmJihsPSh0W3hdfHwodFt4XT17fSkpW2VdKSYmbFswXT09PU4pZj1sWzFdO2Vsc2Ugd2hpbGUocD0rK2QmJnAmJnBbZ118fChmPWQ9MCl8fGgucG9wKCkpaWYoKHM/cC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09eToxPT09cC5ub2RlVHlwZSkmJisrZiYmKHYmJigocFt4XXx8KHBbeF09e30pKVtlXT1bTixmXSkscD09PXQpKWJyZWFrO3JldHVybiBmLT1pLGY9PT1yfHwwPT09ZiVyJiZmL3I+PTB9fX0sUFNFVURPOmZ1bmN0aW9uKGUsdCl7dmFyIG4scj1pLnBzZXVkb3NbZV18fGkuc2V0RmlsdGVyc1tlLnRvTG93ZXJDYXNlKCldfHxzdC5lcnJvcihcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIrZSk7cmV0dXJuIHJbeF0/cih0KTpyLmxlbmd0aD4xPyhuPVtlLGUsXCJcIix0XSxpLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoZS50b0xvd2VyQ2FzZSgpKT9vdChmdW5jdGlvbihlLG4pe3ZhciBpLG89cihlLHQpLGE9by5sZW5ndGg7d2hpbGUoYS0tKWk9TS5jYWxsKGUsb1thXSksZVtpXT0hKG5baV09b1thXSl9KTpmdW5jdGlvbihlKXtyZXR1cm4gcihlLDAsbil9KTpyfX0scHNldWRvczp7bm90Om90KGZ1bmN0aW9uKGUpe3ZhciB0PVtdLG49W10scj1zKGUucmVwbGFjZShXLFwiJDFcIikpO3JldHVybiByW3hdP290KGZ1bmN0aW9uKGUsdCxuLGkpe3ZhciBvLGE9cihlLG51bGwsaSxbXSkscz1lLmxlbmd0aDt3aGlsZShzLS0pKG89YVtzXSkmJihlW3NdPSEodFtzXT1vKSl9KTpmdW5jdGlvbihlLGksbyl7cmV0dXJuIHRbMF09ZSxyKHQsbnVsbCxvLG4pLCFuLnBvcCgpfX0pLGhhczpvdChmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIHN0KGUsdCkubGVuZ3RoPjB9fSksY29udGFpbnM6b3QoZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybih0LnRleHRDb250ZW50fHx0LmlubmVyVGV4dHx8byh0KSkuaW5kZXhPZihlKT4tMX19KSxsYW5nOm90KGZ1bmN0aW9uKGUpe3JldHVybiBYLnRlc3QoZXx8XCJcIil8fHN0LmVycm9yKFwidW5zdXBwb3J0ZWQgbGFuZzogXCIrZSksZT1lLnJlcGxhY2UoZXQsdHQpLnRvTG93ZXJDYXNlKCksZnVuY3Rpb24odCl7dmFyIG47ZG8gaWYobj1kP3QuZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIil8fHQuZ2V0QXR0cmlidXRlKFwibGFuZ1wiKTp0LmxhbmcpcmV0dXJuIG49bi50b0xvd2VyQ2FzZSgpLG49PT1lfHwwPT09bi5pbmRleE9mKGUrXCItXCIpO3doaWxlKCh0PXQucGFyZW50Tm9kZSkmJjE9PT10Lm5vZGVUeXBlKTtyZXR1cm4hMX19KSx0YXJnZXQ6ZnVuY3Rpb24odCl7dmFyIG49ZS5sb2NhdGlvbiYmZS5sb2NhdGlvbi5oYXNoO3JldHVybiBuJiZuLnNsaWNlKDEpPT09dC5pZH0scm9vdDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PWZ9LGZvY3VzOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09cC5hY3RpdmVFbGVtZW50JiYoIXAuaGFzRm9jdXN8fHAuaGFzRm9jdXMoKSkmJiEhKGUudHlwZXx8ZS5ocmVmfHx+ZS50YWJJbmRleCl9LGVuYWJsZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZGlzYWJsZWQ9PT0hMX0sZGlzYWJsZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZGlzYWJsZWQ9PT0hMH0sY2hlY2tlZDpmdW5jdGlvbihlKXt2YXIgdD1lLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuXCJpbnB1dFwiPT09dCYmISFlLmNoZWNrZWR8fFwib3B0aW9uXCI9PT10JiYhIWUuc2VsZWN0ZWR9LHNlbGVjdGVkOmZ1bmN0aW9uKGUpe3JldHVybiBlLnBhcmVudE5vZGUmJmUucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4LGUuc2VsZWN0ZWQ9PT0hMH0sZW1wdHk6ZnVuY3Rpb24oZSl7Zm9yKGU9ZS5maXJzdENoaWxkO2U7ZT1lLm5leHRTaWJsaW5nKWlmKGUubm9kZU5hbWU+XCJAXCJ8fDM9PT1lLm5vZGVUeXBlfHw0PT09ZS5ub2RlVHlwZSlyZXR1cm4hMTtyZXR1cm4hMH0scGFyZW50OmZ1bmN0aW9uKGUpe3JldHVybiFpLnBzZXVkb3MuZW1wdHkoZSl9LGhlYWRlcjpmdW5jdGlvbihlKXtyZXR1cm4gUS50ZXN0KGUubm9kZU5hbWUpfSxpbnB1dDpmdW5jdGlvbihlKXtyZXR1cm4gRy50ZXN0KGUubm9kZU5hbWUpfSxidXR0b246ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PXQmJlwiYnV0dG9uXCI9PT1lLnR5cGV8fFwiYnV0dG9uXCI9PT10fSx0ZXh0OmZ1bmN0aW9uKGUpe3ZhciB0O3JldHVyblwiaW5wdXRcIj09PWUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSYmXCJ0ZXh0XCI9PT1lLnR5cGUmJihudWxsPT0odD1lLmdldEF0dHJpYnV0ZShcInR5cGVcIikpfHx0LnRvTG93ZXJDYXNlKCk9PT1lLnR5cGUpfSxmaXJzdDpwdChmdW5jdGlvbigpe3JldHVyblswXX0pLGxhc3Q6cHQoZnVuY3Rpb24oZSx0KXtyZXR1cm5bdC0xXX0pLGVxOnB0KGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm5bMD5uP24rdDpuXX0pLGV2ZW46cHQoZnVuY3Rpb24oZSx0KXt2YXIgbj0wO2Zvcig7dD5uO24rPTIpZS5wdXNoKG4pO3JldHVybiBlfSksb2RkOnB0KGZ1bmN0aW9uKGUsdCl7dmFyIG49MTtmb3IoO3Q+bjtuKz0yKWUucHVzaChuKTtyZXR1cm4gZX0pLGx0OnB0KGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj0wPm4/bit0Om47Zm9yKDstLXI+PTA7KWUucHVzaChyKTtyZXR1cm4gZX0pLGd0OnB0KGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj0wPm4/bit0Om47Zm9yKDt0PisrcjspZS5wdXNoKHIpO3JldHVybiBlfSl9fTtmb3IobiBpbntyYWRpbzohMCxjaGVja2JveDohMCxmaWxlOiEwLHBhc3N3b3JkOiEwLGltYWdlOiEwfSlpLnBzZXVkb3Nbbl09bHQobik7Zm9yKG4gaW57c3VibWl0OiEwLHJlc2V0OiEwfSlpLnBzZXVkb3Nbbl09Y3Qobik7ZnVuY3Rpb24gZnQoZSx0KXt2YXIgbixyLG8sYSxzLHUsbCxjPUVbZStcIiBcIl07aWYoYylyZXR1cm4gdD8wOmMuc2xpY2UoMCk7cz1lLHU9W10sbD1pLnByZUZpbHRlcjt3aGlsZShzKXsoIW58fChyPSQuZXhlYyhzKSkpJiYociYmKHM9cy5zbGljZShyWzBdLmxlbmd0aCl8fHMpLHUucHVzaChvPVtdKSksbj0hMSwocj1JLmV4ZWMocykpJiYobj1yLnNoaWZ0KCksby5wdXNoKHt2YWx1ZTpuLHR5cGU6clswXS5yZXBsYWNlKFcsXCIgXCIpfSkscz1zLnNsaWNlKG4ubGVuZ3RoKSk7Zm9yKGEgaW4gaS5maWx0ZXIpIShyPVVbYV0uZXhlYyhzKSl8fGxbYV0mJiEocj1sW2FdKHIpKXx8KG49ci5zaGlmdCgpLG8ucHVzaCh7dmFsdWU6bix0eXBlOmEsbWF0Y2hlczpyfSkscz1zLnNsaWNlKG4ubGVuZ3RoKSk7aWYoIW4pYnJlYWt9cmV0dXJuIHQ/cy5sZW5ndGg6cz9zdC5lcnJvcihlKTpFKGUsdSkuc2xpY2UoMCl9ZnVuY3Rpb24gZHQoZSl7dmFyIHQ9MCxuPWUubGVuZ3RoLHI9XCJcIjtmb3IoO24+dDt0Kyspcis9ZVt0XS52YWx1ZTtyZXR1cm4gcn1mdW5jdGlvbiBodChlLHQsbil7dmFyIGk9dC5kaXIsbz1uJiZcInBhcmVudE5vZGVcIj09PWksYT1DKys7cmV0dXJuIHQuZmlyc3Q/ZnVuY3Rpb24odCxuLHIpe3doaWxlKHQ9dFtpXSlpZigxPT09dC5ub2RlVHlwZXx8bylyZXR1cm4gZSh0LG4scil9OmZ1bmN0aW9uKHQsbixzKXt2YXIgdSxsLGMscD1OK1wiIFwiK2E7aWYocyl7d2hpbGUodD10W2ldKWlmKCgxPT09dC5ub2RlVHlwZXx8bykmJmUodCxuLHMpKXJldHVybiEwfWVsc2Ugd2hpbGUodD10W2ldKWlmKDE9PT10Lm5vZGVUeXBlfHxvKWlmKGM9dFt4XXx8KHRbeF09e30pLChsPWNbaV0pJiZsWzBdPT09cCl7aWYoKHU9bFsxXSk9PT0hMHx8dT09PXIpcmV0dXJuIHU9PT0hMH1lbHNlIGlmKGw9Y1tpXT1bcF0sbFsxXT1lKHQsbixzKXx8cixsWzFdPT09ITApcmV0dXJuITB9fWZ1bmN0aW9uIGd0KGUpe3JldHVybiBlLmxlbmd0aD4xP2Z1bmN0aW9uKHQsbixyKXt2YXIgaT1lLmxlbmd0aDt3aGlsZShpLS0paWYoIWVbaV0odCxuLHIpKXJldHVybiExO3JldHVybiEwfTplWzBdfWZ1bmN0aW9uIG10KGUsdCxuLHIsaSl7dmFyIG8sYT1bXSxzPTAsdT1lLmxlbmd0aCxsPW51bGwhPXQ7Zm9yKDt1PnM7cysrKShvPWVbc10pJiYoIW58fG4obyxyLGkpKSYmKGEucHVzaChvKSxsJiZ0LnB1c2gocykpO3JldHVybiBhfWZ1bmN0aW9uIHl0KGUsdCxuLHIsaSxvKXtyZXR1cm4gciYmIXJbeF0mJihyPXl0KHIpKSxpJiYhaVt4XSYmKGk9eXQoaSxvKSksb3QoZnVuY3Rpb24obyxhLHMsdSl7dmFyIGwsYyxwLGY9W10sZD1bXSxoPWEubGVuZ3RoLGc9b3x8eHQodHx8XCIqXCIscy5ub2RlVHlwZT9bc106cyxbXSksbT0hZXx8IW8mJnQ/ZzptdChnLGYsZSxzLHUpLHk9bj9pfHwobz9lOmh8fHIpP1tdOmE6bTtpZihuJiZuKG0seSxzLHUpLHIpe2w9bXQoeSxkKSxyKGwsW10scyx1KSxjPWwubGVuZ3RoO3doaWxlKGMtLSkocD1sW2NdKSYmKHlbZFtjXV09IShtW2RbY11dPXApKX1pZihvKXtpZihpfHxlKXtpZihpKXtsPVtdLGM9eS5sZW5ndGg7d2hpbGUoYy0tKShwPXlbY10pJiZsLnB1c2gobVtjXT1wKTtpKG51bGwseT1bXSxsLHUpfWM9eS5sZW5ndGg7d2hpbGUoYy0tKShwPXlbY10pJiYobD1pP00uY2FsbChvLHApOmZbY10pPi0xJiYob1tsXT0hKGFbbF09cCkpfX1lbHNlIHk9bXQoeT09PWE/eS5zcGxpY2UoaCx5Lmxlbmd0aCk6eSksaT9pKG51bGwsYSx5LHUpOkguYXBwbHkoYSx5KX0pfWZ1bmN0aW9uIHZ0KGUpe3ZhciB0LG4scixvPWUubGVuZ3RoLGE9aS5yZWxhdGl2ZVtlWzBdLnR5cGVdLHM9YXx8aS5yZWxhdGl2ZVtcIiBcIl0sdT1hPzE6MCxjPWh0KGZ1bmN0aW9uKGUpe3JldHVybiBlPT09dH0scywhMCkscD1odChmdW5jdGlvbihlKXtyZXR1cm4gTS5jYWxsKHQsZSk+LTF9LHMsITApLGY9W2Z1bmN0aW9uKGUsbixyKXtyZXR1cm4hYSYmKHJ8fG4hPT1sKXx8KCh0PW4pLm5vZGVUeXBlP2MoZSxuLHIpOnAoZSxuLHIpKX1dO2Zvcig7bz51O3UrKylpZihuPWkucmVsYXRpdmVbZVt1XS50eXBlXSlmPVtodChndChmKSxuKV07ZWxzZXtpZihuPWkuZmlsdGVyW2VbdV0udHlwZV0uYXBwbHkobnVsbCxlW3VdLm1hdGNoZXMpLG5beF0pe2ZvcihyPSsrdTtvPnI7cisrKWlmKGkucmVsYXRpdmVbZVtyXS50eXBlXSlicmVhaztyZXR1cm4geXQodT4xJiZndChmKSx1PjEmJmR0KGUuc2xpY2UoMCx1LTEpKS5yZXBsYWNlKFcsXCIkMVwiKSxuLHI+dSYmdnQoZS5zbGljZSh1LHIpKSxvPnImJnZ0KGU9ZS5zbGljZShyKSksbz5yJiZkdChlKSl9Zi5wdXNoKG4pfXJldHVybiBndChmKX1mdW5jdGlvbiBidChlLHQpe3ZhciBuPTAsbz10Lmxlbmd0aD4wLGE9ZS5sZW5ndGg+MCxzPWZ1bmN0aW9uKHMsdSxjLGYsZCl7dmFyIGgsZyxtLHk9W10sdj0wLGI9XCIwXCIseD1zJiZbXSx3PW51bGwhPWQsVD1sLEM9c3x8YSYmaS5maW5kLlRBRyhcIipcIixkJiZ1LnBhcmVudE5vZGV8fHUpLGs9Tis9bnVsbD09VD8xOk1hdGgucmFuZG9tKCl8fC4xO2Zvcih3JiYobD11IT09cCYmdSxyPW4pO251bGwhPShoPUNbYl0pO2IrKyl7aWYoYSYmaCl7Zz0wO3doaWxlKG09ZVtnKytdKWlmKG0oaCx1LGMpKXtmLnB1c2goaCk7YnJlYWt9dyYmKE49ayxyPSsrbil9byYmKChoPSFtJiZoKSYmdi0tLHMmJngucHVzaChoKSl9aWYodis9YixvJiZiIT09dil7Zz0wO3doaWxlKG09dFtnKytdKW0oeCx5LHUsYyk7aWYocyl7aWYodj4wKXdoaWxlKGItLSl4W2JdfHx5W2JdfHwoeVtiXT1MLmNhbGwoZikpO3k9bXQoeSl9SC5hcHBseShmLHkpLHcmJiFzJiZ5Lmxlbmd0aD4wJiZ2K3QubGVuZ3RoPjEmJnN0LnVuaXF1ZVNvcnQoZil9cmV0dXJuIHcmJihOPWssbD1UKSx4fTtyZXR1cm4gbz9vdChzKTpzfXM9c3QuY29tcGlsZT1mdW5jdGlvbihlLHQpe3ZhciBuLHI9W10saT1bXSxvPVNbZStcIiBcIl07aWYoIW8pe3R8fCh0PWZ0KGUpKSxuPXQubGVuZ3RoO3doaWxlKG4tLSlvPXZ0KHRbbl0pLG9beF0/ci5wdXNoKG8pOmkucHVzaChvKTtvPVMoZSxidChpLHIpKX1yZXR1cm4gb307ZnVuY3Rpb24geHQoZSx0LG4pe3ZhciByPTAsaT10Lmxlbmd0aDtmb3IoO2k+cjtyKyspc3QoZSx0W3JdLG4pO3JldHVybiBufWZ1bmN0aW9uIHd0KGUsdCxuLHIpe3ZhciBvLGEsdSxsLGMscD1mdChlKTtpZighciYmMT09PXAubGVuZ3RoKXtpZihhPXBbMF09cFswXS5zbGljZSgwKSxhLmxlbmd0aD4yJiZcIklEXCI9PT0odT1hWzBdKS50eXBlJiY5PT09dC5ub2RlVHlwZSYmIWQmJmkucmVsYXRpdmVbYVsxXS50eXBlXSl7aWYodD1pLmZpbmQuSUQodS5tYXRjaGVzWzBdLnJlcGxhY2UoZXQsdHQpLHQpWzBdLCF0KXJldHVybiBuO2U9ZS5zbGljZShhLnNoaWZ0KCkudmFsdWUubGVuZ3RoKX1vPVUubmVlZHNDb250ZXh0LnRlc3QoZSk/MDphLmxlbmd0aDt3aGlsZShvLS0pe2lmKHU9YVtvXSxpLnJlbGF0aXZlW2w9dS50eXBlXSlicmVhaztpZigoYz1pLmZpbmRbbF0pJiYocj1jKHUubWF0Y2hlc1swXS5yZXBsYWNlKGV0LHR0KSxWLnRlc3QoYVswXS50eXBlKSYmdC5wYXJlbnROb2RlfHx0KSkpe2lmKGEuc3BsaWNlKG8sMSksZT1yLmxlbmd0aCYmZHQoYSksIWUpcmV0dXJuIEguYXBwbHkobixxLmNhbGwociwwKSksbjticmVha319fXJldHVybiBzKGUscCkocix0LGQsbixWLnRlc3QoZSkpLG59aS5wc2V1ZG9zLm50aD1pLnBzZXVkb3MuZXE7ZnVuY3Rpb24gVHQoKXt9aS5maWx0ZXJzPVR0LnByb3RvdHlwZT1pLnBzZXVkb3MsaS5zZXRGaWx0ZXJzPW5ldyBUdCxjKCksc3QuYXR0cj1iLmF0dHIsYi5maW5kPXN0LGIuZXhwcj1zdC5zZWxlY3RvcnMsYi5leHByW1wiOlwiXT1iLmV4cHIucHNldWRvcyxiLnVuaXF1ZT1zdC51bmlxdWVTb3J0LGIudGV4dD1zdC5nZXRUZXh0LGIuaXNYTUxEb2M9c3QuaXNYTUwsYi5jb250YWlucz1zdC5jb250YWluc30oZSk7dmFyIGF0PS9VbnRpbCQvLHN0PS9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLHV0PS9eLlteOiNcXFtcXC4sXSokLyxsdD1iLmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LGN0PXtjaGlsZHJlbjohMCxjb250ZW50czohMCxuZXh0OiEwLHByZXY6ITB9O2IuZm4uZXh0ZW5kKHtmaW5kOmZ1bmN0aW9uKGUpe3ZhciB0LG4scixpPXRoaXMubGVuZ3RoO2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXJldHVybiByPXRoaXMsdGhpcy5wdXNoU3RhY2soYihlKS5maWx0ZXIoZnVuY3Rpb24oKXtmb3IodD0wO2k+dDt0KyspaWYoYi5jb250YWlucyhyW3RdLHRoaXMpKXJldHVybiEwfSkpO2ZvcihuPVtdLHQ9MDtpPnQ7dCsrKWIuZmluZChlLHRoaXNbdF0sbik7cmV0dXJuIG49dGhpcy5wdXNoU3RhY2soaT4xP2IudW5pcXVlKG4pOm4pLG4uc2VsZWN0b3I9KHRoaXMuc2VsZWN0b3I/dGhpcy5zZWxlY3RvcitcIiBcIjpcIlwiKStlLG59LGhhczpmdW5jdGlvbihlKXt2YXIgdCxuPWIoZSx0aGlzKSxyPW4ubGVuZ3RoO3JldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpe2Zvcih0PTA7cj50O3QrKylpZihiLmNvbnRhaW5zKHRoaXMsblt0XSkpcmV0dXJuITB9KX0sbm90OmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnB1c2hTdGFjayhmdCh0aGlzLGUsITEpKX0sZmlsdGVyOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnB1c2hTdGFjayhmdCh0aGlzLGUsITApKX0saXM6ZnVuY3Rpb24oZSl7cmV0dXJuISFlJiYoXCJzdHJpbmdcIj09dHlwZW9mIGU/bHQudGVzdChlKT9iKGUsdGhpcy5jb250ZXh0KS5pbmRleCh0aGlzWzBdKT49MDpiLmZpbHRlcihlLHRoaXMpLmxlbmd0aD4wOnRoaXMuZmlsdGVyKGUpLmxlbmd0aD4wKX0sY2xvc2VzdDpmdW5jdGlvbihlLHQpe3ZhciBuLHI9MCxpPXRoaXMubGVuZ3RoLG89W10sYT1sdC50ZXN0KGUpfHxcInN0cmluZ1wiIT10eXBlb2YgZT9iKGUsdHx8dGhpcy5jb250ZXh0KTowO2Zvcig7aT5yO3IrKyl7bj10aGlzW3JdO3doaWxlKG4mJm4ub3duZXJEb2N1bWVudCYmbiE9PXQmJjExIT09bi5ub2RlVHlwZSl7aWYoYT9hLmluZGV4KG4pPi0xOmIuZmluZC5tYXRjaGVzU2VsZWN0b3IobixlKSl7by5wdXNoKG4pO2JyZWFrfW49bi5wYXJlbnROb2RlfX1yZXR1cm4gdGhpcy5wdXNoU3RhY2soby5sZW5ndGg+MT9iLnVuaXF1ZShvKTpvKX0saW5kZXg6ZnVuY3Rpb24oZSl7cmV0dXJuIGU/XCJzdHJpbmdcIj09dHlwZW9mIGU/Yi5pbkFycmF5KHRoaXNbMF0sYihlKSk6Yi5pbkFycmF5KGUuanF1ZXJ5P2VbMF06ZSx0aGlzKTp0aGlzWzBdJiZ0aGlzWzBdLnBhcmVudE5vZGU/dGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGg6LTF9LGFkZDpmdW5jdGlvbihlLHQpe3ZhciBuPVwic3RyaW5nXCI9PXR5cGVvZiBlP2IoZSx0KTpiLm1ha2VBcnJheShlJiZlLm5vZGVUeXBlP1tlXTplKSxyPWIubWVyZ2UodGhpcy5nZXQoKSxuKTtyZXR1cm4gdGhpcy5wdXNoU3RhY2soYi51bmlxdWUocikpfSxhZGRCYWNrOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmFkZChudWxsPT1lP3RoaXMucHJldk9iamVjdDp0aGlzLnByZXZPYmplY3QuZmlsdGVyKGUpKX19KSxiLmZuLmFuZFNlbGY9Yi5mbi5hZGRCYWNrO2Z1bmN0aW9uIHB0KGUsdCl7ZG8gZT1lW3RdO3doaWxlKGUmJjEhPT1lLm5vZGVUeXBlKTtyZXR1cm4gZX1iLmVhY2goe3BhcmVudDpmdW5jdGlvbihlKXt2YXIgdD1lLnBhcmVudE5vZGU7cmV0dXJuIHQmJjExIT09dC5ub2RlVHlwZT90Om51bGx9LHBhcmVudHM6ZnVuY3Rpb24oZSl7cmV0dXJuIGIuZGlyKGUsXCJwYXJlbnROb2RlXCIpfSxwYXJlbnRzVW50aWw6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBiLmRpcihlLFwicGFyZW50Tm9kZVwiLG4pfSxuZXh0OmZ1bmN0aW9uKGUpe3JldHVybiBwdChlLFwibmV4dFNpYmxpbmdcIil9LHByZXY6ZnVuY3Rpb24oZSl7cmV0dXJuIHB0KGUsXCJwcmV2aW91c1NpYmxpbmdcIil9LG5leHRBbGw6ZnVuY3Rpb24oZSl7cmV0dXJuIGIuZGlyKGUsXCJuZXh0U2libGluZ1wiKX0scHJldkFsbDpmdW5jdGlvbihlKXtyZXR1cm4gYi5kaXIoZSxcInByZXZpb3VzU2libGluZ1wiKX0sbmV4dFVudGlsOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gYi5kaXIoZSxcIm5leHRTaWJsaW5nXCIsbil9LHByZXZVbnRpbDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGIuZGlyKGUsXCJwcmV2aW91c1NpYmxpbmdcIixuKX0sc2libGluZ3M6ZnVuY3Rpb24oZSl7cmV0dXJuIGIuc2libGluZygoZS5wYXJlbnROb2RlfHx7fSkuZmlyc3RDaGlsZCxlKX0sY2hpbGRyZW46ZnVuY3Rpb24oZSl7cmV0dXJuIGIuc2libGluZyhlLmZpcnN0Q2hpbGQpfSxjb250ZW50czpmdW5jdGlvbihlKXtyZXR1cm4gYi5ub2RlTmFtZShlLFwiaWZyYW1lXCIpP2UuY29udGVudERvY3VtZW50fHxlLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ6Yi5tZXJnZShbXSxlLmNoaWxkTm9kZXMpfX0sZnVuY3Rpb24oZSx0KXtiLmZuW2VdPWZ1bmN0aW9uKG4scil7dmFyIGk9Yi5tYXAodGhpcyx0LG4pO3JldHVybiBhdC50ZXN0KGUpfHwocj1uKSxyJiZcInN0cmluZ1wiPT10eXBlb2YgciYmKGk9Yi5maWx0ZXIocixpKSksaT10aGlzLmxlbmd0aD4xJiYhY3RbZV0/Yi51bmlxdWUoaSk6aSx0aGlzLmxlbmd0aD4xJiZzdC50ZXN0KGUpJiYoaT1pLnJldmVyc2UoKSksdGhpcy5wdXNoU3RhY2soaSl9fSksYi5leHRlbmQoe2ZpbHRlcjpmdW5jdGlvbihlLHQsbil7cmV0dXJuIG4mJihlPVwiOm5vdChcIitlK1wiKVwiKSwxPT09dC5sZW5ndGg/Yi5maW5kLm1hdGNoZXNTZWxlY3Rvcih0WzBdLGUpP1t0WzBdXTpbXTpiLmZpbmQubWF0Y2hlcyhlLHQpfSxkaXI6ZnVuY3Rpb24oZSxuLHIpe3ZhciBpPVtdLG89ZVtuXTt3aGlsZShvJiY5IT09by5ub2RlVHlwZSYmKHI9PT10fHwxIT09by5ub2RlVHlwZXx8IWIobykuaXMocikpKTE9PT1vLm5vZGVUeXBlJiZpLnB1c2gobyksbz1vW25dO3JldHVybiBpfSxzaWJsaW5nOmZ1bmN0aW9uKGUsdCl7dmFyIG49W107Zm9yKDtlO2U9ZS5uZXh0U2libGluZykxPT09ZS5ub2RlVHlwZSYmZSE9PXQmJm4ucHVzaChlKTtyZXR1cm4gbn19KTtmdW5jdGlvbiBmdChlLHQsbil7aWYodD10fHwwLGIuaXNGdW5jdGlvbih0KSlyZXR1cm4gYi5ncmVwKGUsZnVuY3Rpb24oZSxyKXt2YXIgaT0hIXQuY2FsbChlLHIsZSk7cmV0dXJuIGk9PT1ufSk7aWYodC5ub2RlVHlwZSlyZXR1cm4gYi5ncmVwKGUsZnVuY3Rpb24oZSl7cmV0dXJuIGU9PT10PT09bn0pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXt2YXIgcj1iLmdyZXAoZSxmdW5jdGlvbihlKXtyZXR1cm4gMT09PWUubm9kZVR5cGV9KTtpZih1dC50ZXN0KHQpKXJldHVybiBiLmZpbHRlcih0LHIsIW4pO3Q9Yi5maWx0ZXIodCxyKX1yZXR1cm4gYi5ncmVwKGUsZnVuY3Rpb24oZSl7cmV0dXJuIGIuaW5BcnJheShlLHQpPj0wPT09bn0pfWZ1bmN0aW9uIGR0KGUpe3ZhciB0PWh0LnNwbGl0KFwifFwiKSxuPWUuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2lmKG4uY3JlYXRlRWxlbWVudCl3aGlsZSh0Lmxlbmd0aCluLmNyZWF0ZUVsZW1lbnQodC5wb3AoKSk7cmV0dXJuIG59dmFyIGh0PVwiYWJicnxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJkaXxjYW52YXN8ZGF0YXxkYXRhbGlzdHxkZXRhaWxzfGZpZ2NhcHRpb258ZmlndXJlfGZvb3RlcnxoZWFkZXJ8aGdyb3VwfG1hcmt8bWV0ZXJ8bmF2fG91dHB1dHxwcm9ncmVzc3xzZWN0aW9ufHN1bW1hcnl8dGltZXx2aWRlb1wiLGd0PS8galF1ZXJ5XFxkKz1cIig/Om51bGx8XFxkKylcIi9nLG10PVJlZ0V4cChcIjwoPzpcIitodCtcIilbXFxcXHMvPl1cIixcImlcIikseXQ9L15cXHMrLyx2dD0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksYnQ9LzwoW1xcdzpdKykvLHh0PS88dGJvZHkvaSx3dD0vPHwmIz9cXHcrOy8sVHQ9LzwoPzpzY3JpcHR8c3R5bGV8bGluaykvaSxOdD0vXig/OmNoZWNrYm94fHJhZGlvKSQvaSxDdD0vY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLGt0PS9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksRXQ9L150cnVlXFwvKC4qKS8sU3Q9L15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nLEF0PXtvcHRpb246WzEsXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsXCI8L3NlbGVjdD5cIl0sbGVnZW5kOlsxLFwiPGZpZWxkc2V0PlwiLFwiPC9maWVsZHNldD5cIl0sYXJlYTpbMSxcIjxtYXA+XCIsXCI8L21hcD5cIl0scGFyYW06WzEsXCI8b2JqZWN0PlwiLFwiPC9vYmplY3Q+XCJdLHRoZWFkOlsxLFwiPHRhYmxlPlwiLFwiPC90YWJsZT5cIl0sdHI6WzIsXCI8dGFibGU+PHRib2R5PlwiLFwiPC90Ym9keT48L3RhYmxlPlwiXSxjb2w6WzIsXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLFwiPC9jb2xncm91cD48L3RhYmxlPlwiXSx0ZDpbMyxcIjx0YWJsZT48dGJvZHk+PHRyPlwiLFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCJdLF9kZWZhdWx0OmIuc3VwcG9ydC5odG1sU2VyaWFsaXplP1swLFwiXCIsXCJcIl06WzEsXCJYPGRpdj5cIixcIjwvZGl2PlwiXX0sanQ9ZHQobyksRHQ9anQuYXBwZW5kQ2hpbGQoby5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtBdC5vcHRncm91cD1BdC5vcHRpb24sQXQudGJvZHk9QXQudGZvb3Q9QXQuY29sZ3JvdXA9QXQuY2FwdGlvbj1BdC50aGVhZCxBdC50aD1BdC50ZCxiLmZuLmV4dGVuZCh7dGV4dDpmdW5jdGlvbihlKXtyZXR1cm4gYi5hY2Nlc3ModGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQ/Yi50ZXh0KHRoaXMpOnRoaXMuZW1wdHkoKS5hcHBlbmQoKHRoaXNbMF0mJnRoaXNbMF0ub3duZXJEb2N1bWVudHx8bykuY3JlYXRlVGV4dE5vZGUoZSkpfSxudWxsLGUsYXJndW1lbnRzLmxlbmd0aCl9LHdyYXBBbGw6ZnVuY3Rpb24oZSl7aWYoYi5pc0Z1bmN0aW9uKGUpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24odCl7Yih0aGlzKS53cmFwQWxsKGUuY2FsbCh0aGlzLHQpKX0pO2lmKHRoaXNbMF0pe3ZhciB0PWIoZSx0aGlzWzBdLm93bmVyRG9jdW1lbnQpLmVxKDApLmNsb25lKCEwKTt0aGlzWzBdLnBhcmVudE5vZGUmJnQuaW5zZXJ0QmVmb3JlKHRoaXNbMF0pLHQubWFwKGZ1bmN0aW9uKCl7dmFyIGU9dGhpczt3aGlsZShlLmZpcnN0Q2hpbGQmJjE9PT1lLmZpcnN0Q2hpbGQubm9kZVR5cGUpZT1lLmZpcnN0Q2hpbGQ7cmV0dXJuIGV9KS5hcHBlbmQodGhpcyl9cmV0dXJuIHRoaXN9LHdyYXBJbm5lcjpmdW5jdGlvbihlKXtyZXR1cm4gYi5pc0Z1bmN0aW9uKGUpP3RoaXMuZWFjaChmdW5jdGlvbih0KXtiKHRoaXMpLndyYXBJbm5lcihlLmNhbGwodGhpcyx0KSl9KTp0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1iKHRoaXMpLG49dC5jb250ZW50cygpO24ubGVuZ3RoP24ud3JhcEFsbChlKTp0LmFwcGVuZChlKX0pfSx3cmFwOmZ1bmN0aW9uKGUpe3ZhciB0PWIuaXNGdW5jdGlvbihlKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe2IodGhpcykud3JhcEFsbCh0P2UuY2FsbCh0aGlzLG4pOmUpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtiLm5vZGVOYW1lKHRoaXMsXCJib2R5XCIpfHxiKHRoaXMpLnJlcGxhY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KS5lbmQoKX0sYXBwZW5kOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCEwLGZ1bmN0aW9uKGUpeygxPT09dGhpcy5ub2RlVHlwZXx8MTE9PT10aGlzLm5vZGVUeXBlfHw5PT09dGhpcy5ub2RlVHlwZSkmJnRoaXMuYXBwZW5kQ2hpbGQoZSl9KX0scHJlcGVuZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cywhMCxmdW5jdGlvbihlKXsoMT09PXRoaXMubm9kZVR5cGV8fDExPT09dGhpcy5ub2RlVHlwZXx8OT09PXRoaXMubm9kZVR5cGUpJiZ0aGlzLmluc2VydEJlZm9yZShlLHRoaXMuZmlyc3RDaGlsZCl9KX0sYmVmb3JlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCExLGZ1bmN0aW9uKGUpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHRoaXMpfSl9LGFmdGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCExLGZ1bmN0aW9uKGUpe3RoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHRoaXMubmV4dFNpYmxpbmcpfSl9LHJlbW92ZTpmdW5jdGlvbihlLHQpe3ZhciBuLHI9MDtmb3IoO251bGwhPShuPXRoaXNbcl0pO3IrKykoIWV8fGIuZmlsdGVyKGUsW25dKS5sZW5ndGg+MCkmJih0fHwxIT09bi5ub2RlVHlwZXx8Yi5jbGVhbkRhdGEoT3QobikpLG4ucGFyZW50Tm9kZSYmKHQmJmIuY29udGFpbnMobi5vd25lckRvY3VtZW50LG4pJiZNdChPdChuLFwic2NyaXB0XCIpKSxuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobikpKTtyZXR1cm4gdGhpc30sZW1wdHk6ZnVuY3Rpb24oKXt2YXIgZSx0PTA7Zm9yKDtudWxsIT0oZT10aGlzW3RdKTt0KyspezE9PT1lLm5vZGVUeXBlJiZiLmNsZWFuRGF0YShPdChlLCExKSk7d2hpbGUoZS5maXJzdENoaWxkKWUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtlLm9wdGlvbnMmJmIubm9kZU5hbWUoZSxcInNlbGVjdFwiKSYmKGUub3B0aW9ucy5sZW5ndGg9MCl9cmV0dXJuIHRoaXN9LGNsb25lOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU9bnVsbD09ZT8hMTplLHQ9bnVsbD09dD9lOnQsdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gYi5jbG9uZSh0aGlzLGUsdCl9KX0saHRtbDpmdW5jdGlvbihlKXtyZXR1cm4gYi5hY2Nlc3ModGhpcyxmdW5jdGlvbihlKXt2YXIgbj10aGlzWzBdfHx7fSxyPTAsaT10aGlzLmxlbmd0aDtpZihlPT09dClyZXR1cm4gMT09PW4ubm9kZVR5cGU/bi5pbm5lckhUTUwucmVwbGFjZShndCxcIlwiKTp0O2lmKCEoXCJzdHJpbmdcIiE9dHlwZW9mIGV8fFR0LnRlc3QoZSl8fCFiLnN1cHBvcnQuaHRtbFNlcmlhbGl6ZSYmbXQudGVzdChlKXx8IWIuc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSYmeXQudGVzdChlKXx8QXRbKGJ0LmV4ZWMoZSl8fFtcIlwiLFwiXCJdKVsxXS50b0xvd2VyQ2FzZSgpXSkpe2U9ZS5yZXBsYWNlKHZ0LFwiPCQxPjwvJDI+XCIpO3RyeXtmb3IoO2k+cjtyKyspbj10aGlzW3JdfHx7fSwxPT09bi5ub2RlVHlwZSYmKGIuY2xlYW5EYXRhKE90KG4sITEpKSxuLmlubmVySFRNTD1lKTtuPTB9Y2F0Y2gobyl7fX1uJiZ0aGlzLmVtcHR5KCkuYXBwZW5kKGUpfSxudWxsLGUsYXJndW1lbnRzLmxlbmd0aCl9LHJlcGxhY2VXaXRoOmZ1bmN0aW9uKGUpe3ZhciB0PWIuaXNGdW5jdGlvbihlKTtyZXR1cm4gdHx8XCJzdHJpbmdcIj09dHlwZW9mIGV8fChlPWIoZSkubm90KHRoaXMpLmRldGFjaCgpKSx0aGlzLmRvbU1hbmlwKFtlXSwhMCxmdW5jdGlvbihlKXt2YXIgdD10aGlzLm5leHRTaWJsaW5nLG49dGhpcy5wYXJlbnROb2RlO24mJihiKHRoaXMpLnJlbW92ZSgpLG4uaW5zZXJ0QmVmb3JlKGUsdCkpfSl9LGRldGFjaDpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZW1vdmUoZSwhMCl9LGRvbU1hbmlwOmZ1bmN0aW9uKGUsbixyKXtlPWYuYXBwbHkoW10sZSk7dmFyIGksbyxhLHMsdSxsLGM9MCxwPXRoaXMubGVuZ3RoLGQ9dGhpcyxoPXAtMSxnPWVbMF0sbT1iLmlzRnVuY3Rpb24oZyk7aWYobXx8ISgxPj1wfHxcInN0cmluZ1wiIT10eXBlb2YgZ3x8Yi5zdXBwb3J0LmNoZWNrQ2xvbmUpJiZDdC50ZXN0KGcpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSl7dmFyIG89ZC5lcShpKTttJiYoZVswXT1nLmNhbGwodGhpcyxpLG4/by5odG1sKCk6dCkpLG8uZG9tTWFuaXAoZSxuLHIpfSk7aWYocCYmKGw9Yi5idWlsZEZyYWdtZW50KGUsdGhpc1swXS5vd25lckRvY3VtZW50LCExLHRoaXMpLGk9bC5maXJzdENoaWxkLDE9PT1sLmNoaWxkTm9kZXMubGVuZ3RoJiYobD1pKSxpKSl7Zm9yKG49biYmYi5ub2RlTmFtZShpLFwidHJcIikscz1iLm1hcChPdChsLFwic2NyaXB0XCIpLEh0KSxhPXMubGVuZ3RoO3A+YztjKyspbz1sLGMhPT1oJiYobz1iLmNsb25lKG8sITAsITApLGEmJmIubWVyZ2UocyxPdChvLFwic2NyaXB0XCIpKSksci5jYWxsKG4mJmIubm9kZU5hbWUodGhpc1tjXSxcInRhYmxlXCIpP0x0KHRoaXNbY10sXCJ0Ym9keVwiKTp0aGlzW2NdLG8sYyk7aWYoYSlmb3IodT1zW3MubGVuZ3RoLTFdLm93bmVyRG9jdW1lbnQsYi5tYXAocyxxdCksYz0wO2E+YztjKyspbz1zW2NdLGt0LnRlc3Qoby50eXBlfHxcIlwiKSYmIWIuX2RhdGEobyxcImdsb2JhbEV2YWxcIikmJmIuY29udGFpbnModSxvKSYmKG8uc3JjP2IuYWpheCh7dXJsOm8uc3JjLHR5cGU6XCJHRVRcIixkYXRhVHlwZTpcInNjcmlwdFwiLGFzeW5jOiExLGdsb2JhbDohMSxcInRocm93c1wiOiEwfSk6Yi5nbG9iYWxFdmFsKChvLnRleHR8fG8udGV4dENvbnRlbnR8fG8uaW5uZXJIVE1MfHxcIlwiKS5yZXBsYWNlKFN0LFwiXCIpKSk7bD1pPW51bGx9cmV0dXJuIHRoaXN9fSk7ZnVuY3Rpb24gTHQoZSx0KXtyZXR1cm4gZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0KVswXXx8ZS5hcHBlbmRDaGlsZChlLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0KSl9ZnVuY3Rpb24gSHQoZSl7dmFyIHQ9ZS5nZXRBdHRyaWJ1dGVOb2RlKFwidHlwZVwiKTtyZXR1cm4gZS50eXBlPSh0JiZ0LnNwZWNpZmllZCkrXCIvXCIrZS50eXBlLGV9ZnVuY3Rpb24gcXQoZSl7dmFyIHQ9RXQuZXhlYyhlLnR5cGUpO3JldHVybiB0P2UudHlwZT10WzFdOmUucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKSxlfWZ1bmN0aW9uIE10KGUsdCl7dmFyIG4scj0wO2Zvcig7bnVsbCE9KG49ZVtyXSk7cisrKWIuX2RhdGEobixcImdsb2JhbEV2YWxcIiwhdHx8Yi5fZGF0YSh0W3JdLFwiZ2xvYmFsRXZhbFwiKSl9ZnVuY3Rpb24gX3QoZSx0KXtpZigxPT09dC5ub2RlVHlwZSYmYi5oYXNEYXRhKGUpKXt2YXIgbixyLGksbz1iLl9kYXRhKGUpLGE9Yi5fZGF0YSh0LG8pLHM9by5ldmVudHM7aWYocyl7ZGVsZXRlIGEuaGFuZGxlLGEuZXZlbnRzPXt9O2ZvcihuIGluIHMpZm9yKHI9MCxpPXNbbl0ubGVuZ3RoO2k+cjtyKyspYi5ldmVudC5hZGQodCxuLHNbbl1bcl0pfWEuZGF0YSYmKGEuZGF0YT1iLmV4dGVuZCh7fSxhLmRhdGEpKX19ZnVuY3Rpb24gRnQoZSx0KXt2YXIgbixyLGk7aWYoMT09PXQubm9kZVR5cGUpe2lmKG49dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLCFiLnN1cHBvcnQubm9DbG9uZUV2ZW50JiZ0W2IuZXhwYW5kb10pe2k9Yi5fZGF0YSh0KTtmb3IociBpbiBpLmV2ZW50cyliLnJlbW92ZUV2ZW50KHQscixpLmhhbmRsZSk7dC5yZW1vdmVBdHRyaWJ1dGUoYi5leHBhbmRvKX1cInNjcmlwdFwiPT09biYmdC50ZXh0IT09ZS50ZXh0PyhIdCh0KS50ZXh0PWUudGV4dCxxdCh0KSk6XCJvYmplY3RcIj09PW4/KHQucGFyZW50Tm9kZSYmKHQub3V0ZXJIVE1MPWUub3V0ZXJIVE1MKSxiLnN1cHBvcnQuaHRtbDVDbG9uZSYmZS5pbm5lckhUTUwmJiFiLnRyaW0odC5pbm5lckhUTUwpJiYodC5pbm5lckhUTUw9ZS5pbm5lckhUTUwpKTpcImlucHV0XCI9PT1uJiZOdC50ZXN0KGUudHlwZSk/KHQuZGVmYXVsdENoZWNrZWQ9dC5jaGVja2VkPWUuY2hlY2tlZCx0LnZhbHVlIT09ZS52YWx1ZSYmKHQudmFsdWU9ZS52YWx1ZSkpOlwib3B0aW9uXCI9PT1uP3QuZGVmYXVsdFNlbGVjdGVkPXQuc2VsZWN0ZWQ9ZS5kZWZhdWx0U2VsZWN0ZWQ6KFwiaW5wdXRcIj09PW58fFwidGV4dGFyZWFcIj09PW4pJiYodC5kZWZhdWx0VmFsdWU9ZS5kZWZhdWx0VmFsdWUpfX1iLmVhY2goe2FwcGVuZFRvOlwiYXBwZW5kXCIscHJlcGVuZFRvOlwicHJlcGVuZFwiLGluc2VydEJlZm9yZTpcImJlZm9yZVwiLGluc2VydEFmdGVyOlwiYWZ0ZXJcIixyZXBsYWNlQWxsOlwicmVwbGFjZVdpdGhcIn0sZnVuY3Rpb24oZSx0KXtiLmZuW2VdPWZ1bmN0aW9uKGUpe3ZhciBuLHI9MCxpPVtdLG89YihlKSxhPW8ubGVuZ3RoLTE7Zm9yKDthPj1yO3IrKyluPXI9PT1hP3RoaXM6dGhpcy5jbG9uZSghMCksYihvW3JdKVt0XShuKSxkLmFwcGx5KGksbi5nZXQoKSk7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGkpfX0pO2Z1bmN0aW9uIE90KGUsbil7dmFyIHIsbyxhPTAscz10eXBlb2YgZS5nZXRFbGVtZW50c0J5VGFnTmFtZSE9PWk/ZS5nZXRFbGVtZW50c0J5VGFnTmFtZShufHxcIipcIik6dHlwZW9mIGUucXVlcnlTZWxlY3RvckFsbCE9PWk/ZS5xdWVyeVNlbGVjdG9yQWxsKG58fFwiKlwiKTp0O2lmKCFzKWZvcihzPVtdLHI9ZS5jaGlsZE5vZGVzfHxlO251bGwhPShvPXJbYV0pO2ErKykhbnx8Yi5ub2RlTmFtZShvLG4pP3MucHVzaChvKTpiLm1lcmdlKHMsT3QobyxuKSk7cmV0dXJuIG49PT10fHxuJiZiLm5vZGVOYW1lKGUsbik/Yi5tZXJnZShbZV0scyk6c31mdW5jdGlvbiBCdChlKXtOdC50ZXN0KGUudHlwZSkmJihlLmRlZmF1bHRDaGVja2VkPWUuY2hlY2tlZCl9Yi5leHRlbmQoe2Nsb25lOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcixpLG8sYSxzLHU9Yi5jb250YWlucyhlLm93bmVyRG9jdW1lbnQsZSk7aWYoYi5zdXBwb3J0Lmh0bWw1Q2xvbmV8fGIuaXNYTUxEb2MoZSl8fCFtdC50ZXN0KFwiPFwiK2Uubm9kZU5hbWUrXCI+XCIpP289ZS5jbG9uZU5vZGUoITApOihEdC5pbm5lckhUTUw9ZS5vdXRlckhUTUwsRHQucmVtb3ZlQ2hpbGQobz1EdC5maXJzdENoaWxkKSksIShiLnN1cHBvcnQubm9DbG9uZUV2ZW50JiZiLnN1cHBvcnQubm9DbG9uZUNoZWNrZWR8fDEhPT1lLm5vZGVUeXBlJiYxMSE9PWUubm9kZVR5cGV8fGIuaXNYTUxEb2MoZSkpKWZvcihyPU90KG8pLHM9T3QoZSksYT0wO251bGwhPShpPXNbYV0pOysrYSlyW2FdJiZGdChpLHJbYV0pO2lmKHQpaWYobilmb3Iocz1zfHxPdChlKSxyPXJ8fE90KG8pLGE9MDtudWxsIT0oaT1zW2FdKTthKyspX3QoaSxyW2FdKTtlbHNlIF90KGUsbyk7cmV0dXJuIHI9T3QobyxcInNjcmlwdFwiKSxyLmxlbmd0aD4wJiZNdChyLCF1JiZPdChlLFwic2NyaXB0XCIpKSxyPXM9aT1udWxsLG99LGJ1aWxkRnJhZ21lbnQ6ZnVuY3Rpb24oZSx0LG4scil7dmFyIGksbyxhLHMsdSxsLGMscD1lLmxlbmd0aCxmPWR0KHQpLGQ9W10saD0wO2Zvcig7cD5oO2grKylpZihvPWVbaF0sb3x8MD09PW8paWYoXCJvYmplY3RcIj09PWIudHlwZShvKSliLm1lcmdlKGQsby5ub2RlVHlwZT9bb106byk7ZWxzZSBpZih3dC50ZXN0KG8pKXtzPXN8fGYuYXBwZW5kQ2hpbGQodC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSx1PShidC5leGVjKG8pfHxbXCJcIixcIlwiXSlbMV0udG9Mb3dlckNhc2UoKSxjPUF0W3VdfHxBdC5fZGVmYXVsdCxzLmlubmVySFRNTD1jWzFdK28ucmVwbGFjZSh2dCxcIjwkMT48LyQyPlwiKStjWzJdLGk9Y1swXTt3aGlsZShpLS0pcz1zLmxhc3RDaGlsZDtpZighYi5zdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlJiZ5dC50ZXN0KG8pJiZkLnB1c2godC5jcmVhdGVUZXh0Tm9kZSh5dC5leGVjKG8pWzBdKSksIWIuc3VwcG9ydC50Ym9keSl7bz1cInRhYmxlXCIhPT11fHx4dC50ZXN0KG8pP1wiPHRhYmxlPlwiIT09Y1sxXXx8eHQudGVzdChvKT8wOnM6cy5maXJzdENoaWxkLGk9byYmby5jaGlsZE5vZGVzLmxlbmd0aDt3aGlsZShpLS0pYi5ub2RlTmFtZShsPW8uY2hpbGROb2Rlc1tpXSxcInRib2R5XCIpJiYhbC5jaGlsZE5vZGVzLmxlbmd0aCYmby5yZW1vdmVDaGlsZChsKVxufWIubWVyZ2UoZCxzLmNoaWxkTm9kZXMpLHMudGV4dENvbnRlbnQ9XCJcIjt3aGlsZShzLmZpcnN0Q2hpbGQpcy5yZW1vdmVDaGlsZChzLmZpcnN0Q2hpbGQpO3M9Zi5sYXN0Q2hpbGR9ZWxzZSBkLnB1c2godC5jcmVhdGVUZXh0Tm9kZShvKSk7cyYmZi5yZW1vdmVDaGlsZChzKSxiLnN1cHBvcnQuYXBwZW5kQ2hlY2tlZHx8Yi5ncmVwKE90KGQsXCJpbnB1dFwiKSxCdCksaD0wO3doaWxlKG89ZFtoKytdKWlmKCghcnx8LTE9PT1iLmluQXJyYXkobyxyKSkmJihhPWIuY29udGFpbnMoby5vd25lckRvY3VtZW50LG8pLHM9T3QoZi5hcHBlbmRDaGlsZChvKSxcInNjcmlwdFwiKSxhJiZNdChzKSxuKSl7aT0wO3doaWxlKG89c1tpKytdKWt0LnRlc3Qoby50eXBlfHxcIlwiKSYmbi5wdXNoKG8pfXJldHVybiBzPW51bGwsZn0sY2xlYW5EYXRhOmZ1bmN0aW9uKGUsdCl7dmFyIG4scixvLGEscz0wLHU9Yi5leHBhbmRvLGw9Yi5jYWNoZSxwPWIuc3VwcG9ydC5kZWxldGVFeHBhbmRvLGY9Yi5ldmVudC5zcGVjaWFsO2Zvcig7bnVsbCE9KG49ZVtzXSk7cysrKWlmKCh0fHxiLmFjY2VwdERhdGEobikpJiYobz1uW3VdLGE9byYmbFtvXSkpe2lmKGEuZXZlbnRzKWZvcihyIGluIGEuZXZlbnRzKWZbcl0/Yi5ldmVudC5yZW1vdmUobixyKTpiLnJlbW92ZUV2ZW50KG4scixhLmhhbmRsZSk7bFtvXSYmKGRlbGV0ZSBsW29dLHA/ZGVsZXRlIG5bdV06dHlwZW9mIG4ucmVtb3ZlQXR0cmlidXRlIT09aT9uLnJlbW92ZUF0dHJpYnV0ZSh1KTpuW3VdPW51bGwsYy5wdXNoKG8pKX19fSk7dmFyIFB0LFJ0LFd0LCR0PS9hbHBoYVxcKFteKV0qXFwpL2ksSXQ9L29wYWNpdHlcXHMqPVxccyooW14pXSopLyx6dD0vXih0b3B8cmlnaHR8Ym90dG9tfGxlZnQpJC8sWHQ9L14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFV0PS9ebWFyZ2luLyxWdD1SZWdFeHAoXCJeKFwiK3grXCIpKC4qKSRcIixcImlcIiksWXQ9UmVnRXhwKFwiXihcIit4K1wiKSg/IXB4KVthLXolXSskXCIsXCJpXCIpLEp0PVJlZ0V4cChcIl4oWystXSk9KFwiK3grXCIpXCIsXCJpXCIpLEd0PXtCT0RZOlwiYmxvY2tcIn0sUXQ9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIix2aXNpYmlsaXR5OlwiaGlkZGVuXCIsZGlzcGxheTpcImJsb2NrXCJ9LEt0PXtsZXR0ZXJTcGFjaW5nOjAsZm9udFdlaWdodDo0MDB9LFp0PVtcIlRvcFwiLFwiUmlnaHRcIixcIkJvdHRvbVwiLFwiTGVmdFwiXSxlbj1bXCJXZWJraXRcIixcIk9cIixcIk1velwiLFwibXNcIl07ZnVuY3Rpb24gdG4oZSx0KXtpZih0IGluIGUpcmV0dXJuIHQ7dmFyIG49dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpLHI9dCxpPWVuLmxlbmd0aDt3aGlsZShpLS0paWYodD1lbltpXStuLHQgaW4gZSlyZXR1cm4gdDtyZXR1cm4gcn1mdW5jdGlvbiBubihlLHQpe3JldHVybiBlPXR8fGUsXCJub25lXCI9PT1iLmNzcyhlLFwiZGlzcGxheVwiKXx8IWIuY29udGFpbnMoZS5vd25lckRvY3VtZW50LGUpfWZ1bmN0aW9uIHJuKGUsdCl7dmFyIG4scixpLG89W10sYT0wLHM9ZS5sZW5ndGg7Zm9yKDtzPmE7YSsrKXI9ZVthXSxyLnN0eWxlJiYob1thXT1iLl9kYXRhKHIsXCJvbGRkaXNwbGF5XCIpLG49ci5zdHlsZS5kaXNwbGF5LHQ/KG9bYV18fFwibm9uZVwiIT09bnx8KHIuc3R5bGUuZGlzcGxheT1cIlwiKSxcIlwiPT09ci5zdHlsZS5kaXNwbGF5JiZubihyKSYmKG9bYV09Yi5fZGF0YShyLFwib2xkZGlzcGxheVwiLHVuKHIubm9kZU5hbWUpKSkpOm9bYV18fChpPW5uKHIpLChuJiZcIm5vbmVcIiE9PW58fCFpKSYmYi5fZGF0YShyLFwib2xkZGlzcGxheVwiLGk/bjpiLmNzcyhyLFwiZGlzcGxheVwiKSkpKTtmb3IoYT0wO3M+YTthKyspcj1lW2FdLHIuc3R5bGUmJih0JiZcIm5vbmVcIiE9PXIuc3R5bGUuZGlzcGxheSYmXCJcIiE9PXIuc3R5bGUuZGlzcGxheXx8KHIuc3R5bGUuZGlzcGxheT10P29bYV18fFwiXCI6XCJub25lXCIpKTtyZXR1cm4gZX1iLmZuLmV4dGVuZCh7Y3NzOmZ1bmN0aW9uKGUsbil7cmV0dXJuIGIuYWNjZXNzKHRoaXMsZnVuY3Rpb24oZSxuLHIpe3ZhciBpLG8sYT17fSxzPTA7aWYoYi5pc0FycmF5KG4pKXtmb3Iobz1SdChlKSxpPW4ubGVuZ3RoO2k+cztzKyspYVtuW3NdXT1iLmNzcyhlLG5bc10sITEsbyk7cmV0dXJuIGF9cmV0dXJuIHIhPT10P2Iuc3R5bGUoZSxuLHIpOmIuY3NzKGUsbil9LGUsbixhcmd1bWVudHMubGVuZ3RoPjEpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIHJuKHRoaXMsITApfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIHJuKHRoaXMpfSx0b2dnbGU6ZnVuY3Rpb24oZSl7dmFyIHQ9XCJib29sZWFuXCI9PXR5cGVvZiBlO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsodD9lOm5uKHRoaXMpKT9iKHRoaXMpLnNob3coKTpiKHRoaXMpLmhpZGUoKX0pfX0pLGIuZXh0ZW5kKHtjc3NIb29rczp7b3BhY2l0eTp7Z2V0OmZ1bmN0aW9uKGUsdCl7aWYodCl7dmFyIG49V3QoZSxcIm9wYWNpdHlcIik7cmV0dXJuXCJcIj09PW4/XCIxXCI6bn19fX0sY3NzTnVtYmVyOntjb2x1bW5Db3VudDohMCxmaWxsT3BhY2l0eTohMCxmb250V2VpZ2h0OiEwLGxpbmVIZWlnaHQ6ITAsb3BhY2l0eTohMCxvcnBoYW5zOiEwLHdpZG93czohMCx6SW5kZXg6ITAsem9vbTohMH0sY3NzUHJvcHM6e1wiZmxvYXRcIjpiLnN1cHBvcnQuY3NzRmxvYXQ/XCJjc3NGbG9hdFwiOlwic3R5bGVGbG9hdFwifSxzdHlsZTpmdW5jdGlvbihlLG4scixpKXtpZihlJiYzIT09ZS5ub2RlVHlwZSYmOCE9PWUubm9kZVR5cGUmJmUuc3R5bGUpe3ZhciBvLGEscyx1PWIuY2FtZWxDYXNlKG4pLGw9ZS5zdHlsZTtpZihuPWIuY3NzUHJvcHNbdV18fChiLmNzc1Byb3BzW3VdPXRuKGwsdSkpLHM9Yi5jc3NIb29rc1tuXXx8Yi5jc3NIb29rc1t1XSxyPT09dClyZXR1cm4gcyYmXCJnZXRcImluIHMmJihvPXMuZ2V0KGUsITEsaSkpIT09dD9vOmxbbl07aWYoYT10eXBlb2YgcixcInN0cmluZ1wiPT09YSYmKG89SnQuZXhlYyhyKSkmJihyPShvWzFdKzEpKm9bMl0rcGFyc2VGbG9hdChiLmNzcyhlLG4pKSxhPVwibnVtYmVyXCIpLCEobnVsbD09cnx8XCJudW1iZXJcIj09PWEmJmlzTmFOKHIpfHwoXCJudW1iZXJcIiE9PWF8fGIuY3NzTnVtYmVyW3VdfHwocis9XCJweFwiKSxiLnN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlfHxcIlwiIT09cnx8MCE9PW4uaW5kZXhPZihcImJhY2tncm91bmRcIil8fChsW25dPVwiaW5oZXJpdFwiKSxzJiZcInNldFwiaW4gcyYmKHI9cy5zZXQoZSxyLGkpKT09PXQpKSl0cnl7bFtuXT1yfWNhdGNoKGMpe319fSxjc3M6ZnVuY3Rpb24oZSxuLHIsaSl7dmFyIG8sYSxzLHU9Yi5jYW1lbENhc2Uobik7cmV0dXJuIG49Yi5jc3NQcm9wc1t1XXx8KGIuY3NzUHJvcHNbdV09dG4oZS5zdHlsZSx1KSkscz1iLmNzc0hvb2tzW25dfHxiLmNzc0hvb2tzW3VdLHMmJlwiZ2V0XCJpbiBzJiYoYT1zLmdldChlLCEwLHIpKSxhPT09dCYmKGE9V3QoZSxuLGkpKSxcIm5vcm1hbFwiPT09YSYmbiBpbiBLdCYmKGE9S3Rbbl0pLFwiXCI9PT1yfHxyPyhvPXBhcnNlRmxvYXQoYSkscj09PSEwfHxiLmlzTnVtZXJpYyhvKT9vfHwwOmEpOmF9LHN3YXA6ZnVuY3Rpb24oZSx0LG4scil7dmFyIGksbyxhPXt9O2ZvcihvIGluIHQpYVtvXT1lLnN0eWxlW29dLGUuc3R5bGVbb109dFtvXTtpPW4uYXBwbHkoZSxyfHxbXSk7Zm9yKG8gaW4gdCllLnN0eWxlW29dPWFbb107cmV0dXJuIGl9fSksZS5nZXRDb21wdXRlZFN0eWxlPyhSdD1mdW5jdGlvbih0KXtyZXR1cm4gZS5nZXRDb21wdXRlZFN0eWxlKHQsbnVsbCl9LFd0PWZ1bmN0aW9uKGUsbixyKXt2YXIgaSxvLGEscz1yfHxSdChlKSx1PXM/cy5nZXRQcm9wZXJ0eVZhbHVlKG4pfHxzW25dOnQsbD1lLnN0eWxlO3JldHVybiBzJiYoXCJcIiE9PXV8fGIuY29udGFpbnMoZS5vd25lckRvY3VtZW50LGUpfHwodT1iLnN0eWxlKGUsbikpLFl0LnRlc3QodSkmJlV0LnRlc3QobikmJihpPWwud2lkdGgsbz1sLm1pbldpZHRoLGE9bC5tYXhXaWR0aCxsLm1pbldpZHRoPWwubWF4V2lkdGg9bC53aWR0aD11LHU9cy53aWR0aCxsLndpZHRoPWksbC5taW5XaWR0aD1vLGwubWF4V2lkdGg9YSkpLHV9KTpvLmRvY3VtZW50RWxlbWVudC5jdXJyZW50U3R5bGUmJihSdD1mdW5jdGlvbihlKXtyZXR1cm4gZS5jdXJyZW50U3R5bGV9LFd0PWZ1bmN0aW9uKGUsbixyKXt2YXIgaSxvLGEscz1yfHxSdChlKSx1PXM/c1tuXTp0LGw9ZS5zdHlsZTtyZXR1cm4gbnVsbD09dSYmbCYmbFtuXSYmKHU9bFtuXSksWXQudGVzdCh1KSYmIXp0LnRlc3QobikmJihpPWwubGVmdCxvPWUucnVudGltZVN0eWxlLGE9byYmby5sZWZ0LGEmJihvLmxlZnQ9ZS5jdXJyZW50U3R5bGUubGVmdCksbC5sZWZ0PVwiZm9udFNpemVcIj09PW4/XCIxZW1cIjp1LHU9bC5waXhlbExlZnQrXCJweFwiLGwubGVmdD1pLGEmJihvLmxlZnQ9YSkpLFwiXCI9PT11P1wiYXV0b1wiOnV9KTtmdW5jdGlvbiBvbihlLHQsbil7dmFyIHI9VnQuZXhlYyh0KTtyZXR1cm4gcj9NYXRoLm1heCgwLHJbMV0tKG58fDApKSsoclsyXXx8XCJweFwiKTp0fWZ1bmN0aW9uIGFuKGUsdCxuLHIsaSl7dmFyIG89bj09PShyP1wiYm9yZGVyXCI6XCJjb250ZW50XCIpPzQ6XCJ3aWR0aFwiPT09dD8xOjAsYT0wO2Zvcig7ND5vO28rPTIpXCJtYXJnaW5cIj09PW4mJihhKz1iLmNzcyhlLG4rWnRbb10sITAsaSkpLHI/KFwiY29udGVudFwiPT09biYmKGEtPWIuY3NzKGUsXCJwYWRkaW5nXCIrWnRbb10sITAsaSkpLFwibWFyZ2luXCIhPT1uJiYoYS09Yi5jc3MoZSxcImJvcmRlclwiK1p0W29dK1wiV2lkdGhcIiwhMCxpKSkpOihhKz1iLmNzcyhlLFwicGFkZGluZ1wiK1p0W29dLCEwLGkpLFwicGFkZGluZ1wiIT09biYmKGErPWIuY3NzKGUsXCJib3JkZXJcIitadFtvXStcIldpZHRoXCIsITAsaSkpKTtyZXR1cm4gYX1mdW5jdGlvbiBzbihlLHQsbil7dmFyIHI9ITAsaT1cIndpZHRoXCI9PT10P2Uub2Zmc2V0V2lkdGg6ZS5vZmZzZXRIZWlnaHQsbz1SdChlKSxhPWIuc3VwcG9ydC5ib3hTaXppbmcmJlwiYm9yZGVyLWJveFwiPT09Yi5jc3MoZSxcImJveFNpemluZ1wiLCExLG8pO2lmKDA+PWl8fG51bGw9PWkpe2lmKGk9V3QoZSx0LG8pLCgwPml8fG51bGw9PWkpJiYoaT1lLnN0eWxlW3RdKSxZdC50ZXN0KGkpKXJldHVybiBpO3I9YSYmKGIuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZXx8aT09PWUuc3R5bGVbdF0pLGk9cGFyc2VGbG9hdChpKXx8MH1yZXR1cm4gaSthbihlLHQsbnx8KGE/XCJib3JkZXJcIjpcImNvbnRlbnRcIikscixvKStcInB4XCJ9ZnVuY3Rpb24gdW4oZSl7dmFyIHQ9byxuPUd0W2VdO3JldHVybiBufHwobj1sbihlLHQpLFwibm9uZVwiIT09biYmbnx8KFB0PShQdHx8YihcIjxpZnJhbWUgZnJhbWVib3JkZXI9JzAnIHdpZHRoPScwJyBoZWlnaHQ9JzAnLz5cIikuY3NzKFwiY3NzVGV4dFwiLFwiZGlzcGxheTpibG9jayAhaW1wb3J0YW50XCIpKS5hcHBlbmRUbyh0LmRvY3VtZW50RWxlbWVudCksdD0oUHRbMF0uY29udGVudFdpbmRvd3x8UHRbMF0uY29udGVudERvY3VtZW50KS5kb2N1bWVudCx0LndyaXRlKFwiPCFkb2N0eXBlIGh0bWw+PGh0bWw+PGJvZHk+XCIpLHQuY2xvc2UoKSxuPWxuKGUsdCksUHQuZGV0YWNoKCkpLEd0W2VdPW4pLG59ZnVuY3Rpb24gbG4oZSx0KXt2YXIgbj1iKHQuY3JlYXRlRWxlbWVudChlKSkuYXBwZW5kVG8odC5ib2R5KSxyPWIuY3NzKG5bMF0sXCJkaXNwbGF5XCIpO3JldHVybiBuLnJlbW92ZSgpLHJ9Yi5lYWNoKFtcImhlaWdodFwiLFwid2lkdGhcIl0sZnVuY3Rpb24oZSxuKXtiLmNzc0hvb2tzW25dPXtnZXQ6ZnVuY3Rpb24oZSxyLGkpe3JldHVybiByPzA9PT1lLm9mZnNldFdpZHRoJiZYdC50ZXN0KGIuY3NzKGUsXCJkaXNwbGF5XCIpKT9iLnN3YXAoZSxRdCxmdW5jdGlvbigpe3JldHVybiBzbihlLG4saSl9KTpzbihlLG4saSk6dH0sc2V0OmZ1bmN0aW9uKGUsdCxyKXt2YXIgaT1yJiZSdChlKTtyZXR1cm4gb24oZSx0LHI/YW4oZSxuLHIsYi5zdXBwb3J0LmJveFNpemluZyYmXCJib3JkZXItYm94XCI9PT1iLmNzcyhlLFwiYm94U2l6aW5nXCIsITEsaSksaSk6MCl9fX0pLGIuc3VwcG9ydC5vcGFjaXR5fHwoYi5jc3NIb29rcy5vcGFjaXR5PXtnZXQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSXQudGVzdCgodCYmZS5jdXJyZW50U3R5bGU/ZS5jdXJyZW50U3R5bGUuZmlsdGVyOmUuc3R5bGUuZmlsdGVyKXx8XCJcIik/LjAxKnBhcnNlRmxvYXQoUmVnRXhwLiQxKStcIlwiOnQ/XCIxXCI6XCJcIn0sc2V0OmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5zdHlsZSxyPWUuY3VycmVudFN0eWxlLGk9Yi5pc051bWVyaWModCk/XCJhbHBoYShvcGFjaXR5PVwiKzEwMCp0K1wiKVwiOlwiXCIsbz1yJiZyLmZpbHRlcnx8bi5maWx0ZXJ8fFwiXCI7bi56b29tPTEsKHQ+PTF8fFwiXCI9PT10KSYmXCJcIj09PWIudHJpbShvLnJlcGxhY2UoJHQsXCJcIikpJiZuLnJlbW92ZUF0dHJpYnV0ZSYmKG4ucmVtb3ZlQXR0cmlidXRlKFwiZmlsdGVyXCIpLFwiXCI9PT10fHxyJiYhci5maWx0ZXIpfHwobi5maWx0ZXI9JHQudGVzdChvKT9vLnJlcGxhY2UoJHQsaSk6bytcIiBcIitpKX19KSxiKGZ1bmN0aW9uKCl7Yi5zdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHR8fChiLmNzc0hvb2tzLm1hcmdpblJpZ2h0PXtnZXQ6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gbj9iLnN3YXAoZSx7ZGlzcGxheTpcImlubGluZS1ibG9ja1wifSxXdCxbZSxcIm1hcmdpblJpZ2h0XCJdKTp0fX0pLCFiLnN1cHBvcnQucGl4ZWxQb3NpdGlvbiYmYi5mbi5wb3NpdGlvbiYmYi5lYWNoKFtcInRvcFwiLFwibGVmdFwiXSxmdW5jdGlvbihlLG4pe2IuY3NzSG9va3Nbbl09e2dldDpmdW5jdGlvbihlLHIpe3JldHVybiByPyhyPVd0KGUsbiksWXQudGVzdChyKT9iKGUpLnBvc2l0aW9uKClbbl0rXCJweFwiOnIpOnR9fX0pfSksYi5leHByJiZiLmV4cHIuZmlsdGVycyYmKGIuZXhwci5maWx0ZXJzLmhpZGRlbj1mdW5jdGlvbihlKXtyZXR1cm4gMD49ZS5vZmZzZXRXaWR0aCYmMD49ZS5vZmZzZXRIZWlnaHR8fCFiLnN1cHBvcnQucmVsaWFibGVIaWRkZW5PZmZzZXRzJiZcIm5vbmVcIj09PShlLnN0eWxlJiZlLnN0eWxlLmRpc3BsYXl8fGIuY3NzKGUsXCJkaXNwbGF5XCIpKX0sYi5leHByLmZpbHRlcnMudmlzaWJsZT1mdW5jdGlvbihlKXtyZXR1cm4hYi5leHByLmZpbHRlcnMuaGlkZGVuKGUpfSksYi5lYWNoKHttYXJnaW46XCJcIixwYWRkaW5nOlwiXCIsYm9yZGVyOlwiV2lkdGhcIn0sZnVuY3Rpb24oZSx0KXtiLmNzc0hvb2tzW2UrdF09e2V4cGFuZDpmdW5jdGlvbihuKXt2YXIgcj0wLGk9e30sbz1cInN0cmluZ1wiPT10eXBlb2Ygbj9uLnNwbGl0KFwiIFwiKTpbbl07Zm9yKDs0PnI7cisrKWlbZStadFtyXSt0XT1vW3JdfHxvW3ItMl18fG9bMF07cmV0dXJuIGl9fSxVdC50ZXN0KGUpfHwoYi5jc3NIb29rc1tlK3RdLnNldD1vbil9KTt2YXIgY249LyUyMC9nLHBuPS9cXFtcXF0kLyxmbj0vXFxyP1xcbi9nLGRuPS9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxobj0vXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7Yi5mbi5leHRlbmQoe3NlcmlhbGl6ZTpmdW5jdGlvbigpe3JldHVybiBiLnBhcmFtKHRoaXMuc2VyaWFsaXplQXJyYXkoKSl9LHNlcmlhbGl6ZUFycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGU9Yi5wcm9wKHRoaXMsXCJlbGVtZW50c1wiKTtyZXR1cm4gZT9iLm1ha2VBcnJheShlKTp0aGlzfSkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIGU9dGhpcy50eXBlO3JldHVybiB0aGlzLm5hbWUmJiFiKHRoaXMpLmlzKFwiOmRpc2FibGVkXCIpJiZobi50ZXN0KHRoaXMubm9kZU5hbWUpJiYhZG4udGVzdChlKSYmKHRoaXMuY2hlY2tlZHx8IU50LnRlc3QoZSkpfSkubWFwKGZ1bmN0aW9uKGUsdCl7dmFyIG49Yih0aGlzKS52YWwoKTtyZXR1cm4gbnVsbD09bj9udWxsOmIuaXNBcnJheShuKT9iLm1hcChuLGZ1bmN0aW9uKGUpe3JldHVybntuYW1lOnQubmFtZSx2YWx1ZTplLnJlcGxhY2UoZm4sXCJcXHJcXG5cIil9fSk6e25hbWU6dC5uYW1lLHZhbHVlOm4ucmVwbGFjZShmbixcIlxcclxcblwiKX19KS5nZXQoKX19KSxiLnBhcmFtPWZ1bmN0aW9uKGUsbil7dmFyIHIsaT1bXSxvPWZ1bmN0aW9uKGUsdCl7dD1iLmlzRnVuY3Rpb24odCk/dCgpOm51bGw9PXQ/XCJcIjp0LGlbaS5sZW5ndGhdPWVuY29kZVVSSUNvbXBvbmVudChlKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQodCl9O2lmKG49PT10JiYobj1iLmFqYXhTZXR0aW5ncyYmYi5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWwpLGIuaXNBcnJheShlKXx8ZS5qcXVlcnkmJiFiLmlzUGxhaW5PYmplY3QoZSkpYi5lYWNoKGUsZnVuY3Rpb24oKXtvKHRoaXMubmFtZSx0aGlzLnZhbHVlKX0pO2Vsc2UgZm9yKHIgaW4gZSlnbihyLGVbcl0sbixvKTtyZXR1cm4gaS5qb2luKFwiJlwiKS5yZXBsYWNlKGNuLFwiK1wiKX07ZnVuY3Rpb24gZ24oZSx0LG4scil7dmFyIGk7aWYoYi5pc0FycmF5KHQpKWIuZWFjaCh0LGZ1bmN0aW9uKHQsaSl7bnx8cG4udGVzdChlKT9yKGUsaSk6Z24oZStcIltcIisoXCJvYmplY3RcIj09dHlwZW9mIGk/dDpcIlwiKStcIl1cIixpLG4scil9KTtlbHNlIGlmKG58fFwib2JqZWN0XCIhPT1iLnR5cGUodCkpcihlLHQpO2Vsc2UgZm9yKGkgaW4gdClnbihlK1wiW1wiK2krXCJdXCIsdFtpXSxuLHIpfWIuZWFjaChcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIGNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3IgY29udGV4dG1lbnVcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24oZSx0KXtiLmZuW3RdPWZ1bmN0aW9uKGUsbil7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MD90aGlzLm9uKHQsbnVsbCxlLG4pOnRoaXMudHJpZ2dlcih0KX19KSxiLmZuLmhvdmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMubW91c2VlbnRlcihlKS5tb3VzZWxlYXZlKHR8fGUpfTt2YXIgbW4seW4sdm49Yi5ub3coKSxibj0vXFw/Lyx4bj0vIy4qJC8sd249LyhbPyZdKV89W14mXSovLFRuPS9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKVxccj8kL2dtLE5uPS9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLENuPS9eKD86R0VUfEhFQUQpJC8sa249L15cXC9cXC8vLEVuPS9eKFtcXHcuKy1dKzopKD86XFwvXFwvKFteXFwvPyM6XSopKD86OihcXGQrKXwpfCkvLFNuPWIuZm4ubG9hZCxBbj17fSxqbj17fSxEbj1cIiovXCIuY29uY2F0KFwiKlwiKTt0cnl7eW49YS5ocmVmfWNhdGNoKExuKXt5bj1vLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLHluLmhyZWY9XCJcIix5bj15bi5ocmVmfW1uPUVuLmV4ZWMoeW4udG9Mb3dlckNhc2UoKSl8fFtdO2Z1bmN0aW9uIEhuKGUpe3JldHVybiBmdW5jdGlvbih0LG4pe1wic3RyaW5nXCIhPXR5cGVvZiB0JiYobj10LHQ9XCIqXCIpO3ZhciByLGk9MCxvPXQudG9Mb3dlckNhc2UoKS5tYXRjaCh3KXx8W107aWYoYi5pc0Z1bmN0aW9uKG4pKXdoaWxlKHI9b1tpKytdKVwiK1wiPT09clswXT8ocj1yLnNsaWNlKDEpfHxcIipcIiwoZVtyXT1lW3JdfHxbXSkudW5zaGlmdChuKSk6KGVbcl09ZVtyXXx8W10pLnB1c2gobil9fWZ1bmN0aW9uIHFuKGUsbixyLGkpe3ZhciBvPXt9LGE9ZT09PWpuO2Z1bmN0aW9uIHModSl7dmFyIGw7cmV0dXJuIG9bdV09ITAsYi5lYWNoKGVbdV18fFtdLGZ1bmN0aW9uKGUsdSl7dmFyIGM9dShuLHIsaSk7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIGN8fGF8fG9bY10/YT8hKGw9Yyk6dDoobi5kYXRhVHlwZXMudW5zaGlmdChjKSxzKGMpLCExKX0pLGx9cmV0dXJuIHMobi5kYXRhVHlwZXNbMF0pfHwhb1tcIipcIl0mJnMoXCIqXCIpfWZ1bmN0aW9uIE1uKGUsbil7dmFyIHIsaSxvPWIuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zfHx7fTtmb3IoaSBpbiBuKW5baV0hPT10JiYoKG9baV0/ZTpyfHwocj17fSkpW2ldPW5baV0pO3JldHVybiByJiZiLmV4dGVuZCghMCxlLHIpLGV9Yi5mbi5sb2FkPWZ1bmN0aW9uKGUsbixyKXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSYmU24pcmV0dXJuIFNuLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt2YXIgaSxvLGEscz10aGlzLHU9ZS5pbmRleE9mKFwiIFwiKTtyZXR1cm4gdT49MCYmKGk9ZS5zbGljZSh1LGUubGVuZ3RoKSxlPWUuc2xpY2UoMCx1KSksYi5pc0Z1bmN0aW9uKG4pPyhyPW4sbj10KTpuJiZcIm9iamVjdFwiPT10eXBlb2YgbiYmKGE9XCJQT1NUXCIpLHMubGVuZ3RoPjAmJmIuYWpheCh7dXJsOmUsdHlwZTphLGRhdGFUeXBlOlwiaHRtbFwiLGRhdGE6bn0pLmRvbmUoZnVuY3Rpb24oZSl7bz1hcmd1bWVudHMscy5odG1sKGk/YihcIjxkaXY+XCIpLmFwcGVuZChiLnBhcnNlSFRNTChlKSkuZmluZChpKTplKX0pLmNvbXBsZXRlKHImJmZ1bmN0aW9uKGUsdCl7cy5lYWNoKHIsb3x8W2UucmVzcG9uc2VUZXh0LHQsZV0pfSksdGhpc30sYi5lYWNoKFtcImFqYXhTdGFydFwiLFwiYWpheFN0b3BcIixcImFqYXhDb21wbGV0ZVwiLFwiYWpheEVycm9yXCIsXCJhamF4U3VjY2Vzc1wiLFwiYWpheFNlbmRcIl0sZnVuY3Rpb24oZSx0KXtiLmZuW3RdPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm9uKHQsZSl9fSksYi5lYWNoKFtcImdldFwiLFwicG9zdFwiXSxmdW5jdGlvbihlLG4pe2Jbbl09ZnVuY3Rpb24oZSxyLGksbyl7cmV0dXJuIGIuaXNGdW5jdGlvbihyKSYmKG89b3x8aSxpPXIscj10KSxiLmFqYXgoe3VybDplLHR5cGU6bixkYXRhVHlwZTpvLGRhdGE6cixzdWNjZXNzOml9KX19KSxiLmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6eW4sdHlwZTpcIkdFVFwiLGlzTG9jYWw6Tm4udGVzdChtblsxXSksZ2xvYmFsOiEwLHByb2Nlc3NEYXRhOiEwLGFzeW5jOiEwLGNvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsYWNjZXB0czp7XCIqXCI6RG4sdGV4dDpcInRleHQvcGxhaW5cIixodG1sOlwidGV4dC9odG1sXCIseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIn0sY29udGVudHM6e3htbDoveG1sLyxodG1sOi9odG1sLyxqc29uOi9qc29uL30scmVzcG9uc2VGaWVsZHM6e3htbDpcInJlc3BvbnNlWE1MXCIsdGV4dDpcInJlc3BvbnNlVGV4dFwifSxjb252ZXJ0ZXJzOntcIiogdGV4dFwiOmUuU3RyaW5nLFwidGV4dCBodG1sXCI6ITAsXCJ0ZXh0IGpzb25cIjpiLnBhcnNlSlNPTixcInRleHQgeG1sXCI6Yi5wYXJzZVhNTH0sZmxhdE9wdGlvbnM6e3VybDohMCxjb250ZXh0OiEwfX0sYWpheFNldHVwOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ/TW4oTW4oZSxiLmFqYXhTZXR0aW5ncyksdCk6TW4oYi5hamF4U2V0dGluZ3MsZSl9LGFqYXhQcmVmaWx0ZXI6SG4oQW4pLGFqYXhUcmFuc3BvcnQ6SG4oam4pLGFqYXg6ZnVuY3Rpb24oZSxuKXtcIm9iamVjdFwiPT10eXBlb2YgZSYmKG49ZSxlPXQpLG49bnx8e307dmFyIHIsaSxvLGEscyx1LGwsYyxwPWIuYWpheFNldHVwKHt9LG4pLGY9cC5jb250ZXh0fHxwLGQ9cC5jb250ZXh0JiYoZi5ub2RlVHlwZXx8Zi5qcXVlcnkpP2IoZik6Yi5ldmVudCxoPWIuRGVmZXJyZWQoKSxnPWIuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksbT1wLnN0YXR1c0NvZGV8fHt9LHk9e30sdj17fSx4PTAsVD1cImNhbmNlbGVkXCIsTj17cmVhZHlTdGF0ZTowLGdldFJlc3BvbnNlSGVhZGVyOmZ1bmN0aW9uKGUpe3ZhciB0O2lmKDI9PT14KXtpZighYyl7Yz17fTt3aGlsZSh0PVRuLmV4ZWMoYSkpY1t0WzFdLnRvTG93ZXJDYXNlKCldPXRbMl19dD1jW2UudG9Mb3dlckNhc2UoKV19cmV0dXJuIG51bGw9PXQ/bnVsbDp0fSxnZXRBbGxSZXNwb25zZUhlYWRlcnM6ZnVuY3Rpb24oKXtyZXR1cm4gMj09PXg/YTpudWxsfSxzZXRSZXF1ZXN0SGVhZGVyOmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS50b0xvd2VyQ2FzZSgpO3JldHVybiB4fHwoZT12W25dPXZbbl18fGUseVtlXT10KSx0aGlzfSxvdmVycmlkZU1pbWVUeXBlOmZ1bmN0aW9uKGUpe3JldHVybiB4fHwocC5taW1lVHlwZT1lKSx0aGlzfSxzdGF0dXNDb2RlOmZ1bmN0aW9uKGUpe3ZhciB0O2lmKGUpaWYoMj54KWZvcih0IGluIGUpbVt0XT1bbVt0XSxlW3RdXTtlbHNlIE4uYWx3YXlzKGVbTi5zdGF0dXNdKTtyZXR1cm4gdGhpc30sYWJvcnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8VDtyZXR1cm4gbCYmbC5hYm9ydCh0KSxrKDAsdCksdGhpc319O2lmKGgucHJvbWlzZShOKS5jb21wbGV0ZT1nLmFkZCxOLnN1Y2Nlc3M9Ti5kb25lLE4uZXJyb3I9Ti5mYWlsLHAudXJsPSgoZXx8cC51cmx8fHluKStcIlwiKS5yZXBsYWNlKHhuLFwiXCIpLnJlcGxhY2Uoa24sbW5bMV0rXCIvL1wiKSxwLnR5cGU9bi5tZXRob2R8fG4udHlwZXx8cC5tZXRob2R8fHAudHlwZSxwLmRhdGFUeXBlcz1iLnRyaW0ocC5kYXRhVHlwZXx8XCIqXCIpLnRvTG93ZXJDYXNlKCkubWF0Y2godyl8fFtcIlwiXSxudWxsPT1wLmNyb3NzRG9tYWluJiYocj1Fbi5leGVjKHAudXJsLnRvTG93ZXJDYXNlKCkpLHAuY3Jvc3NEb21haW49ISghcnx8clsxXT09PW1uWzFdJiZyWzJdPT09bW5bMl0mJihyWzNdfHwoXCJodHRwOlwiPT09clsxXT84MDo0NDMpKT09KG1uWzNdfHwoXCJodHRwOlwiPT09bW5bMV0/ODA6NDQzKSkpKSxwLmRhdGEmJnAucHJvY2Vzc0RhdGEmJlwic3RyaW5nXCIhPXR5cGVvZiBwLmRhdGEmJihwLmRhdGE9Yi5wYXJhbShwLmRhdGEscC50cmFkaXRpb25hbCkpLHFuKEFuLHAsbixOKSwyPT09eClyZXR1cm4gTjt1PXAuZ2xvYmFsLHUmJjA9PT1iLmFjdGl2ZSsrJiZiLmV2ZW50LnRyaWdnZXIoXCJhamF4U3RhcnRcIikscC50eXBlPXAudHlwZS50b1VwcGVyQ2FzZSgpLHAuaGFzQ29udGVudD0hQ24udGVzdChwLnR5cGUpLG89cC51cmwscC5oYXNDb250ZW50fHwocC5kYXRhJiYobz1wLnVybCs9KGJuLnRlc3Qobyk/XCImXCI6XCI/XCIpK3AuZGF0YSxkZWxldGUgcC5kYXRhKSxwLmNhY2hlPT09ITEmJihwLnVybD13bi50ZXN0KG8pP28ucmVwbGFjZSh3bixcIiQxXz1cIit2bisrKTpvKyhibi50ZXN0KG8pP1wiJlwiOlwiP1wiKStcIl89XCIrdm4rKykpLHAuaWZNb2RpZmllZCYmKGIubGFzdE1vZGlmaWVkW29dJiZOLnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Nb2RpZmllZC1TaW5jZVwiLGIubGFzdE1vZGlmaWVkW29dKSxiLmV0YWdbb10mJk4uc2V0UmVxdWVzdEhlYWRlcihcIklmLU5vbmUtTWF0Y2hcIixiLmV0YWdbb10pKSwocC5kYXRhJiZwLmhhc0NvbnRlbnQmJnAuY29udGVudFR5cGUhPT0hMXx8bi5jb250ZW50VHlwZSkmJk4uc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLHAuY29udGVudFR5cGUpLE4uc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLHAuZGF0YVR5cGVzWzBdJiZwLmFjY2VwdHNbcC5kYXRhVHlwZXNbMF1dP3AuYWNjZXB0c1twLmRhdGFUeXBlc1swXV0rKFwiKlwiIT09cC5kYXRhVHlwZXNbMF0/XCIsIFwiK0RuK1wiOyBxPTAuMDFcIjpcIlwiKTpwLmFjY2VwdHNbXCIqXCJdKTtmb3IoaSBpbiBwLmhlYWRlcnMpTi5zZXRSZXF1ZXN0SGVhZGVyKGkscC5oZWFkZXJzW2ldKTtpZihwLmJlZm9yZVNlbmQmJihwLmJlZm9yZVNlbmQuY2FsbChmLE4scCk9PT0hMXx8Mj09PXgpKXJldHVybiBOLmFib3J0KCk7VD1cImFib3J0XCI7Zm9yKGkgaW57c3VjY2VzczoxLGVycm9yOjEsY29tcGxldGU6MX0pTltpXShwW2ldKTtpZihsPXFuKGpuLHAsbixOKSl7Ti5yZWFkeVN0YXRlPTEsdSYmZC50cmlnZ2VyKFwiYWpheFNlbmRcIixbTixwXSkscC5hc3luYyYmcC50aW1lb3V0PjAmJihzPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtOLmFib3J0KFwidGltZW91dFwiKX0scC50aW1lb3V0KSk7dHJ5e3g9MSxsLnNlbmQoeSxrKX1jYXRjaChDKXtpZighKDI+eCkpdGhyb3cgQztrKC0xLEMpfX1lbHNlIGsoLTEsXCJObyBUcmFuc3BvcnRcIik7ZnVuY3Rpb24gayhlLG4scixpKXt2YXIgYyx5LHYsdyxULEM9bjsyIT09eCYmKHg9MixzJiZjbGVhclRpbWVvdXQocyksbD10LGE9aXx8XCJcIixOLnJlYWR5U3RhdGU9ZT4wPzQ6MCxyJiYodz1fbihwLE4scikpLGU+PTIwMCYmMzAwPmV8fDMwND09PWU/KHAuaWZNb2RpZmllZCYmKFQ9Ti5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIiksVCYmKGIubGFzdE1vZGlmaWVkW29dPVQpLFQ9Ti5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIiksVCYmKGIuZXRhZ1tvXT1UKSksMjA0PT09ZT8oYz0hMCxDPVwibm9jb250ZW50XCIpOjMwND09PWU/KGM9ITAsQz1cIm5vdG1vZGlmaWVkXCIpOihjPUZuKHAsdyksQz1jLnN0YXRlLHk9Yy5kYXRhLHY9Yy5lcnJvcixjPSF2KSk6KHY9QywoZXx8IUMpJiYoQz1cImVycm9yXCIsMD5lJiYoZT0wKSkpLE4uc3RhdHVzPWUsTi5zdGF0dXNUZXh0PShufHxDKStcIlwiLGM/aC5yZXNvbHZlV2l0aChmLFt5LEMsTl0pOmgucmVqZWN0V2l0aChmLFtOLEMsdl0pLE4uc3RhdHVzQ29kZShtKSxtPXQsdSYmZC50cmlnZ2VyKGM/XCJhamF4U3VjY2Vzc1wiOlwiYWpheEVycm9yXCIsW04scCxjP3k6dl0pLGcuZmlyZVdpdGgoZixbTixDXSksdSYmKGQudHJpZ2dlcihcImFqYXhDb21wbGV0ZVwiLFtOLHBdKSwtLWIuYWN0aXZlfHxiLmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKSkpfXJldHVybiBOfSxnZXRTY3JpcHQ6ZnVuY3Rpb24oZSxuKXtyZXR1cm4gYi5nZXQoZSx0LG4sXCJzY3JpcHRcIil9LGdldEpTT046ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBiLmdldChlLHQsbixcImpzb25cIil9fSk7ZnVuY3Rpb24gX24oZSxuLHIpe3ZhciBpLG8sYSxzLHU9ZS5jb250ZW50cyxsPWUuZGF0YVR5cGVzLGM9ZS5yZXNwb25zZUZpZWxkcztmb3IocyBpbiBjKXMgaW4gciYmKG5bY1tzXV09cltzXSk7d2hpbGUoXCIqXCI9PT1sWzBdKWwuc2hpZnQoKSxvPT09dCYmKG89ZS5taW1lVHlwZXx8bi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7aWYobylmb3IocyBpbiB1KWlmKHVbc10mJnVbc10udGVzdChvKSl7bC51bnNoaWZ0KHMpO2JyZWFrfWlmKGxbMF1pbiByKWE9bFswXTtlbHNle2ZvcihzIGluIHIpe2lmKCFsWzBdfHxlLmNvbnZlcnRlcnNbcytcIiBcIitsWzBdXSl7YT1zO2JyZWFrfWl8fChpPXMpfWE9YXx8aX1yZXR1cm4gYT8oYSE9PWxbMF0mJmwudW5zaGlmdChhKSxyW2FdKTp0fWZ1bmN0aW9uIEZuKGUsdCl7dmFyIG4scixpLG8sYT17fSxzPTAsdT1lLmRhdGFUeXBlcy5zbGljZSgpLGw9dVswXTtpZihlLmRhdGFGaWx0ZXImJih0PWUuZGF0YUZpbHRlcih0LGUuZGF0YVR5cGUpKSx1WzFdKWZvcihpIGluIGUuY29udmVydGVycylhW2kudG9Mb3dlckNhc2UoKV09ZS5jb252ZXJ0ZXJzW2ldO2Zvcig7cj11Wysrc107KWlmKFwiKlwiIT09cil7aWYoXCIqXCIhPT1sJiZsIT09cil7aWYoaT1hW2wrXCIgXCIrcl18fGFbXCIqIFwiK3JdLCFpKWZvcihuIGluIGEpaWYobz1uLnNwbGl0KFwiIFwiKSxvWzFdPT09ciYmKGk9YVtsK1wiIFwiK29bMF1dfHxhW1wiKiBcIitvWzBdXSkpe2k9PT0hMD9pPWFbbl06YVtuXSE9PSEwJiYocj1vWzBdLHUuc3BsaWNlKHMtLSwwLHIpKTticmVha31pZihpIT09ITApaWYoaSYmZVtcInRocm93c1wiXSl0PWkodCk7ZWxzZSB0cnl7dD1pKHQpfWNhdGNoKGMpe3JldHVybntzdGF0ZTpcInBhcnNlcmVycm9yXCIsZXJyb3I6aT9jOlwiTm8gY29udmVyc2lvbiBmcm9tIFwiK2wrXCIgdG8gXCIrcn19fWw9cn1yZXR1cm57c3RhdGU6XCJzdWNjZXNzXCIsZGF0YTp0fX1iLmFqYXhTZXR1cCh7YWNjZXB0czp7c2NyaXB0OlwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIn0sY29udGVudHM6e3NjcmlwdDovKD86amF2YXxlY21hKXNjcmlwdC99LGNvbnZlcnRlcnM6e1widGV4dCBzY3JpcHRcIjpmdW5jdGlvbihlKXtyZXR1cm4gYi5nbG9iYWxFdmFsKGUpLGV9fX0pLGIuYWpheFByZWZpbHRlcihcInNjcmlwdFwiLGZ1bmN0aW9uKGUpe2UuY2FjaGU9PT10JiYoZS5jYWNoZT0hMSksZS5jcm9zc0RvbWFpbiYmKGUudHlwZT1cIkdFVFwiLGUuZ2xvYmFsPSExKX0pLGIuYWpheFRyYW5zcG9ydChcInNjcmlwdFwiLGZ1bmN0aW9uKGUpe2lmKGUuY3Jvc3NEb21haW4pe3ZhciBuLHI9by5oZWFkfHxiKFwiaGVhZFwiKVswXXx8by5kb2N1bWVudEVsZW1lbnQ7cmV0dXJue3NlbmQ6ZnVuY3Rpb24odCxpKXtuPW8uY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxuLmFzeW5jPSEwLGUuc2NyaXB0Q2hhcnNldCYmKG4uY2hhcnNldD1lLnNjcmlwdENoYXJzZXQpLG4uc3JjPWUudXJsLG4ub25sb2FkPW4ub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKGUsdCl7KHR8fCFuLnJlYWR5U3RhdGV8fC9sb2FkZWR8Y29tcGxldGUvLnRlc3Qobi5yZWFkeVN0YXRlKSkmJihuLm9ubG9hZD1uLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLG4ucGFyZW50Tm9kZSYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pLG49bnVsbCx0fHxpKDIwMCxcInN1Y2Nlc3NcIikpfSxyLmluc2VydEJlZm9yZShuLHIuZmlyc3RDaGlsZCl9LGFib3J0OmZ1bmN0aW9uKCl7biYmbi5vbmxvYWQodCwhMCl9fX19KTt2YXIgT249W10sQm49Lyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztiLmFqYXhTZXR1cCh7anNvbnA6XCJjYWxsYmFja1wiLGpzb25wQ2FsbGJhY2s6ZnVuY3Rpb24oKXt2YXIgZT1Pbi5wb3AoKXx8Yi5leHBhbmRvK1wiX1wiK3ZuKys7cmV0dXJuIHRoaXNbZV09ITAsZX19KSxiLmFqYXhQcmVmaWx0ZXIoXCJqc29uIGpzb25wXCIsZnVuY3Rpb24obixyLGkpe3ZhciBvLGEscyx1PW4uanNvbnAhPT0hMSYmKEJuLnRlc3Qobi51cmwpP1widXJsXCI6XCJzdHJpbmdcIj09dHlwZW9mIG4uZGF0YSYmIShuLmNvbnRlbnRUeXBlfHxcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpJiZCbi50ZXN0KG4uZGF0YSkmJlwiZGF0YVwiKTtyZXR1cm4gdXx8XCJqc29ucFwiPT09bi5kYXRhVHlwZXNbMF0/KG89bi5qc29ucENhbGxiYWNrPWIuaXNGdW5jdGlvbihuLmpzb25wQ2FsbGJhY2spP24uanNvbnBDYWxsYmFjaygpOm4uanNvbnBDYWxsYmFjayx1P25bdV09blt1XS5yZXBsYWNlKEJuLFwiJDFcIitvKTpuLmpzb25wIT09ITEmJihuLnVybCs9KGJuLnRlc3Qobi51cmwpP1wiJlwiOlwiP1wiKStuLmpzb25wK1wiPVwiK28pLG4uY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdPWZ1bmN0aW9uKCl7cmV0dXJuIHN8fGIuZXJyb3IobytcIiB3YXMgbm90IGNhbGxlZFwiKSxzWzBdfSxuLmRhdGFUeXBlc1swXT1cImpzb25cIixhPWVbb10sZVtvXT1mdW5jdGlvbigpe3M9YXJndW1lbnRzfSxpLmFsd2F5cyhmdW5jdGlvbigpe2Vbb109YSxuW29dJiYobi5qc29ucENhbGxiYWNrPXIuanNvbnBDYWxsYmFjayxPbi5wdXNoKG8pKSxzJiZiLmlzRnVuY3Rpb24oYSkmJmEoc1swXSkscz1hPXR9KSxcInNjcmlwdFwiKTp0fSk7dmFyIFBuLFJuLFduPTAsJG49ZS5BY3RpdmVYT2JqZWN0JiZmdW5jdGlvbigpe3ZhciBlO2ZvcihlIGluIFBuKVBuW2VdKHQsITApfTtmdW5jdGlvbiBJbigpe3RyeXtyZXR1cm4gbmV3IGUuWE1MSHR0cFJlcXVlc3R9Y2F0Y2godCl7fX1mdW5jdGlvbiB6bigpe3RyeXtyZXR1cm4gbmV3IGUuQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpfWNhdGNoKHQpe319Yi5hamF4U2V0dGluZ3MueGhyPWUuQWN0aXZlWE9iamVjdD9mdW5jdGlvbigpe3JldHVybiF0aGlzLmlzTG9jYWwmJkluKCl8fHpuKCl9OkluLFJuPWIuYWpheFNldHRpbmdzLnhocigpLGIuc3VwcG9ydC5jb3JzPSEhUm4mJlwid2l0aENyZWRlbnRpYWxzXCJpbiBSbixSbj1iLnN1cHBvcnQuYWpheD0hIVJuLFJuJiZiLmFqYXhUcmFuc3BvcnQoZnVuY3Rpb24obil7aWYoIW4uY3Jvc3NEb21haW58fGIuc3VwcG9ydC5jb3JzKXt2YXIgcjtyZXR1cm57c2VuZDpmdW5jdGlvbihpLG8pe3ZhciBhLHMsdT1uLnhocigpO2lmKG4udXNlcm5hbWU/dS5vcGVuKG4udHlwZSxuLnVybCxuLmFzeW5jLG4udXNlcm5hbWUsbi5wYXNzd29yZCk6dS5vcGVuKG4udHlwZSxuLnVybCxuLmFzeW5jKSxuLnhockZpZWxkcylmb3IocyBpbiBuLnhockZpZWxkcyl1W3NdPW4ueGhyRmllbGRzW3NdO24ubWltZVR5cGUmJnUub3ZlcnJpZGVNaW1lVHlwZSYmdS5vdmVycmlkZU1pbWVUeXBlKG4ubWltZVR5cGUpLG4uY3Jvc3NEb21haW58fGlbXCJYLVJlcXVlc3RlZC1XaXRoXCJdfHwoaVtcIlgtUmVxdWVzdGVkLVdpdGhcIl09XCJYTUxIdHRwUmVxdWVzdFwiKTt0cnl7Zm9yKHMgaW4gaSl1LnNldFJlcXVlc3RIZWFkZXIocyxpW3NdKX1jYXRjaChsKXt9dS5zZW5kKG4uaGFzQ29udGVudCYmbi5kYXRhfHxudWxsKSxyPWZ1bmN0aW9uKGUsaSl7dmFyIHMsbCxjLHA7dHJ5e2lmKHImJihpfHw0PT09dS5yZWFkeVN0YXRlKSlpZihyPXQsYSYmKHUub25yZWFkeXN0YXRlY2hhbmdlPWIubm9vcCwkbiYmZGVsZXRlIFBuW2FdKSxpKTQhPT11LnJlYWR5U3RhdGUmJnUuYWJvcnQoKTtlbHNle3A9e30scz11LnN0YXR1cyxsPXUuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCksXCJzdHJpbmdcIj09dHlwZW9mIHUucmVzcG9uc2VUZXh0JiYocC50ZXh0PXUucmVzcG9uc2VUZXh0KTt0cnl7Yz11LnN0YXR1c1RleHR9Y2F0Y2goZil7Yz1cIlwifXN8fCFuLmlzTG9jYWx8fG4uY3Jvc3NEb21haW4/MTIyMz09PXMmJihzPTIwNCk6cz1wLnRleHQ/MjAwOjQwNH19Y2F0Y2goZCl7aXx8bygtMSxkKX1wJiZvKHMsYyxwLGwpfSxuLmFzeW5jPzQ9PT11LnJlYWR5U3RhdGU/c2V0VGltZW91dChyKTooYT0rK1duLCRuJiYoUG58fChQbj17fSxiKGUpLnVubG9hZCgkbikpLFBuW2FdPXIpLHUub25yZWFkeXN0YXRlY2hhbmdlPXIpOnIoKX0sYWJvcnQ6ZnVuY3Rpb24oKXtyJiZyKHQsITApfX19fSk7dmFyIFhuLFVuLFZuPS9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxZbj1SZWdFeHAoXCJeKD86KFsrLV0pPXwpKFwiK3grXCIpKFthLXolXSopJFwiLFwiaVwiKSxKbj0vcXVldWVIb29rcyQvLEduPVtucl0sUW49e1wiKlwiOltmdW5jdGlvbihlLHQpe3ZhciBuLHIsaT10aGlzLmNyZWF0ZVR3ZWVuKGUsdCksbz1Zbi5leGVjKHQpLGE9aS5jdXIoKSxzPSthfHwwLHU9MSxsPTIwO2lmKG8pe2lmKG49K29bMl0scj1vWzNdfHwoYi5jc3NOdW1iZXJbZV0/XCJcIjpcInB4XCIpLFwicHhcIiE9PXImJnMpe3M9Yi5jc3MoaS5lbGVtLGUsITApfHxufHwxO2RvIHU9dXx8XCIuNVwiLHMvPXUsYi5zdHlsZShpLmVsZW0sZSxzK3IpO3doaWxlKHUhPT0odT1pLmN1cigpL2EpJiYxIT09dSYmLS1sKX1pLnVuaXQ9cixpLnN0YXJ0PXMsaS5lbmQ9b1sxXT9zKyhvWzFdKzEpKm46bn1yZXR1cm4gaX1dfTtmdW5jdGlvbiBLbigpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7WG49dH0pLFhuPWIubm93KCl9ZnVuY3Rpb24gWm4oZSx0KXtiLmVhY2godCxmdW5jdGlvbih0LG4pe3ZhciByPShRblt0XXx8W10pLmNvbmNhdChRbltcIipcIl0pLGk9MCxvPXIubGVuZ3RoO2Zvcig7bz5pO2krKylpZihyW2ldLmNhbGwoZSx0LG4pKXJldHVybn0pfWZ1bmN0aW9uIGVyKGUsdCxuKXt2YXIgcixpLG89MCxhPUduLmxlbmd0aCxzPWIuRGVmZXJyZWQoKS5hbHdheXMoZnVuY3Rpb24oKXtkZWxldGUgdS5lbGVtfSksdT1mdW5jdGlvbigpe2lmKGkpcmV0dXJuITE7dmFyIHQ9WG58fEtuKCksbj1NYXRoLm1heCgwLGwuc3RhcnRUaW1lK2wuZHVyYXRpb24tdCkscj1uL2wuZHVyYXRpb258fDAsbz0xLXIsYT0wLHU9bC50d2VlbnMubGVuZ3RoO2Zvcig7dT5hO2ErKylsLnR3ZWVuc1thXS5ydW4obyk7cmV0dXJuIHMubm90aWZ5V2l0aChlLFtsLG8sbl0pLDE+byYmdT9uOihzLnJlc29sdmVXaXRoKGUsW2xdKSwhMSl9LGw9cy5wcm9taXNlKHtlbGVtOmUscHJvcHM6Yi5leHRlbmQoe30sdCksb3B0czpiLmV4dGVuZCghMCx7c3BlY2lhbEVhc2luZzp7fX0sbiksb3JpZ2luYWxQcm9wZXJ0aWVzOnQsb3JpZ2luYWxPcHRpb25zOm4sc3RhcnRUaW1lOlhufHxLbigpLGR1cmF0aW9uOm4uZHVyYXRpb24sdHdlZW5zOltdLGNyZWF0ZVR3ZWVuOmZ1bmN0aW9uKHQsbil7dmFyIHI9Yi5Ud2VlbihlLGwub3B0cyx0LG4sbC5vcHRzLnNwZWNpYWxFYXNpbmdbdF18fGwub3B0cy5lYXNpbmcpO3JldHVybiBsLnR3ZWVucy5wdXNoKHIpLHJ9LHN0b3A6ZnVuY3Rpb24odCl7dmFyIG49MCxyPXQ/bC50d2VlbnMubGVuZ3RoOjA7aWYoaSlyZXR1cm4gdGhpcztmb3IoaT0hMDtyPm47bisrKWwudHdlZW5zW25dLnJ1bigxKTtyZXR1cm4gdD9zLnJlc29sdmVXaXRoKGUsW2wsdF0pOnMucmVqZWN0V2l0aChlLFtsLHRdKSx0aGlzfX0pLGM9bC5wcm9wcztmb3IodHIoYyxsLm9wdHMuc3BlY2lhbEVhc2luZyk7YT5vO28rKylpZihyPUduW29dLmNhbGwobCxlLGMsbC5vcHRzKSlyZXR1cm4gcjtyZXR1cm4gWm4obCxjKSxiLmlzRnVuY3Rpb24obC5vcHRzLnN0YXJ0KSYmbC5vcHRzLnN0YXJ0LmNhbGwoZSxsKSxiLmZ4LnRpbWVyKGIuZXh0ZW5kKHUse2VsZW06ZSxhbmltOmwscXVldWU6bC5vcHRzLnF1ZXVlfSkpLGwucHJvZ3Jlc3MobC5vcHRzLnByb2dyZXNzKS5kb25lKGwub3B0cy5kb25lLGwub3B0cy5jb21wbGV0ZSkuZmFpbChsLm9wdHMuZmFpbCkuYWx3YXlzKGwub3B0cy5hbHdheXMpfWZ1bmN0aW9uIHRyKGUsdCl7dmFyIG4scixpLG8sYTtmb3IoaSBpbiBlKWlmKHI9Yi5jYW1lbENhc2UoaSksbz10W3JdLG49ZVtpXSxiLmlzQXJyYXkobikmJihvPW5bMV0sbj1lW2ldPW5bMF0pLGkhPT1yJiYoZVtyXT1uLGRlbGV0ZSBlW2ldKSxhPWIuY3NzSG9va3Nbcl0sYSYmXCJleHBhbmRcImluIGEpe249YS5leHBhbmQobiksZGVsZXRlIGVbcl07Zm9yKGkgaW4gbilpIGluIGV8fChlW2ldPW5baV0sdFtpXT1vKX1lbHNlIHRbcl09b31iLkFuaW1hdGlvbj1iLmV4dGVuZChlcix7dHdlZW5lcjpmdW5jdGlvbihlLHQpe2IuaXNGdW5jdGlvbihlKT8odD1lLGU9W1wiKlwiXSk6ZT1lLnNwbGl0KFwiIFwiKTt2YXIgbixyPTAsaT1lLmxlbmd0aDtmb3IoO2k+cjtyKyspbj1lW3JdLFFuW25dPVFuW25dfHxbXSxRbltuXS51bnNoaWZ0KHQpfSxwcmVmaWx0ZXI6ZnVuY3Rpb24oZSx0KXt0P0duLnVuc2hpZnQoZSk6R24ucHVzaChlKX19KTtmdW5jdGlvbiBucihlLHQsbil7dmFyIHIsaSxvLGEscyx1LGwsYyxwLGY9dGhpcyxkPWUuc3R5bGUsaD17fSxnPVtdLG09ZS5ub2RlVHlwZSYmbm4oZSk7bi5xdWV1ZXx8KGM9Yi5fcXVldWVIb29rcyhlLFwiZnhcIiksbnVsbD09Yy51bnF1ZXVlZCYmKGMudW5xdWV1ZWQ9MCxwPWMuZW1wdHkuZmlyZSxjLmVtcHR5LmZpcmU9ZnVuY3Rpb24oKXtjLnVucXVldWVkfHxwKCl9KSxjLnVucXVldWVkKyssZi5hbHdheXMoZnVuY3Rpb24oKXtmLmFsd2F5cyhmdW5jdGlvbigpe2MudW5xdWV1ZWQtLSxiLnF1ZXVlKGUsXCJmeFwiKS5sZW5ndGh8fGMuZW1wdHkuZmlyZSgpfSl9KSksMT09PWUubm9kZVR5cGUmJihcImhlaWdodFwiaW4gdHx8XCJ3aWR0aFwiaW4gdCkmJihuLm92ZXJmbG93PVtkLm92ZXJmbG93LGQub3ZlcmZsb3dYLGQub3ZlcmZsb3dZXSxcImlubGluZVwiPT09Yi5jc3MoZSxcImRpc3BsYXlcIikmJlwibm9uZVwiPT09Yi5jc3MoZSxcImZsb2F0XCIpJiYoYi5zdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQmJlwiaW5saW5lXCIhPT11bihlLm5vZGVOYW1lKT9kLnpvb209MTpkLmRpc3BsYXk9XCJpbmxpbmUtYmxvY2tcIikpLG4ub3ZlcmZsb3cmJihkLm92ZXJmbG93PVwiaGlkZGVuXCIsYi5zdXBwb3J0LnNocmlua1dyYXBCbG9ja3N8fGYuYWx3YXlzKGZ1bmN0aW9uKCl7ZC5vdmVyZmxvdz1uLm92ZXJmbG93WzBdLGQub3ZlcmZsb3dYPW4ub3ZlcmZsb3dbMV0sZC5vdmVyZmxvd1k9bi5vdmVyZmxvd1syXX0pKTtmb3IoaSBpbiB0KWlmKGE9dFtpXSxWbi5leGVjKGEpKXtpZihkZWxldGUgdFtpXSx1PXV8fFwidG9nZ2xlXCI9PT1hLGE9PT0obT9cImhpZGVcIjpcInNob3dcIikpY29udGludWU7Zy5wdXNoKGkpfWlmKG89Zy5sZW5ndGgpe3M9Yi5fZGF0YShlLFwiZnhzaG93XCIpfHxiLl9kYXRhKGUsXCJmeHNob3dcIix7fSksXCJoaWRkZW5cImluIHMmJihtPXMuaGlkZGVuKSx1JiYocy5oaWRkZW49IW0pLG0/YihlKS5zaG93KCk6Zi5kb25lKGZ1bmN0aW9uKCl7YihlKS5oaWRlKCl9KSxmLmRvbmUoZnVuY3Rpb24oKXt2YXIgdDtiLl9yZW1vdmVEYXRhKGUsXCJmeHNob3dcIik7Zm9yKHQgaW4gaCliLnN0eWxlKGUsdCxoW3RdKX0pO2ZvcihpPTA7bz5pO2krKylyPWdbaV0sbD1mLmNyZWF0ZVR3ZWVuKHIsbT9zW3JdOjApLGhbcl09c1tyXXx8Yi5zdHlsZShlLHIpLHIgaW4gc3x8KHNbcl09bC5zdGFydCxtJiYobC5lbmQ9bC5zdGFydCxsLnN0YXJ0PVwid2lkdGhcIj09PXJ8fFwiaGVpZ2h0XCI9PT1yPzE6MCkpfX1mdW5jdGlvbiBycihlLHQsbixyLGkpe3JldHVybiBuZXcgcnIucHJvdG90eXBlLmluaXQoZSx0LG4scixpKX1iLlR3ZWVuPXJyLHJyLnByb3RvdHlwZT17Y29uc3RydWN0b3I6cnIsaW5pdDpmdW5jdGlvbihlLHQsbixyLGksbyl7dGhpcy5lbGVtPWUsdGhpcy5wcm9wPW4sdGhpcy5lYXNpbmc9aXx8XCJzd2luZ1wiLHRoaXMub3B0aW9ucz10LHRoaXMuc3RhcnQ9dGhpcy5ub3c9dGhpcy5jdXIoKSx0aGlzLmVuZD1yLHRoaXMudW5pdD1vfHwoYi5jc3NOdW1iZXJbbl0/XCJcIjpcInB4XCIpfSxjdXI6ZnVuY3Rpb24oKXt2YXIgZT1yci5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gZSYmZS5nZXQ/ZS5nZXQodGhpcyk6cnIucHJvcEhvb2tzLl9kZWZhdWx0LmdldCh0aGlzKX0scnVuOmZ1bmN0aW9uKGUpe3ZhciB0LG49cnIucHJvcEhvb2tzW3RoaXMucHJvcF07cmV0dXJuIHRoaXMucG9zPXQ9dGhpcy5vcHRpb25zLmR1cmF0aW9uP2IuZWFzaW5nW3RoaXMuZWFzaW5nXShlLHRoaXMub3B0aW9ucy5kdXJhdGlvbiplLDAsMSx0aGlzLm9wdGlvbnMuZHVyYXRpb24pOmUsdGhpcy5ub3c9KHRoaXMuZW5kLXRoaXMuc3RhcnQpKnQrdGhpcy5zdGFydCx0aGlzLm9wdGlvbnMuc3RlcCYmdGhpcy5vcHRpb25zLnN0ZXAuY2FsbCh0aGlzLmVsZW0sdGhpcy5ub3csdGhpcyksbiYmbi5zZXQ/bi5zZXQodGhpcyk6cnIucHJvcEhvb2tzLl9kZWZhdWx0LnNldCh0aGlzKSx0aGlzfX0scnIucHJvdG90eXBlLmluaXQucHJvdG90eXBlPXJyLnByb3RvdHlwZSxyci5wcm9wSG9va3M9e19kZWZhdWx0OntnZXQ6ZnVuY3Rpb24oZSl7dmFyIHQ7cmV0dXJuIG51bGw9PWUuZWxlbVtlLnByb3BdfHxlLmVsZW0uc3R5bGUmJm51bGwhPWUuZWxlbS5zdHlsZVtlLnByb3BdPyh0PWIuY3NzKGUuZWxlbSxlLnByb3AsXCJcIiksdCYmXCJhdXRvXCIhPT10P3Q6MCk6ZS5lbGVtW2UucHJvcF19LHNldDpmdW5jdGlvbihlKXtiLmZ4LnN0ZXBbZS5wcm9wXT9iLmZ4LnN0ZXBbZS5wcm9wXShlKTplLmVsZW0uc3R5bGUmJihudWxsIT1lLmVsZW0uc3R5bGVbYi5jc3NQcm9wc1tlLnByb3BdXXx8Yi5jc3NIb29rc1tlLnByb3BdKT9iLnN0eWxlKGUuZWxlbSxlLnByb3AsZS5ub3crZS51bml0KTplLmVsZW1bZS5wcm9wXT1lLm5vd319fSxyci5wcm9wSG9va3Muc2Nyb2xsVG9wPXJyLnByb3BIb29rcy5zY3JvbGxMZWZ0PXtzZXQ6ZnVuY3Rpb24oZSl7ZS5lbGVtLm5vZGVUeXBlJiZlLmVsZW0ucGFyZW50Tm9kZSYmKGUuZWxlbVtlLnByb3BdPWUubm93KX19LGIuZWFjaChbXCJ0b2dnbGVcIixcInNob3dcIixcImhpZGVcIl0sZnVuY3Rpb24oZSx0KXt2YXIgbj1iLmZuW3RdO2IuZm5bdF09ZnVuY3Rpb24oZSxyLGkpe3JldHVybiBudWxsPT1lfHxcImJvb2xlYW5cIj09dHlwZW9mIGU/bi5hcHBseSh0aGlzLGFyZ3VtZW50cyk6dGhpcy5hbmltYXRlKGlyKHQsITApLGUscixpKX19KSxiLmZuLmV4dGVuZCh7ZmFkZVRvOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiB0aGlzLmZpbHRlcihubikuY3NzKFwib3BhY2l0eVwiLDApLnNob3coKS5lbmQoKS5hbmltYXRlKHtvcGFjaXR5OnR9LGUsbixyKX0sYW5pbWF0ZTpmdW5jdGlvbihlLHQsbixyKXt2YXIgaT1iLmlzRW1wdHlPYmplY3QoZSksbz1iLnNwZWVkKHQsbixyKSxhPWZ1bmN0aW9uKCl7dmFyIHQ9ZXIodGhpcyxiLmV4dGVuZCh7fSxlKSxvKTthLmZpbmlzaD1mdW5jdGlvbigpe3Quc3RvcCghMCl9LChpfHxiLl9kYXRhKHRoaXMsXCJmaW5pc2hcIikpJiZ0LnN0b3AoITApfTtyZXR1cm4gYS5maW5pc2g9YSxpfHxvLnF1ZXVlPT09ITE/dGhpcy5lYWNoKGEpOnRoaXMucXVldWUoby5xdWV1ZSxhKX0sc3RvcDpmdW5jdGlvbihlLG4scil7dmFyIGk9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zdG9wO2RlbGV0ZSBlLnN0b3AsdChyKX07cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIGUmJihyPW4sbj1lLGU9dCksbiYmZSE9PSExJiZ0aGlzLnF1ZXVlKGV8fFwiZnhcIixbXSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ITAsbj1udWxsIT1lJiZlK1wicXVldWVIb29rc1wiLG89Yi50aW1lcnMsYT1iLl9kYXRhKHRoaXMpO2lmKG4pYVtuXSYmYVtuXS5zdG9wJiZpKGFbbl0pO2Vsc2UgZm9yKG4gaW4gYSlhW25dJiZhW25dLnN0b3AmJkpuLnRlc3QobikmJmkoYVtuXSk7Zm9yKG49by5sZW5ndGg7bi0tOylvW25dLmVsZW0hPT10aGlzfHxudWxsIT1lJiZvW25dLnF1ZXVlIT09ZXx8KG9bbl0uYW5pbS5zdG9wKHIpLHQ9ITEsby5zcGxpY2UobiwxKSk7KHR8fCFyKSYmYi5kZXF1ZXVlKHRoaXMsZSl9KX0sZmluaXNoOmZ1bmN0aW9uKGUpe3JldHVybiBlIT09ITEmJihlPWV8fFwiZnhcIiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQsbj1iLl9kYXRhKHRoaXMpLHI9bltlK1wicXVldWVcIl0saT1uW2UrXCJxdWV1ZUhvb2tzXCJdLG89Yi50aW1lcnMsYT1yP3IubGVuZ3RoOjA7Zm9yKG4uZmluaXNoPSEwLGIucXVldWUodGhpcyxlLFtdKSxpJiZpLmN1ciYmaS5jdXIuZmluaXNoJiZpLmN1ci5maW5pc2guY2FsbCh0aGlzKSx0PW8ubGVuZ3RoO3QtLTspb1t0XS5lbGVtPT09dGhpcyYmb1t0XS5xdWV1ZT09PWUmJihvW3RdLmFuaW0uc3RvcCghMCksby5zcGxpY2UodCwxKSk7Zm9yKHQ9MDthPnQ7dCsrKXJbdF0mJnJbdF0uZmluaXNoJiZyW3RdLmZpbmlzaC5jYWxsKHRoaXMpO2RlbGV0ZSBuLmZpbmlzaH0pfX0pO2Z1bmN0aW9uIGlyKGUsdCl7dmFyIG4scj17aGVpZ2h0OmV9LGk9MDtmb3IodD10PzE6MDs0Pmk7aSs9Mi10KW49WnRbaV0scltcIm1hcmdpblwiK25dPXJbXCJwYWRkaW5nXCIrbl09ZTtyZXR1cm4gdCYmKHIub3BhY2l0eT1yLndpZHRoPWUpLHJ9Yi5lYWNoKHtzbGlkZURvd246aXIoXCJzaG93XCIpLHNsaWRlVXA6aXIoXCJoaWRlXCIpLHNsaWRlVG9nZ2xlOmlyKFwidG9nZ2xlXCIpLGZhZGVJbjp7b3BhY2l0eTpcInNob3dcIn0sZmFkZU91dDp7b3BhY2l0eTpcImhpZGVcIn0sZmFkZVRvZ2dsZTp7b3BhY2l0eTpcInRvZ2dsZVwifX0sZnVuY3Rpb24oZSx0KXtiLmZuW2VdPWZ1bmN0aW9uKGUsbixyKXtyZXR1cm4gdGhpcy5hbmltYXRlKHQsZSxuLHIpfX0pLGIuc3BlZWQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWUmJlwib2JqZWN0XCI9PXR5cGVvZiBlP2IuZXh0ZW5kKHt9LGUpOntjb21wbGV0ZTpufHwhbiYmdHx8Yi5pc0Z1bmN0aW9uKGUpJiZlLGR1cmF0aW9uOmUsZWFzaW5nOm4mJnR8fHQmJiFiLmlzRnVuY3Rpb24odCkmJnR9O3JldHVybiByLmR1cmF0aW9uPWIuZngub2ZmPzA6XCJudW1iZXJcIj09dHlwZW9mIHIuZHVyYXRpb24/ci5kdXJhdGlvbjpyLmR1cmF0aW9uIGluIGIuZnguc3BlZWRzP2IuZnguc3BlZWRzW3IuZHVyYXRpb25dOmIuZnguc3BlZWRzLl9kZWZhdWx0LChudWxsPT1yLnF1ZXVlfHxyLnF1ZXVlPT09ITApJiYoci5xdWV1ZT1cImZ4XCIpLHIub2xkPXIuY29tcGxldGUsci5jb21wbGV0ZT1mdW5jdGlvbigpe2IuaXNGdW5jdGlvbihyLm9sZCkmJnIub2xkLmNhbGwodGhpcyksci5xdWV1ZSYmYi5kZXF1ZXVlKHRoaXMsci5xdWV1ZSl9LHJ9LGIuZWFzaW5nPXtsaW5lYXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LHN3aW5nOmZ1bmN0aW9uKGUpe3JldHVybi41LU1hdGguY29zKGUqTWF0aC5QSSkvMn19LGIudGltZXJzPVtdLGIuZng9cnIucHJvdG90eXBlLmluaXQsYi5meC50aWNrPWZ1bmN0aW9uKCl7dmFyIGUsbj1iLnRpbWVycyxyPTA7Zm9yKFhuPWIubm93KCk7bi5sZW5ndGg+cjtyKyspZT1uW3JdLGUoKXx8bltyXSE9PWV8fG4uc3BsaWNlKHItLSwxKTtuLmxlbmd0aHx8Yi5meC5zdG9wKCksWG49dH0sYi5meC50aW1lcj1mdW5jdGlvbihlKXtlKCkmJmIudGltZXJzLnB1c2goZSkmJmIuZnguc3RhcnQoKX0sYi5meC5pbnRlcnZhbD0xMyxiLmZ4LnN0YXJ0PWZ1bmN0aW9uKCl7VW58fChVbj1zZXRJbnRlcnZhbChiLmZ4LnRpY2ssYi5meC5pbnRlcnZhbCkpfSxiLmZ4LnN0b3A9ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKFVuKSxVbj1udWxsfSxiLmZ4LnNwZWVkcz17c2xvdzo2MDAsZmFzdDoyMDAsX2RlZmF1bHQ6NDAwfSxiLmZ4LnN0ZXA9e30sYi5leHByJiZiLmV4cHIuZmlsdGVycyYmKGIuZXhwci5maWx0ZXJzLmFuaW1hdGVkPWZ1bmN0aW9uKGUpe3JldHVybiBiLmdyZXAoYi50aW1lcnMsZnVuY3Rpb24odCl7cmV0dXJuIGU9PT10LmVsZW19KS5sZW5ndGh9KSxiLmZuLm9mZnNldD1mdW5jdGlvbihlKXtpZihhcmd1bWVudHMubGVuZ3RoKXJldHVybiBlPT09dD90aGlzOnRoaXMuZWFjaChmdW5jdGlvbih0KXtiLm9mZnNldC5zZXRPZmZzZXQodGhpcyxlLHQpfSk7dmFyIG4scixvPXt0b3A6MCxsZWZ0OjB9LGE9dGhpc1swXSxzPWEmJmEub3duZXJEb2N1bWVudDtpZihzKXJldHVybiBuPXMuZG9jdW1lbnRFbGVtZW50LGIuY29udGFpbnMobixhKT8odHlwZW9mIGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IT09aSYmKG89YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkscj1vcihzKSx7dG9wOm8udG9wKyhyLnBhZ2VZT2Zmc2V0fHxuLnNjcm9sbFRvcCktKG4uY2xpZW50VG9wfHwwKSxsZWZ0Om8ubGVmdCsoci5wYWdlWE9mZnNldHx8bi5zY3JvbGxMZWZ0KS0obi5jbGllbnRMZWZ0fHwwKX0pOm99LGIub2Zmc2V0PXtzZXRPZmZzZXQ6ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWIuY3NzKGUsXCJwb3NpdGlvblwiKTtcInN0YXRpY1wiPT09ciYmKGUuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiKTt2YXIgaT1iKGUpLG89aS5vZmZzZXQoKSxhPWIuY3NzKGUsXCJ0b3BcIikscz1iLmNzcyhlLFwibGVmdFwiKSx1PShcImFic29sdXRlXCI9PT1yfHxcImZpeGVkXCI9PT1yKSYmYi5pbkFycmF5KFwiYXV0b1wiLFthLHNdKT4tMSxsPXt9LGM9e30scCxmO3U/KGM9aS5wb3NpdGlvbigpLHA9Yy50b3AsZj1jLmxlZnQpOihwPXBhcnNlRmxvYXQoYSl8fDAsZj1wYXJzZUZsb2F0KHMpfHwwKSxiLmlzRnVuY3Rpb24odCkmJih0PXQuY2FsbChlLG4sbykpLG51bGwhPXQudG9wJiYobC50b3A9dC50b3Atby50b3ArcCksbnVsbCE9dC5sZWZ0JiYobC5sZWZ0PXQubGVmdC1vLmxlZnQrZiksXCJ1c2luZ1wiaW4gdD90LnVzaW5nLmNhbGwoZSxsKTppLmNzcyhsKX19LGIuZm4uZXh0ZW5kKHtwb3NpdGlvbjpmdW5jdGlvbigpe2lmKHRoaXNbMF0pe3ZhciBlLHQsbj17dG9wOjAsbGVmdDowfSxyPXRoaXNbMF07cmV0dXJuXCJmaXhlZFwiPT09Yi5jc3MocixcInBvc2l0aW9uXCIpP3Q9ci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTooZT10aGlzLm9mZnNldFBhcmVudCgpLHQ9dGhpcy5vZmZzZXQoKSxiLm5vZGVOYW1lKGVbMF0sXCJodG1sXCIpfHwobj1lLm9mZnNldCgpKSxuLnRvcCs9Yi5jc3MoZVswXSxcImJvcmRlclRvcFdpZHRoXCIsITApLG4ubGVmdCs9Yi5jc3MoZVswXSxcImJvcmRlckxlZnRXaWR0aFwiLCEwKSkse3RvcDp0LnRvcC1uLnRvcC1iLmNzcyhyLFwibWFyZ2luVG9wXCIsITApLGxlZnQ6dC5sZWZ0LW4ubGVmdC1iLmNzcyhyLFwibWFyZ2luTGVmdFwiLCEwKX19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXt2YXIgZT10aGlzLm9mZnNldFBhcmVudHx8by5kb2N1bWVudEVsZW1lbnQ7d2hpbGUoZSYmIWIubm9kZU5hbWUoZSxcImh0bWxcIikmJlwic3RhdGljXCI9PT1iLmNzcyhlLFwicG9zaXRpb25cIikpZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gZXx8by5kb2N1bWVudEVsZW1lbnR9KX19KSxiLmVhY2goe3Njcm9sbExlZnQ6XCJwYWdlWE9mZnNldFwiLHNjcm9sbFRvcDpcInBhZ2VZT2Zmc2V0XCJ9LGZ1bmN0aW9uKGUsbil7dmFyIHI9L1kvLnRlc3Qobik7Yi5mbltlXT1mdW5jdGlvbihpKXtyZXR1cm4gYi5hY2Nlc3ModGhpcyxmdW5jdGlvbihlLGksbyl7dmFyIGE9b3IoZSk7cmV0dXJuIG89PT10P2E/biBpbiBhP2Fbbl06YS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbaV06ZVtpXTooYT9hLnNjcm9sbFRvKHI/YihhKS5zY3JvbGxMZWZ0KCk6byxyP286YihhKS5zY3JvbGxUb3AoKSk6ZVtpXT1vLHQpfSxlLGksYXJndW1lbnRzLmxlbmd0aCxudWxsKX19KTtmdW5jdGlvbiBvcihlKXtyZXR1cm4gYi5pc1dpbmRvdyhlKT9lOjk9PT1lLm5vZGVUeXBlP2UuZGVmYXVsdFZpZXd8fGUucGFyZW50V2luZG93OiExfWIuZWFjaCh7SGVpZ2h0OlwiaGVpZ2h0XCIsV2lkdGg6XCJ3aWR0aFwifSxmdW5jdGlvbihlLG4pe2IuZWFjaCh7cGFkZGluZzpcImlubmVyXCIrZSxjb250ZW50Om4sXCJcIjpcIm91dGVyXCIrZX0sZnVuY3Rpb24ocixpKXtiLmZuW2ldPWZ1bmN0aW9uKGksbyl7dmFyIGE9YXJndW1lbnRzLmxlbmd0aCYmKHJ8fFwiYm9vbGVhblwiIT10eXBlb2YgaSkscz1yfHwoaT09PSEwfHxvPT09ITA/XCJtYXJnaW5cIjpcImJvcmRlclwiKTtyZXR1cm4gYi5hY2Nlc3ModGhpcyxmdW5jdGlvbihuLHIsaSl7dmFyIG87cmV0dXJuIGIuaXNXaW5kb3cobik/bi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIitlXTo5PT09bi5ub2RlVHlwZT8obz1uLmRvY3VtZW50RWxlbWVudCxNYXRoLm1heChuLmJvZHlbXCJzY3JvbGxcIitlXSxvW1wic2Nyb2xsXCIrZV0sbi5ib2R5W1wib2Zmc2V0XCIrZV0sb1tcIm9mZnNldFwiK2VdLG9bXCJjbGllbnRcIitlXSkpOmk9PT10P2IuY3NzKG4scixzKTpiLnN0eWxlKG4scixpLHMpfSxuLGE/aTp0LGEsbnVsbCl9fSl9KSxlLmpRdWVyeT1lLiQ9YixcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZS5hbWQualF1ZXJ5JiZkZWZpbmUoXCJqcXVlcnlcIixbXSxmdW5jdGlvbigpe3JldHVybiBifSl9KSh3aW5kb3cpO1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiAkICE9IFwidW5kZWZpbmVkXCIgPyAkIDogd2luZG93LiQpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gZGVmaW5lRXhwb3J0KGV4KSB7IG1vZHVsZS5leHBvcnRzID0gZXg7IH0pO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKiFcbiAqIGFzeW5jXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gKlxuICogQ29weXJpZ2h0IDIwMTAtMjAxNCBDYW9sYW4gTWNNYWhvblxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qanNoaW50IG9uZXZhcjogZmFsc2UsIGluZGVudDo0ICovXG4vKmdsb2JhbCBzZXRJbW1lZGlhdGU6IGZhbHNlLCBzZXRUaW1lb3V0OiBmYWxzZSwgY29uc29sZTogZmFsc2UgKi9cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgYXN5bmMgPSB7fTtcblxuICAgIC8vIGdsb2JhbCBvbiB0aGUgc2VydmVyLCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgICB2YXIgcm9vdCwgcHJldmlvdXNfYXN5bmM7XG5cbiAgICByb290ID0gdGhpcztcbiAgICBpZiAocm9vdCAhPSBudWxsKSB7XG4gICAgICBwcmV2aW91c19hc3luYyA9IHJvb3QuYXN5bmM7XG4gICAgfVxuXG4gICAgYXN5bmMubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IHByZXZpb3VzX2FzeW5jO1xuICAgICAgICByZXR1cm4gYXN5bmM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9ubHlfb25jZShmbikge1xuICAgICAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYWxsZWQpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHdhcyBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLy8gY3Jvc3MtYnJvd3NlciBjb21wYXRpYmxpdHkgZnVuY3Rpb25zIC8vLy9cblxuICAgIHZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgdmFyIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH07XG5cbiAgICB2YXIgX2VhY2ggPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvcikge1xuICAgICAgICBpZiAoYXJyLmZvckVhY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnIuZm9yRWFjaChpdGVyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKGFycltpXSwgaSwgYXJyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgX21hcCA9IGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgICAgIGlmIChhcnIubWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyLm1hcChpdGVyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2VhY2goYXJyLCBmdW5jdGlvbiAoeCwgaSwgYSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGl0ZXJhdG9yKHgsIGksIGEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICB2YXIgX3JlZHVjZSA9IGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yLCBtZW1vKSB7XG4gICAgICAgIGlmIChhcnIucmVkdWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShpdGVyYXRvciwgbWVtbyk7XG4gICAgICAgIH1cbiAgICAgICAgX2VhY2goYXJyLCBmdW5jdGlvbiAoeCwgaSwgYSkge1xuICAgICAgICAgICAgbWVtbyA9IGl0ZXJhdG9yKG1lbW8sIHgsIGksIGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgfTtcblxuICAgIHZhciBfa2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9O1xuXG4gICAgLy8vLyBleHBvcnRlZCBhc3luYyBtb2R1bGUgZnVuY3Rpb25zIC8vLy9cblxuICAgIC8vLy8gbmV4dFRpY2sgaW1wbGVtZW50YXRpb24gd2l0aCBicm93c2VyLWNvbXBhdGlibGUgZmFsbGJhY2sgLy8vL1xuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcgfHwgIShwcm9jZXNzLm5leHRUaWNrKSkge1xuICAgICAgICBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXN5bmMubmV4dFRpY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICAvLyBub3QgYSBkaXJlY3QgYWxpYXMgZm9yIElFMTAgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlID0gYXN5bmMubmV4dFRpY2s7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhc3luYy5uZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZSA9IGFzeW5jLm5leHRUaWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhc3luYy5uZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgIC8vIG5vdCBhIGRpcmVjdCBhbGlhcyBmb3IgSUUxMCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlID0gYXN5bmMubmV4dFRpY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYy5lYWNoID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG4gICAgICAgIGlmICghYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICAgIF9lYWNoKGFyciwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHgsIG9ubHlfb25jZShkb25lKSApO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjb21wbGV0ZWQgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBhc3luYy5mb3JFYWNoID0gYXN5bmMuZWFjaDtcblxuICAgIGFzeW5jLmVhY2hTZXJpZXMgPSBmdW5jdGlvbiAoYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgaWYgKCFhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihhcnJbY29tcGxldGVkXSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaXRlcmF0ZSgpO1xuICAgIH07XG4gICAgYXN5bmMuZm9yRWFjaFNlcmllcyA9IGFzeW5jLmVhY2hTZXJpZXM7XG5cbiAgICBhc3luYy5lYWNoTGltaXQgPSBmdW5jdGlvbiAoYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmbiA9IF9lYWNoTGltaXQobGltaXQpO1xuICAgICAgICBmbi5hcHBseShudWxsLCBbYXJyLCBpdGVyYXRvciwgY2FsbGJhY2tdKTtcbiAgICB9O1xuICAgIGFzeW5jLmZvckVhY2hMaW1pdCA9IGFzeW5jLmVhY2hMaW1pdDtcblxuICAgIHZhciBfZWFjaExpbWl0ID0gZnVuY3Rpb24gKGxpbWl0KSB7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICAgIGlmICghYXJyLmxlbmd0aCB8fCBsaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgICAgICAgIHZhciBzdGFydGVkID0gMDtcbiAgICAgICAgICAgIHZhciBydW5uaW5nID0gMDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIHJlcGxlbmlzaCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChydW5uaW5nIDwgbGltaXQgJiYgc3RhcnRlZCA8IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRlZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycltzdGFydGVkIC0gMV0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBsZW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuXG4gICAgdmFyIGRvUGFyYWxsZWwgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBbYXN5bmMuZWFjaF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBkb1BhcmFsbGVsTGltaXQgPSBmdW5jdGlvbihsaW1pdCwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBbX2VhY2hMaW1pdChsaW1pdCldLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZG9TZXJpZXMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBbYXN5bmMuZWFjaFNlcmllc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG5cbiAgICB2YXIgX2FzeW5jTWFwID0gZnVuY3Rpb24gKGVhY2hmbiwgYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgYXJyID0gX21hcChhcnIsIGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4ge2luZGV4OiBpLCB2YWx1ZTogeH07XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcih4LnZhbHVlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcih4LnZhbHVlLCBmdW5jdGlvbiAoZXJyLCB2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbeC5pbmRleF0gPSB2O1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYXN5bmMubWFwID0gZG9QYXJhbGxlbChfYXN5bmNNYXApO1xuICAgIGFzeW5jLm1hcFNlcmllcyA9IGRvU2VyaWVzKF9hc3luY01hcCk7XG4gICAgYXN5bmMubWFwTGltaXQgPSBmdW5jdGlvbiAoYXJyLCBsaW1pdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfbWFwTGltaXQobGltaXQpKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgdmFyIF9tYXBMaW1pdCA9IGZ1bmN0aW9uKGxpbWl0KSB7XG4gICAgICAgIHJldHVybiBkb1BhcmFsbGVsTGltaXQobGltaXQsIF9hc3luY01hcCk7XG4gICAgfTtcblxuICAgIC8vIHJlZHVjZSBvbmx5IGhhcyBhIHNlcmllcyB2ZXJzaW9uLCBhcyBkb2luZyByZWR1Y2UgaW4gcGFyYWxsZWwgd29uJ3RcbiAgICAvLyB3b3JrIGluIG1hbnkgc2l0dWF0aW9ucy5cbiAgICBhc3luYy5yZWR1Y2UgPSBmdW5jdGlvbiAoYXJyLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuZWFjaFNlcmllcyhhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IobWVtbywgeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIG1lbW8gPSB2O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBtZW1vKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBpbmplY3QgYWxpYXNcbiAgICBhc3luYy5pbmplY3QgPSBhc3luYy5yZWR1Y2U7XG4gICAgLy8gZm9sZGwgYWxpYXNcbiAgICBhc3luYy5mb2xkbCA9IGFzeW5jLnJlZHVjZTtcblxuICAgIGFzeW5jLnJlZHVjZVJpZ2h0ID0gZnVuY3Rpb24gKGFyciwgbWVtbywgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IF9tYXAoYXJyLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgYXN5bmMucmVkdWNlKHJldmVyc2VkLCBtZW1vLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG4gICAgLy8gZm9sZHIgYWxpYXNcbiAgICBhc3luYy5mb2xkciA9IGFzeW5jLnJlZHVjZVJpZ2h0O1xuXG4gICAgdmFyIF9maWx0ZXIgPSBmdW5jdGlvbiAoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBhcnIgPSBfbWFwKGFyciwgZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB7aW5kZXg6IGksIHZhbHVlOiB4fTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeC52YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soX21hcChyZXN1bHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gICAgICAgICAgICB9KSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhc3luYy5maWx0ZXIgPSBkb1BhcmFsbGVsKF9maWx0ZXIpO1xuICAgIGFzeW5jLmZpbHRlclNlcmllcyA9IGRvU2VyaWVzKF9maWx0ZXIpO1xuICAgIC8vIHNlbGVjdCBhbGlhc1xuICAgIGFzeW5jLnNlbGVjdCA9IGFzeW5jLmZpbHRlcjtcbiAgICBhc3luYy5zZWxlY3RTZXJpZXMgPSBhc3luYy5maWx0ZXJTZXJpZXM7XG5cbiAgICB2YXIgX3JlamVjdCA9IGZ1bmN0aW9uIChlYWNoZm4sIGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGFyciA9IF9tYXAoYXJyLCBmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHtpbmRleDogaSwgdmFsdWU6IHh9O1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpdGVyYXRvcih4LnZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soX21hcChyZXN1bHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gICAgICAgICAgICB9KSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC52YWx1ZTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhc3luYy5yZWplY3QgPSBkb1BhcmFsbGVsKF9yZWplY3QpO1xuICAgIGFzeW5jLnJlamVjdFNlcmllcyA9IGRvU2VyaWVzKF9yZWplY3QpO1xuXG4gICAgdmFyIF9kZXRlY3QgPSBmdW5jdGlvbiAoZWFjaGZuLCBhcnIsIGl0ZXJhdG9yLCBtYWluX2NhbGxiYWNrKSB7XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbl9jYWxsYmFjayh4KTtcbiAgICAgICAgICAgICAgICAgICAgbWFpbl9jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFpbl9jYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGFzeW5jLmRldGVjdCA9IGRvUGFyYWxsZWwoX2RldGVjdCk7XG4gICAgYXN5bmMuZGV0ZWN0U2VyaWVzID0gZG9TZXJpZXMoX2RldGVjdCk7XG5cbiAgICBhc3luYy5zb21lID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIG1haW5fY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuZWFjaChhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICBtYWluX2NhbGxiYWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBtYWluX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFpbl9jYWxsYmFjayhmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gYW55IGFsaWFzXG4gICAgYXN5bmMuYW55ID0gYXN5bmMuc29tZTtcblxuICAgIGFzeW5jLmV2ZXJ5ID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIG1haW5fY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuZWFjaChhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbl9jYWxsYmFjayhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIG1haW5fY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBtYWluX2NhbGxiYWNrKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIGFsbCBhbGlhc1xuICAgIGFzeW5jLmFsbCA9IGFzeW5jLmV2ZXJ5O1xuXG4gICAgYXN5bmMuc29ydEJ5ID0gZnVuY3Rpb24gKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLm1hcChhcnIsIGZ1bmN0aW9uICh4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0b3IoeCwgZnVuY3Rpb24gKGVyciwgY3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB7dmFsdWU6IHgsIGNyaXRlcmlhOiBjcml0ZXJpYX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhLCBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIF9tYXAocmVzdWx0cy5zb3J0KGZuKSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudmFsdWU7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgYXN5bmMuYXV0byA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgdmFyIGtleXMgPSBfa2V5cyh0YXNrcyk7XG4gICAgICAgIHZhciByZW1haW5pbmdUYXNrcyA9IGtleXMubGVuZ3RoXG4gICAgICAgIGlmICghcmVtYWluaW5nVGFza3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdHMgPSB7fTtcblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBhZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnVuc2hpZnQoZm4pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRhc2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1Rhc2tzLS1cbiAgICAgICAgICAgIF9lYWNoKGxpc3RlbmVycy5zbGljZSgwKSwgZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghcmVtYWluaW5nVGFza3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGZpbmFsIGNhbGxiYWNrIGZyb20gY2FsbGluZyBpdHNlbGYgaWYgaXQgZXJyb3JzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgICAgICAgICAgIHRoZUNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfZWFjaChrZXlzLCBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSBfaXNBcnJheSh0YXNrc1trXSkgPyB0YXNrc1trXTogW3Rhc2tzW2tdXTtcbiAgICAgICAgICAgIHZhciB0YXNrQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzYWZlUmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBfZWFjaChfa2V5cyhyZXN1bHRzKSwgZnVuY3Rpb24ocmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNbcmtleV0gPSByZXN1bHRzW3JrZXldO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNba10gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIsIHNhZmVSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcCBzdWJzZXF1ZW50IGVycm9ycyBoaXR0aW5nIGNhbGxiYWNrIG11bHRpcGxlIHRpbWVzXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzW2tdID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHRhc2tDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByZXF1aXJlcyA9IHRhc2suc2xpY2UoMCwgTWF0aC5hYnModGFzay5sZW5ndGggLSAxKSkgfHwgW107XG4gICAgICAgICAgICB2YXIgcmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWR1Y2UocmVxdWlyZXMsIGZ1bmN0aW9uIChhLCB4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYSAmJiByZXN1bHRzLmhhc093blByb3BlcnR5KHgpKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlKSAmJiAhcmVzdWx0cy5oYXNPd25Qcm9wZXJ0eShrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmVhZHkoKSkge1xuICAgICAgICAgICAgICAgIHRhc2tbdGFzay5sZW5ndGggLSAxXSh0YXNrQ2FsbGJhY2ssIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFza1t0YXNrLmxlbmd0aCAtIDFdKHRhc2tDYWxsYmFjaywgcmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLnJldHJ5ID0gZnVuY3Rpb24odGltZXMsIHRhc2ssIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBERUZBVUxUX1RJTUVTID0gNTtcbiAgICAgICAgdmFyIGF0dGVtcHRzID0gW107XG4gICAgICAgIC8vIFVzZSBkZWZhdWx0cyBpZiB0aW1lcyBub3QgcGFzc2VkXG4gICAgICAgIGlmICh0eXBlb2YgdGltZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdGFzaztcbiAgICAgICAgICAgIHRhc2sgPSB0aW1lcztcbiAgICAgICAgICAgIHRpbWVzID0gREVGQVVMVF9USU1FUztcbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIHN1cmUgdGltZXMgaXMgYSBudW1iZXJcbiAgICAgICAgdGltZXMgPSBwYXJzZUludCh0aW1lcywgMTApIHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgIHZhciB3cmFwcGVkVGFzayA9IGZ1bmN0aW9uKHdyYXBwZWRDYWxsYmFjaywgd3JhcHBlZFJlc3VsdHMpIHtcbiAgICAgICAgICAgIHZhciByZXRyeUF0dGVtcHQgPSBmdW5jdGlvbih0YXNrLCBmaW5hbEF0dGVtcHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2VyaWVzQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGFzayhmdW5jdGlvbihlcnIsIHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNDYWxsYmFjayghZXJyIHx8IGZpbmFsQXR0ZW1wdCwge2VycjogZXJyLCByZXN1bHQ6IHJlc3VsdH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCB3cmFwcGVkUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aGlsZSAodGltZXMpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cy5wdXNoKHJldHJ5QXR0ZW1wdCh0YXNrLCAhKHRpbWVzLT0xKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXN5bmMuc2VyaWVzKGF0dGVtcHRzLCBmdW5jdGlvbihkb25lLCBkYXRhKXtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICh3cmFwcGVkQ2FsbGJhY2sgfHwgY2FsbGJhY2spKGRhdGEuZXJyLCBkYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhIGNhbGxiYWNrIGlzIHBhc3NlZCwgcnVuIHRoaXMgYXMgYSBjb250cm9sbCBmbG93XG4gICAgICAgIHJldHVybiBjYWxsYmFjayA/IHdyYXBwZWRUYXNrKCkgOiB3cmFwcGVkVGFza1xuICAgIH07XG5cbiAgICBhc3luYy53YXRlcmZhbGwgPSBmdW5jdGlvbiAodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG4gICAgICAgIGlmICghX2lzQXJyYXkodGFza3MpKSB7XG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gd2F0ZXJmYWxsIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJyk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3cmFwSXRlcmF0b3IgPSBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh3cmFwSXRlcmF0b3IobmV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHdyYXBJdGVyYXRvcihhc3luYy5pdGVyYXRvcih0YXNrcykpKCk7XG4gICAgfTtcblxuICAgIHZhciBfcGFyYWxsZWwgPSBmdW5jdGlvbihlYWNoZm4sIHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICBpZiAoX2lzQXJyYXkodGFza3MpKSB7XG4gICAgICAgICAgICBlYWNoZm4ubWFwKHRhc2tzLCBmdW5jdGlvbiAoZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGVyciwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0ge307XG4gICAgICAgICAgICBlYWNoZm4uZWFjaChfa2V5cyh0YXNrcyksIGZ1bmN0aW9uIChrLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRhc2tzW2tdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1trXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jLnBhcmFsbGVsID0gZnVuY3Rpb24gKHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoeyBtYXA6IGFzeW5jLm1hcCwgZWFjaDogYXN5bmMuZWFjaCB9LCB0YXNrcywgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5wYXJhbGxlbExpbWl0ID0gZnVuY3Rpb24odGFza3MsIGxpbWl0LCBjYWxsYmFjaykge1xuICAgICAgICBfcGFyYWxsZWwoeyBtYXA6IF9tYXBMaW1pdChsaW1pdCksIGVhY2g6IF9lYWNoTGltaXQobGltaXQpIH0sIHRhc2tzLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnNlcmllcyA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgaWYgKF9pc0FycmF5KHRhc2tzKSkge1xuICAgICAgICAgICAgYXN5bmMubWFwU2VyaWVzKHRhc2tzLCBmdW5jdGlvbiAoZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGVyciwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0ge307XG4gICAgICAgICAgICBhc3luYy5lYWNoU2VyaWVzKF9rZXlzKHRhc2tzKSwgZnVuY3Rpb24gKGssIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGFza3Nba10oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzW2tdID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuaXRlcmF0b3IgPSBmdW5jdGlvbiAodGFza3MpIHtcbiAgICAgICAgdmFyIG1ha2VDYWxsYmFjayA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza3NbaW5kZXhdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5uZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm4ubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGluZGV4IDwgdGFza3MubGVuZ3RoIC0gMSkgPyBtYWtlQ2FsbGJhY2soaW5kZXggKyAxKTogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtYWtlQ2FsbGJhY2soMCk7XG4gICAgfTtcblxuICAgIGFzeW5jLmFwcGx5ID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShcbiAgICAgICAgICAgICAgICBudWxsLCBhcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9jb25jYXQgPSBmdW5jdGlvbiAoZWFjaGZuLCBhcnIsIGZuLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgciA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgY2IpIHtcbiAgICAgICAgICAgIGZuKHgsIGZ1bmN0aW9uIChlcnIsIHkpIHtcbiAgICAgICAgICAgICAgICByID0gci5jb25jYXQoeSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGFzeW5jLmNvbmNhdCA9IGRvUGFyYWxsZWwoX2NvbmNhdCk7XG4gICAgYXN5bmMuY29uY2F0U2VyaWVzID0gZG9TZXJpZXMoX2NvbmNhdCk7XG5cbiAgICBhc3luYy53aGlsc3QgPSBmdW5jdGlvbiAodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhc3luYy53aGlsc3QodGVzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luYy5kb1doaWxzdCA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgaXRlcmF0b3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgaWYgKHRlc3QuYXBwbHkobnVsbCwgYXJncykpIHtcbiAgICAgICAgICAgICAgICBhc3luYy5kb1doaWxzdChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLnVudGlsID0gZnVuY3Rpb24gKHRlc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRlc3QoKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzeW5jLnVudGlsKHRlc3QsIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmMuZG9VbnRpbCA9IGZ1bmN0aW9uIChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgaXRlcmF0b3IoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgaWYgKCF0ZXN0LmFwcGx5KG51bGwsIGFyZ3MpKSB7XG4gICAgICAgICAgICAgICAgYXN5bmMuZG9VbnRpbChpdGVyYXRvciwgdGVzdCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFzeW5jLnF1ZXVlID0gZnVuY3Rpb24gKHdvcmtlciwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgaWYgKGNvbmN1cnJlbmN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHBvcywgY2FsbGJhY2spIHtcbiAgICAgICAgICBpZiAoIXEuc3RhcnRlZCl7XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIV9pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGRhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgIGlmIChxLmRyYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX2VhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gY2FsbGJhY2sgOiBudWxsXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIHEudGFza3MudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxLnRhc2tzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAocS5zYXR1cmF0ZWQgJiYgcS50YXNrcy5sZW5ndGggPT09IHEuY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICAgIHEuc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYXN5bmMuc2V0SW1tZWRpYXRlKHEucHJvY2Vzcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd29ya2VycyA9IDA7XG4gICAgICAgIHZhciBxID0ge1xuICAgICAgICAgICAgdGFza3M6IFtdLFxuICAgICAgICAgICAgY29uY3VycmVuY3k6IGNvbmN1cnJlbmN5LFxuICAgICAgICAgICAgc2F0dXJhdGVkOiBudWxsLFxuICAgICAgICAgICAgZW1wdHk6IG51bGwsXG4gICAgICAgICAgICBkcmFpbjogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIGZhbHNlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2lsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBxLmRyYWluID0gbnVsbDtcbiAgICAgICAgICAgICAgcS50YXNrcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2hpZnQ6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIHRydWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9jZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFxLnBhdXNlZCAmJiB3b3JrZXJzIDwgcS5jb25jdXJyZW5jeSAmJiBxLnRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFzayA9IHEudGFza3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHEuZW1wdHkgJiYgcS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHEuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VycyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmNhbGxiYWNrLmFwcGx5KHRhc2ssIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocS5kcmFpbiAmJiBxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBxLnByb2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gb25seV9vbmNlKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXIodGFzay5kYXRhLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlbmd0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLnRhc2tzLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlcnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWRsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChxLnBhdXNlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICBxLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcS5wcm9jZXNzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHEucGF1c2VkID09PSBmYWxzZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICBxLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHEucHJvY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcTtcbiAgICB9O1xuICAgIFxuICAgIGFzeW5jLnByaW9yaXR5UXVldWUgPSBmdW5jdGlvbiAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gX2NvbXBhcmVUYXNrcyhhLCBiKXtcbiAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBfYmluYXJ5U2VhcmNoKHNlcXVlbmNlLCBpdGVtLCBjb21wYXJlKSB7XG4gICAgICAgICAgdmFyIGJlZyA9IC0xLFxuICAgICAgICAgICAgICBlbmQgPSBzZXF1ZW5jZS5sZW5ndGggLSAxO1xuICAgICAgICAgIHdoaWxlIChiZWcgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciBtaWQgPSBiZWcgKyAoKGVuZCAtIGJlZyArIDEpID4+PiAxKTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIHNlcXVlbmNlW21pZF0pID49IDApIHtcbiAgICAgICAgICAgICAgYmVnID0gbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGJlZztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICBpZiAoIXEuc3RhcnRlZCl7XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIV9pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGRhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgIHJldHVybiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgIGlmIChxLmRyYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX2VhY2goZGF0YSwgZnVuY3Rpb24odGFzaykge1xuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gY2FsbGJhY2sgOiBudWxsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZShfYmluYXJ5U2VhcmNoKHEudGFza3MsIGl0ZW0sIF9jb21wYXJlVGFza3MpICsgMSwgMCwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgaWYgKHEuc2F0dXJhdGVkICYmIHEudGFza3MubGVuZ3RoID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICBxLnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFzeW5jLnNldEltbWVkaWF0ZShxLnByb2Nlc3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTdGFydCB3aXRoIGEgbm9ybWFsIHF1ZXVlXG4gICAgICAgIHZhciBxID0gYXN5bmMucXVldWUod29ya2VyLCBjb25jdXJyZW5jeSk7XG4gICAgICAgIFxuICAgICAgICAvLyBPdmVycmlkZSBwdXNoIHRvIGFjY2VwdCBzZWNvbmQgcGFyYW1ldGVyIHJlcHJlc2VudGluZyBwcmlvcml0eVxuICAgICAgICBxLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gUmVtb3ZlIHVuc2hpZnQgZnVuY3Rpb25cbiAgICAgICAgZGVsZXRlIHEudW5zaGlmdDtcblxuICAgICAgICByZXR1cm4gcTtcbiAgICB9O1xuXG4gICAgYXN5bmMuY2FyZ28gPSBmdW5jdGlvbiAod29ya2VyLCBwYXlsb2FkKSB7XG4gICAgICAgIHZhciB3b3JraW5nICAgICA9IGZhbHNlLFxuICAgICAgICAgICAgdGFza3MgICAgICAgPSBbXTtcblxuICAgICAgICB2YXIgY2FyZ28gPSB7XG4gICAgICAgICAgICB0YXNrczogdGFza3MsXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgc2F0dXJhdGVkOiBudWxsLFxuICAgICAgICAgICAgZW1wdHk6IG51bGwsXG4gICAgICAgICAgICBkcmFpbjogbnVsbCxcbiAgICAgICAgICAgIGRyYWluZWQ6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9lYWNoKGRhdGEsIGZ1bmN0aW9uKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IGNhbGxiYWNrIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FyZ28uZHJhaW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZ28uc2F0dXJhdGVkICYmIHRhc2tzLmxlbmd0aCA9PT0gcGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZ28uc2F0dXJhdGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhc3luYy5zZXRJbW1lZGlhdGUoY2FyZ28ucHJvY2Vzcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcygpIHtcbiAgICAgICAgICAgICAgICBpZiAod29ya2luZykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh0YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2FyZ28uZHJhaW4gJiYgIWNhcmdvLmRyYWluZWQpIGNhcmdvLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmdvLmRyYWluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRzID0gdHlwZW9mIHBheWxvYWQgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0YXNrcy5zcGxpY2UoMCwgcGF5bG9hZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRhc2tzLnNwbGljZSgwLCB0YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRzID0gX21hcCh0cywgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGNhcmdvLmVtcHR5KSBjYXJnby5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHdvcmtpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdvcmtlcihkcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3b3JraW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIF9lYWNoKHRzLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2tzLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJnbztcbiAgICB9O1xuXG4gICAgdmFyIF9jb25zb2xlX2ZuID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW2Z1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zb2xlW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZWFjaChhcmdzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGVbbmFtZV0oeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dKSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBhc3luYy5sb2cgPSBfY29uc29sZV9mbignbG9nJyk7XG4gICAgYXN5bmMuZGlyID0gX2NvbnNvbGVfZm4oJ2RpcicpO1xuICAgIC8qYXN5bmMuaW5mbyA9IF9jb25zb2xlX2ZuKCdpbmZvJyk7XG4gICAgYXN5bmMud2FybiA9IF9jb25zb2xlX2ZuKCd3YXJuJyk7XG4gICAgYXN5bmMuZXJyb3IgPSBfY29uc29sZV9mbignZXJyb3InKTsqL1xuXG4gICAgYXN5bmMubWVtb2l6ZSA9IGZ1bmN0aW9uIChmbiwgaGFzaGVyKSB7XG4gICAgICAgIHZhciBtZW1vID0ge307XG4gICAgICAgIHZhciBxdWV1ZXMgPSB7fTtcbiAgICAgICAgaGFzaGVyID0gaGFzaGVyIHx8IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBoYXNoZXIuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1lbW8pIHtcbiAgICAgICAgICAgICAgICBhc3luYy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIG1lbW9ba2V5XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgaW4gcXVldWVzKSB7XG4gICAgICAgICAgICAgICAgcXVldWVzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWV1ZXNba2V5XSA9IFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVtb1trZXldID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcSA9IHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBxW2ldLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBtZW1vaXplZC5tZW1vID0gbWVtbztcbiAgICAgICAgbWVtb2l6ZWQudW5tZW1vaXplZCA9IGZuO1xuICAgICAgICByZXR1cm4gbWVtb2l6ZWQ7XG4gICAgfTtcblxuICAgIGFzeW5jLnVubWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChmbi51bm1lbW9pemVkIHx8IGZuKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgYXN5bmMudGltZXMgPSBmdW5jdGlvbiAoY291bnQsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgY291bnRlciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ZXIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXN5bmMubWFwKGNvdW50ZXIsIGl0ZXJhdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIGFzeW5jLnRpbWVzU2VyaWVzID0gZnVuY3Rpb24gKGNvdW50LCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudGVyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFzeW5jLm1hcFNlcmllcyhjb3VudGVyLCBpdGVyYXRvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBhc3luYy5zZXEgPSBmdW5jdGlvbiAoLyogZnVuY3Rpb25zLi4uICovKSB7XG4gICAgICAgIHZhciBmbnMgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgYXN5bmMucmVkdWNlKGZucywgYXJncywgZnVuY3Rpb24gKG5ld2FyZ3MsIGZuLCBjYikge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIG5ld2FyZ3MuY29uY2F0KFtmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVyciwgbmV4dGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1dKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhhdCwgW2Vycl0uY29uY2F0KHJlc3VsdHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBhc3luYy5jb21wb3NlID0gZnVuY3Rpb24gKC8qIGZ1bmN0aW9ucy4uLiAqLykge1xuICAgICAgcmV0dXJuIGFzeW5jLnNlcS5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUucmV2ZXJzZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICB2YXIgX2FwcGx5RWFjaCA9IGZ1bmN0aW9uIChlYWNoZm4sIGZucyAvKmFyZ3MuLi4qLykge1xuICAgICAgICB2YXIgZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIGVhY2hmbihmbnMsIGZ1bmN0aW9uIChmbiwgY2IpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzLmNvbmNhdChbY2JdKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgICAgIHJldHVybiBnby5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgfVxuICAgIH07XG4gICAgYXN5bmMuYXBwbHlFYWNoID0gZG9QYXJhbGxlbChfYXBwbHlFYWNoKTtcbiAgICBhc3luYy5hcHBseUVhY2hTZXJpZXMgPSBkb1NlcmllcyhfYXBwbHlFYWNoKTtcblxuICAgIGFzeW5jLmZvcmV2ZXIgPSBmdW5jdGlvbiAoZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmbihuZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0KCk7XG4gICAgfTtcblxuICAgIC8vIE5vZGUuanNcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgICB9XG4gICAgLy8gQU1EIC8gUmVxdWlyZUpTXG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luYztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgICBlbHNlIHtcbiAgICAgICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICAgIH1cblxufSgpKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJKa3BSMkZcIikpIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcblxuaWYgKEhhbmRsZWJhcnNbJ2RlZmF1bHQnXSkge1xuICAvLyBJZiB3ZSBvbmx5IGhhdmUgdGhlIEhhbmRsZWJhcnMgcnVudGltZSBhdmFpbGFibGUsIHVzZSB0aGF0IGhlcmUuXG4gIC8vIFVudGlsIEhhbmRsZWJhcnMgMywgd2UgaGF2ZSB0byB1c2UgJ2RlZmF1bHQnIGluc3RlYWQgb2YganVzdCByZXF1aXJpbmcgJ2hhbmRsZWJhcnMnLlxuICBIYW5kbGViYXJzID0gSGFuZGxlYmFyc1snZGVmYXVsdCddO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICB2YXIgbG9jYWxFeHBvcnRzID0ge30sXG4gICAgICB0ZW1wbGF0ZUZpbmRlciA9IG9wdGlvbnMudGVtcGxhdGVGaW5kZXIgfHwgcmVxdWlyZSgnLi9zaGFyZWQvdGVtcGxhdGVGaW5kZXInKShIYW5kbGViYXJzKTtcblxuICAvKipcbiAgICogRXhwb3J0IHRoZSBgSGFuZGxlYmFyc2Agb2JqZWN0LCBzbyBvdGhlciBtb2R1bGVzIGNhbiBhZGQgaGVscGVycywgcGFydGlhbHMsIGV0Yy5cbiAgICovXG4gIGxvY2FsRXhwb3J0cy5IYW5kbGViYXJzID0gSGFuZGxlYmFycztcblxuICAvKipcbiAgICogYGdldFRlbXBsYXRlYCBpcyBhdmFpbGFibGUgb24gYm90aCBjbGllbnQgYW5kIHNlcnZlci5cbiAgICovXG4gIGxvY2FsRXhwb3J0cy5nZXRUZW1wbGF0ZSA9IHRlbXBsYXRlRmluZGVyLmdldFRlbXBsYXRlO1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgYHRlbXBsYXRlUGF0dGVybnNgIGZvciBtYW5pcHVsYXRpbmcgaG93IGBnZXRUZW1wbGF0ZWAgZmluZHMgdGVtcGxhdGVzLlxuICAgKi9cbiAgbG9jYWxFeHBvcnRzLnRlbXBsYXRlUGF0dGVybnMgPSB0ZW1wbGF0ZUZpbmRlci50ZW1wbGF0ZVBhdHRlcm5zO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBwYXR0ZXJuIGAvLisvYCBpcyB2ZXJ5IGdyZWVkeTsgaXQgbWF0Y2hlcyBhbnl0aGluZywgaW5jbHVkaW5nIG5lc3RlZCBwYXRocy5cbiAgICogVG8gYWRkIHJ1bGVzIHRoYXQgc2hvdWxkIG1hdGNoIGJlZm9yZSB0aGlzIGRlZmF1bHQgcnVsZSwgYHVuc2hpZnRgIHRoZW0gZnJvbSB0aGlzIGFycmF5LlxuICAgKi9cbiAgbG9jYWxFeHBvcnRzLnRlbXBsYXRlUGF0dGVybnMucHVzaCh7cGF0dGVybjogLy4rLywgc3JjOiBvcHRpb25zLmVudHJ5UGF0aCArICdhcHAvdGVtcGxhdGVzL2NvbXBpbGVkVGVtcGxhdGVzJ30pXG5cbiAgLyoqXG4gICAqIGBnZXRMYXlvdXRgIHNob3VsZCBvbmx5IGJlIHVzZWQgb24gdGhlIHNlcnZlci5cbiAgICovXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIHNlcnZlciBvbmx5LCBcImhpZGVcIiBpdCBmcm9tIHIuanMgY29tcGlsZXJcbiAgICAvLyBieSBoYXZpbmcgcmVxdWlyZSBzdGF0ZW1lbnQgd2l0aCB2YXJpYWJsZVxuICAgIHZhciBzZXJ2ZXJPbmx5TGF5b3V0RmluZGVyUGF0aCA9ICcuL3NlcnZlci9sYXlvdXRGaW5kZXInO1xuICAgIGxvY2FsRXhwb3J0cy5nZXRMYXlvdXQgPSByZXF1aXJlKHNlcnZlck9ubHlMYXlvdXRGaW5kZXJQYXRoKShIYW5kbGViYXJzKS5nZXRMYXlvdXQ7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxFeHBvcnRzLmdldExheW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRMYXlvdXQgaXMgb25seSBhdmFpbGFibGUgb24gdGhlIHNlcnZlci4nKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGhlbHBlcnMsIGF2YWlsYWJsZSBvbiBib3RoIGNsaWVudCBhbmQgc2VydmVyLlxuICAgKlxuICAgKiBFeHBvcnQgaXQgc28gb3RoZXIgbW9kdWxlcyBjYW4gcmVnaXN0ZXIgaGVscGVycyBhcyB3ZWxsLlxuICAgKi9cbiAgbG9jYWxFeHBvcnRzLnJlZ2lzdGVySGVscGVycyA9IGZ1bmN0aW9uIHJlZ2lzdGVySGVscGVycyhoZWxwZXJzTW9kdWxlKSB7XG4gICAgdmFyIGhlbHBlcnMgPSBoZWxwZXJzTW9kdWxlKEhhbmRsZWJhcnMsIGxvY2FsRXhwb3J0cy5nZXRUZW1wbGF0ZSk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gaGVscGVycykge1xuICAgICAgaWYgKCFoZWxwZXJzLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihrZXksIGhlbHBlcnNba2V5XSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciB0aGUgcHJlLWJ1bmRsZWQgUmVuZHIgaGVscGVycy5cbiAgICovXG4gIHZhciByZW5kckhlbHBlcnMgPSByZXF1aXJlKCcuL3NoYXJlZC9oZWxwZXJzJyk7XG4gIGxvY2FsRXhwb3J0cy5yZWdpc3RlckhlbHBlcnMocmVuZHJIZWxwZXJzKTtcblxuICByZXR1cm4gbG9jYWxFeHBvcnRzO1xufVxuIiwiLyoqXG4gKiBHcmFiIGltcG9ydGFudCB1bmRlcnNjb3JlZCBwcm9wZXJ0aWVzIGZyb20gdGhlIGN1cnJlbnQgY29udGV4dC5cbiAqIFRoZXNlIHByb3BlcnRpZXMgY29tZSBmcm9tIEJhc2VWaWV3OjpkZWNvcmF0ZVRlbXBsYXRlRGF0YSgpLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIG9wdGlvbnMsIGtleXMsIHZhbHVlO1xuXG4gIGtleXMgPSBbXG4gICAgJ19hcHAnLFxuICAgICdfdmlldycsXG4gICAgJ19tb2RlbCcsXG4gICAgJ19jb2xsZWN0aW9uJyxcbiAgICAnX2Jsb2NrJ1xuICBdO1xuXG4gIG9wdGlvbnMgPSBrZXlzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBrZXkpIHtcbiAgICB2YWx1ZSA9IG9ialtrZXldO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgbWVtb1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59O1xuIiwiLyoqXG4gKiBHZXQgYSBwcm9wZXJ0eSB0aGF0IGlzIGJlaW5nIHBhc3NlZCBkb3duIHRocm91Z2ggaGVscGVycywgc3VjaCBhcyBgX2FwcGBcbiAqIG9yIGBfdmlld2AuIEl0IGNhbiBlaXRoZXIgbGl2ZSBvbiB0aGUgY29udGV4dCwgaS5lLiBgdGhpcy5fYXBwYCwgb3IgaW4gdGhlXG4gKiBgb3B0aW9ucy5kYXRhYCBvYmplY3QgcGFzc2VkIHRvIHRoZSBoZWxwZXIsIGkuZS4gYG9wdGlvbnMuZGF0YS5fYXBwYCwgaW4gdGhlXG4gKiBjYXNlIG9mIGEgYmxvY2sgaGVscGVyIGxpa2UgYGVhY2hgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbnRleHRba2V5XSB8fCAob3B0aW9ucy5kYXRhIHx8IHt9KVtrZXldO1xufVxuIiwiLy8gICAgIEJhY2tib25lLmpzIDEuMS4yXG5cbi8vICAgICAoYykgMjAxMC0yMDE0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgQmFja2JvbmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4vLyAgICAgRm9yIGFsbCBkZXRhaWxzIGFuZCBkb2N1bWVudGF0aW9uOlxuLy8gICAgIGh0dHA6Ly9iYWNrYm9uZWpzLm9yZ1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuXG4gIC8vIFNldCB1cCBCYWNrYm9uZSBhcHByb3ByaWF0ZWx5IGZvciB0aGUgZW52aXJvbm1lbnQuIFN0YXJ0IHdpdGggQU1ELlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsndW5kZXJzY29yZScsICdqcXVlcnknLCAnZXhwb3J0cyddLCBmdW5jdGlvbihfLCAkLCBleHBvcnRzKSB7XG4gICAgICAvLyBFeHBvcnQgZ2xvYmFsIGV2ZW4gaW4gQU1EIGNhc2UgaW4gY2FzZSB0aGlzIHNjcmlwdCBpcyBsb2FkZWQgd2l0aFxuICAgICAgLy8gb3RoZXJzIHRoYXQgbWF5IHN0aWxsIGV4cGVjdCBhIGdsb2JhbCBCYWNrYm9uZS5cbiAgICAgIHJvb3QuQmFja2JvbmUgPSBmYWN0b3J5KHJvb3QsIGV4cG9ydHMsIF8sICQpO1xuICAgIH0pO1xuXG4gIC8vIE5leHQgZm9yIE5vZGUuanMgb3IgQ29tbW9uSlMuIGpRdWVyeSBtYXkgbm90IGJlIG5lZWRlZCBhcyBhIG1vZHVsZS5cbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbiAgICBmYWN0b3J5KHJvb3QsIGV4cG9ydHMsIF8pO1xuXG4gIC8vIEZpbmFsbHksIGFzIGEgYnJvd3NlciBnbG9iYWwuXG4gIH0gZWxzZSB7XG4gICAgcm9vdC5CYWNrYm9uZSA9IGZhY3Rvcnkocm9vdCwge30sIHJvb3QuXywgKHJvb3QualF1ZXJ5IHx8IHJvb3QuWmVwdG8gfHwgcm9vdC5lbmRlciB8fCByb290LiQpKTtcbiAgfVxuXG59KHRoaXMsIGZ1bmN0aW9uKHJvb3QsIEJhY2tib25lLCBfLCAkKSB7XG5cbiAgLy8gSW5pdGlhbCBTZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tXG5cbiAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBCYWNrYm9uZWAgdmFyaWFibGUsIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIHJlc3RvcmVkIGxhdGVyIG9uLCBpZiBgbm9Db25mbGljdGAgaXMgdXNlZC5cbiAgdmFyIHByZXZpb3VzQmFja2JvbmUgPSByb290LkJhY2tib25lO1xuXG4gIC8vIENyZWF0ZSBsb2NhbCByZWZlcmVuY2VzIHRvIGFycmF5IG1ldGhvZHMgd2UnbGwgd2FudCB0byB1c2UgbGF0ZXIuXG4gIHZhciBhcnJheSA9IFtdO1xuICB2YXIgcHVzaCA9IGFycmF5LnB1c2g7XG4gIHZhciBzbGljZSA9IGFycmF5LnNsaWNlO1xuICB2YXIgc3BsaWNlID0gYXJyYXkuc3BsaWNlO1xuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgbGlicmFyeS4gS2VlcCBpbiBzeW5jIHdpdGggYHBhY2thZ2UuanNvbmAuXG4gIEJhY2tib25lLlZFUlNJT04gPSAnMS4xLjInO1xuXG4gIC8vIEZvciBCYWNrYm9uZSdzIHB1cnBvc2VzLCBqUXVlcnksIFplcHRvLCBFbmRlciwgb3IgTXkgTGlicmFyeSAoa2lkZGluZykgb3duc1xuICAvLyB0aGUgYCRgIHZhcmlhYmxlLlxuICBCYWNrYm9uZS4kID0gJDtcblxuICAvLyBSdW5zIEJhY2tib25lLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBCYWNrYm9uZWAgdmFyaWFibGVcbiAgLy8gdG8gaXRzIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgQmFja2JvbmUgb2JqZWN0LlxuICBCYWNrYm9uZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5CYWNrYm9uZSA9IHByZXZpb3VzQmFja2JvbmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gVHVybiBvbiBgZW11bGF0ZUhUVFBgIHRvIHN1cHBvcnQgbGVnYWN5IEhUVFAgc2VydmVycy4gU2V0dGluZyB0aGlzIG9wdGlvblxuICAvLyB3aWxsIGZha2UgYFwiUEFUQ0hcImAsIGBcIlBVVFwiYCBhbmQgYFwiREVMRVRFXCJgIHJlcXVlc3RzIHZpYSB0aGUgYF9tZXRob2RgIHBhcmFtZXRlciBhbmRcbiAgLy8gc2V0IGEgYFgtSHR0cC1NZXRob2QtT3ZlcnJpZGVgIGhlYWRlci5cbiAgQmFja2JvbmUuZW11bGF0ZUhUVFAgPSBmYWxzZTtcblxuICAvLyBUdXJuIG9uIGBlbXVsYXRlSlNPTmAgdG8gc3VwcG9ydCBsZWdhY3kgc2VydmVycyB0aGF0IGNhbid0IGRlYWwgd2l0aCBkaXJlY3RcbiAgLy8gYGFwcGxpY2F0aW9uL2pzb25gIHJlcXVlc3RzIC4uLiB3aWxsIGVuY29kZSB0aGUgYm9keSBhc1xuICAvLyBgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkYCBpbnN0ZWFkIGFuZCB3aWxsIHNlbmQgdGhlIG1vZGVsIGluIGFcbiAgLy8gZm9ybSBwYXJhbSBuYW1lZCBgbW9kZWxgLlxuICBCYWNrYm9uZS5lbXVsYXRlSlNPTiA9IGZhbHNlO1xuXG4gIC8vIEJhY2tib25lLkV2ZW50c1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBBIG1vZHVsZSB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byAqYW55IG9iamVjdCogaW4gb3JkZXIgdG8gcHJvdmlkZSBpdCB3aXRoXG4gIC8vIGN1c3RvbSBldmVudHMuIFlvdSBtYXkgYmluZCB3aXRoIGBvbmAgb3IgcmVtb3ZlIHdpdGggYG9mZmAgY2FsbGJhY2tcbiAgLy8gZnVuY3Rpb25zIHRvIGFuIGV2ZW50OyBgdHJpZ2dlcmAtaW5nIGFuIGV2ZW50IGZpcmVzIGFsbCBjYWxsYmFja3MgaW5cbiAgLy8gc3VjY2Vzc2lvbi5cbiAgLy9cbiAgLy8gICAgIHZhciBvYmplY3QgPSB7fTtcbiAgLy8gICAgIF8uZXh0ZW5kKG9iamVjdCwgQmFja2JvbmUuRXZlbnRzKTtcbiAgLy8gICAgIG9iamVjdC5vbignZXhwYW5kJywgZnVuY3Rpb24oKXsgYWxlcnQoJ2V4cGFuZGVkJyk7IH0pO1xuICAvLyAgICAgb2JqZWN0LnRyaWdnZXIoJ2V4cGFuZCcpO1xuICAvL1xuICB2YXIgRXZlbnRzID0gQmFja2JvbmUuRXZlbnRzID0ge1xuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uIFBhc3NpbmcgYFwiYWxsXCJgIHdpbGwgYmluZFxuICAgIC8vIHRoZSBjYWxsYmFjayB0byBhbGwgZXZlbnRzIGZpcmVkLlxuICAgIG9uOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pO1xuICAgICAgZXZlbnRzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCwgY3R4OiBjb250ZXh0IHx8IHRoaXN9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIG9ubHkgYmUgdHJpZ2dlcmVkIGEgc2luZ2xlIHRpbWUuIEFmdGVyIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gdGhlIGNhbGxiYWNrIGlzIGludm9rZWQsIGl0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICBvbmNlOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uY2UnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIG9uY2UgPSBfLm9uY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpO1xuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgcmV0dXJuIHRoaXMub24obmFtZSwgb25jZSwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBvbmUgb3IgbWFueSBjYWxsYmFja3MuIElmIGBjb250ZXh0YCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyB3aXRoIHRoYXQgZnVuY3Rpb24uIElmIGBjYWxsYmFja2AgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3MgZm9yIHRoZSBldmVudC4gSWYgYG5hbWVgIGlzIG51bGwsIHJlbW92ZXMgYWxsIGJvdW5kXG4gICAgLy8gY2FsbGJhY2tzIGZvciBhbGwgZXZlbnRzLlxuICAgIG9mZjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIHZhciByZXRhaW4sIGV2LCBldmVudHMsIG5hbWVzLCBpLCBsLCBqLCBrO1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIWV2ZW50c0FwaSh0aGlzLCAnb2ZmJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkpIHJldHVybiB0aGlzO1xuICAgICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB2b2lkIDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogXy5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaWYgKGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdO1xuICAgICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVHJpZ2dlciBvbmUgb3IgbWFueSBldmVudHMsIGZpcmluZyBhbGwgYm91bmQgY2FsbGJhY2tzLiBDYWxsYmFja3MgYXJlXG4gICAgLy8gcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBgdHJpZ2dlcmAgaXMsIGFwYXJ0IGZyb20gdGhlIGV2ZW50IG5hbWVcbiAgICAvLyAodW5sZXNzIHlvdSdyZSBsaXN0ZW5pbmcgb24gYFwiYWxsXCJgLCB3aGljaCB3aWxsIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG9cbiAgICAvLyByZWNlaXZlIHRoZSB0cnVlIG5hbWUgb2YgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCkuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgIGlmIChldmVudHMpIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgIGlmIChhbGxFdmVudHMpIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRlbGwgdGhpcyBvYmplY3QgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gZWl0aGVyIHNwZWNpZmljIGV2ZW50cyAuLi4gb3JcbiAgICAvLyB0byBldmVyeSBvYmplY3QgaXQncyBjdXJyZW50bHkgbGlzdGVuaW5nIHRvLlxuICAgIHN0b3BMaXN0ZW5pbmc6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvO1xuICAgICAgaWYgKCFsaXN0ZW5pbmdUbykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgcmVtb3ZlID0gIW5hbWUgJiYgIWNhbGxiYWNrO1xuICAgICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIGlmIChvYmopIChsaXN0ZW5pbmdUbyA9IHt9KVtvYmouX2xpc3RlbklkXSA9IG9iajtcbiAgICAgIGZvciAodmFyIGlkIGluIGxpc3RlbmluZ1RvKSB7XG4gICAgICAgIG9iaiA9IGxpc3RlbmluZ1RvW2lkXTtcbiAgICAgICAgb2JqLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIGlmIChyZW1vdmUgfHwgXy5pc0VtcHR5KG9iai5fZXZlbnRzKSkgZGVsZXRlIHRoaXMuX2xpc3RlbmluZ1RvW2lkXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHNwbGl0IGV2ZW50IHN0cmluZ3MuXG4gIHZhciBldmVudFNwbGl0dGVyID0gL1xccysvO1xuXG4gIC8vIEltcGxlbWVudCBmYW5jeSBmZWF0dXJlcyBvZiB0aGUgRXZlbnRzIEFQSSBzdWNoIGFzIG11bHRpcGxlIGV2ZW50XG4gIC8vIG5hbWVzIGBcImNoYW5nZSBibHVyXCJgIGFuZCBqUXVlcnktc3R5bGUgZXZlbnQgbWFwcyBge2NoYW5nZTogYWN0aW9ufWBcbiAgLy8gaW4gdGVybXMgb2YgdGhlIGV4aXN0aW5nIEFQSS5cbiAgdmFyIGV2ZW50c0FwaSA9IGZ1bmN0aW9uKG9iaiwgYWN0aW9uLCBuYW1lLCByZXN0KSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIEhhbmRsZSBldmVudCBtYXBzLlxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW2tleSwgbmFtZVtrZXldXS5jb25jYXQocmVzdCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gICAgaWYgKGV2ZW50U3BsaXR0ZXIudGVzdChuYW1lKSkge1xuICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIEEgZGlmZmljdWx0LXRvLWJlbGlldmUsIGJ1dCBvcHRpbWl6ZWQgaW50ZXJuYWwgZGlzcGF0Y2ggZnVuY3Rpb24gZm9yXG4gIC8vIHRyaWdnZXJpbmcgZXZlbnRzLiBUcmllcyB0byBrZWVwIHRoZSB1c3VhbCBjYXNlcyBzcGVlZHkgKG1vc3QgaW50ZXJuYWxcbiAgLy8gQmFja2JvbmUgZXZlbnRzIGhhdmUgMyBhcmd1bWVudHMpLlxuICB2YXIgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncykge1xuICAgIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXTtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTsgcmV0dXJuO1xuICAgICAgY2FzZSAxOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpOyByZXR1cm47XG4gICAgICBjYXNlIDI6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpOyByZXR1cm47XG4gICAgICBjYXNlIDM6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTsgcmV0dXJuO1xuICAgICAgZGVmYXVsdDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTsgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbGlzdGVuTWV0aG9kcyA9IHtsaXN0ZW5UbzogJ29uJywgbGlzdGVuVG9PbmNlOiAnb25jZSd9O1xuXG4gIC8vIEludmVyc2lvbi1vZi1jb250cm9sIHZlcnNpb25zIG9mIGBvbmAgYW5kIGBvbmNlYC4gVGVsbCAqdGhpcyogb2JqZWN0IHRvXG4gIC8vIGxpc3RlbiB0byBhbiBldmVudCBpbiBhbm90aGVyIG9iamVjdCAuLi4ga2VlcGluZyB0cmFjayBvZiB3aGF0IGl0J3NcbiAgLy8gbGlzdGVuaW5nIHRvLlxuICBfLmVhY2gobGlzdGVuTWV0aG9kcywgZnVuY3Rpb24oaW1wbGVtZW50YXRpb24sIG1ldGhvZCkge1xuICAgIEV2ZW50c1ttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG8gfHwgKHRoaXMuX2xpc3RlbmluZ1RvID0ge30pO1xuICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5JZCB8fCAob2JqLl9saXN0ZW5JZCA9IF8udW5pcXVlSWQoJ2wnKSk7XG4gICAgICBsaXN0ZW5pbmdUb1tpZF0gPSBvYmo7XG4gICAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzO1xuICAgICAgb2JqW2ltcGxlbWVudGF0aW9uXShuYW1lLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9KTtcblxuICAvLyBBbGlhc2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgRXZlbnRzLmJpbmQgICA9IEV2ZW50cy5vbjtcbiAgRXZlbnRzLnVuYmluZCA9IEV2ZW50cy5vZmY7XG5cbiAgLy8gQWxsb3cgdGhlIGBCYWNrYm9uZWAgb2JqZWN0IHRvIHNlcnZlIGFzIGEgZ2xvYmFsIGV2ZW50IGJ1cywgZm9yIGZvbGtzIHdob1xuICAvLyB3YW50IGdsb2JhbCBcInB1YnN1YlwiIGluIGEgY29udmVuaWVudCBwbGFjZS5cbiAgXy5leHRlbmQoQmFja2JvbmUsIEV2ZW50cyk7XG5cbiAgLy8gQmFja2JvbmUuTW9kZWxcbiAgLy8gLS0tLS0tLS0tLS0tLS1cblxuICAvLyBCYWNrYm9uZSAqKk1vZGVscyoqIGFyZSB0aGUgYmFzaWMgZGF0YSBvYmplY3QgaW4gdGhlIGZyYW1ld29yayAtLVxuICAvLyBmcmVxdWVudGx5IHJlcHJlc2VudGluZyBhIHJvdyBpbiBhIHRhYmxlIGluIGEgZGF0YWJhc2Ugb24geW91ciBzZXJ2ZXIuXG4gIC8vIEEgZGlzY3JldGUgY2h1bmsgb2YgZGF0YSBhbmQgYSBidW5jaCBvZiB1c2VmdWwsIHJlbGF0ZWQgbWV0aG9kcyBmb3JcbiAgLy8gcGVyZm9ybWluZyBjb21wdXRhdGlvbnMgYW5kIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGF0IGRhdGEuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IG1vZGVsIHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzLiBBIGNsaWVudCBpZCAoYGNpZGApXG4gIC8vIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGFuZCBhc3NpZ25lZCBmb3IgeW91LlxuICB2YXIgTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbCA9IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgYXR0cnMgPSBhdHRyaWJ1dGVzIHx8IHt9O1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgdGhpcy5jaWQgPSBfLnVuaXF1ZUlkKCdjJyk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgaWYgKG9wdGlvbnMuY29sbGVjdGlvbikgdGhpcy5jb2xsZWN0aW9uID0gb3B0aW9ucy5jb2xsZWN0aW9uO1xuICAgIGlmIChvcHRpb25zLnBhcnNlKSBhdHRycyA9IHRoaXMucGFyc2UoYXR0cnMsIG9wdGlvbnMpIHx8IHt9O1xuICAgIGF0dHJzID0gXy5kZWZhdWx0cyh7fSwgYXR0cnMsIF8ucmVzdWx0KHRoaXMsICdkZWZhdWx0cycpKTtcbiAgICB0aGlzLnNldChhdHRycywgb3B0aW9ucyk7XG4gICAgdGhpcy5jaGFuZ2VkID0ge307XG4gICAgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQXR0YWNoIGFsbCBpbmhlcml0YWJsZSBtZXRob2RzIHRvIHRoZSBNb2RlbCBwcm90b3R5cGUuXG4gIF8uZXh0ZW5kKE1vZGVsLnByb3RvdHlwZSwgRXZlbnRzLCB7XG5cbiAgICAvLyBBIGhhc2ggb2YgYXR0cmlidXRlcyB3aG9zZSBjdXJyZW50IGFuZCBwcmV2aW91cyB2YWx1ZSBkaWZmZXIuXG4gICAgY2hhbmdlZDogbnVsbCxcblxuICAgIC8vIFRoZSB2YWx1ZSByZXR1cm5lZCBkdXJpbmcgdGhlIGxhc3QgZmFpbGVkIHZhbGlkYXRpb24uXG4gICAgdmFsaWRhdGlvbkVycm9yOiBudWxsLFxuXG4gICAgLy8gVGhlIGRlZmF1bHQgbmFtZSBmb3IgdGhlIEpTT04gYGlkYCBhdHRyaWJ1dGUgaXMgYFwiaWRcImAuIE1vbmdvREIgYW5kXG4gICAgLy8gQ291Y2hEQiB1c2VycyBtYXkgd2FudCB0byBzZXQgdGhpcyB0byBgXCJfaWRcImAuXG4gICAgaWRBdHRyaWJ1dGU6ICdpZCcsXG5cbiAgICAvLyBJbml0aWFsaXplIGlzIGFuIGVtcHR5IGZ1bmN0aW9uIGJ5IGRlZmF1bHQuIE92ZXJyaWRlIGl0IHdpdGggeW91ciBvd25cbiAgICAvLyBpbml0aWFsaXphdGlvbiBsb2dpYy5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe30sXG5cbiAgICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBtb2RlbCdzIGBhdHRyaWJ1dGVzYCBvYmplY3QuXG4gICAgdG9KU09OOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIH0sXG5cbiAgICAvLyBQcm94eSBgQmFja2JvbmUuc3luY2AgYnkgZGVmYXVsdCAtLSBidXQgb3ZlcnJpZGUgdGhpcyBpZiB5b3UgbmVlZFxuICAgIC8vIGN1c3RvbSBzeW5jaW5nIHNlbWFudGljcyBmb3IgKnRoaXMqIHBhcnRpY3VsYXIgbW9kZWwuXG4gICAgc3luYzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQmFja2JvbmUuc3luYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZS5cbiAgICBnZXQ6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXNbYXR0cl07XG4gICAgfSxcblxuICAgIC8vIEdldCB0aGUgSFRNTC1lc2NhcGVkIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZS5cbiAgICBlc2NhcGU6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHJldHVybiBfLmVzY2FwZSh0aGlzLmdldChhdHRyKSk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBhdHRyaWJ1dGUgY29udGFpbnMgYSB2YWx1ZSB0aGF0IGlzIG5vdCBudWxsXG4gICAgLy8gb3IgdW5kZWZpbmVkLlxuICAgIGhhczogZnVuY3Rpb24oYXR0cikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGF0dHIpICE9IG51bGw7XG4gICAgfSxcblxuICAgIC8vIFNldCBhIGhhc2ggb2YgbW9kZWwgYXR0cmlidXRlcyBvbiB0aGUgb2JqZWN0LCBmaXJpbmcgYFwiY2hhbmdlXCJgLiBUaGlzIGlzXG4gICAgLy8gdGhlIGNvcmUgcHJpbWl0aXZlIG9wZXJhdGlvbiBvZiBhIG1vZGVsLCB1cGRhdGluZyB0aGUgZGF0YSBhbmQgbm90aWZ5aW5nXG4gICAgLy8gYW55b25lIHdobyBuZWVkcyB0byBrbm93IGFib3V0IHRoZSBjaGFuZ2UgaW4gc3RhdGUuIFRoZSBoZWFydCBvZiB0aGUgYmVhc3QuXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgb3B0aW9ucykge1xuICAgICAgdmFyIGF0dHIsIGF0dHJzLCB1bnNldCwgY2hhbmdlcywgc2lsZW50LCBjaGFuZ2luZywgcHJldiwgY3VycmVudDtcbiAgICAgIGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIEhhbmRsZSBib3RoIGBcImtleVwiLCB2YWx1ZWAgYW5kIGB7a2V5OiB2YWx1ZX1gIC1zdHlsZSBhcmd1bWVudHMuXG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYXR0cnMgPSBrZXk7XG4gICAgICAgIG9wdGlvbnMgPSB2YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoYXR0cnMgPSB7fSlba2V5XSA9IHZhbDtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICAgICAgLy8gUnVuIHZhbGlkYXRpb24uXG4gICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBFeHRyYWN0IGF0dHJpYnV0ZXMgYW5kIG9wdGlvbnMuXG4gICAgICB1bnNldCAgICAgICAgICAgPSBvcHRpb25zLnVuc2V0O1xuICAgICAgc2lsZW50ICAgICAgICAgID0gb3B0aW9ucy5zaWxlbnQ7XG4gICAgICBjaGFuZ2VzICAgICAgICAgPSBbXTtcbiAgICAgIGNoYW5naW5nICAgICAgICA9IHRoaXMuX2NoYW5naW5nO1xuICAgICAgdGhpcy5fY2hhbmdpbmcgID0gdHJ1ZTtcblxuICAgICAgaWYgKCFjaGFuZ2luZykge1xuICAgICAgICB0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXMgPSBfLmNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHt9O1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IHRoaXMuYXR0cmlidXRlcywgcHJldiA9IHRoaXMuX3ByZXZpb3VzQXR0cmlidXRlcztcblxuICAgICAgLy8gQ2hlY2sgZm9yIGNoYW5nZXMgb2YgYGlkYC5cbiAgICAgIGlmICh0aGlzLmlkQXR0cmlidXRlIGluIGF0dHJzKSB0aGlzLmlkID0gYXR0cnNbdGhpcy5pZEF0dHJpYnV0ZV07XG5cbiAgICAgIC8vIEZvciBlYWNoIGBzZXRgIGF0dHJpYnV0ZSwgdXBkYXRlIG9yIGRlbGV0ZSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICAgIGZvciAoYXR0ciBpbiBhdHRycykge1xuICAgICAgICB2YWwgPSBhdHRyc1thdHRyXTtcbiAgICAgICAgaWYgKCFfLmlzRXF1YWwoY3VycmVudFthdHRyXSwgdmFsKSkgY2hhbmdlcy5wdXNoKGF0dHIpO1xuICAgICAgICBpZiAoIV8uaXNFcXVhbChwcmV2W2F0dHJdLCB2YWwpKSB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VkW2F0dHJdID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoYW5nZWRbYXR0cl07XG4gICAgICAgIH1cbiAgICAgICAgdW5zZXQgPyBkZWxldGUgY3VycmVudFthdHRyXSA6IGN1cnJlbnRbYXR0cl0gPSB2YWw7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyaWdnZXIgYWxsIHJlbGV2YW50IGF0dHJpYnV0ZSBjaGFuZ2VzLlxuICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoKSB0aGlzLl9wZW5kaW5nID0gb3B0aW9ucztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGFuZ2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlOicgKyBjaGFuZ2VzW2ldLCB0aGlzLCBjdXJyZW50W2NoYW5nZXNbaV1dLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBZb3UgbWlnaHQgYmUgd29uZGVyaW5nIHdoeSB0aGVyZSdzIGEgYHdoaWxlYCBsb29wIGhlcmUuIENoYW5nZXMgY2FuXG4gICAgICAvLyBiZSByZWN1cnNpdmVseSBuZXN0ZWQgd2l0aGluIGBcImNoYW5nZVwiYCBldmVudHMuXG4gICAgICBpZiAoY2hhbmdpbmcpIHJldHVybiB0aGlzO1xuICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3BlbmRpbmcpIHtcbiAgICAgICAgICBvcHRpb25zID0gdGhpcy5fcGVuZGluZztcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYW4gYXR0cmlidXRlIGZyb20gdGhlIG1vZGVsLCBmaXJpbmcgYFwiY2hhbmdlXCJgLiBgdW5zZXRgIGlzIGEgbm9vcFxuICAgIC8vIGlmIHRoZSBhdHRyaWJ1dGUgZG9lc24ndCBleGlzdC5cbiAgICB1bnNldDogZnVuY3Rpb24oYXR0ciwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KGF0dHIsIHZvaWQgMCwgXy5leHRlbmQoe30sIG9wdGlvbnMsIHt1bnNldDogdHJ1ZX0pKTtcbiAgICB9LFxuXG4gICAgLy8gQ2xlYXIgYWxsIGF0dHJpYnV0ZXMgb24gdGhlIG1vZGVsLCBmaXJpbmcgYFwiY2hhbmdlXCJgLlxuICAgIGNsZWFyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmF0dHJpYnV0ZXMpIGF0dHJzW2tleV0gPSB2b2lkIDA7XG4gICAgICByZXR1cm4gdGhpcy5zZXQoYXR0cnMsIF8uZXh0ZW5kKHt9LCBvcHRpb25zLCB7dW5zZXQ6IHRydWV9KSk7XG4gICAgfSxcblxuICAgIC8vIERldGVybWluZSBpZiB0aGUgbW9kZWwgaGFzIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYFwiY2hhbmdlXCJgIGV2ZW50LlxuICAgIC8vIElmIHlvdSBzcGVjaWZ5IGFuIGF0dHJpYnV0ZSBuYW1lLCBkZXRlcm1pbmUgaWYgdGhhdCBhdHRyaWJ1dGUgaGFzIGNoYW5nZWQuXG4gICAgaGFzQ2hhbmdlZDogZnVuY3Rpb24oYXR0cikge1xuICAgICAgaWYgKGF0dHIgPT0gbnVsbCkgcmV0dXJuICFfLmlzRW1wdHkodGhpcy5jaGFuZ2VkKTtcbiAgICAgIHJldHVybiBfLmhhcyh0aGlzLmNoYW5nZWQsIGF0dHIpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBhdHRyaWJ1dGVzIHRoYXQgaGF2ZSBjaGFuZ2VkLCBvclxuICAgIC8vIGZhbHNlIGlmIHRoZXJlIGFyZSBubyBjaGFuZ2VkIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3IgZGV0ZXJtaW5pbmcgd2hhdFxuICAgIC8vIHBhcnRzIG9mIGEgdmlldyBuZWVkIHRvIGJlIHVwZGF0ZWQgYW5kL29yIHdoYXQgYXR0cmlidXRlcyBuZWVkIHRvIGJlXG4gICAgLy8gcGVyc2lzdGVkIHRvIHRoZSBzZXJ2ZXIuIFVuc2V0IGF0dHJpYnV0ZXMgd2lsbCBiZSBzZXQgdG8gdW5kZWZpbmVkLlxuICAgIC8vIFlvdSBjYW4gYWxzbyBwYXNzIGFuIGF0dHJpYnV0ZXMgb2JqZWN0IHRvIGRpZmYgYWdhaW5zdCB0aGUgbW9kZWwsXG4gICAgLy8gZGV0ZXJtaW5pbmcgaWYgdGhlcmUgKndvdWxkIGJlKiBhIGNoYW5nZS5cbiAgICBjaGFuZ2VkQXR0cmlidXRlczogZnVuY3Rpb24oZGlmZikge1xuICAgICAgaWYgKCFkaWZmKSByZXR1cm4gdGhpcy5oYXNDaGFuZ2VkKCkgPyBfLmNsb25lKHRoaXMuY2hhbmdlZCkgOiBmYWxzZTtcbiAgICAgIHZhciB2YWwsIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHZhciBvbGQgPSB0aGlzLl9jaGFuZ2luZyA/IHRoaXMuX3ByZXZpb3VzQXR0cmlidXRlcyA6IHRoaXMuYXR0cmlidXRlcztcbiAgICAgIGZvciAodmFyIGF0dHIgaW4gZGlmZikge1xuICAgICAgICBpZiAoXy5pc0VxdWFsKG9sZFthdHRyXSwgKHZhbCA9IGRpZmZbYXR0cl0pKSkgY29udGludWU7XG4gICAgICAgIChjaGFuZ2VkIHx8IChjaGFuZ2VkID0ge30pKVthdHRyXSA9IHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIHByZXZpb3VzIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSwgcmVjb3JkZWQgYXQgdGhlIHRpbWUgdGhlIGxhc3RcbiAgICAvLyBgXCJjaGFuZ2VcImAgZXZlbnQgd2FzIGZpcmVkLlxuICAgIHByZXZpb3VzOiBmdW5jdGlvbihhdHRyKSB7XG4gICAgICBpZiAoYXR0ciA9PSBudWxsIHx8ICF0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXMpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzQXR0cmlidXRlc1thdHRyXTtcbiAgICB9LFxuXG4gICAgLy8gR2V0IGFsbCBvZiB0aGUgYXR0cmlidXRlcyBvZiB0aGUgbW9kZWwgYXQgdGhlIHRpbWUgb2YgdGhlIHByZXZpb3VzXG4gICAgLy8gYFwiY2hhbmdlXCJgIGV2ZW50LlxuICAgIHByZXZpb3VzQXR0cmlidXRlczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXy5jbG9uZSh0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXMpO1xuICAgIH0sXG5cbiAgICAvLyBGZXRjaCB0aGUgbW9kZWwgZnJvbSB0aGUgc2VydmVyLiBJZiB0aGUgc2VydmVyJ3MgcmVwcmVzZW50YXRpb24gb2YgdGhlXG4gICAgLy8gbW9kZWwgZGlmZmVycyBmcm9tIGl0cyBjdXJyZW50IGF0dHJpYnV0ZXMsIHRoZXkgd2lsbCBiZSBvdmVycmlkZGVuLFxuICAgIC8vIHRyaWdnZXJpbmcgYSBgXCJjaGFuZ2VcImAgZXZlbnQuXG4gICAgZmV0Y2g6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gXy5jbG9uZShvcHRpb25zKSA6IHt9O1xuICAgICAgaWYgKG9wdGlvbnMucGFyc2UgPT09IHZvaWQgMCkgb3B0aW9ucy5wYXJzZSA9IHRydWU7XG4gICAgICB2YXIgbW9kZWwgPSB0aGlzO1xuICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIGlmICghbW9kZWwuc2V0KG1vZGVsLnBhcnNlKHJlc3AsIG9wdGlvbnMpLCBvcHRpb25zKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIG1vZGVsLnRyaWdnZXIoJ3N5bmMnLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICB9O1xuICAgICAgd3JhcEVycm9yKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3luYygncmVhZCcsIHRoaXMsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvLyBTZXQgYSBoYXNoIG9mIG1vZGVsIGF0dHJpYnV0ZXMsIGFuZCBzeW5jIHRoZSBtb2RlbCB0byB0aGUgc2VydmVyLlxuICAgIC8vIElmIHRoZSBzZXJ2ZXIgcmV0dXJucyBhbiBhdHRyaWJ1dGVzIGhhc2ggdGhhdCBkaWZmZXJzLCB0aGUgbW9kZWwnc1xuICAgIC8vIHN0YXRlIHdpbGwgYmUgYHNldGAgYWdhaW4uXG4gICAgc2F2ZTogZnVuY3Rpb24oa2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBhdHRycywgbWV0aG9kLCB4aHIsIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7XG5cbiAgICAgIC8vIEhhbmRsZSBib3RoIGBcImtleVwiLCB2YWx1ZWAgYW5kIGB7a2V5OiB2YWx1ZX1gIC1zdHlsZSBhcmd1bWVudHMuXG4gICAgICBpZiAoa2V5ID09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYXR0cnMgPSBrZXk7XG4gICAgICAgIG9wdGlvbnMgPSB2YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoYXR0cnMgPSB7fSlba2V5XSA9IHZhbDtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IF8uZXh0ZW5kKHt2YWxpZGF0ZTogdHJ1ZX0sIG9wdGlvbnMpO1xuXG4gICAgICAvLyBJZiB3ZSdyZSBub3Qgd2FpdGluZyBhbmQgYXR0cmlidXRlcyBleGlzdCwgc2F2ZSBhY3RzIGFzXG4gICAgICAvLyBgc2V0KGF0dHIpLnNhdmUobnVsbCwgb3B0cylgIHdpdGggdmFsaWRhdGlvbi4gT3RoZXJ3aXNlLCBjaGVjayBpZlxuICAgICAgLy8gdGhlIG1vZGVsIHdpbGwgYmUgdmFsaWQgd2hlbiB0aGUgYXR0cmlidXRlcywgaWYgYW55LCBhcmUgc2V0LlxuICAgICAgaWYgKGF0dHJzICYmICFvcHRpb25zLndhaXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldChhdHRycywgb3B0aW9ucykpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5fdmFsaWRhdGUoYXR0cnMsIG9wdGlvbnMpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB0ZW1wb3JhcnkgYXR0cmlidXRlcyBpZiBge3dhaXQ6IHRydWV9YC5cbiAgICAgIGlmIChhdHRycyAmJiBvcHRpb25zLndhaXQpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gXy5leHRlbmQoe30sIGF0dHJpYnV0ZXMsIGF0dHJzKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWZ0ZXIgYSBzdWNjZXNzZnVsIHNlcnZlci1zaWRlIHNhdmUsIHRoZSBjbGllbnQgaXMgKG9wdGlvbmFsbHkpXG4gICAgICAvLyB1cGRhdGVkIHdpdGggdGhlIHNlcnZlci1zaWRlIHN0YXRlLlxuICAgICAgaWYgKG9wdGlvbnMucGFyc2UgPT09IHZvaWQgMCkgb3B0aW9ucy5wYXJzZSA9IHRydWU7XG4gICAgICB2YXIgbW9kZWwgPSB0aGlzO1xuICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIC8vIEVuc3VyZSBhdHRyaWJ1dGVzIGFyZSByZXN0b3JlZCBkdXJpbmcgc3luY2hyb25vdXMgc2F2ZXMuXG4gICAgICAgIG1vZGVsLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB2YXIgc2VydmVyQXR0cnMgPSBtb2RlbC5wYXJzZShyZXNwLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMud2FpdCkgc2VydmVyQXR0cnMgPSBfLmV4dGVuZChhdHRycyB8fCB7fSwgc2VydmVyQXR0cnMpO1xuICAgICAgICBpZiAoXy5pc09iamVjdChzZXJ2ZXJBdHRycykgJiYgIW1vZGVsLnNldChzZXJ2ZXJBdHRycywgb3B0aW9ucykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICBtb2RlbC50cmlnZ2VyKCdzeW5jJywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBFcnJvcih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgbWV0aG9kID0gdGhpcy5pc05ldygpID8gJ2NyZWF0ZScgOiAob3B0aW9ucy5wYXRjaCA/ICdwYXRjaCcgOiAndXBkYXRlJyk7XG4gICAgICBpZiAobWV0aG9kID09PSAncGF0Y2gnKSBvcHRpb25zLmF0dHJzID0gYXR0cnM7XG4gICAgICB4aHIgPSB0aGlzLnN5bmMobWV0aG9kLCB0aGlzLCBvcHRpb25zKTtcblxuICAgICAgLy8gUmVzdG9yZSBhdHRyaWJ1dGVzLlxuICAgICAgaWYgKGF0dHJzICYmIG9wdGlvbnMud2FpdCkgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcblxuICAgICAgcmV0dXJuIHhocjtcbiAgICB9LFxuXG4gICAgLy8gRGVzdHJveSB0aGlzIG1vZGVsIG9uIHRoZSBzZXJ2ZXIgaWYgaXQgd2FzIGFscmVhZHkgcGVyc2lzdGVkLlxuICAgIC8vIE9wdGltaXN0aWNhbGx5IHJlbW92ZXMgdGhlIG1vZGVsIGZyb20gaXRzIGNvbGxlY3Rpb24sIGlmIGl0IGhhcyBvbmUuXG4gICAgLy8gSWYgYHdhaXQ6IHRydWVgIGlzIHBhc3NlZCwgd2FpdHMgZm9yIHRoZSBzZXJ2ZXIgdG8gcmVzcG9uZCBiZWZvcmUgcmVtb3ZhbC5cbiAgICBkZXN0cm95OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IF8uY2xvbmUob3B0aW9ucykgOiB7fTtcbiAgICAgIHZhciBtb2RlbCA9IHRoaXM7XG4gICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcblxuICAgICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbW9kZWwudHJpZ2dlcignZGVzdHJveScsIG1vZGVsLCBtb2RlbC5jb2xsZWN0aW9uLCBvcHRpb25zKTtcbiAgICAgIH07XG5cbiAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2FpdCB8fCBtb2RlbC5pc05ldygpKSBkZXN0cm95KCk7XG4gICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzKG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFtb2RlbC5pc05ldygpKSBtb2RlbC50cmlnZ2VyKCdzeW5jJywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuaXNOZXcoKSkge1xuICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgd3JhcEVycm9yKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgeGhyID0gdGhpcy5zeW5jKCdkZWxldGUnLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgIGlmICghb3B0aW9ucy53YWl0KSBkZXN0cm95KCk7XG4gICAgICByZXR1cm4geGhyO1xuICAgIH0sXG5cbiAgICAvLyBEZWZhdWx0IFVSTCBmb3IgdGhlIG1vZGVsJ3MgcmVwcmVzZW50YXRpb24gb24gdGhlIHNlcnZlciAtLSBpZiB5b3UncmVcbiAgICAvLyB1c2luZyBCYWNrYm9uZSdzIHJlc3RmdWwgbWV0aG9kcywgb3ZlcnJpZGUgdGhpcyB0byBjaGFuZ2UgdGhlIGVuZHBvaW50XG4gICAgLy8gdGhhdCB3aWxsIGJlIGNhbGxlZC5cbiAgICB1cmw6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJhc2UgPVxuICAgICAgICBfLnJlc3VsdCh0aGlzLCAndXJsUm9vdCcpIHx8XG4gICAgICAgIF8ucmVzdWx0KHRoaXMuY29sbGVjdGlvbiwgJ3VybCcpIHx8XG4gICAgICAgIHVybEVycm9yKCk7XG4gICAgICBpZiAodGhpcy5pc05ldygpKSByZXR1cm4gYmFzZTtcbiAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoLyhbXlxcL10pJC8sICckMS8nKSArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmlkKTtcbiAgICB9LFxuXG4gICAgLy8gKipwYXJzZSoqIGNvbnZlcnRzIGEgcmVzcG9uc2UgaW50byB0aGUgaGFzaCBvZiBhdHRyaWJ1dGVzIHRvIGJlIGBzZXRgIG9uXG4gICAgLy8gdGhlIG1vZGVsLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBqdXN0IHRvIHBhc3MgdGhlIHJlc3BvbnNlIGFsb25nLlxuICAgIHBhcnNlOiBmdW5jdGlvbihyZXNwLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gcmVzcDtcbiAgICB9LFxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IG1vZGVsIHdpdGggaWRlbnRpY2FsIGF0dHJpYnV0ZXMgdG8gdGhpcyBvbmUuXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgfSxcblxuICAgIC8vIEEgbW9kZWwgaXMgbmV3IGlmIGl0IGhhcyBuZXZlciBiZWVuIHNhdmVkIHRvIHRoZSBzZXJ2ZXIsIGFuZCBsYWNrcyBhbiBpZC5cbiAgICBpc05ldzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXRoaXMuaGFzKHRoaXMuaWRBdHRyaWJ1dGUpO1xuICAgIH0sXG5cbiAgICAvLyBDaGVjayBpZiB0aGUgbW9kZWwgaXMgY3VycmVudGx5IGluIGEgdmFsaWQgc3RhdGUuXG4gICAgaXNWYWxpZDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlKHt9LCBfLmV4dGVuZChvcHRpb25zIHx8IHt9LCB7IHZhbGlkYXRlOiB0cnVlIH0pKTtcbiAgICB9LFxuXG4gICAgLy8gUnVuIHZhbGlkYXRpb24gYWdhaW5zdCB0aGUgbmV4dCBjb21wbGV0ZSBzZXQgb2YgbW9kZWwgYXR0cmlidXRlcyxcbiAgICAvLyByZXR1cm5pbmcgYHRydWVgIGlmIGFsbCBpcyB3ZWxsLiBPdGhlcndpc2UsIGZpcmUgYW4gYFwiaW52YWxpZFwiYCBldmVudC5cbiAgICBfdmFsaWRhdGU6IGZ1bmN0aW9uKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGUgfHwgIXRoaXMudmFsaWRhdGUpIHJldHVybiB0cnVlO1xuICAgICAgYXR0cnMgPSBfLmV4dGVuZCh7fSwgdGhpcy5hdHRyaWJ1dGVzLCBhdHRycyk7XG4gICAgICB2YXIgZXJyb3IgPSB0aGlzLnZhbGlkYXRpb25FcnJvciA9IHRoaXMudmFsaWRhdGUoYXR0cnMsIG9wdGlvbnMpIHx8IG51bGw7XG4gICAgICBpZiAoIWVycm9yKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHRoaXMudHJpZ2dlcignaW52YWxpZCcsIHRoaXMsIGVycm9yLCBfLmV4dGVuZChvcHRpb25zLCB7dmFsaWRhdGlvbkVycm9yOiBlcnJvcn0pKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgLy8gVW5kZXJzY29yZSBtZXRob2RzIHRoYXQgd2Ugd2FudCB0byBpbXBsZW1lbnQgb24gdGhlIE1vZGVsLlxuICB2YXIgbW9kZWxNZXRob2RzID0gWydrZXlzJywgJ3ZhbHVlcycsICdwYWlycycsICdpbnZlcnQnLCAncGljaycsICdvbWl0J107XG5cbiAgLy8gTWl4IGluIGVhY2ggVW5kZXJzY29yZSBtZXRob2QgYXMgYSBwcm94eSB0byBgTW9kZWwjYXR0cmlidXRlc2AuXG4gIF8uZWFjaChtb2RlbE1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIE1vZGVsLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGFyZ3MudW5zaGlmdCh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIF9bbWV0aG9kXS5hcHBseShfLCBhcmdzKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBJZiBtb2RlbHMgdGVuZCB0byByZXByZXNlbnQgYSBzaW5nbGUgcm93IG9mIGRhdGEsIGEgQmFja2JvbmUgQ29sbGVjdGlvbiBpc1xuICAvLyBtb3JlIGFuYWxhZ291cyB0byBhIHRhYmxlIGZ1bGwgb2YgZGF0YSAuLi4gb3IgYSBzbWFsbCBzbGljZSBvciBwYWdlIG9mIHRoYXRcbiAgLy8gdGFibGUsIG9yIGEgY29sbGVjdGlvbiBvZiByb3dzIHRoYXQgYmVsb25nIHRvZ2V0aGVyIGZvciBhIHBhcnRpY3VsYXIgcmVhc29uXG4gIC8vIC0tIGFsbCBvZiB0aGUgbWVzc2FnZXMgaW4gdGhpcyBwYXJ0aWN1bGFyIGZvbGRlciwgYWxsIG9mIHRoZSBkb2N1bWVudHNcbiAgLy8gYmVsb25naW5nIHRvIHRoaXMgcGFydGljdWxhciBhdXRob3IsIGFuZCBzbyBvbi4gQ29sbGVjdGlvbnMgbWFpbnRhaW5cbiAgLy8gaW5kZXhlcyBvZiB0aGVpciBtb2RlbHMsIGJvdGggaW4gb3JkZXIsIGFuZCBmb3IgbG9va3VwIGJ5IGBpZGAuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3ICoqQ29sbGVjdGlvbioqLCBwZXJoYXBzIHRvIGNvbnRhaW4gYSBzcGVjaWZpYyB0eXBlIG9mIGBtb2RlbGAuXG4gIC8vIElmIGEgYGNvbXBhcmF0b3JgIGlzIHNwZWNpZmllZCwgdGhlIENvbGxlY3Rpb24gd2lsbCBtYWludGFpblxuICAvLyBpdHMgbW9kZWxzIGluIHNvcnQgb3JkZXIsIGFzIHRoZXkncmUgYWRkZWQgYW5kIHJlbW92ZWQuXG4gIHZhciBDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbiA9IGZ1bmN0aW9uKG1vZGVscywgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgaWYgKG9wdGlvbnMubW9kZWwpIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmF0b3IgIT09IHZvaWQgMCkgdGhpcy5jb21wYXJhdG9yID0gb3B0aW9ucy5jb21wYXJhdG9yO1xuICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKG1vZGVscykgdGhpcy5yZXNldChtb2RlbHMsIF8uZXh0ZW5kKHtzaWxlbnQ6IHRydWV9LCBvcHRpb25zKSk7XG4gIH07XG5cbiAgLy8gRGVmYXVsdCBvcHRpb25zIGZvciBgQ29sbGVjdGlvbiNzZXRgLlxuICB2YXIgc2V0T3B0aW9ucyA9IHthZGQ6IHRydWUsIHJlbW92ZTogdHJ1ZSwgbWVyZ2U6IHRydWV9O1xuICB2YXIgYWRkT3B0aW9ucyA9IHthZGQ6IHRydWUsIHJlbW92ZTogZmFsc2V9O1xuXG4gIC8vIERlZmluZSB0aGUgQ29sbGVjdGlvbidzIGluaGVyaXRhYmxlIG1ldGhvZHMuXG4gIF8uZXh0ZW5kKENvbGxlY3Rpb24ucHJvdG90eXBlLCBFdmVudHMsIHtcblxuICAgIC8vIFRoZSBkZWZhdWx0IG1vZGVsIGZvciBhIGNvbGxlY3Rpb24gaXMganVzdCBhICoqQmFja2JvbmUuTW9kZWwqKi5cbiAgICAvLyBUaGlzIHNob3VsZCBiZSBvdmVycmlkZGVuIGluIG1vc3QgY2FzZXMuXG4gICAgbW9kZWw6IE1vZGVsLFxuXG4gICAgLy8gSW5pdGlhbGl6ZSBpcyBhbiBlbXB0eSBmdW5jdGlvbiBieSBkZWZhdWx0LiBPdmVycmlkZSBpdCB3aXRoIHlvdXIgb3duXG4gICAgLy8gaW5pdGlhbGl6YXRpb24gbG9naWMuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXt9LFxuXG4gICAgLy8gVGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBDb2xsZWN0aW9uIGlzIGFuIGFycmF5IG9mIHRoZVxuICAgIC8vIG1vZGVscycgYXR0cmlidXRlcy5cbiAgICB0b0pTT046IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbihtb2RlbCl7IHJldHVybiBtb2RlbC50b0pTT04ob3B0aW9ucyk7IH0pO1xuICAgIH0sXG5cbiAgICAvLyBQcm94eSBgQmFja2JvbmUuc3luY2AgYnkgZGVmYXVsdC5cbiAgICBzeW5jOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBCYWNrYm9uZS5zeW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8vIEFkZCBhIG1vZGVsLCBvciBsaXN0IG9mIG1vZGVscyB0byB0aGUgc2V0LlxuICAgIGFkZDogZnVuY3Rpb24obW9kZWxzLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXQobW9kZWxzLCBfLmV4dGVuZCh7bWVyZ2U6IGZhbHNlfSwgb3B0aW9ucywgYWRkT3B0aW9ucykpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYSBtb2RlbCwgb3IgYSBsaXN0IG9mIG1vZGVscyBmcm9tIHRoZSBzZXQuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBzaW5ndWxhciA9ICFfLmlzQXJyYXkobW9kZWxzKTtcbiAgICAgIG1vZGVscyA9IHNpbmd1bGFyID8gW21vZGVsc10gOiBfLmNsb25lKG1vZGVscyk7XG4gICAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgICAgdmFyIGksIGwsIGluZGV4LCBtb2RlbDtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBtb2RlbHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWxzW2ldID0gdGhpcy5nZXQobW9kZWxzW2ldKTtcbiAgICAgICAgaWYgKCFtb2RlbCkgY29udGludWU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9ieUlkW21vZGVsLmlkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2J5SWRbbW9kZWwuY2lkXTtcbiAgICAgICAgaW5kZXggPSB0aGlzLmluZGV4T2YobW9kZWwpO1xuICAgICAgICB0aGlzLm1vZGVscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgb3B0aW9ucy5pbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1vZGVsLnRyaWdnZXIoJ3JlbW92ZScsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW1vdmVSZWZlcmVuY2UobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNpbmd1bGFyID8gbW9kZWxzWzBdIDogbW9kZWxzO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgYSBjb2xsZWN0aW9uIGJ5IGBzZXRgLWluZyBhIG5ldyBsaXN0IG9mIG1vZGVscywgYWRkaW5nIG5ldyBvbmVzLFxuICAgIC8vIHJlbW92aW5nIG1vZGVscyB0aGF0IGFyZSBubyBsb25nZXIgcHJlc2VudCwgYW5kIG1lcmdpbmcgbW9kZWxzIHRoYXRcbiAgICAvLyBhbHJlYWR5IGV4aXN0IGluIHRoZSBjb2xsZWN0aW9uLCBhcyBuZWNlc3NhcnkuIFNpbWlsYXIgdG8gKipNb2RlbCNzZXQqKixcbiAgICAvLyB0aGUgY29yZSBvcGVyYXRpb24gZm9yIHVwZGF0aW5nIHRoZSBkYXRhIGNvbnRhaW5lZCBieSB0aGUgY29sbGVjdGlvbi5cbiAgICBzZXQ6IGZ1bmN0aW9uKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IF8uZGVmYXVsdHMoe30sIG9wdGlvbnMsIHNldE9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMucGFyc2UpIG1vZGVscyA9IHRoaXMucGFyc2UobW9kZWxzLCBvcHRpb25zKTtcbiAgICAgIHZhciBzaW5ndWxhciA9ICFfLmlzQXJyYXkobW9kZWxzKTtcbiAgICAgIG1vZGVscyA9IHNpbmd1bGFyID8gKG1vZGVscyA/IFttb2RlbHNdIDogW10pIDogXy5jbG9uZShtb2RlbHMpO1xuICAgICAgdmFyIGksIGwsIGlkLCBtb2RlbCwgYXR0cnMsIGV4aXN0aW5nLCBzb3J0O1xuICAgICAgdmFyIGF0ID0gb3B0aW9ucy5hdDtcbiAgICAgIHZhciB0YXJnZXRNb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgICB2YXIgc29ydGFibGUgPSB0aGlzLmNvbXBhcmF0b3IgJiYgKGF0ID09IG51bGwpICYmIG9wdGlvbnMuc29ydCAhPT0gZmFsc2U7XG4gICAgICB2YXIgc29ydEF0dHIgPSBfLmlzU3RyaW5nKHRoaXMuY29tcGFyYXRvcikgPyB0aGlzLmNvbXBhcmF0b3IgOiBudWxsO1xuICAgICAgdmFyIHRvQWRkID0gW10sIHRvUmVtb3ZlID0gW10sIG1vZGVsTWFwID0ge307XG4gICAgICB2YXIgYWRkID0gb3B0aW9ucy5hZGQsIG1lcmdlID0gb3B0aW9ucy5tZXJnZSwgcmVtb3ZlID0gb3B0aW9ucy5yZW1vdmU7XG4gICAgICB2YXIgb3JkZXIgPSAhc29ydGFibGUgJiYgYWRkICYmIHJlbW92ZSA/IFtdIDogZmFsc2U7XG5cbiAgICAgIC8vIFR1cm4gYmFyZSBvYmplY3RzIGludG8gbW9kZWwgcmVmZXJlbmNlcywgYW5kIHByZXZlbnQgaW52YWxpZCBtb2RlbHNcbiAgICAgIC8vIGZyb20gYmVpbmcgYWRkZWQuXG4gICAgICBmb3IgKGkgPSAwLCBsID0gbW9kZWxzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBhdHRycyA9IG1vZGVsc1tpXSB8fCB7fTtcbiAgICAgICAgaWYgKGF0dHJzIGluc3RhbmNlb2YgTW9kZWwpIHtcbiAgICAgICAgICBpZCA9IG1vZGVsID0gYXR0cnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWQgPSBhdHRyc1t0YXJnZXRNb2RlbC5wcm90b3R5cGUuaWRBdHRyaWJ1dGUgfHwgJ2lkJ107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIGR1cGxpY2F0ZSBpcyBmb3VuZCwgcHJldmVudCBpdCBmcm9tIGJlaW5nIGFkZGVkIGFuZFxuICAgICAgICAvLyBvcHRpb25hbGx5IG1lcmdlIGl0IGludG8gdGhlIGV4aXN0aW5nIG1vZGVsLlxuICAgICAgICBpZiAoZXhpc3RpbmcgPSB0aGlzLmdldChpZCkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlKSBtb2RlbE1hcFtleGlzdGluZy5jaWRdID0gdHJ1ZTtcbiAgICAgICAgICBpZiAobWVyZ2UpIHtcbiAgICAgICAgICAgIGF0dHJzID0gYXR0cnMgPT09IG1vZGVsID8gbW9kZWwuYXR0cmlidXRlcyA6IGF0dHJzO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGFyc2UpIGF0dHJzID0gZXhpc3RpbmcucGFyc2UoYXR0cnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgZXhpc3Rpbmcuc2V0KGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChzb3J0YWJsZSAmJiAhc29ydCAmJiBleGlzdGluZy5oYXNDaGFuZ2VkKHNvcnRBdHRyKSkgc29ydCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vZGVsc1tpXSA9IGV4aXN0aW5nO1xuXG4gICAgICAgIC8vIElmIHRoaXMgaXMgYSBuZXcsIHZhbGlkIG1vZGVsLCBwdXNoIGl0IHRvIHRoZSBgdG9BZGRgIGxpc3QuXG4gICAgICAgIH0gZWxzZSBpZiAoYWRkKSB7XG4gICAgICAgICAgbW9kZWwgPSBtb2RlbHNbaV0gPSB0aGlzLl9wcmVwYXJlTW9kZWwoYXR0cnMsIG9wdGlvbnMpO1xuICAgICAgICAgIGlmICghbW9kZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHRvQWRkLnB1c2gobW9kZWwpO1xuICAgICAgICAgIHRoaXMuX2FkZFJlZmVyZW5jZShtb2RlbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyBub3QgYWRkIG11bHRpcGxlIG1vZGVscyB3aXRoIHRoZSBzYW1lIGBpZGAuXG4gICAgICAgIG1vZGVsID0gZXhpc3RpbmcgfHwgbW9kZWw7XG4gICAgICAgIGlmIChvcmRlciAmJiAobW9kZWwuaXNOZXcoKSB8fCAhbW9kZWxNYXBbbW9kZWwuaWRdKSkgb3JkZXIucHVzaChtb2RlbCk7XG4gICAgICAgIG1vZGVsTWFwW21vZGVsLmlkXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBub25leGlzdGVudCBtb2RlbHMgaWYgYXBwcm9wcmlhdGUuXG4gICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgIGlmICghbW9kZWxNYXBbKG1vZGVsID0gdGhpcy5tb2RlbHNbaV0pLmNpZF0pIHRvUmVtb3ZlLnB1c2gobW9kZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b1JlbW92ZS5sZW5ndGgpIHRoaXMucmVtb3ZlKHRvUmVtb3ZlLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VlIGlmIHNvcnRpbmcgaXMgbmVlZGVkLCB1cGRhdGUgYGxlbmd0aGAgYW5kIHNwbGljZSBpbiBuZXcgbW9kZWxzLlxuICAgICAgaWYgKHRvQWRkLmxlbmd0aCB8fCAob3JkZXIgJiYgb3JkZXIubGVuZ3RoKSkge1xuICAgICAgICBpZiAoc29ydGFibGUpIHNvcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxlbmd0aCArPSB0b0FkZC5sZW5ndGg7XG4gICAgICAgIGlmIChhdCAhPSBudWxsKSB7XG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IHRvQWRkLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbHMuc3BsaWNlKGF0ICsgaSwgMCwgdG9BZGRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAob3JkZXIpIHRoaXMubW9kZWxzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgdmFyIG9yZGVyZWRNb2RlbHMgPSBvcmRlciB8fCB0b0FkZDtcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gb3JkZXJlZE1vZGVscy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzLnB1c2gob3JkZXJlZE1vZGVsc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNpbGVudGx5IHNvcnQgdGhlIGNvbGxlY3Rpb24gaWYgYXBwcm9wcmlhdGUuXG4gICAgICBpZiAoc29ydCkgdGhpcy5zb3J0KHtzaWxlbnQ6IHRydWV9KTtcblxuICAgICAgLy8gVW5sZXNzIHNpbGVuY2VkLCBpdCdzIHRpbWUgdG8gZmlyZSBhbGwgYXBwcm9wcmlhdGUgYWRkL3NvcnQgZXZlbnRzLlxuICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gdG9BZGQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgKG1vZGVsID0gdG9BZGRbaV0pLnRyaWdnZXIoJ2FkZCcsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc29ydCB8fCAob3JkZXIgJiYgb3JkZXIubGVuZ3RoKSkgdGhpcy50cmlnZ2VyKCdzb3J0JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiB0aGUgYWRkZWQgKG9yIG1lcmdlZCkgbW9kZWwgKG9yIG1vZGVscykuXG4gICAgICByZXR1cm4gc2luZ3VsYXIgPyBtb2RlbHNbMF0gOiBtb2RlbHM7XG4gICAgfSxcblxuICAgIC8vIFdoZW4geW91IGhhdmUgbW9yZSBpdGVtcyB0aGFuIHlvdSB3YW50IHRvIGFkZCBvciByZW1vdmUgaW5kaXZpZHVhbGx5LFxuICAgIC8vIHlvdSBjYW4gcmVzZXQgdGhlIGVudGlyZSBzZXQgd2l0aCBhIG5ldyBsaXN0IG9mIG1vZGVscywgd2l0aG91dCBmaXJpbmdcbiAgICAvLyBhbnkgZ3JhbnVsYXIgYGFkZGAgb3IgYHJlbW92ZWAgZXZlbnRzLiBGaXJlcyBgcmVzZXRgIHdoZW4gZmluaXNoZWQuXG4gICAgLy8gVXNlZnVsIGZvciBidWxrIG9wZXJhdGlvbnMgYW5kIG9wdGltaXphdGlvbnMuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVJlZmVyZW5jZSh0aGlzLm1vZGVsc1tpXSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnByZXZpb3VzTW9kZWxzID0gdGhpcy5tb2RlbHM7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgbW9kZWxzID0gdGhpcy5hZGQobW9kZWxzLCBfLmV4dGVuZCh7c2lsZW50OiB0cnVlfSwgb3B0aW9ucykpO1xuICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkgdGhpcy50cmlnZ2VyKCdyZXNldCcsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG1vZGVscztcbiAgICB9LFxuXG4gICAgLy8gQWRkIGEgbW9kZWwgdG8gdGhlIGVuZCBvZiB0aGUgY29sbGVjdGlvbi5cbiAgICBwdXNoOiBmdW5jdGlvbihtb2RlbCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkKG1vZGVsLCBfLmV4dGVuZCh7YXQ6IHRoaXMubGVuZ3RofSwgb3B0aW9ucykpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYSBtb2RlbCBmcm9tIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAgcG9wOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbW9kZWwgPSB0aGlzLmF0KHRoaXMubGVuZ3RoIC0gMSk7XG4gICAgICB0aGlzLnJlbW92ZShtb2RlbCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfSxcblxuICAgIC8vIEFkZCBhIG1vZGVsIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAgdW5zaGlmdDogZnVuY3Rpb24obW9kZWwsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZChtb2RlbCwgXy5leHRlbmQoe2F0OiAwfSwgb3B0aW9ucykpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgYSBtb2RlbCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAgc2hpZnQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBtb2RlbCA9IHRoaXMuYXQoMCk7XG4gICAgICB0aGlzLnJlbW92ZShtb2RlbCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfSxcblxuICAgIC8vIFNsaWNlIG91dCBhIHN1Yi1hcnJheSBvZiBtb2RlbHMgZnJvbSB0aGUgY29sbGVjdGlvbi5cbiAgICBzbGljZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc2xpY2UuYXBwbHkodGhpcy5tb2RlbHMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8vIEdldCBhIG1vZGVsIGZyb20gdGhlIHNldCBieSBpZC5cbiAgICBnZXQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgICAgcmV0dXJuIHRoaXMuX2J5SWRbb2JqXSB8fCB0aGlzLl9ieUlkW29iai5pZF0gfHwgdGhpcy5fYnlJZFtvYmouY2lkXTtcbiAgICB9LFxuXG4gICAgLy8gR2V0IHRoZSBtb2RlbCBhdCB0aGUgZ2l2ZW4gaW5kZXguXG4gICAgYXQ6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaW5kZXhdO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gbW9kZWxzIHdpdGggbWF0Y2hpbmcgYXR0cmlidXRlcy4gVXNlZnVsIGZvciBzaW1wbGUgY2FzZXMgb2ZcbiAgICAvLyBgZmlsdGVyYC5cbiAgICB3aGVyZTogZnVuY3Rpb24oYXR0cnMsIGZpcnN0KSB7XG4gICAgICBpZiAoXy5pc0VtcHR5KGF0dHJzKSkgcmV0dXJuIGZpcnN0ID8gdm9pZCAwIDogW107XG4gICAgICByZXR1cm4gdGhpc1tmaXJzdCA/ICdmaW5kJyA6ICdmaWx0ZXInXShmdW5jdGlvbihtb2RlbCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICBpZiAoYXR0cnNba2V5XSAhPT0gbW9kZWwuZ2V0KGtleSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gdGhlIGZpcnN0IG1vZGVsIHdpdGggbWF0Y2hpbmcgYXR0cmlidXRlcy4gVXNlZnVsIGZvciBzaW1wbGUgY2FzZXNcbiAgICAvLyBvZiBgZmluZGAuXG4gICAgZmluZFdoZXJlOiBmdW5jdGlvbihhdHRycykge1xuICAgICAgcmV0dXJuIHRoaXMud2hlcmUoYXR0cnMsIHRydWUpO1xuICAgIH0sXG5cbiAgICAvLyBGb3JjZSB0aGUgY29sbGVjdGlvbiB0byByZS1zb3J0IGl0c2VsZi4gWW91IGRvbid0IG5lZWQgdG8gY2FsbCB0aGlzIHVuZGVyXG4gICAgLy8gbm9ybWFsIGNpcmN1bXN0YW5jZXMsIGFzIHRoZSBzZXQgd2lsbCBtYWludGFpbiBzb3J0IG9yZGVyIGFzIGVhY2ggaXRlbVxuICAgIC8vIGlzIGFkZGVkLlxuICAgIHNvcnQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGlmICghdGhpcy5jb21wYXJhdG9yKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzb3J0IGEgc2V0IHdpdGhvdXQgYSBjb21wYXJhdG9yJyk7XG4gICAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuXG4gICAgICAvLyBSdW4gc29ydCBiYXNlZCBvbiB0eXBlIG9mIGBjb21wYXJhdG9yYC5cbiAgICAgIGlmIChfLmlzU3RyaW5nKHRoaXMuY29tcGFyYXRvcikgfHwgdGhpcy5jb21wYXJhdG9yLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vZGVscyA9IHRoaXMuc29ydEJ5KHRoaXMuY29tcGFyYXRvciwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGVscy5zb3J0KF8uYmluZCh0aGlzLmNvbXBhcmF0b3IsIHRoaXMpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkgdGhpcy50cmlnZ2VyKCdzb3J0JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gUGx1Y2sgYW4gYXR0cmlidXRlIGZyb20gZWFjaCBtb2RlbCBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICBwbHVjazogZnVuY3Rpb24oYXR0cikge1xuICAgICAgcmV0dXJuIF8uaW52b2tlKHRoaXMubW9kZWxzLCAnZ2V0JywgYXR0cik7XG4gICAgfSxcblxuICAgIC8vIEZldGNoIHRoZSBkZWZhdWx0IHNldCBvZiBtb2RlbHMgZm9yIHRoaXMgY29sbGVjdGlvbiwgcmVzZXR0aW5nIHRoZVxuICAgIC8vIGNvbGxlY3Rpb24gd2hlbiB0aGV5IGFycml2ZS4gSWYgYHJlc2V0OiB0cnVlYCBpcyBwYXNzZWQsIHRoZSByZXNwb25zZVxuICAgIC8vIGRhdGEgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgYHJlc2V0YCBtZXRob2QgaW5zdGVhZCBvZiBgc2V0YC5cbiAgICBmZXRjaDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBfLmNsb25lKG9wdGlvbnMpIDoge307XG4gICAgICBpZiAob3B0aW9ucy5wYXJzZSA9PT0gdm9pZCAwKSBvcHRpb25zLnBhcnNlID0gdHJ1ZTtcbiAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzO1xuICAgICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICB2YXIgbWV0aG9kID0gb3B0aW9ucy5yZXNldCA/ICdyZXNldCcgOiAnc2V0JztcbiAgICAgICAgY29sbGVjdGlvblttZXRob2RdKHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhjb2xsZWN0aW9uLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgY29sbGVjdGlvbi50cmlnZ2VyKCdzeW5jJywgY29sbGVjdGlvbiwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICB9O1xuICAgICAgd3JhcEVycm9yKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3luYygncmVhZCcsIHRoaXMsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgYSBtb2RlbCBpbiB0aGlzIGNvbGxlY3Rpb24uIEFkZCB0aGUgbW9kZWwgdG8gdGhlXG4gICAgLy8gY29sbGVjdGlvbiBpbW1lZGlhdGVseSwgdW5sZXNzIGB3YWl0OiB0cnVlYCBpcyBwYXNzZWQsIGluIHdoaWNoIGNhc2Ugd2VcbiAgICAvLyB3YWl0IGZvciB0aGUgc2VydmVyIHRvIGFncmVlLlxuICAgIGNyZWF0ZTogZnVuY3Rpb24obW9kZWwsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gXy5jbG9uZShvcHRpb25zKSA6IHt9O1xuICAgICAgaWYgKCEobW9kZWwgPSB0aGlzLl9wcmVwYXJlTW9kZWwobW9kZWwsIG9wdGlvbnMpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFvcHRpb25zLndhaXQpIHRoaXMuYWRkKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcztcbiAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24obW9kZWwsIHJlc3ApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2FpdCkgY29sbGVjdGlvbi5hZGQobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICB9O1xuICAgICAgbW9kZWwuc2F2ZShudWxsLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9LFxuXG4gICAgLy8gKipwYXJzZSoqIGNvbnZlcnRzIGEgcmVzcG9uc2UgaW50byBhIGxpc3Qgb2YgbW9kZWxzIHRvIGJlIGFkZGVkIHRvIHRoZVxuICAgIC8vIGNvbGxlY3Rpb24uIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGp1c3QgdG8gcGFzcyBpdCB0aHJvdWdoLlxuICAgIHBhcnNlOiBmdW5jdGlvbihyZXNwLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gcmVzcDtcbiAgICB9LFxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gd2l0aCBhbiBpZGVudGljYWwgbGlzdCBvZiBtb2RlbHMgYXMgdGhpcyBvbmUuXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMubW9kZWxzKTtcbiAgICB9LFxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2QgdG8gcmVzZXQgYWxsIGludGVybmFsIHN0YXRlLiBDYWxsZWQgd2hlbiB0aGUgY29sbGVjdGlvblxuICAgIC8vIGlzIGZpcnN0IGluaXRpYWxpemVkIG9yIHJlc2V0LlxuICAgIF9yZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLm1vZGVscyA9IFtdO1xuICAgICAgdGhpcy5fYnlJZCAgPSB7fTtcbiAgICB9LFxuXG4gICAgLy8gUHJlcGFyZSBhIGhhc2ggb2YgYXR0cmlidXRlcyAob3Igb3RoZXIgbW9kZWwpIHRvIGJlIGFkZGVkIHRvIHRoaXNcbiAgICAvLyBjb2xsZWN0aW9uLlxuICAgIF9wcmVwYXJlTW9kZWw6IGZ1bmN0aW9uKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgICBpZiAoYXR0cnMgaW5zdGFuY2VvZiBNb2RlbCkgcmV0dXJuIGF0dHJzO1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBfLmNsb25lKG9wdGlvbnMpIDoge307XG4gICAgICBvcHRpb25zLmNvbGxlY3Rpb24gPSB0aGlzO1xuICAgICAgdmFyIG1vZGVsID0gbmV3IHRoaXMubW9kZWwoYXR0cnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKCFtb2RlbC52YWxpZGF0aW9uRXJyb3IpIHJldHVybiBtb2RlbDtcbiAgICAgIHRoaXMudHJpZ2dlcignaW52YWxpZCcsIHRoaXMsIG1vZGVsLnZhbGlkYXRpb25FcnJvciwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIEludGVybmFsIG1ldGhvZCB0byBjcmVhdGUgYSBtb2RlbCdzIHRpZXMgdG8gYSBjb2xsZWN0aW9uLlxuICAgIF9hZGRSZWZlcmVuY2U6IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLl9ieUlkW21vZGVsLmNpZF0gPSBtb2RlbDtcbiAgICAgIGlmIChtb2RlbC5pZCAhPSBudWxsKSB0aGlzLl9ieUlkW21vZGVsLmlkXSA9IG1vZGVsO1xuICAgICAgaWYgKCFtb2RlbC5jb2xsZWN0aW9uKSBtb2RlbC5jb2xsZWN0aW9uID0gdGhpcztcbiAgICAgIG1vZGVsLm9uKCdhbGwnLCB0aGlzLl9vbk1vZGVsRXZlbnQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvLyBJbnRlcm5hbCBtZXRob2QgdG8gc2V2ZXIgYSBtb2RlbCdzIHRpZXMgdG8gYSBjb2xsZWN0aW9uLlxuICAgIF9yZW1vdmVSZWZlcmVuY2U6IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgICBpZiAodGhpcyA9PT0gbW9kZWwuY29sbGVjdGlvbikgZGVsZXRlIG1vZGVsLmNvbGxlY3Rpb247XG4gICAgICBtb2RlbC5vZmYoJ2FsbCcsIHRoaXMuX29uTW9kZWxFdmVudCwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8vIEludGVybmFsIG1ldGhvZCBjYWxsZWQgZXZlcnkgdGltZSBhIG1vZGVsIGluIHRoZSBzZXQgZmlyZXMgYW4gZXZlbnQuXG4gICAgLy8gU2V0cyBuZWVkIHRvIHVwZGF0ZSB0aGVpciBpbmRleGVzIHdoZW4gbW9kZWxzIGNoYW5nZSBpZHMuIEFsbCBvdGhlclxuICAgIC8vIGV2ZW50cyBzaW1wbHkgcHJveHkgdGhyb3VnaC4gXCJhZGRcIiBhbmQgXCJyZW1vdmVcIiBldmVudHMgdGhhdCBvcmlnaW5hdGVcbiAgICAvLyBpbiBvdGhlciBjb2xsZWN0aW9ucyBhcmUgaWdub3JlZC5cbiAgICBfb25Nb2RlbEV2ZW50OiBmdW5jdGlvbihldmVudCwgbW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICAgIGlmICgoZXZlbnQgPT09ICdhZGQnIHx8IGV2ZW50ID09PSAncmVtb3ZlJykgJiYgY29sbGVjdGlvbiAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgaWYgKGV2ZW50ID09PSAnZGVzdHJveScpIHRoaXMucmVtb3ZlKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgIGlmIChtb2RlbCAmJiBldmVudCA9PT0gJ2NoYW5nZTonICsgbW9kZWwuaWRBdHRyaWJ1dGUpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2J5SWRbbW9kZWwucHJldmlvdXMobW9kZWwuaWRBdHRyaWJ1dGUpXTtcbiAgICAgICAgaWYgKG1vZGVsLmlkICE9IG51bGwpIHRoaXMuX2J5SWRbbW9kZWwuaWRdID0gbW9kZWw7XG4gICAgICB9XG4gICAgICB0aGlzLnRyaWdnZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgLy8gVW5kZXJzY29yZSBtZXRob2RzIHRoYXQgd2Ugd2FudCB0byBpbXBsZW1lbnQgb24gdGhlIENvbGxlY3Rpb24uXG4gIC8vIDkwJSBvZiB0aGUgY29yZSB1c2VmdWxuZXNzIG9mIEJhY2tib25lIENvbGxlY3Rpb25zIGlzIGFjdHVhbGx5IGltcGxlbWVudGVkXG4gIC8vIHJpZ2h0IGhlcmU6XG4gIHZhciBtZXRob2RzID0gWydmb3JFYWNoJywgJ2VhY2gnLCAnbWFwJywgJ2NvbGxlY3QnLCAncmVkdWNlJywgJ2ZvbGRsJyxcbiAgICAnaW5qZWN0JywgJ3JlZHVjZVJpZ2h0JywgJ2ZvbGRyJywgJ2ZpbmQnLCAnZGV0ZWN0JywgJ2ZpbHRlcicsICdzZWxlY3QnLFxuICAgICdyZWplY3QnLCAnZXZlcnknLCAnYWxsJywgJ3NvbWUnLCAnYW55JywgJ2luY2x1ZGUnLCAnY29udGFpbnMnLCAnaW52b2tlJyxcbiAgICAnbWF4JywgJ21pbicsICd0b0FycmF5JywgJ3NpemUnLCAnZmlyc3QnLCAnaGVhZCcsICd0YWtlJywgJ2luaXRpYWwnLCAncmVzdCcsXG4gICAgJ3RhaWwnLCAnZHJvcCcsICdsYXN0JywgJ3dpdGhvdXQnLCAnZGlmZmVyZW5jZScsICdpbmRleE9mJywgJ3NodWZmbGUnLFxuICAgICdsYXN0SW5kZXhPZicsICdpc0VtcHR5JywgJ2NoYWluJywgJ3NhbXBsZSddO1xuXG4gIC8vIE1peCBpbiBlYWNoIFVuZGVyc2NvcmUgbWV0aG9kIGFzIGEgcHJveHkgdG8gYENvbGxlY3Rpb24jbW9kZWxzYC5cbiAgXy5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgYXJncy51bnNoaWZ0KHRoaXMubW9kZWxzKTtcbiAgICAgIHJldHVybiBfW21ldGhvZF0uYXBwbHkoXywgYXJncyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gVW5kZXJzY29yZSBtZXRob2RzIHRoYXQgdGFrZSBhIHByb3BlcnR5IG5hbWUgYXMgYW4gYXJndW1lbnQuXG4gIHZhciBhdHRyaWJ1dGVNZXRob2RzID0gWydncm91cEJ5JywgJ2NvdW50QnknLCAnc29ydEJ5JywgJ2luZGV4QnknXTtcblxuICAvLyBVc2UgYXR0cmlidXRlcyBpbnN0ZWFkIG9mIHByb3BlcnRpZXMuXG4gIF8uZWFjaChhdHRyaWJ1dGVNZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQpIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IF8uaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZSA6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiBtb2RlbC5nZXQodmFsdWUpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfW21ldGhvZF0odGhpcy5tb2RlbHMsIGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBCYWNrYm9uZS5WaWV3XG4gIC8vIC0tLS0tLS0tLS0tLS1cblxuICAvLyBCYWNrYm9uZSBWaWV3cyBhcmUgYWxtb3N0IG1vcmUgY29udmVudGlvbiB0aGFuIHRoZXkgYXJlIGFjdHVhbCBjb2RlLiBBIFZpZXdcbiAgLy8gaXMgc2ltcGx5IGEgSmF2YVNjcmlwdCBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgbG9naWNhbCBjaHVuayBvZiBVSSBpbiB0aGVcbiAgLy8gRE9NLiBUaGlzIG1pZ2h0IGJlIGEgc2luZ2xlIGl0ZW0sIGFuIGVudGlyZSBsaXN0LCBhIHNpZGViYXIgb3IgcGFuZWwsIG9yXG4gIC8vIGV2ZW4gdGhlIHN1cnJvdW5kaW5nIGZyYW1lIHdoaWNoIHdyYXBzIHlvdXIgd2hvbGUgYXBwLiBEZWZpbmluZyBhIGNodW5rIG9mXG4gIC8vIFVJIGFzIGEgKipWaWV3KiogYWxsb3dzIHlvdSB0byBkZWZpbmUgeW91ciBET00gZXZlbnRzIGRlY2xhcmF0aXZlbHksIHdpdGhvdXRcbiAgLy8gaGF2aW5nIHRvIHdvcnJ5IGFib3V0IHJlbmRlciBvcmRlciAuLi4gYW5kIG1ha2VzIGl0IGVhc3kgZm9yIHRoZSB2aWV3IHRvXG4gIC8vIHJlYWN0IHRvIHNwZWNpZmljIGNoYW5nZXMgaW4gdGhlIHN0YXRlIG9mIHlvdXIgbW9kZWxzLlxuXG4gIC8vIENyZWF0aW5nIGEgQmFja2JvbmUuVmlldyBjcmVhdGVzIGl0cyBpbml0aWFsIGVsZW1lbnQgb3V0c2lkZSBvZiB0aGUgRE9NLFxuICAvLyBpZiBhbiBleGlzdGluZyBlbGVtZW50IGlzIG5vdCBwcm92aWRlZC4uLlxuICB2YXIgVmlldyA9IEJhY2tib25lLlZpZXcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5jaWQgPSBfLnVuaXF1ZUlkKCd2aWV3Jyk7XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICBfLmV4dGVuZCh0aGlzLCBfLnBpY2sob3B0aW9ucywgdmlld09wdGlvbnMpKTtcbiAgICB0aGlzLl9lbnN1cmVFbGVtZW50KCk7XG4gICAgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9O1xuXG4gIC8vIENhY2hlZCByZWdleCB0byBzcGxpdCBrZXlzIGZvciBgZGVsZWdhdGVgLlxuICB2YXIgZGVsZWdhdGVFdmVudFNwbGl0dGVyID0gL14oXFxTKylcXHMqKC4qKSQvO1xuXG4gIC8vIExpc3Qgb2YgdmlldyBvcHRpb25zIHRvIGJlIG1lcmdlZCBhcyBwcm9wZXJ0aWVzLlxuICB2YXIgdmlld09wdGlvbnMgPSBbJ21vZGVsJywgJ2NvbGxlY3Rpb24nLCAnZWwnLCAnaWQnLCAnYXR0cmlidXRlcycsICdjbGFzc05hbWUnLCAndGFnTmFtZScsICdldmVudHMnXTtcblxuICAvLyBTZXQgdXAgYWxsIGluaGVyaXRhYmxlICoqQmFja2JvbmUuVmlldyoqIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG4gIF8uZXh0ZW5kKFZpZXcucHJvdG90eXBlLCBFdmVudHMsIHtcblxuICAgIC8vIFRoZSBkZWZhdWx0IGB0YWdOYW1lYCBvZiBhIFZpZXcncyBlbGVtZW50IGlzIGBcImRpdlwiYC5cbiAgICB0YWdOYW1lOiAnZGl2JyxcblxuICAgIC8vIGpRdWVyeSBkZWxlZ2F0ZSBmb3IgZWxlbWVudCBsb29rdXAsIHNjb3BlZCB0byBET00gZWxlbWVudHMgd2l0aGluIHRoZVxuICAgIC8vIGN1cnJlbnQgdmlldy4gVGhpcyBzaG91bGQgYmUgcHJlZmVycmVkIHRvIGdsb2JhbCBsb29rdXBzIHdoZXJlIHBvc3NpYmxlLlxuICAgICQ6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gdGhpcy4kZWwuZmluZChzZWxlY3Rvcik7XG4gICAgfSxcblxuICAgIC8vIEluaXRpYWxpemUgaXMgYW4gZW1wdHkgZnVuY3Rpb24gYnkgZGVmYXVsdC4gT3ZlcnJpZGUgaXQgd2l0aCB5b3VyIG93blxuICAgIC8vIGluaXRpYWxpemF0aW9uIGxvZ2ljLlxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7fSxcblxuICAgIC8vICoqcmVuZGVyKiogaXMgdGhlIGNvcmUgZnVuY3Rpb24gdGhhdCB5b3VyIHZpZXcgc2hvdWxkIG92ZXJyaWRlLCBpbiBvcmRlclxuICAgIC8vIHRvIHBvcHVsYXRlIGl0cyBlbGVtZW50IChgdGhpcy5lbGApLCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBIVE1MLiBUaGVcbiAgICAvLyBjb252ZW50aW9uIGlzIGZvciAqKnJlbmRlcioqIHRvIGFsd2F5cyByZXR1cm4gYHRoaXNgLlxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIHRoaXMgdmlldyBieSB0YWtpbmcgdGhlIGVsZW1lbnQgb3V0IG9mIHRoZSBET00sIGFuZCByZW1vdmluZyBhbnlcbiAgICAvLyBhcHBsaWNhYmxlIEJhY2tib25lLkV2ZW50cyBsaXN0ZW5lcnMuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQ2hhbmdlIHRoZSB2aWV3J3MgZWxlbWVudCAoYHRoaXMuZWxgIHByb3BlcnR5KSwgaW5jbHVkaW5nIGV2ZW50XG4gICAgLy8gcmUtZGVsZWdhdGlvbi5cbiAgICBzZXRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgaWYgKHRoaXMuJGVsKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAgIHRoaXMuJGVsID0gZWxlbWVudCBpbnN0YW5jZW9mIEJhY2tib25lLiQgPyBlbGVtZW50IDogQmFja2JvbmUuJChlbGVtZW50KTtcbiAgICAgIHRoaXMuZWwgPSB0aGlzLiRlbFswXTtcbiAgICAgIGlmIChkZWxlZ2F0ZSAhPT0gZmFsc2UpIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBTZXQgY2FsbGJhY2tzLCB3aGVyZSBgdGhpcy5ldmVudHNgIGlzIGEgaGFzaCBvZlxuICAgIC8vXG4gICAgLy8gKntcImV2ZW50IHNlbGVjdG9yXCI6IFwiY2FsbGJhY2tcIn0qXG4gICAgLy9cbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICdtb3VzZWRvd24gLnRpdGxlJzogICdlZGl0JyxcbiAgICAvLyAgICAgICAnY2xpY2sgLmJ1dHRvbic6ICAgICAnc2F2ZScsXG4gICAgLy8gICAgICAgJ2NsaWNrIC5vcGVuJzogICAgICAgZnVuY3Rpb24oZSkgeyAuLi4gfVxuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyBwYWlycy4gQ2FsbGJhY2tzIHdpbGwgYmUgYm91bmQgdG8gdGhlIHZpZXcsIHdpdGggYHRoaXNgIHNldCBwcm9wZXJseS5cbiAgICAvLyBVc2VzIGV2ZW50IGRlbGVnYXRpb24gZm9yIGVmZmljaWVuY3kuXG4gICAgLy8gT21pdHRpbmcgdGhlIHNlbGVjdG9yIGJpbmRzIHRoZSBldmVudCB0byBgdGhpcy5lbGAuXG4gICAgLy8gVGhpcyBvbmx5IHdvcmtzIGZvciBkZWxlZ2F0ZS1hYmxlIGV2ZW50czogbm90IGBmb2N1c2AsIGBibHVyYCwgYW5kXG4gICAgLy8gbm90IGBjaGFuZ2VgLCBgc3VibWl0YCwgYW5kIGByZXNldGAgaW4gSW50ZXJuZXQgRXhwbG9yZXIuXG4gICAgZGVsZWdhdGVFdmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgaWYgKCEoZXZlbnRzIHx8IChldmVudHMgPSBfLnJlc3VsdCh0aGlzLCAnZXZlbnRzJykpKSkgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGV2ZW50c1trZXldO1xuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihtZXRob2QpKSBtZXRob2QgPSB0aGlzW2V2ZW50c1trZXldXTtcbiAgICAgICAgaWYgKCFtZXRob2QpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGtleS5tYXRjaChkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIpO1xuICAgICAgICB2YXIgZXZlbnROYW1lID0gbWF0Y2hbMV0sIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gICAgICAgIG1ldGhvZCA9IF8uYmluZChtZXRob2QsIHRoaXMpO1xuICAgICAgICBldmVudE5hbWUgKz0gJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZDtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSAnJykge1xuICAgICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgbWV0aG9kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRlbC5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQ2xlYXJzIGFsbCBjYWxsYmFja3MgcHJldmlvdXNseSBib3VuZCB0byB0aGUgdmlldyB3aXRoIGBkZWxlZ2F0ZUV2ZW50c2AuXG4gICAgLy8gWW91IHVzdWFsbHkgZG9uJ3QgbmVlZCB0byB1c2UgdGhpcywgYnV0IG1heSB3aXNoIHRvIGlmIHlvdSBoYXZlIG11bHRpcGxlXG4gICAgLy8gQmFja2JvbmUgdmlld3MgYXR0YWNoZWQgdG8gdGhlIHNhbWUgRE9NIGVsZW1lbnQuXG4gICAgdW5kZWxlZ2F0ZUV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5vZmYoJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gRW5zdXJlIHRoYXQgdGhlIFZpZXcgaGFzIGEgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIGludG8uXG4gICAgLy8gSWYgYHRoaXMuZWxgIGlzIGEgc3RyaW5nLCBwYXNzIGl0IHRocm91Z2ggYCQoKWAsIHRha2UgdGhlIGZpcnN0XG4gICAgLy8gbWF0Y2hpbmcgZWxlbWVudCwgYW5kIHJlLWFzc2lnbiBpdCB0byBgZWxgLiBPdGhlcndpc2UsIGNyZWF0ZVxuICAgIC8vIGFuIGVsZW1lbnQgZnJvbSB0aGUgYGlkYCwgYGNsYXNzTmFtZWAgYW5kIGB0YWdOYW1lYCBwcm9wZXJ0aWVzLlxuICAgIF9lbnN1cmVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5lbCkge1xuICAgICAgICB2YXIgYXR0cnMgPSBfLmV4dGVuZCh7fSwgXy5yZXN1bHQodGhpcywgJ2F0dHJpYnV0ZXMnKSk7XG4gICAgICAgIGlmICh0aGlzLmlkKSBhdHRycy5pZCA9IF8ucmVzdWx0KHRoaXMsICdpZCcpO1xuICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUpIGF0dHJzWydjbGFzcyddID0gXy5yZXN1bHQodGhpcywgJ2NsYXNzTmFtZScpO1xuICAgICAgICB2YXIgJGVsID0gQmFja2JvbmUuJCgnPCcgKyBfLnJlc3VsdCh0aGlzLCAndGFnTmFtZScpICsgJz4nKS5hdHRyKGF0dHJzKTtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KCRlbCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KF8ucmVzdWx0KHRoaXMsICdlbCcpLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vIEJhY2tib25lLnN5bmNcbiAgLy8gLS0tLS0tLS0tLS0tLVxuXG4gIC8vIE92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gdG8gY2hhbmdlIHRoZSBtYW5uZXIgaW4gd2hpY2ggQmFja2JvbmUgcGVyc2lzdHNcbiAgLy8gbW9kZWxzIHRvIHRoZSBzZXJ2ZXIuIFlvdSB3aWxsIGJlIHBhc3NlZCB0aGUgdHlwZSBvZiByZXF1ZXN0LCBhbmQgdGhlXG4gIC8vIG1vZGVsIGluIHF1ZXN0aW9uLiBCeSBkZWZhdWx0LCBtYWtlcyBhIFJFU1RmdWwgQWpheCByZXF1ZXN0XG4gIC8vIHRvIHRoZSBtb2RlbCdzIGB1cmwoKWAuIFNvbWUgcG9zc2libGUgY3VzdG9taXphdGlvbnMgY291bGQgYmU6XG4gIC8vXG4gIC8vICogVXNlIGBzZXRUaW1lb3V0YCB0byBiYXRjaCByYXBpZC1maXJlIHVwZGF0ZXMgaW50byBhIHNpbmdsZSByZXF1ZXN0LlxuICAvLyAqIFNlbmQgdXAgdGhlIG1vZGVscyBhcyBYTUwgaW5zdGVhZCBvZiBKU09OLlxuICAvLyAqIFBlcnNpc3QgbW9kZWxzIHZpYSBXZWJTb2NrZXRzIGluc3RlYWQgb2YgQWpheC5cbiAgLy9cbiAgLy8gVHVybiBvbiBgQmFja2JvbmUuZW11bGF0ZUhUVFBgIGluIG9yZGVyIHRvIHNlbmQgYFBVVGAgYW5kIGBERUxFVEVgIHJlcXVlc3RzXG4gIC8vIGFzIGBQT1NUYCwgd2l0aCBhIGBfbWV0aG9kYCBwYXJhbWV0ZXIgY29udGFpbmluZyB0aGUgdHJ1ZSBIVFRQIG1ldGhvZCxcbiAgLy8gYXMgd2VsbCBhcyBhbGwgcmVxdWVzdHMgd2l0aCB0aGUgYm9keSBhcyBgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkYFxuICAvLyBpbnN0ZWFkIG9mIGBhcHBsaWNhdGlvbi9qc29uYCB3aXRoIHRoZSBtb2RlbCBpbiBhIHBhcmFtIG5hbWVkIGBtb2RlbGAuXG4gIC8vIFVzZWZ1bCB3aGVuIGludGVyZmFjaW5nIHdpdGggc2VydmVyLXNpZGUgbGFuZ3VhZ2VzIGxpa2UgKipQSFAqKiB0aGF0IG1ha2VcbiAgLy8gaXQgZGlmZmljdWx0IHRvIHJlYWQgdGhlIGJvZHkgb2YgYFBVVGAgcmVxdWVzdHMuXG4gIEJhY2tib25lLnN5bmMgPSBmdW5jdGlvbihtZXRob2QsIG1vZGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHR5cGUgPSBtZXRob2RNYXBbbWV0aG9kXTtcblxuICAgIC8vIERlZmF1bHQgb3B0aW9ucywgdW5sZXNzIHNwZWNpZmllZC5cbiAgICBfLmRlZmF1bHRzKG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSksIHtcbiAgICAgIGVtdWxhdGVIVFRQOiBCYWNrYm9uZS5lbXVsYXRlSFRUUCxcbiAgICAgIGVtdWxhdGVKU09OOiBCYWNrYm9uZS5lbXVsYXRlSlNPTlxuICAgIH0pO1xuXG4gICAgLy8gRGVmYXVsdCBKU09OLXJlcXVlc3Qgb3B0aW9ucy5cbiAgICB2YXIgcGFyYW1zID0ge3R5cGU6IHR5cGUsIGRhdGFUeXBlOiAnanNvbid9O1xuXG4gICAgLy8gRW5zdXJlIHRoYXQgd2UgaGF2ZSBhIFVSTC5cbiAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICBwYXJhbXMudXJsID0gXy5yZXN1bHQobW9kZWwsICd1cmwnKSB8fCB1cmxFcnJvcigpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IHdlIGhhdmUgdGhlIGFwcHJvcHJpYXRlIHJlcXVlc3QgZGF0YS5cbiAgICBpZiAob3B0aW9ucy5kYXRhID09IG51bGwgJiYgbW9kZWwgJiYgKG1ldGhvZCA9PT0gJ2NyZWF0ZScgfHwgbWV0aG9kID09PSAndXBkYXRlJyB8fCBtZXRob2QgPT09ICdwYXRjaCcpKSB7XG4gICAgICBwYXJhbXMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICBwYXJhbXMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYXR0cnMgfHwgbW9kZWwudG9KU09OKG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvLyBGb3Igb2xkZXIgc2VydmVycywgZW11bGF0ZSBKU09OIGJ5IGVuY29kaW5nIHRoZSByZXF1ZXN0IGludG8gYW4gSFRNTC1mb3JtLlxuICAgIGlmIChvcHRpb25zLmVtdWxhdGVKU09OKSB7XG4gICAgICBwYXJhbXMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAgIHBhcmFtcy5kYXRhID0gcGFyYW1zLmRhdGEgPyB7bW9kZWw6IHBhcmFtcy5kYXRhfSA6IHt9O1xuICAgIH1cblxuICAgIC8vIEZvciBvbGRlciBzZXJ2ZXJzLCBlbXVsYXRlIEhUVFAgYnkgbWltaWNraW5nIHRoZSBIVFRQIG1ldGhvZCB3aXRoIGBfbWV0aG9kYFxuICAgIC8vIEFuZCBhbiBgWC1IVFRQLU1ldGhvZC1PdmVycmlkZWAgaGVhZGVyLlxuICAgIGlmIChvcHRpb25zLmVtdWxhdGVIVFRQICYmICh0eXBlID09PSAnUFVUJyB8fCB0eXBlID09PSAnREVMRVRFJyB8fCB0eXBlID09PSAnUEFUQ0gnKSkge1xuICAgICAgcGFyYW1zLnR5cGUgPSAnUE9TVCc7XG4gICAgICBpZiAob3B0aW9ucy5lbXVsYXRlSlNPTikgcGFyYW1zLmRhdGEuX21ldGhvZCA9IHR5cGU7XG4gICAgICB2YXIgYmVmb3JlU2VuZCA9IG9wdGlvbnMuYmVmb3JlU2VuZDtcbiAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uKHhocikge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1IVFRQLU1ldGhvZC1PdmVycmlkZScsIHR5cGUpO1xuICAgICAgICBpZiAoYmVmb3JlU2VuZCkgcmV0dXJuIGJlZm9yZVNlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgcHJvY2VzcyBkYXRhIG9uIGEgbm9uLUdFVCByZXF1ZXN0LlxuICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ0dFVCcgJiYgIW9wdGlvbnMuZW11bGF0ZUpTT04pIHtcbiAgICAgIHBhcmFtcy5wcm9jZXNzRGF0YSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElmIHdlJ3JlIHNlbmRpbmcgYSBgUEFUQ0hgIHJlcXVlc3QsIGFuZCB3ZSdyZSBpbiBhbiBvbGQgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAvLyB0aGF0IHN0aWxsIGhhcyBBY3RpdmVYIGVuYWJsZWQgYnkgZGVmYXVsdCwgb3ZlcnJpZGUgalF1ZXJ5IHRvIHVzZSB0aGF0XG4gICAgLy8gZm9yIFhIUiBpbnN0ZWFkLiBSZW1vdmUgdGhpcyBsaW5lIHdoZW4galF1ZXJ5IHN1cHBvcnRzIGBQQVRDSGAgb24gSUU4LlxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ1BBVENIJyAmJiBub1hoclBhdGNoKSB7XG4gICAgICBwYXJhbXMueGhyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHRoZSByZXF1ZXN0LCBhbGxvd2luZyB0aGUgdXNlciB0byBvdmVycmlkZSBhbnkgQWpheCBvcHRpb25zLlxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociA9IEJhY2tib25lLmFqYXgoXy5leHRlbmQocGFyYW1zLCBvcHRpb25zKSk7XG4gICAgbW9kZWwudHJpZ2dlcigncmVxdWVzdCcsIG1vZGVsLCB4aHIsIG9wdGlvbnMpO1xuICAgIHJldHVybiB4aHI7XG4gIH07XG5cbiAgdmFyIG5vWGhyUGF0Y2ggPVxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhd2luZG93LkFjdGl2ZVhPYmplY3QgJiZcbiAgICAgICEod2luZG93LlhNTEh0dHBSZXF1ZXN0ICYmIChuZXcgWE1MSHR0cFJlcXVlc3QpLmRpc3BhdGNoRXZlbnQpO1xuXG4gIC8vIE1hcCBmcm9tIENSVUQgdG8gSFRUUCBmb3Igb3VyIGRlZmF1bHQgYEJhY2tib25lLnN5bmNgIGltcGxlbWVudGF0aW9uLlxuICB2YXIgbWV0aG9kTWFwID0ge1xuICAgICdjcmVhdGUnOiAnUE9TVCcsXG4gICAgJ3VwZGF0ZSc6ICdQVVQnLFxuICAgICdwYXRjaCc6ICAnUEFUQ0gnLFxuICAgICdkZWxldGUnOiAnREVMRVRFJyxcbiAgICAncmVhZCc6ICAgJ0dFVCdcbiAgfTtcblxuICAvLyBTZXQgdGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYEJhY2tib25lLmFqYXhgIHRvIHByb3h5IHRocm91Z2ggdG8gYCRgLlxuICAvLyBPdmVycmlkZSB0aGlzIGlmIHlvdSdkIGxpa2UgdG8gdXNlIGEgZGlmZmVyZW50IGxpYnJhcnkuXG4gIEJhY2tib25lLmFqYXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQmFja2JvbmUuJC5hamF4LmFwcGx5KEJhY2tib25lLiQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQmFja2JvbmUuUm91dGVyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJvdXRlcnMgbWFwIGZhdXgtVVJMcyB0byBhY3Rpb25zLCBhbmQgZmlyZSBldmVudHMgd2hlbiByb3V0ZXMgYXJlXG4gIC8vIG1hdGNoZWQuIENyZWF0aW5nIGEgbmV3IG9uZSBzZXRzIGl0cyBgcm91dGVzYCBoYXNoLCBpZiBub3Qgc2V0IHN0YXRpY2FsbHkuXG4gIHZhciBSb3V0ZXIgPSBCYWNrYm9uZS5Sb3V0ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICBpZiAob3B0aW9ucy5yb3V0ZXMpIHRoaXMucm91dGVzID0gb3B0aW9ucy5yb3V0ZXM7XG4gICAgdGhpcy5fYmluZFJvdXRlcygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8vIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zIGZvciBtYXRjaGluZyBuYW1lZCBwYXJhbSBwYXJ0cyBhbmQgc3BsYXR0ZWRcbiAgLy8gcGFydHMgb2Ygcm91dGUgc3RyaW5ncy5cbiAgdmFyIG9wdGlvbmFsUGFyYW0gPSAvXFwoKC4qPylcXCkvZztcbiAgdmFyIG5hbWVkUGFyYW0gICAgPSAvKFxcKFxcPyk/OlxcdysvZztcbiAgdmFyIHNwbGF0UGFyYW0gICAgPSAvXFwqXFx3Ky9nO1xuICB2YXIgZXNjYXBlUmVnRXhwICA9IC9bXFwte31cXFtcXF0rPy4sXFxcXFxcXiR8I1xcc10vZztcblxuICAvLyBTZXQgdXAgYWxsIGluaGVyaXRhYmxlICoqQmFja2JvbmUuUm91dGVyKiogcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cbiAgXy5leHRlbmQoUm91dGVyLnByb3RvdHlwZSwgRXZlbnRzLCB7XG5cbiAgICAvLyBJbml0aWFsaXplIGlzIGFuIGVtcHR5IGZ1bmN0aW9uIGJ5IGRlZmF1bHQuIE92ZXJyaWRlIGl0IHdpdGggeW91ciBvd25cbiAgICAvLyBpbml0aWFsaXphdGlvbiBsb2dpYy5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe30sXG5cbiAgICAvLyBNYW51YWxseSBiaW5kIGEgc2luZ2xlIG5hbWVkIHJvdXRlIHRvIGEgY2FsbGJhY2suIEZvciBleGFtcGxlOlxuICAgIC8vXG4gICAgLy8gICAgIHRoaXMucm91dGUoJ3NlYXJjaC86cXVlcnkvcDpudW0nLCAnc2VhcmNoJywgZnVuY3Rpb24ocXVlcnksIG51bSkge1xuICAgIC8vICAgICAgIC4uLlxuICAgIC8vICAgICB9KTtcbiAgICAvL1xuICAgIHJvdXRlOiBmdW5jdGlvbihyb3V0ZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghXy5pc1JlZ0V4cChyb3V0ZSkpIHJvdXRlID0gdGhpcy5fcm91dGVUb1JlZ0V4cChyb3V0ZSk7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG5hbWUpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmFtZTtcbiAgICAgICAgbmFtZSA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKCFjYWxsYmFjaykgY2FsbGJhY2sgPSB0aGlzW25hbWVdO1xuICAgICAgdmFyIHJvdXRlciA9IHRoaXM7XG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LnJvdXRlKHJvdXRlLCBmdW5jdGlvbihmcmFnbWVudCkge1xuICAgICAgICB2YXIgYXJncyA9IHJvdXRlci5fZXh0cmFjdFBhcmFtZXRlcnMocm91dGUsIGZyYWdtZW50KTtcbiAgICAgICAgcm91dGVyLmV4ZWN1dGUoY2FsbGJhY2ssIGFyZ3MpO1xuICAgICAgICByb3V0ZXIudHJpZ2dlci5hcHBseShyb3V0ZXIsIFsncm91dGU6JyArIG5hbWVdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIHJvdXRlci50cmlnZ2VyKCdyb3V0ZScsIG5hbWUsIGFyZ3MpO1xuICAgICAgICBCYWNrYm9uZS5oaXN0b3J5LnRyaWdnZXIoJ3JvdXRlJywgcm91dGVyLCBuYW1lLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEV4ZWN1dGUgYSByb3V0ZSBoYW5kbGVyIHdpdGggdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuICBUaGlzIGlzIGFuXG4gICAgLy8gZXhjZWxsZW50IHBsYWNlIHRvIGRvIHByZS1yb3V0ZSBzZXR1cCBvciBwb3N0LXJvdXRlIGNsZWFudXAuXG4gICAgZXhlY3V0ZTogZnVuY3Rpb24oY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSxcblxuICAgIC8vIFNpbXBsZSBwcm94eSB0byBgQmFja2JvbmUuaGlzdG9yeWAgdG8gc2F2ZSBhIGZyYWdtZW50IGludG8gdGhlIGhpc3RvcnkuXG4gICAgbmF2aWdhdGU6IGZ1bmN0aW9uKGZyYWdtZW50LCBvcHRpb25zKSB7XG4gICAgICBCYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlKGZyYWdtZW50LCBvcHRpb25zKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBCaW5kIGFsbCBkZWZpbmVkIHJvdXRlcyB0byBgQmFja2JvbmUuaGlzdG9yeWAuIFdlIGhhdmUgdG8gcmV2ZXJzZSB0aGVcbiAgICAvLyBvcmRlciBvZiB0aGUgcm91dGVzIGhlcmUgdG8gc3VwcG9ydCBiZWhhdmlvciB3aGVyZSB0aGUgbW9zdCBnZW5lcmFsXG4gICAgLy8gcm91dGVzIGNhbiBiZSBkZWZpbmVkIGF0IHRoZSBib3R0b20gb2YgdGhlIHJvdXRlIG1hcC5cbiAgICBfYmluZFJvdXRlczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMucm91dGVzKSByZXR1cm47XG4gICAgICB0aGlzLnJvdXRlcyA9IF8ucmVzdWx0KHRoaXMsICdyb3V0ZXMnKTtcbiAgICAgIHZhciByb3V0ZSwgcm91dGVzID0gXy5rZXlzKHRoaXMucm91dGVzKTtcbiAgICAgIHdoaWxlICgocm91dGUgPSByb3V0ZXMucG9wKCkpICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5yb3V0ZShyb3V0ZSwgdGhpcy5yb3V0ZXNbcm91dGVdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIHJvdXRlIHN0cmluZyBpbnRvIGEgcmVndWxhciBleHByZXNzaW9uLCBzdWl0YWJsZSBmb3IgbWF0Y2hpbmdcbiAgICAvLyBhZ2FpbnN0IHRoZSBjdXJyZW50IGxvY2F0aW9uIGhhc2guXG4gICAgX3JvdXRlVG9SZWdFeHA6IGZ1bmN0aW9uKHJvdXRlKSB7XG4gICAgICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoZXNjYXBlUmVnRXhwLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgICAgICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXG4gICAgICAgICAgICAgICAgICAgLnJlcGxhY2UobmFtZWRQYXJhbSwgZnVuY3Rpb24obWF0Y2gsIG9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uYWwgPyBtYXRjaCA6ICcoW14vP10rKSc7XG4gICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAucmVwbGFjZShzcGxhdFBhcmFtLCAnKFteP10qPyknKTtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJvdXRlICsgJyg/OlxcXFw/KFtcXFxcc1xcXFxTXSopKT8kJyk7XG4gICAgfSxcblxuICAgIC8vIEdpdmVuIGEgcm91dGUsIGFuZCBhIFVSTCBmcmFnbWVudCB0aGF0IGl0IG1hdGNoZXMsIHJldHVybiB0aGUgYXJyYXkgb2ZcbiAgICAvLyBleHRyYWN0ZWQgZGVjb2RlZCBwYXJhbWV0ZXJzLiBFbXB0eSBvciB1bm1hdGNoZWQgcGFyYW1ldGVycyB3aWxsIGJlXG4gICAgLy8gdHJlYXRlZCBhcyBgbnVsbGAgdG8gbm9ybWFsaXplIGNyb3NzLWJyb3dzZXIgYmVoYXZpb3IuXG4gICAgX2V4dHJhY3RQYXJhbWV0ZXJzOiBmdW5jdGlvbihyb3V0ZSwgZnJhZ21lbnQpIHtcbiAgICAgIHZhciBwYXJhbXMgPSByb3V0ZS5leGVjKGZyYWdtZW50KS5zbGljZSgxKTtcbiAgICAgIHJldHVybiBfLm1hcChwYXJhbXMsIGZ1bmN0aW9uKHBhcmFtLCBpKSB7XG4gICAgICAgIC8vIERvbid0IGRlY29kZSB0aGUgc2VhcmNoIHBhcmFtcy5cbiAgICAgICAgaWYgKGkgPT09IHBhcmFtcy5sZW5ndGggLSAxKSByZXR1cm4gcGFyYW0gfHwgbnVsbDtcbiAgICAgICAgcmV0dXJuIHBhcmFtID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtKSA6IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgLy8gQmFja2JvbmUuSGlzdG9yeVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gSGFuZGxlcyBjcm9zcy1icm93c2VyIGhpc3RvcnkgbWFuYWdlbWVudCwgYmFzZWQgb24gZWl0aGVyXG4gIC8vIFtwdXNoU3RhdGVdKGh0dHA6Ly9kaXZlaW50b2h0bWw1LmluZm8vaGlzdG9yeS5odG1sKSBhbmQgcmVhbCBVUkxzLCBvclxuICAvLyBbb25oYXNoY2hhbmdlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0RPTS93aW5kb3cub25oYXNoY2hhbmdlKVxuICAvLyBhbmQgVVJMIGZyYWdtZW50cy4gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgbmVpdGhlciAob2xkIElFLCBuYXRjaCksXG4gIC8vIGZhbGxzIGJhY2sgdG8gcG9sbGluZy5cbiAgdmFyIEhpc3RvcnkgPSBCYWNrYm9uZS5IaXN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIF8uYmluZEFsbCh0aGlzLCAnY2hlY2tVcmwnKTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IGBIaXN0b3J5YCBjYW4gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBicm93c2VyLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgIHRoaXMuaGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICAgIH1cbiAgfTtcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyBhIGxlYWRpbmcgaGFzaC9zbGFzaCBhbmQgdHJhaWxpbmcgc3BhY2UuXG4gIHZhciByb3V0ZVN0cmlwcGVyID0gL15bI1xcL118XFxzKyQvZztcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzLlxuICB2YXIgcm9vdFN0cmlwcGVyID0gL15cXC8rfFxcLyskL2c7XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBkZXRlY3RpbmcgTVNJRS5cbiAgdmFyIGlzRXhwbG9yZXIgPSAvbXNpZSBbXFx3Ll0rLztcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIHJlbW92aW5nIGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciB0cmFpbGluZ1NsYXNoID0gL1xcLyQvO1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3Igc3RyaXBwaW5nIHVybHMgb2YgaGFzaC5cbiAgdmFyIHBhdGhTdHJpcHBlciA9IC8jLiokLztcblxuICAvLyBIYXMgdGhlIGhpc3RvcnkgaGFuZGxpbmcgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQ/XG4gIEhpc3Rvcnkuc3RhcnRlZCA9IGZhbHNlO1xuXG4gIC8vIFNldCB1cCBhbGwgaW5oZXJpdGFibGUgKipCYWNrYm9uZS5IaXN0b3J5KiogcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cbiAgXy5leHRlbmQoSGlzdG9yeS5wcm90b3R5cGUsIEV2ZW50cywge1xuXG4gICAgLy8gVGhlIGRlZmF1bHQgaW50ZXJ2YWwgdG8gcG9sbCBmb3IgaGFzaCBjaGFuZ2VzLCBpZiBuZWNlc3NhcnksIGlzXG4gICAgLy8gdHdlbnR5IHRpbWVzIGEgc2Vjb25kLlxuICAgIGludGVydmFsOiA1MCxcblxuICAgIC8vIEFyZSB3ZSBhdCB0aGUgYXBwIHJvb3Q/XG4gICAgYXRSb290OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1teXFwvXSQvLCAnJCYvJykgPT09IHRoaXMucm9vdDtcbiAgICB9LFxuXG4gICAgLy8gR2V0cyB0aGUgdHJ1ZSBoYXNoIHZhbHVlLiBDYW5ub3QgdXNlIGxvY2F0aW9uLmhhc2ggZGlyZWN0bHkgZHVlIHRvIGJ1Z1xuICAgIC8vIGluIEZpcmVmb3ggd2hlcmUgbG9jYXRpb24uaGFzaCB3aWxsIGFsd2F5cyBiZSBkZWNvZGVkLlxuICAgIGdldEhhc2g6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgICAgdmFyIG1hdGNoID0gKHdpbmRvdyB8fCB0aGlzKS5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG4gICAgfSxcblxuICAgIC8vIEdldCB0aGUgY3Jvc3MtYnJvd3NlciBub3JtYWxpemVkIFVSTCBmcmFnbWVudCwgZWl0aGVyIGZyb20gdGhlIFVSTCxcbiAgICAvLyB0aGUgaGFzaCwgb3IgdGhlIG92ZXJyaWRlLlxuICAgIGdldEZyYWdtZW50OiBmdW5jdGlvbihmcmFnbWVudCwgZm9yY2VQdXNoU3RhdGUpIHtcbiAgICAgIGlmIChmcmFnbWVudCA9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUgfHwgIXRoaXMuX3dhbnRzSGFzaENoYW5nZSB8fCBmb3JjZVB1c2hTdGF0ZSkge1xuICAgICAgICAgIGZyYWdtZW50ID0gZGVjb2RlVVJJKHRoaXMubG9jYXRpb24ucGF0aG5hbWUgKyB0aGlzLmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnJvb3QucmVwbGFjZSh0cmFpbGluZ1NsYXNoLCAnJyk7XG4gICAgICAgICAgaWYgKCFmcmFnbWVudC5pbmRleE9mKHJvb3QpKSBmcmFnbWVudCA9IGZyYWdtZW50LnNsaWNlKHJvb3QubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuZ2V0SGFzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZShyb3V0ZVN0cmlwcGVyLCAnJyk7XG4gICAgfSxcblxuICAgIC8vIFN0YXJ0IHRoZSBoYXNoIGNoYW5nZSBoYW5kbGluZywgcmV0dXJuaW5nIGB0cnVlYCBpZiB0aGUgY3VycmVudCBVUkwgbWF0Y2hlc1xuICAgIC8vIGFuIGV4aXN0aW5nIHJvdXRlLCBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGlmIChIaXN0b3J5LnN0YXJ0ZWQpIHRocm93IG5ldyBFcnJvcihcIkJhY2tib25lLmhpc3RvcnkgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkXCIpO1xuICAgICAgSGlzdG9yeS5zdGFydGVkID0gdHJ1ZTtcblxuICAgICAgLy8gRmlndXJlIG91dCB0aGUgaW5pdGlhbCBjb25maWd1cmF0aW9uLiBEbyB3ZSBuZWVkIGFuIGlmcmFtZT9cbiAgICAgIC8vIElzIHB1c2hTdGF0ZSBkZXNpcmVkIC4uLiBpcyBpdCBhdmFpbGFibGU/XG4gICAgICB0aGlzLm9wdGlvbnMgICAgICAgICAgPSBfLmV4dGVuZCh7cm9vdDogJy8nfSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHRoaXMucm9vdCAgICAgICAgICAgICA9IHRoaXMub3B0aW9ucy5yb290O1xuICAgICAgdGhpcy5fd2FudHNIYXNoQ2hhbmdlID0gdGhpcy5vcHRpb25zLmhhc2hDaGFuZ2UgIT09IGZhbHNlO1xuICAgICAgdGhpcy5fd2FudHNQdXNoU3RhdGUgID0gISF0aGlzLm9wdGlvbnMucHVzaFN0YXRlO1xuICAgICAgdGhpcy5faGFzUHVzaFN0YXRlICAgID0gISEodGhpcy5vcHRpb25zLnB1c2hTdGF0ZSAmJiB0aGlzLmhpc3RvcnkgJiYgdGhpcy5oaXN0b3J5LnB1c2hTdGF0ZSk7XG4gICAgICB2YXIgZnJhZ21lbnQgICAgICAgICAgPSB0aGlzLmdldEZyYWdtZW50KCk7XG4gICAgICB2YXIgZG9jTW9kZSAgICAgICAgICAgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG4gICAgICB2YXIgb2xkSUUgICAgICAgICAgICAgPSAoaXNFeHBsb3Jlci5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgJiYgKCFkb2NNb2RlIHx8IGRvY01vZGUgPD0gNykpO1xuXG4gICAgICAvLyBOb3JtYWxpemUgcm9vdCB0byBhbHdheXMgaW5jbHVkZSBhIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoLlxuICAgICAgdGhpcy5yb290ID0gKCcvJyArIHRoaXMucm9vdCArICcvJykucmVwbGFjZShyb290U3RyaXBwZXIsICcvJyk7XG5cbiAgICAgIGlmIChvbGRJRSAmJiB0aGlzLl93YW50c0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgdmFyIGZyYW1lID0gQmFja2JvbmUuJCgnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiB0YWJpbmRleD1cIi0xXCI+Jyk7XG4gICAgICAgIHRoaXMuaWZyYW1lID0gZnJhbWUuaGlkZSgpLmFwcGVuZFRvKCdib2R5JylbMF0uY29udGVudFdpbmRvdztcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShmcmFnbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHdlJ3JlIHVzaW5nIHB1c2hTdGF0ZSBvciBoYXNoZXMsIGFuZCB3aGV0aGVyXG4gICAgICAvLyAnb25oYXNoY2hhbmdlJyBpcyBzdXBwb3J0ZWQsIGRldGVybWluZSBob3cgd2UgY2hlY2sgdGhlIFVSTCBzdGF0ZS5cbiAgICAgIGlmICh0aGlzLl9oYXNQdXNoU3RhdGUpIHtcbiAgICAgICAgQmFja2JvbmUuJCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRoaXMuY2hlY2tVcmwpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UgJiYgKCdvbmhhc2hjaGFuZ2UnIGluIHdpbmRvdykgJiYgIW9sZElFKSB7XG4gICAgICAgIEJhY2tib25lLiQod2luZG93KS5vbignaGFzaGNoYW5nZScsIHRoaXMuY2hlY2tVcmwpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tVcmxJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuY2hlY2tVcmwsIHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGJhc2UgdXJsLCBmb3IgYSBwdXNoU3RhdGUgbGlua1xuICAgICAgLy8gb3BlbmVkIGJ5IGEgbm9uLXB1c2hTdGF0ZSBicm93c2VyLlxuICAgICAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50O1xuICAgICAgdmFyIGxvYyA9IHRoaXMubG9jYXRpb247XG5cbiAgICAgIC8vIFRyYW5zaXRpb24gZnJvbSBoYXNoQ2hhbmdlIHRvIHB1c2hTdGF0ZSBvciB2aWNlIHZlcnNhIGlmIGJvdGggYXJlXG4gICAgICAvLyByZXF1ZXN0ZWQuXG4gICAgICBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlICYmIHRoaXMuX3dhbnRzUHVzaFN0YXRlKSB7XG5cbiAgICAgICAgLy8gSWYgd2UndmUgc3RhcnRlZCBvZmYgd2l0aCBhIHJvdXRlIGZyb20gYSBgcHVzaFN0YXRlYC1lbmFibGVkXG4gICAgICAgIC8vIGJyb3dzZXIsIGJ1dCB3ZSdyZSBjdXJyZW50bHkgaW4gYSBicm93c2VyIHRoYXQgZG9lc24ndCBzdXBwb3J0IGl0Li4uXG4gICAgICAgIGlmICghdGhpcy5faGFzUHVzaFN0YXRlICYmICF0aGlzLmF0Um9vdCgpKSB7XG4gICAgICAgICAgdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5sb2NhdGlvbi5yZXBsYWNlKHRoaXMucm9vdCArICcjJyArIHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBhcyBicm93c2VyIHdpbGwgZG8gcmVkaXJlY3QgdG8gbmV3IHVybFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIE9yIGlmIHdlJ3ZlIHN0YXJ0ZWQgb3V0IHdpdGggYSBoYXNoLWJhc2VkIHJvdXRlLCBidXQgd2UncmUgY3VycmVudGx5XG4gICAgICAgIC8vIGluIGEgYnJvd3NlciB3aGVyZSBpdCBjb3VsZCBiZSBgcHVzaFN0YXRlYC1iYXNlZCBpbnN0ZWFkLi4uXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzUHVzaFN0YXRlICYmIHRoaXMuYXRSb290KCkgJiYgbG9jLmhhc2gpIHtcbiAgICAgICAgICB0aGlzLmZyYWdtZW50ID0gdGhpcy5nZXRIYXNoKCkucmVwbGFjZShyb3V0ZVN0cmlwcGVyLCAnJyk7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHRoaXMucm9vdCArIHRoaXMuZnJhZ21lbnQpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2lsZW50KSByZXR1cm4gdGhpcy5sb2FkVXJsKCk7XG4gICAgfSxcblxuICAgIC8vIERpc2FibGUgQmFja2JvbmUuaGlzdG9yeSwgcGVyaGFwcyB0ZW1wb3JhcmlseS4gTm90IHVzZWZ1bCBpbiBhIHJlYWwgYXBwLFxuICAgIC8vIGJ1dCBwb3NzaWJseSB1c2VmdWwgZm9yIHVuaXQgdGVzdGluZyBSb3V0ZXJzLlxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgQmFja2JvbmUuJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLmNoZWNrVXJsKS5vZmYoJ2hhc2hjaGFuZ2UnLCB0aGlzLmNoZWNrVXJsKTtcbiAgICAgIGlmICh0aGlzLl9jaGVja1VybEludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2NoZWNrVXJsSW50ZXJ2YWwpO1xuICAgICAgSGlzdG9yeS5zdGFydGVkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIEFkZCBhIHJvdXRlIHRvIGJlIHRlc3RlZCB3aGVuIHRoZSBmcmFnbWVudCBjaGFuZ2VzLiBSb3V0ZXMgYWRkZWQgbGF0ZXJcbiAgICAvLyBtYXkgb3ZlcnJpZGUgcHJldmlvdXMgcm91dGVzLlxuICAgIHJvdXRlOiBmdW5jdGlvbihyb3V0ZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMudW5zaGlmdCh7cm91dGU6IHJvdXRlLCBjYWxsYmFjazogY2FsbGJhY2t9KTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIHRoZSBjdXJyZW50IFVSTCB0byBzZWUgaWYgaXQgaGFzIGNoYW5nZWQsIGFuZCBpZiBpdCBoYXMsXG4gICAgLy8gY2FsbHMgYGxvYWRVcmxgLCBub3JtYWxpemluZyBhY3Jvc3MgdGhlIGhpZGRlbiBpZnJhbWUuXG4gICAgY2hlY2tVcmw6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZnJhZ21lbnQgJiYgdGhpcy5pZnJhbWUpIHtcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0RnJhZ21lbnQodGhpcy5nZXRIYXNoKHRoaXMuaWZyYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHRoaXMuaWZyYW1lKSB0aGlzLm5hdmlnYXRlKGN1cnJlbnQpO1xuICAgICAgdGhpcy5sb2FkVXJsKCk7XG4gICAgfSxcblxuICAgIC8vIEF0dGVtcHQgdG8gbG9hZCB0aGUgY3VycmVudCBVUkwgZnJhZ21lbnQuIElmIGEgcm91dGUgc3VjY2VlZHMgd2l0aCBhXG4gICAgLy8gbWF0Y2gsIHJldHVybnMgYHRydWVgLiBJZiBubyBkZWZpbmVkIHJvdXRlcyBtYXRjaGVzIHRoZSBmcmFnbWVudCxcbiAgICAvLyByZXR1cm5zIGBmYWxzZWAuXG4gICAgbG9hZFVybDogZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICAgIGZyYWdtZW50ID0gdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgcmV0dXJuIF8uYW55KHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGhhbmRsZXIucm91dGUudGVzdChmcmFnbWVudCkpIHtcbiAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKGZyYWdtZW50KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIFNhdmUgYSBmcmFnbWVudCBpbnRvIHRoZSBoYXNoIGhpc3RvcnksIG9yIHJlcGxhY2UgdGhlIFVSTCBzdGF0ZSBpZiB0aGVcbiAgICAvLyAncmVwbGFjZScgb3B0aW9uIGlzIHBhc3NlZC4gWW91IGFyZSByZXNwb25zaWJsZSBmb3IgcHJvcGVybHkgVVJMLWVuY29kaW5nXG4gICAgLy8gdGhlIGZyYWdtZW50IGluIGFkdmFuY2UuXG4gICAgLy9cbiAgICAvLyBUaGUgb3B0aW9ucyBvYmplY3QgY2FuIGNvbnRhaW4gYHRyaWdnZXI6IHRydWVgIGlmIHlvdSB3aXNoIHRvIGhhdmUgdGhlXG4gICAgLy8gcm91dGUgY2FsbGJhY2sgYmUgZmlyZWQgKG5vdCB1c3VhbGx5IGRlc2lyYWJsZSksIG9yIGByZXBsYWNlOiB0cnVlYCwgaWZcbiAgICAvLyB5b3Ugd2lzaCB0byBtb2RpZnkgdGhlIGN1cnJlbnQgVVJMIHdpdGhvdXQgYWRkaW5nIGFuIGVudHJ5IHRvIHRoZSBoaXN0b3J5LlxuICAgIG5hdmlnYXRlOiBmdW5jdGlvbihmcmFnbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCFIaXN0b3J5LnN0YXJ0ZWQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghb3B0aW9ucyB8fCBvcHRpb25zID09PSB0cnVlKSBvcHRpb25zID0ge3RyaWdnZXI6ICEhb3B0aW9uc307XG5cbiAgICAgIHZhciB1cmwgPSB0aGlzLnJvb3QgKyAoZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KGZyYWdtZW50IHx8ICcnKSk7XG5cbiAgICAgIC8vIFN0cmlwIHRoZSBoYXNoIGZvciBtYXRjaGluZy5cbiAgICAgIGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZShwYXRoU3RyaXBwZXIsICcnKTtcblxuICAgICAgaWYgKHRoaXMuZnJhZ21lbnQgPT09IGZyYWdtZW50KSByZXR1cm47XG4gICAgICB0aGlzLmZyYWdtZW50ID0gZnJhZ21lbnQ7XG5cbiAgICAgIC8vIERvbid0IGluY2x1ZGUgYSB0cmFpbGluZyBzbGFzaCBvbiB0aGUgcm9vdC5cbiAgICAgIGlmIChmcmFnbWVudCA9PT0gJycgJiYgdXJsICE9PSAnLycpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cbiAgICAgIC8vIElmIHB1c2hTdGF0ZSBpcyBhdmFpbGFibGUsIHdlIHVzZSBpdCB0byBzZXQgdGhlIGZyYWdtZW50IGFzIGEgcmVhbCBVUkwuXG4gICAgICBpZiAodGhpcy5faGFzUHVzaFN0YXRlKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVtvcHRpb25zLnJlcGxhY2UgPyAncmVwbGFjZVN0YXRlJyA6ICdwdXNoU3RhdGUnXSh7fSwgZG9jdW1lbnQudGl0bGUsIHVybCk7XG5cbiAgICAgIC8vIElmIGhhc2ggY2hhbmdlcyBoYXZlbid0IGJlZW4gZXhwbGljaXRseSBkaXNhYmxlZCwgdXBkYXRlIHRoZSBoYXNoXG4gICAgICAvLyBmcmFnbWVudCB0byBzdG9yZSBoaXN0b3J5LlxuICAgICAgfSBlbHNlIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGFzaCh0aGlzLmxvY2F0aW9uLCBmcmFnbWVudCwgb3B0aW9ucy5yZXBsYWNlKTtcbiAgICAgICAgaWYgKHRoaXMuaWZyYW1lICYmIChmcmFnbWVudCAhPT0gdGhpcy5nZXRGcmFnbWVudCh0aGlzLmdldEhhc2godGhpcy5pZnJhbWUpKSkpIHtcbiAgICAgICAgICAvLyBPcGVuaW5nIGFuZCBjbG9zaW5nIHRoZSBpZnJhbWUgdHJpY2tzIElFNyBhbmQgZWFybGllciB0byBwdXNoIGFcbiAgICAgICAgICAvLyBoaXN0b3J5IGVudHJ5IG9uIGhhc2gtdGFnIGNoYW5nZS4gIFdoZW4gcmVwbGFjZSBpcyB0cnVlLCB3ZSBkb24ndFxuICAgICAgICAgIC8vIHdhbnQgdGhpcy5cbiAgICAgICAgICBpZighb3B0aW9ucy5yZXBsYWNlKSB0aGlzLmlmcmFtZS5kb2N1bWVudC5vcGVuKCkuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLl91cGRhdGVIYXNoKHRoaXMuaWZyYW1lLmxvY2F0aW9uLCBmcmFnbWVudCwgb3B0aW9ucy5yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAvLyBJZiB5b3UndmUgdG9sZCB1cyB0aGF0IHlvdSBleHBsaWNpdGx5IGRvbid0IHdhbnQgZmFsbGJhY2sgaGFzaGNoYW5nZS1cbiAgICAgIC8vIGJhc2VkIGhpc3RvcnksIHRoZW4gYG5hdmlnYXRlYCBiZWNvbWVzIGEgcGFnZSByZWZyZXNoLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYXRpb24uYXNzaWduKHVybCk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy50cmlnZ2VyKSByZXR1cm4gdGhpcy5sb2FkVXJsKGZyYWdtZW50KTtcbiAgICB9LFxuXG4gICAgLy8gVXBkYXRlIHRoZSBoYXNoIGxvY2F0aW9uLCBlaXRoZXIgcmVwbGFjaW5nIHRoZSBjdXJyZW50IGVudHJ5LCBvciBhZGRpbmdcbiAgICAvLyBhIG5ldyBvbmUgdG8gdGhlIGJyb3dzZXIgaGlzdG9yeS5cbiAgICBfdXBkYXRlSGFzaDogZnVuY3Rpb24obG9jYXRpb24sIGZyYWdtZW50LCByZXBsYWNlKSB7XG4gICAgICBpZiAocmVwbGFjZSkge1xuICAgICAgICB2YXIgaHJlZiA9IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvKGphdmFzY3JpcHQ6fCMpLiokLywgJycpO1xuICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKGhyZWYgKyAnIycgKyBmcmFnbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTb21lIGJyb3dzZXJzIHJlcXVpcmUgdGhhdCBgaGFzaGAgY29udGFpbnMgYSBsZWFkaW5nICMuXG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBmcmFnbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IEJhY2tib25lLmhpc3RvcnkuXG4gIEJhY2tib25lLmhpc3RvcnkgPSBuZXcgSGlzdG9yeTtcblxuICAvLyBIZWxwZXJzXG4gIC8vIC0tLS0tLS1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29ycmVjdGx5IHNldCB1cCB0aGUgcHJvdG90eXBlIGNoYWluLCBmb3Igc3ViY2xhc3Nlcy5cbiAgLy8gU2ltaWxhciB0byBgZ29vZy5pbmhlcml0c2AsIGJ1dCB1c2VzIGEgaGFzaCBvZiBwcm90b3R5cGUgcHJvcGVydGllcyBhbmRcbiAgLy8gY2xhc3MgcHJvcGVydGllcyB0byBiZSBleHRlbmRlZC5cbiAgdmFyIGV4dGVuZCA9IGZ1bmN0aW9uKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgdmFyIGNoaWxkO1xuXG4gICAgLy8gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuICAgIC8vICh0aGUgXCJjb25zdHJ1Y3RvclwiIHByb3BlcnR5IGluIHlvdXIgYGV4dGVuZGAgZGVmaW5pdGlvbiksIG9yIGRlZmF1bHRlZFxuICAgIC8vIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3Rvci5cbiAgICBpZiAocHJvdG9Qcm9wcyAmJiBfLmhhcyhwcm90b1Byb3BzLCAnY29uc3RydWN0b3InKSkge1xuICAgICAgY2hpbGQgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZCA9IGZ1bmN0aW9uKCl7IHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICB9XG5cbiAgICAvLyBBZGQgc3RhdGljIHByb3BlcnRpZXMgdG8gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLCBpZiBzdXBwbGllZC5cbiAgICBfLmV4dGVuZChjaGlsZCwgcGFyZW50LCBzdGF0aWNQcm9wcyk7XG5cbiAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBjaGFpbiB0byBpbmhlcml0IGZyb20gYHBhcmVudGAsIHdpdGhvdXQgY2FsbGluZ1xuICAgIC8vIGBwYXJlbnRgJ3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgdmFyIFN1cnJvZ2F0ZSA9IGZ1bmN0aW9uKCl7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfTtcbiAgICBTdXJyb2dhdGUucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgU3Vycm9nYXRlO1xuXG4gICAgLy8gQWRkIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChpbnN0YW5jZSBwcm9wZXJ0aWVzKSB0byB0aGUgc3ViY2xhc3MsXG4gICAgLy8gaWYgc3VwcGxpZWQuXG4gICAgaWYgKHByb3RvUHJvcHMpIF8uZXh0ZW5kKGNoaWxkLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG5cbiAgICAvLyBTZXQgYSBjb252ZW5pZW5jZSBwcm9wZXJ0eSBpbiBjYXNlIHRoZSBwYXJlbnQncyBwcm90b3R5cGUgaXMgbmVlZGVkXG4gICAgLy8gbGF0ZXIuXG4gICAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcblxuICAgIHJldHVybiBjaGlsZDtcbiAgfTtcblxuICAvLyBTZXQgdXAgaW5oZXJpdGFuY2UgZm9yIHRoZSBtb2RlbCwgY29sbGVjdGlvbiwgcm91dGVyLCB2aWV3IGFuZCBoaXN0b3J5LlxuICBNb2RlbC5leHRlbmQgPSBDb2xsZWN0aW9uLmV4dGVuZCA9IFJvdXRlci5leHRlbmQgPSBWaWV3LmV4dGVuZCA9IEhpc3RvcnkuZXh0ZW5kID0gZXh0ZW5kO1xuXG4gIC8vIFRocm93IGFuIGVycm9yIHdoZW4gYSBVUkwgaXMgbmVlZGVkLCBhbmQgbm9uZSBpcyBzdXBwbGllZC5cbiAgdmFyIHVybEVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIFwidXJsXCIgcHJvcGVydHkgb3IgZnVuY3Rpb24gbXVzdCBiZSBzcGVjaWZpZWQnKTtcbiAgfTtcblxuICAvLyBXcmFwIGFuIG9wdGlvbmFsIGVycm9yIGNhbGxiYWNrIHdpdGggYSBmYWxsYmFjayBlcnJvciBldmVudC5cbiAgdmFyIHdyYXBFcnJvciA9IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIGVycm9yID0gb3B0aW9ucy5lcnJvcjtcbiAgICBvcHRpb25zLmVycm9yID0gZnVuY3Rpb24ocmVzcCkge1xuICAgICAgaWYgKGVycm9yKSBlcnJvcihtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICBtb2RlbC50cmlnZ2VyKCdlcnJvcicsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBCYWNrYm9uZTtcblxufSkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaW1wb3J0ID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL2Jhc2UnKTtcblxudmFyIGJhc2UgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW1wb3J0KTtcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcblxudmFyIF9TYWZlU3RyaW5nID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJyk7XG5cbnZhciBfU2FmZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfU2FmZVN0cmluZyk7XG5cbnZhciBfRXhjZXB0aW9uID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbicpO1xuXG52YXIgX0V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfRXhjZXB0aW9uKTtcblxudmFyIF9pbXBvcnQyID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL3V0aWxzJyk7XG5cbnZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbXBvcnQyKTtcblxudmFyIF9pbXBvcnQzID0gcmVxdWlyZSgnLi9oYW5kbGViYXJzL3J1bnRpbWUnKTtcblxudmFyIHJ1bnRpbWUgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW1wb3J0Myk7XG5cbnZhciBfbm9Db25mbGljdCA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCcpO1xuXG52YXIgX25vQ29uZmxpY3QyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX25vQ29uZmxpY3QpO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IF9TYWZlU3RyaW5nMlsnZGVmYXVsdCddO1xuICBoYi5FeGNlcHRpb24gPSBfRXhjZXB0aW9uMlsnZGVmYXVsdCddO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24gKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG52YXIgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbl9ub0NvbmZsaWN0MlsnZGVmYXVsdCddKGluc3QpO1xuXG5pbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBpbnN0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkhhbmRsZWJhcnNFbnZpcm9ubWVudCA9IEhhbmRsZWJhcnNFbnZpcm9ubWVudDtcbmV4cG9ydHMuY3JlYXRlRnJhbWUgPSBjcmVhdGVGcmFtZTtcblxudmFyIF9pbXBvcnQgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbXBvcnQpO1xuXG52YXIgX0V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyk7XG5cbnZhciBfRXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9FeGNlcHRpb24pO1xuXG52YXIgVkVSU0lPTiA9ICczLjAuMSc7XG5leHBvcnRzLlZFUlNJT04gPSBWRVJTSU9OO1xudmFyIENPTVBJTEVSX1JFVklTSU9OID0gNjtcblxuZXhwb3J0cy5DT01QSUxFUl9SRVZJU0lPTiA9IENPTVBJTEVSX1JFVklTSU9OO1xudmFyIFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnXG59O1xuXG5leHBvcnRzLlJFVklTSU9OX0NIQU5HRVMgPSBSRVZJU0lPTl9DSEFOR0VTO1xudmFyIGlzQXJyYXkgPSBVdGlscy5pc0FycmF5LFxuICAgIGlzRnVuY3Rpb24gPSBVdGlscy5pc0Z1bmN0aW9uLFxuICAgIHRvU3RyaW5nID0gVXRpbHMudG9TdHJpbmcsXG4gICAgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5mdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbiByZWdpc3RlckhlbHBlcihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgdGhyb3cgbmV3IF9FeGNlcHRpb24yWydkZWZhdWx0J10oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpO1xuICAgICAgfVxuICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24gdW5yZWdpc3RlckhlbHBlcihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uIHJlZ2lzdGVyUGFydGlhbChuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIFV0aWxzLmV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgX0V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgYXMgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbiB1bnJlZ2lzdGVyUGFydGlhbChuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3R1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0geyBkYXRhOiBkYXRhIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICB9XG5cbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuLFxuICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmV0ID0gJycsXG4gICAgICAgIGRhdGEgPSB1bmRlZmluZWQsXG4gICAgICAgIGNvbnRleHRQYXRoID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgY29udGV4dFBhdGggPSBVdGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkge1xuICAgICAgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjSXRlcmF0aW9uKGZpZWxkLCBpbmRleCwgbGFzdCkge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5rZXkgPSBmaWVsZDtcbiAgICAgICAgZGF0YS5pbmRleCA9IGluZGV4O1xuICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgIGRhdGEubGFzdCA9ICEhbGFzdDtcblxuICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogVXRpbHMuYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJpb3JLZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkpIHtcbiAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJpb3JLZXkgPSBrZXk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcktleSkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uIChjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkge1xuICAgICAgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsIHx8IFV0aWxzLmlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbiAoY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7IGZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaCB9KTtcbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7XG4gICAgICBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIVV0aWxzLmlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICAgIG9wdGlvbnMgPSB7IGRhdGE6IGRhdGEgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbiAob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cbnZhciBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogeyAwOiAnZGVidWcnLCAxOiAnaW5mbycsIDI6ICd3YXJuJywgMzogJ2Vycm9yJyB9LFxuXG4gIC8vIFN0YXRlIGVudW1cbiAgREVCVUc6IDAsXG4gIElORk86IDEsXG4gIFdBUk46IDIsXG4gIEVSUk9SOiAzLFxuICBsZXZlbDogMSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uIGxvZyhsZXZlbCwgbWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxldmVsIDw9IGxldmVsKSB7XG4gICAgICB2YXIgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICAoY29uc29sZVttZXRob2RdIHx8IGNvbnNvbGUubG9nKS5jYWxsKGNvbnNvbGUsIG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHMubG9nZ2VyID0gbG9nZ2VyO1xudmFyIGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydHMubG9nID0gbG9nO1xuXG5mdW5jdGlvbiBjcmVhdGVGcmFtZShvYmplY3QpIHtcbiAgdmFyIGZyYW1lID0gVXRpbHMuZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59XG5cbi8qIFthcmdzLCBdb3B0aW9ucyAqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICB2YXIgbG9jID0gbm9kZSAmJiBub2RlLmxvYyxcbiAgICAgIGxpbmUgPSB1bmRlZmluZWQsXG4gICAgICBjb2x1bW4gPSB1bmRlZmluZWQ7XG4gIGlmIChsb2MpIHtcbiAgICBsaW5lID0gbG9jLnN0YXJ0LmxpbmU7XG4gICAgY29sdW1uID0gbG9jLnN0YXJ0LmNvbHVtbjtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgY29sdW1uO1xuICB9XG5cbiAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEV4Y2VwdGlvbik7XG4gIH1cblxuICBpZiAobG9jKSB7XG4gICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEV4Y2VwdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbi8qZ2xvYmFsIHdpbmRvdyAqL1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICB2YXIgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocm9vdC5IYW5kbGViYXJzID09PSBIYW5kbGViYXJzKSB7XG4gICAgICByb290LkhhbmRsZWJhcnMgPSAkSGFuZGxlYmFycztcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uO1xuXG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBsaW5lIGFuZCBicmVhayB1cCBjb21waWxlUGFydGlhbFxuXG5leHBvcnRzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG5leHBvcnRzLndyYXBQcm9ncmFtID0gd3JhcFByb2dyYW07XG5leHBvcnRzLnJlc29sdmVQYXJ0aWFsID0gcmVzb2x2ZVBhcnRpYWw7XG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO1xuZXhwb3J0cy5ub29wID0gbm9vcDtcblxudmFyIF9pbXBvcnQgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbXBvcnQpO1xuXG52YXIgX0V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyk7XG5cbnZhciBfRXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9FeGNlcHRpb24pO1xuXG52YXIgX0NPTVBJTEVSX1JFVklTSU9OJFJFVklTSU9OX0NIQU5HRVMkY3JlYXRlRnJhbWUgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxuZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICBjdXJyZW50UmV2aXNpb24gPSBfQ09NUElMRVJfUkVWSVNJT04kUkVWSVNJT05fQ0hBTkdFUyRjcmVhdGVGcmFtZS5DT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBfQ09NUElMRVJfUkVWSVNJT04kUkVWSVNJT05fQ0hBTkdFUyRjcmVhdGVGcmFtZS5SRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IF9DT01QSUxFUl9SRVZJU0lPTiRSRVZJU0lPTl9DSEFOR0VTJGNyZWF0ZUZyYW1lLlJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgX0V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgKyAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IF9FeGNlcHRpb24yWydkZWZhdWx0J10oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IF9FeGNlcHRpb24yWydkZWZhdWx0J10oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICB2YXIgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24gc3RyaWN0KG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24gbG9va3VwKGRlcHRocywgbmFtZSkge1xuICAgICAgdmFyIGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uIGxhbWJkYShjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uIGZuKGkpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbiBwcm9ncmFtKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIHZhciBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEodmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24gbWVyZ2UocGFyYW0sIGNvbW1vbikge1xuICAgICAgdmFyIG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiBwYXJhbSAhPT0gY29tbW9uKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgdmFyIGRlcHRocyA9IHVuZGVmaW5lZCxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgZGVwdGhzID0gb3B0aW9ucy5kZXB0aHMgPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IFtjb250ZXh0XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGVtcGxhdGVTcGVjLm1haW4uY2FsbChjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uIChpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBfRXhjZXB0aW9uMlsnZGVmYXVsdCddKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgcmV0dXJuIGZuLmNhbGwoY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBvcHRpb25zLmRhdGEgfHwgZGF0YSwgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksIGRlcHRocyAmJiBbY29udGV4dF0uY29uY2F0KGRlcHRocykpO1xuICB9XG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5mdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IF9FeGNlcHRpb24yWydkZWZhdWx0J10oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IF9DT01QSUxFUl9SRVZJU0lPTiRSRVZJU0lPTl9DSEFOR0VTJGNyZWF0ZUZyYW1lLmNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJycgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNhZmVTdHJpbmc7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmV4dGVuZCA9IGV4dGVuZDtcblxuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG5leHBvcnRzLmVzY2FwZUV4cHJlc3Npb24gPSBlc2NhcGVFeHByZXNzaW9uO1xuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtcbmV4cG9ydHMuYmxvY2tQYXJhbXMgPSBibG9ja1BhcmFtcztcbmV4cG9ydHMuYXBwZW5kQ29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aDtcbnZhciBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgJ1xcJyc6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnXG59O1xuXG52YXIgYmFkQ2hhcnMgPSAvWyY8PlwiJ2BdL2csXG4gICAgcG9zc2libGUgPSAvWyY8PlwiJ2BdLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqIC8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4vLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG4vKmVzbGludC1kaXNhYmxlIGZ1bmMtc3R5bGUsIG5vLXZhciAqL1xudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBleHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbnZhciBpc0Z1bmN0aW9uO1xuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qZXNsaW50LWVuYWJsZSBmdW5jLXN0eWxlLCBuby12YXIgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtleHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVFeHByZXNzaW9uKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyAmJiBzdHJpbmcudG9IVE1MKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnRvSFRNTCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZztcbiAgfVxuXG4gIGlmICghcG9zc2libGUudGVzdChzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn0iLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcbiIsIi8qKlxuICogU2luY2Ugd2UgbWFrZSByZW5kciBmaWxlcyBBTUQgZnJpZW5kbHkgb24gYXBwIHNldHVwIHN0YWdlXG4gKiB3ZSBuZWVkIHRvIHByZXRlbmQgdGhhdCB0aGlzIGNvZGUgaXMgcHVyZSBjb21tb25qc1xuICogbWVhbnMgbm8gQU1ELXN0eWxlIHJlcXVpcmUgY2FsbHNcbiAqL1xudmFyIHJlcXVpcmVBTUQgPSByZXF1aXJlO1xuXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcbiAgICBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyksXG4gICAgYXN5bmMgPSByZXF1aXJlKCdhc3luYycpLFxuICAgIGlzU2VydmVyID0gKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSxcbiAgICBCYXNlVmlldztcblxuaWYgKCFpc1NlcnZlcikge1xuICBCYWNrYm9uZS4kID0gd2luZG93LiQgfHwgcmVxdWlyZSgnanF1ZXJ5Jyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gIGNvbnN0cnVjdG9yOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gXy5leHRlbmQoIHRoaXMub3B0aW9ucyB8fCB7fSwgb3B0aW9ucyB8fCB7fSApO1xuXG4gICAgdGhpcy5wYXJzZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8IHRoaXMuYXBwLm1vZGVsVXRpbHMudW5kZXJzY29yaXplKHRoaXMuY29uc3RydWN0b3IuaWQgfHwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcblxuICAgIC8vIHBhcnNlT3B0aW9ucyBkZWFscyB3LyBtb2RlbHMgYW5kIGNvbGxlY3Rpb25zLCBidXQgdGhlIEJhc2VWaWV3IHdpbGwgb3ZlcnJpZGUgdGhvc2UgY2hhbmdlc1xuICAgIEJhY2tib25lLlZpZXcuY2FsbCh0aGlzLCBfLm9taXQob3B0aW9ucywgWydtb2RlbCcsICdjb2xsZWN0aW9uJ10pKTtcblxuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgfSxcblxuICBwYXJzZU9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSBgdGhpcy5vcHRpb25zYCBhbmQgYWxpYXMgYXMgYG9wdGlvbnNgLlxuICAgICAqL1xuICAgIHZhciBvYmo7XG4gICAgb3B0aW9ucyA9IF8uZXh0ZW5kKHRoaXMub3B0aW9ucywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICBpZiAob3B0aW9ucy5hcHAgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHAgPSB0aGlzLm9wdGlvbnMuYXBwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmFwcCBleHBlY3RlZCB3aGVuIGluaXRpYWxpemluZyBhIG5ldyB2aWV3XCIpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhcmVudFZpZXcgPSBvcHRpb25zLnBhcmVudFZpZXc7XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IEJhc2VWaWV3LnBhcnNlTW9kZWxBbmRDb2xsZWN0aW9uKHRoaXMuYXBwLm1vZGVsVXRpbHMsIF8uZXh0ZW5kKHsgcGFyc2U6IHRydWUgfSwgb3B0aW9ucykpO1xuICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMuY29sbGVjdGlvbjtcbiAgfSxcblxuICAvKipcbiAgICogS2V5IGZvciB0aGUgdGVtcGxhdGVcbiAgICovXG4gIG5hbWU6IG51bGwsXG5cbiAgLyoqXG4gICAqIFBhcmVudCBvZiB0aGUgY3VycmVudCB2aWV3LlxuICAgKiBXZSBtYWtlIHN1cmUgdG8gc3RpY2sgdGhpcyBvbiB0aGUgcHJvdG90eXBlIGFzIGEgcnVudGltZSBvcHRpbWl6YXRpb25cbiAgICogZm9yIFY4LiBJdCdzIGJlc3Qgbm90IHRvIGFkZCBwcm9wZXJ0aWVzIHRvIHRoZSBpbnN0YW5jZSBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIHBhcmVudFZpZXc6IG51bGwsXG5cbiAgLyoqXG4gICAqIENoaWxkcmVuIG9mIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqL1xuICBjaGlsZFZpZXdzOiBudWxsLFxuXG4gIC8qKlxuICAgKiBGbGFnIHdoZXRoZXIgb3Igbm90IHRoZSB2aWV3IGlzIGN1cnJlbnRseSBiZWluZyB2aWV3ZWRcbiAgICovXG4gIHZpZXdpbmc6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIGNoaWxkIHZpZXdzIGJ5IHRoZWlyIG5hbWVcbiAgICogRW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQgd2hlbiBubyBtYXRjaCBpcyBmb3VuZFxuICAgKi9cbiAgZ2V0Q2hpbGRWaWV3c0J5TmFtZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBfLndoZXJlKHRoaXMuY2hpbGRWaWV3cywge25hbWU6IG5hbWV9KTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGRhdGEgZm9yIHRlbXBsYXRlLiAgVGhpcyBhbHNvIGFjdHMgYXMgYSB2aWV3LW1vZGVsLlxuICAgKiBUcnkgdG8gcmV0dXJuIHByb3BlciBkYXRhIGlmIG1vZGVsIG9yIGNvbGxlY3Rpb24gaXMgYXZhaWxhYmxlLlxuICAgKi9cbiAgZ2V0VGVtcGxhdGVEYXRhOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmV0VmFsLCBwYXJzZWRPcHRpb25zO1xuXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHJldFZhbCA9IHRoaXMubW9kZWwudG9KU09OKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgIHJldFZhbCA9IHtcbiAgICAgICAgbW9kZWxzOiB0aGlzLmNvbGxlY3Rpb24udG9KU09OKCksXG4gICAgICAgIG1ldGE6IHRoaXMuY29sbGVjdGlvbi5tZXRhLFxuICAgICAgICBwYXJhbXM6IHRoaXMuY29sbGVjdGlvbi5wYXJhbXNcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIG9wdGlvbnMgdGhhdCBhcmUgZHVwbGljYXRlcyBpbiB0aGUgdGVtcGxhdGVzXG4gICAgcGFyc2VkT3B0aW9ucyA9IF8ub21pdCh0aGlzLm9wdGlvbnMsIFsnbW9kZWwnLCAnY29sbGVjdGlvbicsICdhcHAnXSk7XG4gICAgcmV0dXJuIF8uZXh0ZW5kKHt9LCByZXRWYWwsIHBhcnNlZE9wdGlvbnMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBZGQgc3BlY2lhbCBwcm9wZXJ0aWVzIGBfYXBwYCBhbmQgYF9tb2RlbGAgb3IgYF9jb2xsZWN0aW9uYCB0byBwYXNzIHRvXG4gICAqIHRoZSB0ZW1wbGF0ZXMuXG4gICAqL1xuICBkZWNvcmF0ZVRlbXBsYXRlRGF0YTogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICh0aGlzLmFwcCkge1xuICAgICAgZGF0YS5fYXBwID0gdGhpcy5hcHA7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICBkYXRhLl9tb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgIGRhdGEuX2NvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb247XG4gICAgfVxuICAgIGRhdGEuX3ZpZXcgPSB0aGlzO1xuICAgIHJldHVybiBkYXRhO1xuICB9LFxuXG4gIGdldFRlbXBsYXRlTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50ZW1wbGF0ZV9uYW1lIHx8IHRoaXMubmFtZTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRlbXBsYXRlIGZ1bmN0aW9uXG4gICAqL1xuICBnZXRUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwLnRlbXBsYXRlQWRhcHRlci5nZXRUZW1wbGF0ZSh0aGlzLmdldFRlbXBsYXRlTmFtZSgpKTtcbiAgfSxcblxuICAvKipcbiAgICogQW55IG9wdGlvbnMgbm90IHRvIGNyZWF0ZSBkYXRhLWF0dHJpYnV0ZXMgZm9yLlxuICAgKi9cbiAgbm9uQXR0cmlidXRlT3B0aW9uczogWydpZCcsICdjbGFzc05hbWUnLCAndGFnTmFtZSddLFxuXG4gIC8qKlxuICAgKiBHZXQgSFRNTCBhdHRyaWJ1dGVzIHRvIGFkZCB0byBlbC5cbiAgICovXG4gIGdldEF0dHJpYnV0ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRyaWJ1dGVzID0ge30sXG4gICAgICAgIGZldGNoU3VtbWFyeSA9IHt9LFxuICAgICAgICBtb2RlbFV0aWxzID0gdGhpcy5hcHAubW9kZWxVdGlscyxcbiAgICAgICAgbm9uQXR0cmlidXRlT3B0aW9ucyA9IHRoaXMubm9uQXR0cmlidXRlT3B0aW9ucztcblxuICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIF8uZXh0ZW5kKGF0dHJpYnV0ZXMsIF8ucmVzdWx0KHRoaXMsICdhdHRyaWJ1dGVzJykpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgYXR0cmlidXRlcy5pZCA9IF8ucmVzdWx0KHRoaXMsIFwiaWRcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLmNsYXNzTmFtZSkge1xuICAgICAgYXR0cmlidXRlc1snY2xhc3MnXSA9IF8ucmVzdWx0KHRoaXMsIFwiY2xhc3NOYW1lXCIpO1xuICAgIH1cblxuICAgIC8vIEFkZCBgZGF0YS12aWV3YCBhdHRyaWJ1dGUgd2l0aCB2aWV3IGtleS5cbiAgICAvLyBGb3Igbm93LCB2aWV3IGtleSBpcyBzYW1lIGFzIHRlbXBsYXRlLlxuICAgIGF0dHJpYnV0ZXNbJ2RhdGEtdmlldyddID0gdGhpcy5uYW1lO1xuXG4gICAgLy8gQWRkIG1vZGVsICYgY29sbGVjdGlvbiBtZXRhIGRhdGEgZnJvbSBvcHRpb25zLFxuICAgIC8vIGFzIHdlbGwgYXMgYW55IG5vbi1vYmplY3Qgb3B0aW9uIHZhbHVlcy5cbiAgICBfLmVhY2godGhpcy5vcHRpb25zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHZhbHVlKSAmJiAhXy5pbmNsdWRlKG5vbkF0dHJpYnV0ZU9wdGlvbnMsIGtleSkpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW1wiZGF0YS1cIiArIGtleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZldGNoU3VtbWFyeSA9IEJhc2VWaWV3LmV4dHJhY3RGZXRjaFN1bW1hcnkobW9kZWxVdGlscywgdGhpcy5vcHRpb25zKTtcblxuICAgIGlmICghXy5pc0VtcHR5KGZldGNoU3VtbWFyeSkpIHtcbiAgICAgIGF0dHJpYnV0ZXNbJ2RhdGEtZmV0Y2hfc3VtbWFyeSddID0gSlNPTi5zdHJpbmdpZnkoZmV0Y2hTdW1tYXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFR1cm4gdGVtcGxhdGUgaW50byBIVE1MLCBtaW51cyB0aGUgd3JhcHBlciBlbGVtZW50LlxuICAgKi9cbiAgZ2V0SW5uZXJIdG1sOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKCksXG4gICAgICAgIGRhdGE7XG5cbiAgICB0aGlzLl9wcmVSZW5kZXIoKTtcbiAgICBkYXRhID0gdGhpcy5nZXRUZW1wbGF0ZURhdGEoKTtcbiAgICBkYXRhID0gdGhpcy5kZWNvcmF0ZVRlbXBsYXRlRGF0YShkYXRhKTtcbiAgICBpZiAodGVtcGxhdGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMubmFtZSArIFwiOiB0ZW1wbGF0ZSBcXFwiXCIgKyB0aGlzLmdldFRlbXBsYXRlTmFtZSgpICsgXCJcXFwiIG5vdCBmb3VuZC5cIik7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZShkYXRhKTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBIVE1MIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHRoZSB3cmFwcGVyIGVsZW1lbnQuXG4gICAqL1xuICBnZXRIdG1sOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaHRtbCA9IHRoaXMuZ2V0SW5uZXJIdG1sKCksXG4gICAgICAgIGF0dHJpYnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZXMoKSxcbiAgICAgICAgdGFnTmFtZSA9IF8ucmVzdWx0KHRoaXMsIFwidGFnTmFtZVwiKSxcbiAgICAgICAgYXR0clN0cmluZztcblxuICAgIGF0dHJTdHJpbmcgPSBfLmluamVjdChhdHRyaWJ1dGVzLCBmdW5jdGlvbihtZW1vLCB2YWx1ZSwga2V5KSB7XG4gICAgICByZXR1cm4gbWVtbyArPSBcIiBcIiArIGtleSArIFwiPVxcXCJcIiArIF8uZXNjYXBlKHZhbHVlKSArIFwiXFxcIlwiO1xuICAgIH0sICcnKTtcblxuICAgIHJldHVybiBcIjxcIiArIHRhZ05hbWUgKyBhdHRyU3RyaW5nICsgXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdGFnTmFtZSArIFwiPlwiO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGh0bWwgPSB0aGlzLmdldElubmVySHRtbCgpO1xuICAgIHRoaXMuJGVsLmh0bWwoaHRtbCk7XG5cbiAgICAvLyBCZWNhdXNlIHdlIG9ubHkgc2V0IHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBvdXRlciBlbGVtZW50XG4gICAgLy8gd2hlbiBjYWxsaW5nIGdldEh0bWwoKSAoc2VydmVyKSwgbGV0J3MgbWFrZSBzdXJlIGl0IGFsc29cbiAgICAvLyBoYXBwZW5zIGR1cmluZyByZW5kZXIoKSAoY2xpZW50KS5cblxuICAgIHRoaXMuJGVsLmF0dHIodGhpcy5nZXRBdHRyaWJ1dGVzKCkpO1xuICAgIHRoaXMuX3Bvc3RSZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogSWYgcmVuZGVyZWQgb24gdGhlIGNsaWVudCBtaXNzaW5nIGl0cyBkYXRhLFxuICAgKiBmZXRjaCBpdCBiYXNlZCBvbiB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4uXG4gICAqL1xuICBmZXRjaExhenk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbXMgPSB7fSxcbiAgICAgICAgZmV0Y2hTcGVjO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mZXRjaF9wYXJhbXMpIHtcbiAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLm9wdGlvbnMuZmV0Y2hfcGFyYW1zKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZldGNoX3BhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBmb3IgbGF6eSBsb2FkZWQgdmlld3MnKVxuICAgICAgfVxuXG4gICAgICBwYXJhbXMgPSB0aGlzLm9wdGlvbnMuZmV0Y2hfcGFyYW1zO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBhcmFtX25hbWUpIHtcbiAgICAgIHBhcmFtc1t0aGlzLm9wdGlvbnMucGFyYW1fbmFtZV0gPSB0aGlzLm9wdGlvbnMucGFyYW1fdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb2RlbF9pZCAhPSBudWxsKSB7XG4gICAgICBwYXJhbXMuaWQgPSB0aGlzLm9wdGlvbnMubW9kZWxfaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb2RlbF9uYW1lICE9IG51bGwpIHtcbiAgICAgIGZldGNoU3BlYyA9IHtcbiAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICBtb2RlbDogdGhpcy5vcHRpb25zLm1vZGVsX25hbWUsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb2xsZWN0aW9uX25hbWUgIT0gbnVsbCkge1xuICAgICAgZmV0Y2hTcGVjID0ge1xuICAgICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5vcHRpb25zLmNvbGxlY3Rpb25fbmFtZSxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc2V0TG9hZGluZyh0cnVlKTtcblxuICAgIHRoaXMuX3ByZVJlbmRlcigpO1xuICAgIHRoaXMuYXBwLmZldGNoKGZldGNoU3BlYywgdGhpcy5fZmV0Y2hMYXp5Q2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgX2ZldGNoTGF6eUNhbGxiYWNrOiBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICB0aGlzLnNldExvYWRpbmcoZmFsc2UpO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRkVUQ0ggRVJSOiBcIiArIGVycik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdpbmcpIHtcbiAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBieSB0aGUgdGltZSB0aGUgWEhSIHJldHVybnMsIHRoZSB1c2VyIGhhcyBuYXZpZ2F0ZWRcbiAgICAgIC8vIGF3YXkgdG8gYSBuZXcgcGFnZSwgY2hlY2sgZm9yIHdoZXRoZXIgd2UgYXJlIHZpZXdpbmcgZmlyc3RcbiAgICAgIHRoaXMucGFyc2VPcHRpb25zKHJlc3VsdHMpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFueXRoaW5nIHRvIGRvIGJlZm9yZSByZW5kZXJpbmcgb24gdGhlIGNsaWVudCBvciBzZXJ2ZXIuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciBpLmUuIGFjY2Vzc2luZyBAbW9kZWwgaW4gdGhlIGNsaWVudCBhZnRlclxuICAgKiBAaHlkcmF0ZSgpIGlzIGNhbGxlZCwgYnV0IGJlZm9yZSBAZ2V0VGVtcGxhdGVEYXRhKCkgaXMgY2FsbGVkLlxuICAgKi9cbiAgX3ByZVJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcmVSZW5kZXIoKTtcbiAgICB0aGlzLnRyaWdnZXIoJ3ByZVJlbmRlcicpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBbnl0aGluZyB0byBkbyBhZnRlciByZW5kZXJpbmcgb24gdGhlIGNsaWVudCwgc3VjaCBpbml0aWFsaXppbmcgalF1ZXJ5XG4gICAqIHBsdWdpbnMgbGlrZSBzbGlkZXJzLCBzbGlkZXNob3dzLCBldGMuXG4gICAqL1xuICBfcG9zdFJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hdHRhY2hDaGlsZFZpZXdzKCk7XG4gICAgdGhpcy5wb3N0UmVuZGVyKCk7XG4gICAgdGhpcy50cmlnZ2VyKCdwb3N0UmVuZGVyJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRvIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlcy5cbiAgICovXG4gIHByZVJlbmRlcjogXy5ub29wLFxuXG4gIC8qKlxuICAgKiBUbyBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMuXG4gICAqL1xuICBwb3N0UmVuZGVyOiBfLm5vb3AsXG5cbiAgc2V0TG9hZGluZzogZnVuY3Rpb24obG9hZGluZykge1xuICAgIHRoaXMuJGVsLnRvZ2dsZUNsYXNzKCdsb2FkaW5nJywgbG9hZGluZyk7XG4gICAgdGhpcy50cmlnZ2VyKCdsb2FkaW5nJywgbG9hZGluZyk7XG4gIH0sXG5cbiAgYXR0YWNoT3JSZW5kZXI6IGZ1bmN0aW9uKGVsZW1lbnQsIHBhcmVudFZpZXcpIHtcbiAgICB2YXIgJGVsID0gQmFja2JvbmUuJChlbGVtZW50KTtcblxuICAgIHRoaXMucGFyZW50VmlldyA9IHBhcmVudFZpZXc7XG4gICAgdGhpcy52aWV3aW5nID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF6eSA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29sbGVjdGlvbiA9PSBudWxsICYmIHRoaXMub3B0aW9ucy5tb2RlbCA9PSBudWxsKSB7XG4gICAgICAkZWwuYXR0cignZGF0YS12aWV3LWF0dGFjaGVkJywgdHJ1ZSk7XG4gICAgICB0aGlzLnNldEVsZW1lbnQoJGVsKTtcblxuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hMYXp5KCk7XG4gICAgfVxuXG4gICAgaWYgKCRlbC5kYXRhKCdyZW5kZXInKSkge1xuICAgICAgJGVsLnJlcGxhY2VXaXRoKHRoaXMuJGVsKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbC5hdHRyKCdkYXRhLXZpZXctYXR0YWNoZWQnLCB0cnVlKTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudCgkZWwpO1xuICAgICAgdGhpcy5hdHRhY2goKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFdoZW4gSFRNTCBpcyBhbHJlYWR5IHByZXNlbnQgKHJlbmRlcmVkIGJ5IHNlcnZlciksXG4gICAqIHRoaXMgaXMgd2hhdCBnZXRzIGNhbGxlZCB0byBiaW5kIHRvIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgYXR0YWNoOiBmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAgKiBDYWxsIHByZVJlbmRlcigpIHNvIHdlIGNhbiBhY2Nlc3MgdGhpbmdzIHNldHVwIGJ5IEBoeWRyYXRlKClcbiAgICAgKiAobGlrZSBAbW9kZWwpIGluIGkuZS4gQGdldFRlbXBsYXRlRGF0YSgpLlxuICAgICAqL1xuICAgIHRoaXMuX3ByZVJlbmRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2UgaGF2ZSB0byBjYWxsIHBvc3RSZW5kZXIoKSBzbyBjbGllbnQtb25seSB0aGluZ3MgaGFwcGVuLFxuICAgICAqIGkuZS4gaW5pdGlhbGl6ZSBzbGlkZXNob3dzLCBldGMuXG4gICAgICovXG4gICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuXG4gICAgdGhpcy50cmlnZ2VyKCdhdHRhY2gnKTtcbiAgfSxcblxuICAvKipcbiAgICogSGFwcGVucyBjbGllbnQtc2lkZS5cbiAgICogRmluZCBhbGwgb2Ygc3ViIHZpZXcgRE9NIGVsZW1lbnRzXG4gICAqIEdldCB0aGUgdmlldyBrZXlcbiAgICogQ2FsbCB0aGlzLmdldFZpZXcoKVxuICAgKiBBdHRhY2ggY2hpbGRWaWV3XG4gICAqL1xuICBhdHRhY2hDaGlsZFZpZXdzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgX2Jhc2VWaWV3ID0gdGhpcztcblxuICAgIC8vIFJlbW92ZSBhbGwgY2hpbGQgdmlld3MgaW4gY2FzZSB3ZSBhcmUgcmUtcmVuZGVyaW5nIHRocm91Z2hcbiAgICAvLyBtYW51YWwgLnJlbmRlcigpIG9yICdyZWZyZXNoJyBiZWluZyB0cmlnZ2VyZWQgb24gdGhlIHZpZXcuXG4gICAgdGhpcy5yZW1vdmVDaGlsZFZpZXdzKCk7XG4gICAgQmFzZVZpZXcuZ2V0Q2hpbGRWaWV3cyh0aGlzLmFwcCwgdGhpcywgZnVuY3Rpb24odmlld3MpIHtcbiAgICAgIF9iYXNlVmlldy5jaGlsZFZpZXdzID0gdmlld3M7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlQ2hpbGRWaWV3czogZnVuY3Rpb24oKSB7XG4gICAgKHRoaXMuY2hpbGRWaWV3cyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbih2aWV3KSB7XG4gICAgICB2aWV3LnJlbW92ZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVtb3ZlIHJlZmVyZW5jZSB0byB0aGlzIHZpZXcgZnJvbSBpdHMgcGFyZW50Vmlld1xuICAgIGlmICh0aGlzLnBhcmVudFZpZXcgJiYgdGhpcy5wYXJlbnRWaWV3LmNoaWxkVmlld3MpIHtcbiAgICAgIHRoaXMucGFyZW50Vmlldy5jaGlsZFZpZXdzID0gXy53aXRob3V0KHRoaXMucGFyZW50Vmlldy5jaGlsZFZpZXdzLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNoaWxkVmlld3MoKTtcbiAgICB0aGlzLmNoaWxkVmlld3MgPSBudWxsO1xuICAgIHRoaXMucGFyZW50VmlldyA9IG51bGw7XG4gICAgdGhpcy52aWV3aW5nID0gZmFsc2U7XG5cbiAgICB2YXIgb2JqID0gdGhpcy5tb2RlbCB8fCB0aGlzLmNvbGxlY3Rpb247XG5cbiAgICBpZiAob2JqKSB7XG4gICAgICBvYmoub2ZmKG51bGwsIG51bGwsIHRoaXMpO1xuICAgIH1cbiAgICBCYXNlVmlldy5fX3N1cGVyX18ucmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50cmlnZ2VyKCdyZW1vdmUnKTtcbiAgfVxufSk7XG5cbi8qKlxuICogQ2xhc3MgbWV0aG9kc1xuICogLS0tLS0tLS0tLS0tLVxuICovXG5cbkJhc2VWaWV3LmdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgZW50cnlQYXRoLCBjYWxsYmFjaykge1xuICB2YXIgdmlld1BhdGg7XG5cbiAgaWYgKCFlbnRyeVBhdGgpIGVudHJ5UGF0aCA9ICcnO1xuXG4gIHZpZXdQYXRoID0gZW50cnlQYXRoICsgXCJhcHAvdmlld3MvXCIgKyB2aWV3TmFtZTtcbiAgLy8gY2hlY2sgZm9yIEFNRCBlbnZpcm9ubWVudFxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBPbmx5IHVzZWQgaW4gQU1EIGVudmlyb25tZW50XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlcXVpcmVBTUQoW3ZpZXdQYXRoXSwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhyZXF1aXJlKHZpZXdQYXRoKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXF1aXJlKHZpZXdQYXRoKTtcbiAgfVxufTtcblxuQmFzZVZpZXcuY3JlYXRlQ2hpbGRWaWV3ID0gZnVuY3Rpb24gKFZpZXdDbGFzcywgb3B0aW9ucywgJGVsLCBwYXJlbnRWaWV3LCBjYikge1xuICBpZiAoISRlbC5kYXRhKCd2aWV3LWF0dGFjaGVkJykpIHtcbiAgICB2YXIgdmlldyA9IEJhc2VWaWV3LmF0dGFjaE5ld0NoaWxkVmlldyhWaWV3Q2xhc3MsIG9wdGlvbnMsICRlbCwgcGFyZW50Vmlldyk7XG4gICAgY2IobnVsbCwgdmlldyk7XG4gIH0gZWxzZSB7XG4gICAgY2IobnVsbCwgbnVsbCk7XG4gIH1cbn07XG5cbkJhc2VWaWV3LmdldFZpZXdPcHRpb25zID0gZnVuY3Rpb24gKCRlbCkge1xuICB2YXIgcGFyc2VkLFxuICAgIG9wdGlvbnMgPSAkZWwuZGF0YSgpO1xuXG4gIF8uZWFjaChvcHRpb25zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICBwYXJzZWQgPSBfLnVuZXNjYXBlKHZhbHVlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocGFyc2VkKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgIG9wdGlvbnNba2V5XSA9IHBhcnNlZDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBvcHRpb25zO1xufTtcblxuQmFzZVZpZXcuYXR0YWNoTmV3Q2hpbGRWaWV3ID0gZnVuY3Rpb24oVmlld0NsYXNzLCBvcHRpb25zLCAkZWwsIHBhcmVudFZpZXcpIHtcbiAgdmFyIHZpZXcgPSBuZXcgVmlld0NsYXNzKG9wdGlvbnMpO1xuICB2aWV3LmF0dGFjaE9yUmVuZGVyKCRlbCwgcGFyZW50Vmlldyk7XG5cbiAgcmV0dXJuIHZpZXc7XG59O1xuXG5CYXNlVmlldy5nZXRDaGlsZFZpZXdzID0gZnVuY3Rpb24oYXBwLCBwYXJlbnRWaWV3LCBjYWxsYmFjaykge1xuICB2YXIgc2NvcGUgPSBwYXJlbnRWaWV3ID8gcGFyZW50Vmlldy4kZWwgOiBudWxsLFxuICAgICAgbGlzdCA9IEJhY2tib25lLiQoJ1tkYXRhLXZpZXddJywgc2NvcGUpLnRvQXJyYXkoKTtcblxuICBhc3luYy5tYXAobGlzdCwgZnVuY3Rpb24oZWwsIGNiKSB7XG4gICAgdmFyICRlbCwgb3B0aW9ucywgdmlld05hbWUsIGZldGNoU3VtbWFyeTtcbiAgICAkZWwgPSBCYWNrYm9uZS4kKGVsKTtcbiAgICBpZiAoISRlbC5kYXRhKCd2aWV3LWF0dGFjaGVkJykpIHtcbiAgICAgIG9wdGlvbnMgPSBCYXNlVmlldy5nZXRWaWV3T3B0aW9ucygkZWwpO1xuICAgICAgb3B0aW9ucy5hcHAgPSBhcHA7XG5cbiAgICAgIHZpZXdOYW1lID0gb3B0aW9ucy52aWV3O1xuXG4gICAgICBmZXRjaFN1bW1hcnkgPSBvcHRpb25zLmZldGNoX3N1bW1hcnkgfHzCoHt9O1xuICAgICAgYXBwLmZldGNoZXIuaHlkcmF0ZShmZXRjaFN1bW1hcnksIHsgYXBwOiBhcHAgfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICBvcHRpb25zID0gXy5leHRlbmQob3B0aW9ucywgcmVzdWx0cyk7XG4gICAgICAgIEJhc2VWaWV3LmdldFZpZXcodmlld05hbWUsIGFwcC5vcHRpb25zLmVudHJ5UGF0aCwgZnVuY3Rpb24oVmlld0NsYXNzKSB7XG4gICAgICAgICAgQmFzZVZpZXcuY3JlYXRlQ2hpbGRWaWV3KFZpZXdDbGFzcywgb3B0aW9ucywgJGVsLCBwYXJlbnRWaWV3LCBjYik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKG51bGwsIG51bGwpO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24oZXJyLCB2aWV3cykge1xuICAgIC8vIG5vIGVycm9yIGhhbmRsaW5nIG9yaWdpbmFsbHlcbiAgICBjYWxsYmFjayhfLmNvbXBhY3Qodmlld3MpKTtcbiAgfSk7XG59O1xuXG5CYXNlVmlldy5wYXJzZU1vZGVsQW5kQ29sbGVjdGlvbiA9IGZ1bmN0aW9uKG1vZGVsVXRpbHMsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMubW9kZWwgIT0gbnVsbCkge1xuICAgIGlmICghKG9wdGlvbnMubW9kZWwgaW5zdGFuY2VvZiBCYWNrYm9uZS5Nb2RlbCkgJiYgb3B0aW9ucy5tb2RlbF9uYW1lKSB7XG4gICAgICBvcHRpb25zLm1vZGVsID0gbW9kZWxVdGlscy5nZXRNb2RlbChvcHRpb25zLm1vZGVsX25hbWUsIG9wdGlvbnMubW9kZWwsIHtcbiAgICAgICAgcGFyc2U6ICEhb3B0aW9ucy5wYXJzZSxcbiAgICAgICAgYXBwOiBvcHRpb25zLmFwcFxuICAgICAgfSk7XG4gICAgfVxuICAgIG9wdGlvbnMubW9kZWxfbmFtZSA9IG9wdGlvbnMubW9kZWxfbmFtZSB8fCBtb2RlbFV0aWxzLm1vZGVsTmFtZShvcHRpb25zLm1vZGVsLmNvbnN0cnVjdG9yKTtcbiAgICBvcHRpb25zLm1vZGVsX2lkID0gb3B0aW9ucy5tb2RlbC5pZDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNvbGxlY3Rpb24gIT0gbnVsbCkge1xuICAgIGlmICghKG9wdGlvbnMuY29sbGVjdGlvbiBpbnN0YW5jZW9mIEJhY2tib25lLkNvbGxlY3Rpb24pICYmIG9wdGlvbnMuY29sbGVjdGlvbl9uYW1lKSB7XG4gICAgICBvcHRpb25zLmNvbGxlY3Rpb24gPSBtb2RlbFV0aWxzLmdldENvbGxlY3Rpb24ob3B0aW9ucy5jb2xsZWN0aW9uX25hbWUsIG9wdGlvbnMuY29sbGVjdGlvbiwge1xuICAgICAgICBwYXJzZTogISFvcHRpb25zLnBhcnNlLFxuICAgICAgICBhcHA6IG9wdGlvbnMuYXBwLFxuICAgICAgICBwYXJhbXM6IG9wdGlvbnMuY29sbGVjdGlvbl9wYXJhbXNcbiAgICAgIH0pO1xuICAgIH1cbiAgICBvcHRpb25zLmNvbGxlY3Rpb25fbmFtZSA9IG9wdGlvbnMuY29sbGVjdGlvbl9uYW1lIHx8IG1vZGVsVXRpbHMubW9kZWxOYW1lKG9wdGlvbnMuY29sbGVjdGlvbi5jb25zdHJ1Y3Rvcik7XG4gICAgb3B0aW9ucy5jb2xsZWN0aW9uX3BhcmFtcyA9IG9wdGlvbnMuY29sbGVjdGlvbl9wYXJhbXMgfHwgb3B0aW9ucy5jb2xsZWN0aW9uLnBhcmFtcztcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufTtcblxuQmFzZVZpZXcuZXh0cmFjdEZldGNoU3VtbWFyeSA9IGZ1bmN0aW9uIChtb2RlbFV0aWxzLCBvcHRpb25zKSB7XG4gICAgdmFyIGZldGNoU3VtbWFyeSA9IHt9O1xuXG4gICAgXy5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGlkLCBtb2RlbE9yQ29sbGVjdGlvbklkO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlLmNvbnN0cnVjdG9yKSAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxPckNvbGxlY3Rpb25JZCA9IHZhbHVlLmNvbnN0cnVjdG9yLmlkO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbFV0aWxzLmlzTW9kZWwodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gdmFsdWUuZ2V0KHZhbHVlLmlkQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJhaWwgaWYgdGhlcmUncyBubyBJRDsgc29tZW9uZSdzIHVzaW5nIGB0aGlzLm1vZGVsYCBpbiBhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub24tc3RhbmRhcmQgd2F5LCBhbmQgdGhhdCdzIG9rYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FzdCB0aGUgYGlkYCBhdHRyaWJ1dGUgdG8gc3RyaW5nIHRvIGVuc3VyZSBpdCdzIGluY2x1ZGVkIGluIGF0dHJpYnV0ZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIE9uIHRoZSBzZXJ2ZXIsIGl0IGNhbiBiZSBpLmUuIGFuIGBPYmplY3RJZGAgZnJvbSBNb25nb29zZS5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBmZXRjaFN1bW1hcnlba2V5XSA9IHttb2RlbDogbW9kZWxPckNvbGxlY3Rpb25JZCwgaWQ6IHZhbHVlfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9kZWxVdGlscy5pc0NvbGxlY3Rpb24odmFsdWUpICYmIHZhbHVlLnBhcmFtcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoU3VtbWFyeVtrZXldID0ge2NvbGxlY3Rpb246IG1vZGVsT3JDb2xsZWN0aW9uSWQsIHBhcmFtczogdmFsdWUucGFyYW1zfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZldGNoU3VtbWFyeTtcbn1cblxuLyoqXG4gKiBOb29wcyBvbiB0aGUgc2VydmVyLCBiZWNhdXNlIHRoZXkgZG8gRE9NIHN0dWZmLlxuICovXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgQmFzZVZpZXcucHJvdG90eXBlLl9lbnN1cmVFbGVtZW50ID0gXy5ub29wO1xuICBCYXNlVmlldy5wcm90b3R5cGUuZGVsZWdhdGVFdmVudHMgPSBfLm5vb3A7XG59XG4iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kLFxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4zJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBwcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICBmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XG4gICAgLy8gT3B0aW1pemVkIGl0ZXJhdG9yIGZ1bmN0aW9uIGFzIHVzaW5nIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXG4gICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBpbml0aWFsIHZhbHVlIGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGtleSA9IF8uZmluZEluZGV4KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcbiAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBzdGFydEluZGV4KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLCBpZHggPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XG4gICAgICAgIGlmICghc2hhbGxvdykgdmFsdWUgPSBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QpO1xuICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XG4gICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBfID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0ge30sXG4gICAgICAgICAgY3VycmVudEtleTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIG9iaiA9IG9iamVjdCwgaXRlcmF0ZWUsIGtleXM7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcbiAgLy8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXG4gIGlmICh0eXBlb2YgLy4vICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mIEludDhBcnJheSAhPSAnb2JqZWN0Jykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAvLyBHZW5lcmF0ZXMgYSBmdW5jdGlvbiBmb3IgYSBnaXZlbiBvYmplY3QgdGhhdCByZXR1cm5zIGEgZ2l2ZW4gcHJvcGVydHkuXG4gIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uKCl7fSA6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIGZhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZSA9IGZhbGxiYWNrO1xuICAgIH1cbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xuICAvLyBzdWNoIGFzIGFyaXRobWV0aWMgYW5kIEpTT04gc3RyaW5naWZpY2F0aW9uLlxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XG5cbiAgXy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSGFuZGxlYmFycywgZ2V0VGVtcGxhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICB2aWV3OiByZXF1aXJlKCcuL2hlbHBlcnMvdmlldycpKEhhbmRsZWJhcnMpLFxuICAgIHBhcnRpYWw6IHJlcXVpcmUoJy4vaGVscGVycy9wYXJ0aWFsJykoSGFuZGxlYmFycywgZ2V0VGVtcGxhdGUpLFxuICAgIGpzb246IHJlcXVpcmUoJy4vaGVscGVycy9qc29uJykoSGFuZGxlYmFycyksXG4gICAgZWFjaDogcmVxdWlyZSgnLi9oZWxwZXJzL2VhY2gnKShIYW5kbGViYXJzKSxcbiAgICBzZXJ2ZXJUb0NsaWVudEpzb246IHJlcXVpcmUoJy4vaGVscGVycy9zZXJ2ZXJUb0NsaWVudEpzb24nKShIYW5kbGViYXJzKSxcbiAgICBmb3JFYWNoOiByZXF1aXJlKCcuL2hlbHBlcnMvZm9yRWFjaCcpXG4gIH07XG59O1xuIiwiLyoqXG4qIEV4dGVuZCBgZWFjaGAgdG8gcGFzcyB0aHJvdWdoIGltcG9ydGFudCBjb250ZXh0LlxuKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgZ2V0T3B0aW9uc0Zyb21Db250ZXh0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2dldE9wdGlvbnMnKSxcbiAgICBvbGRFYWNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcbiAgb2xkRWFjaCA9IG9sZEVhY2ggfHwgSGFuZGxlYmFycy5oZWxwZXJzLmVhY2g7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gSGFuZGxlYmFycy5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEgfHwge30pO1xuXG4gICAgLy8gTWFrZSBzdXJlIGB0aGlzLl9hcHBgLCBgdGhpcy5fdmlld2AsIGV0YyBhcmUgYXZhaWxhYmxlLlxuICAgIF8uZXh0ZW5kKG9wdGlvbnMuZGF0YSwgZ2V0T3B0aW9uc0Zyb21Db250ZXh0KHRoaXMpKTtcblxuICAgIC8vIENhbGwgdGhlIG9yaWdpbmFsIGhlbHBlciB3aXRoIG5ldyBjb250ZXh0LlxuICAgIHJldHVybiBvbGRFYWNoLmNhbGwodGhpcywgY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCIvKipcbiogQ3JlYXRlIGEgYGZvckVhY2hgIGhlbHBlciB0aGF0IHdvcmtzIG9uIGEgZmV3IG1vcmUgY2FzZXMgYW5kIGdpdmVzIG1vcmUgZmxleGliaWxpdHlcbiogd2hlbiBkZWFsaW5nIHdpdGggYXJyYXlzLCBvYmplY3RzLCBvciBjb2xsZWN0aW9uc1xuKi9cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBvcHRzKSB7XG4gIHZhciBsZW4gPSBjb2xsZWN0aW9uICYmIGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgYXBwID0gdGhpcy5fYXBwIHx8IHRoaXMuYXBwLFxuICAgICAgaXNDb2xsZWN0aW9uID0gYXBwLm1vZGVsVXRpbHMuaXNDb2xsZWN0aW9uKGNvbGxlY3Rpb24pLFxuICAgICAgYnVmZmVyID0gJyc7XG5cbiAgaWYgKF8uaXNFbXB0eShjb2xsZWN0aW9uKSkge1xuICAgIHJldHVybiBvcHRzLmludmVyc2UoXy5leHRlbmQoe30sIHRoaXMsIHtcbiAgICAgIF9hcHA6IGFwcCxcbiAgICAgIF9tb2RlbDogdGhpcy5fbW9kZWwgfHwgdGhpcy5tb2RlbCxcbiAgICAgIF9jb2xsZWN0aW9uOiB0aGlzLl9jb2xsZWN0aW9uIHx8IHRoaXMuY29sbGVjdGlvbixcbiAgICAgIF92aWV3OiB0aGlzLl92aWV3IHx8IHRoaXMudmlld1xuICAgIH0pKTtcbiAgfVxuXG4gIC8vIGl0ZXJhdGUgdGhlIG1vZGVscyBvbiBhIGNvbGxlY3Rpb25cbiAgaWYgKGlzQ29sbGVjdGlvbikge1xuICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1vZGVsc1xuICB9XG5cbiAgXy5lYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgaWYgKGlzQ29sbGVjdGlvbiAmJiBvcHRzLmhhc2gudG9KU09OKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTigpO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gXy5leHRlbmQoe1xuICAgICAga2V5OiBrZXksXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBfYXBwOiB0aGlzLl9hcHAgfHwgdGhpcy5hcHAsXG4gICAgICBfbW9kZWw6IHRoaXMuX21vZGVsIHx8IHRoaXMubW9kZWwsXG4gICAgICBfY29sbGVjdGlvbjogdGhpcy5fY29sbGVjdGlvbiB8fCB0aGlzLmNvbGxlY3Rpb24sXG4gICAgICBfdmlldzogdGhpcy5fdmlldyB8fCB0aGlzLnZpZXdcbiAgICB9LCBvcHRzLmhhc2gpO1xuXG4gICAgLy8gYWRkaW5nIGV4dHJhIGF0dHJpYnV0ZXMgdG8gYW4gaXRlbSBmb3IgYXJyYXkgdHJhdmVyc2FsXG4gICAgaWYgKF8uaXNBcnJheShjb2xsZWN0aW9uKSB8fCBpc0NvbGxlY3Rpb24pIHtcbiAgICAgIGl0ZW0gPSBfLmV4dGVuZChpdGVtLCB7XG4gICAgICAgIF90b3RhbDogbGVuLFxuICAgICAgICBfaXNGaXJzdDoga2V5ID09PSAwLFxuICAgICAgICBfaXNMYXN0OiBrZXkgPT09IChsZW4gLSAxKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVmZmVyICs9IG9wdHMuZm4oaXRlbSk7XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChIYW5kbGViYXJzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqZWN0LCBzcGFjaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBIYW5kbGViYXJzLlNhZmVTdHJpbmcoSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCBzcGFjaW5nKSB8fCAnbnVsbCcpO1xuICB9XG59XG4iLCIvKipcbiAqIGNyZWF0ZSBhbiBodG1sIHBhcnRpYWxcbiAqL1xudmFyIGdldFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vLi4vbGliL2dldFByb3BlcnR5JyksXG4gICAgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSGFuZGxlYmFycywgZ2V0VGVtcGxhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0ZW1wbGF0ZU5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGF0YSwgaHRtbCwgY29udGV4dCwgdGVtcGxhdGU7XG5cbiAgICB0ZW1wbGF0ZSA9IGdldFRlbXBsYXRlKHRlbXBsYXRlTmFtZSk7XG4gICAgY29udGV4dCA9IG9wdGlvbnMuaGFzaCB8fCB7fTtcblxuICAgIC8vIEZpcnN0IHRyeSB0byB1c2UgSGFuZGxlYmFycycgaGFzaCBhcmd1bWVudHMgYXMgdGhlIGNvbnRleHQgZm9yIHRoZVxuICAgIC8vIHBhcnRpYWwsIGlmIHByZXNlbnQuXG4gICAgLy9cbiAgICAvLyBleDogYHt7cGFydGlhbCBcInVzZXJzL3Bob3RvXCIgdXNlcj11c2VyfX1gXG4gICAgaWYgKF8uaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGhhc2ggYXJndW1lbnRzIGdpdmVuLCB0aGVuIGluaGVyaXQgdGhlIHBhcmVudCBjb250ZXh0LlxuICAgICAgLy9cbiAgICAgIC8vIGV4OiBge3twYXJ0aWFsIFwidXNlcnMvcGhvdG9cIn19YFxuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGEgaGFzaCBhcmd1bWVudCBpcyBnaXZlbiB3aXRoIGtleSBgY29udGV4dGAsIHRoZW4gdXNlIHRoYXQgYXMgdGhlIGNvbnRleHQuXG4gICAgICAvL1xuICAgICAgLy8gZXg6IGB7e3BhcnRpYWwgXCJ1c2Vycy9waG90b1wiIGNvbnRleHQ9dXNlcn19YFxuICAgICAgaWYgKGNvbnRleHQuaGFzT3duUHJvcGVydHkoJ2NvbnRleHQnKSkge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5jb250ZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRleHQgPSBfLmNsb25lKGNvbnRleHQpO1xuICAgIGNvbnRleHQuX2FwcCA9IGdldFByb3BlcnR5KCdfYXBwJywgdGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihvcHRpb25zLmZuKSkge1xuICAgICAgY29udGV4dC5fYmxvY2sgPSBvcHRpb25zLmZuKGNvbnRleHQpO1xuICAgIH1cblxuICAgIGh0bWwgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhodG1sKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChIYW5kbGViYXJzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGRhdGEgPSBlc2NhcGUoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgcmV0dXJuIG5ldyBIYW5kbGViYXJzLlNhZmVTdHJpbmcoJ0pTT04ucGFyc2UodW5lc2NhcGUoXCInICsgZGF0YSArICdcIikpJyk7XG4gIH07XG59O1xuIiwiLyoqXG4gKiBIZWxwZXIgdG8gY3JlYXRlIG5ldyB2aWV3cyBpbiB0aGUgdGVtcGxhdGVzXG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgZ2V0UHJvcGVydHkgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2V0UHJvcGVydHknKSxcbiAgICBCYXNlVmlldztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSGFuZGxlYmFycykge1xuICByZXR1cm4gZnVuY3Rpb24gKHZpZXdOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGlzU2VydmVyID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcsXG4gICAgICAgIGh0bWwsIHZpZXdPcHRpb25zLCB2aWV3LCBhcHA7XG5cbiAgICB2aWV3T3B0aW9ucyA9IG9wdGlvbnMuaGFzaCB8fCB7fTtcbiAgICBhcHAgPSBnZXRQcm9wZXJ0eSgnX2FwcCcsIHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgLy8gUGFzcyB0aHJvdWdoIGEgcmVmZXJlbmNlIHRvIHRoZSBhcHAuXG4gICAgaWYgKGFwcCkge1xuICAgICAgdmlld09wdGlvbnMuYXBwID0gYXBwO1xuICAgICAgdmlld05hbWUgPSBhcHAubW9kZWxVdGlscy51bmRlcnNjb3JpemUodmlld05hbWUpO1xuICAgIH0gZWxzZXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFuIEFwcCBpbnN0YW5jZSBpcyByZXF1aXJlZCB3aGVuIHJlbmRlcmluZyBhIHZpZXcsIGl0IGNvdWxkIG5vdCBiZSBleHRyYWN0ZWQgZnJvbSB0aGUgb3B0aW9ucy5cIilcbiAgICB9XG5cbiAgICAvLyBhbGxvdyB2aWV3cyB0byBiZSBwYXNzZWQgb3B0aW9uYWwgYmxvY2sgZWxlbWVudHNcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZm4pKSB7XG4gICAgICB2YXIgYmxvY2tPcHRpb25zID0gXy5leHRlbmQoe30sIHRoaXMsIHZpZXdPcHRpb25zKTtcbiAgICAgIHZpZXdPcHRpb25zLl9ibG9jayA9IG9wdGlvbnMuZm4oYmxvY2tPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZXJ2ZXIpIHtcbiAgICAgIHZhciBwYXJlbnRWaWV3ID0gZ2V0UHJvcGVydHkoJ192aWV3JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICBodG1sID0gZ2V0U2VydmVySHRtbCh2aWV3TmFtZSwgdmlld09wdGlvbnMsIHBhcmVudFZpZXcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sID0gZ2V0Q2xpZW50UGxhY2Vob2xkZXIodmlld05hbWUsIHZpZXdPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhodG1sKTtcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGdldFNlcnZlckh0bWwodmlld05hbWUsIHZpZXdPcHRpb25zLCBwYXJlbnRWaWV3KSB7XG4gIHZhciBWaWV3Q2xhc3MsIHZpZXc7XG5cbiAgaWYgKCFCYXNlVmlldykgeyBCYXNlVmlldyA9IHJlcXVpcmUoJ3JlbmRyL3NoYXJlZC9iYXNlL3ZpZXcnKTsgfVxuXG4gIC8vIFBhc3MgdGhyb3VnaCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHZpZXcuXG4gIGlmIChwYXJlbnRWaWV3KSB7IHZpZXdPcHRpb25zLnBhcmVudFZpZXcgPSBwYXJlbnRWaWV3OyB9XG5cbiAgLy8gZ2V0IHRoZSBCYWNrYm9uZS5WaWV3IGJhc2VkIG9uIHZpZXdOYW1lXG4gIFZpZXdDbGFzcyA9IEJhc2VWaWV3LmdldFZpZXcodmlld05hbWUsIHZpZXdPcHRpb25zLmFwcC5vcHRpb25zLmVudHJ5UGF0aCk7XG4gIHZpZXcgPSBuZXcgVmlld0NsYXNzKHZpZXdPcHRpb25zKTtcblxuICAvLyBjcmVhdGUgdGhlIG91dGVySFRNTCB1c2luZyBjbGFzc05hbWUsIHRhZ05hbWVcbiAgcmV0dXJuIHZpZXcuZ2V0SHRtbCgpO1xufVxuXG5mdW5jdGlvbiBnZXRDbGllbnRQbGFjZWhvbGRlcih2aWV3TmFtZSwgdmlld09wdGlvbnMpIHtcbiAgaWYgKCFCYXNlVmlldykgeyBCYXNlVmlldyA9IHJlcXVpcmUoJ3JlbmRyL3NoYXJlZC9iYXNlL3ZpZXcnKTsgfVxuICB2YXIgZmV0Y2hTdW1tYXJ5O1xuXG4gIC8vIEJ1aWxkcyBhIGZldGNoX3N1bW1hcnkgYXR0cmlidXRlXG4gIHZpZXdPcHRpb25zID0gQmFzZVZpZXcucGFyc2VNb2RlbEFuZENvbGxlY3Rpb24odmlld09wdGlvbnMuYXBwLm1vZGVsVXRpbHMsIHZpZXdPcHRpb25zKTtcbiAgZmV0Y2hTdW1tYXJ5ID0gQmFzZVZpZXcuZXh0cmFjdEZldGNoU3VtbWFyeSh2aWV3T3B0aW9ucy5hcHAubW9kZWxVdGlscywgdmlld09wdGlvbnMpO1xuICB2aWV3T3B0aW9uc1snZmV0Y2hfc3VtbWFyeSddID0gZmV0Y2hTdW1tYXJ5XG4gIHZpZXdPcHRpb25zID0gXy5vbWl0KHZpZXdPcHRpb25zLCBfLmtleXMoZmV0Y2hTdW1tYXJ5KS5jb25jYXQoWydtb2RlbCcsICdjb2xsZWN0aW9uJywgJ2FwcCddKSk7XG5cbiAgLy8gY3JlYXRlIGEgbGlzdCBvZiBkYXRhIGF0dHJpYnV0ZXNcbiAgdmFyIGF0dHJTdHJpbmcgPSBfLmluamVjdCh2aWV3T3B0aW9ucywgZnVuY3Rpb24obWVtbywgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNPYmplY3QodmFsdWUpKSB7IHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpOyB9XG4gICAgcmV0dXJuIG1lbW8gKz0gXCIgZGF0YS1cIiArIGtleSArIFwiPVxcXCJcIiArIF8uZXNjYXBlKHZhbHVlKSArIFwiXFxcIlwiO1xuICB9LCAnJyk7XG5cbiAgcmV0dXJuICc8ZGl2IGRhdGEtcmVuZGVyPVwidHJ1ZVwiJyArIGF0dHJTdHJpbmcgKycgZGF0YS12aWV3PVwiJysgdmlld05hbWUgKydcIj48L2Rpdj4nO1xufVxuIiwidmFyIGNhY2hlZFRlbXBsYXRlcyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcblxuICAvKipcbiAgICogUHJvdmlkZSBhIHdheSBmb3IgYXBwcyB0byBzcGVjaWZ5IHRoYXQgZGlmZmVyZW50IHRlbXBsYXRlIG5hbWUgcGF0dGVybnNcbiAgICogc2hvdWxkIHVzZSBkaWZmZXJlbnQgY29tcGlsZWQgdGVtcGxhdGUgZmlsZXMuXG4gICAqXG4gICAqL1xuICB2YXIgdGVtcGxhdGVQYXR0ZXJucyA9IFtdO1xuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHRlbXBsYXRlIG5hbWUsIHJldHVybiB0aGUgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlTmFtZSkge1xuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGNvcnJlY3Qgc291cmNlIGZpbGUgZm9yIHRoaXMgdGVtcGxhdGUuXG4gICAgICovXG4gICAgdmFyIHNyYyA9IGdldFNyY0ZvclRlbXBsYXRlKHRlbXBsYXRlTmFtZSk7XG5cbiAgICAvKipcbiAgICAqIEFsbG93IGNvbXBpbGVkVGVtcGxhdGVzIHRvIGJlIGNyZWF0ZWQgYXN5bmNocm9ub3VzbHkgYnkgbGF6eS1yZXF1aXJpbmcgaXQuXG4gICAgKi9cbiAgICBpZiAoIWNhY2hlZFRlbXBsYXRlc1tzcmNdKSB7XG4gICAgICBjYWNoZWRUZW1wbGF0ZXNbc3JjXSA9IHJlcXVpcmUoc3JjKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBNYWtlIGl0IHBsYXkgbmljZWx5IHdpdGggYm90aCBBTUQgYW5kIENvbW1vbkpTLlxuICAgICAgICogVGhlIGBncnVudC1jb250cmliLWhhbmRsZWJhcnNgIG1vZHVsZSAgcHJvZHVjZXMgZGlmZmVyZW50IHN0dWN0dXJlXG4gICAgICAgKiBvZiBjb21waWxlZCB0ZW1wbGF0ZXMgd2l0aCBgYW1kYCB2cyBgY29tbW9uanNgIG9wdGlvbnMuIEFjY29tbW9kYXRlXG4gICAgICAgKiBib3RoIG9wdGlvbnMgaGVyZS4gdGhlIGBhbWRgIG9wdGlvbiByZXN1bHRzIGluIHRlbXBsYXRlcyBhcyBhbiBPYmplY3QsXG4gICAgICAgKiB3aGVyZWFzIHRoZSBgY29tbW9uanNgIG9wdGlvbiByZXN1bHRzIGluIHRlbXBsYXRlcyBhcyBhIEZ1bmN0aW9uLlxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNhY2hlZFRlbXBsYXRlc1tzcmNdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FjaGVkVGVtcGxhdGVzW3NyY10gPSBjYWNoZWRUZW1wbGF0ZXNbc3JjXShIYW5kbGViYXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVkVGVtcGxhdGVzW3NyY11bdGVtcGxhdGVOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgYSBnaXZlbiB0ZW1wbGF0ZSBuYW1lLCBmaW5kIHRoZSBjb3JyZWN0IGNvbXBpbGVkIHRlbXBsYXRlcyBzb3VyY2UgZmlsZVxuICAgKiBiYXNlZCBvbiBwYXR0ZXJuIG1hdGNoaW5nIG9uIHRoZSB0ZW1wbGF0ZSBuYW1lLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3JjRm9yVGVtcGxhdGUodGVtcGxhdGVOYW1lKSB7XG4gICAgdmFyIGN1cnJlbnRQYXR0ZXJuID0gdGVtcGxhdGVQYXR0ZXJucy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLnBhdHRlcm4udGVzdCh0ZW1wbGF0ZU5hbWUpO1xuICAgIH0pWzBdO1xuXG4gICAgaWYgKGN1cnJlbnRQYXR0ZXJuID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcGF0dGVybiBmb3VuZCB0byBtYXRjaCB0ZW1wbGF0ZSBcIicgKyB0ZW1wbGF0ZU5hbWUgKyAnXCIuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRQYXR0ZXJuLnNyYztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0VGVtcGxhdGU6IGdldFRlbXBsYXRlLFxuICAgIGdldFNyY0ZvclRlbXBsYXRlOiBnZXRTcmNGb3JUZW1wbGF0ZSxcbiAgICB0ZW1wbGF0ZVBhdHRlcm5zOiB0ZW1wbGF0ZVBhdHRlcm5zXG4gIH1cbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcbiAgICBCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyksXG4gICAgQmFzZVZpZXcgPSByZXF1aXJlKCcuLi9zaGFyZWQvYmFzZS92aWV3JyksXG4gICAgaXNTZXJ2ZXIgPSAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpO1xuXG5cbmlmICghaXNTZXJ2ZXIpIHtcbiAgQmFja2JvbmUuJCA9IHdpbmRvdy4kIHx8IHJlcXVpcmUoJ2pxdWVyeScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VWaWV3LmV4dGVuZCh7XG4gIGVsOiAnYm9keScsXG5cbiAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuICAgIEJhc2VWaWV3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBfLmRlZmF1bHRzKHRoaXMub3B0aW9ucywge1xuICAgICAgY29udGVudEVsOiAnI2NvbnRlbnQnXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBHcmFiIHRoZSBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIG1haW4gdmlldy5cbiAgICAgKi9cbiAgICB0aGlzLiRjb250ZW50ID0gQmFja2JvbmUuJCh0aGlzLm9wdGlvbnMuY29udGVudEVsKTtcbiAgICB0aGlzLl9iaW5kSW50ZXJjZXB0Q2xpY2soKTtcbiAgfSxcblxuICBoYXNQdXNoU3RhdGU6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICE9IG51bGwsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHt9LFxuXG4gIHNldEN1cnJlbnRWaWV3OiBmdW5jdGlvbih2aWV3KSB7XG4gICAgdGhpcy4kY29udGVudC5odG1sKHZpZXcuZWwpO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH0sXG5cbiAgX2JpbmRJbnRlcmNlcHRDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kZWwub24oJ2NsaWNrJywgJ2E6bm90KFtkYXRhLXBhc3MtdGhydV0pJywgdGhpcy5faW50ZXJjZXB0Q2xpY2suYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgX2ludGVyY2VwdENsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0aGUgYWN0dWFsIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUsIHJhdGhlciB0aGFuIHRoZVxuICAgICAqIGZ1bGwgVVJMLCBzbyB3ZSB1c2UgalF1ZXJ5IGluc3RlYWQgb2YganVzdCBlLmN1cnJlbnRUYXJnZXQuaHJlZlxuICAgICAqL1xuICAgIHZhciBocmVmID0gQmFja2JvbmUuJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcbiAgICBpZiAodGhpcy5zaG91bGRJbnRlcmNlcHRDbGljayhocmVmLCBlLmN1cnJlbnRUYXJnZXQsIGUpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmFwcC5yb3V0ZXIucmVkaXJlY3RUbyhocmVmKTtcbiAgICB9XG4gIH0sXG5cbiAgc2hvdWxkSW50ZXJjZXB0Q2xpY2s6IGZ1bmN0aW9uKGhyZWYsIGVsLCBlKSB7XG4gICAgdmFyIGhhc2hQYXJ0cywgaXNIYXNoQ2xpY2s7XG5cbiAgICBpZiAoIShocmVmICYmIHRoaXMuaGFzUHVzaFN0YXRlKSB8fCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGhhc2hQYXJ0cyA9IGhyZWYuc3BsaXQoJyMnKTtcbiAgICBpc0hhc2hDbGljayA9IGhhc2hQYXJ0cy5sZW5ndGggPiAxICYmIGhhc2hQYXJ0c1swXSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHJldHVybiAhaXNIYXNoQ2xpY2sgJiYgaHJlZi5zbGljZSgwLCAxKSA9PT0gJy8nICYmIGhyZWYuc2xpY2UoMCwgMikgIT09ICcvLyc7XG4gIH1cblxufSk7XG4iLCIvKipcbiAqIFNpbmNlIHdlIG1ha2UgcmVuZHIgZmlsZXMgQU1EIGZyaWVuZGx5IG9uIGFwcCBzZXR1cCBzdGFnZVxuICogd2UgbmVlZCB0byBwcmV0ZW5kIHRoYXQgdGhpcyBjb2RlIGlzIHB1cmUgY29tbW9uanNcbiAqIG1lYW5zIG5vIEFNRC1zdHlsZSByZXF1aXJlIGNhbGxzXG4gKi9cbnZhciByZXF1aXJlQU1EID0gcmVxdWlyZTtcblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICAgIEJhc2VSb3V0ZXIgPSByZXF1aXJlKCcuLi9zaGFyZWQvYmFzZS9yb3V0ZXInKSxcbiAgICBCYXNlVmlldyA9IHJlcXVpcmUoJy4uL3NoYXJlZC9iYXNlL3ZpZXcnKSxcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy4kKSB8fCByZXF1aXJlKCdqcXVlcnknKSxcbiAgICBleHRyYWN0UGFyYW1OYW1lc1JlID0gLzooXFx3KykvZyxcbiAgICBwbHVzUmUgPSAvXFwrL2csXG4gICAgZmlyc3RSZW5kZXIgPSB0cnVlLFxuICAgIGRlZmF1bHRSb290UGF0aCA9ICcnO1xuXG5CYWNrYm9uZS4kID0gJDtcblxubW9kdWxlLmV4cG9ydHMgPSBDbGllbnRSb3V0ZXI7XG5cbmZ1bmN0aW9uIENsaWVudFJvdXRlcihvcHRpb25zKSB7XG4gIHRoaXMuX3JvdXRlciA9IG5ldyBCYWNrYm9uZS5Sb3V0ZXIoKTtcbiAgQmFzZVJvdXRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIHRoaXMuYXBwID0gb3B0aW9ucy5hcHA7XG5cbiAgdmFyIEFwcFZpZXcgPSB0aGlzLm9wdGlvbnMuYXBwVmlld0NsYXNzO1xuXG4gIC8vIFdlIGRvIHRoaXMgaGVyZSBzbyB0aGF0IGl0J3MgYXZhaWxhYmxlIGluIEFwcFZpZXcgaW5pdGlhbGl6YXRpb24uXG4gIHRoaXMuYXBwLnJvdXRlciA9IHRoaXM7XG5cbiAgdGhpcy5vbigncm91dGU6YWRkJywgdGhpcy5hZGRCYWNrYm9uZVJvdXRlLCB0aGlzKTtcbiAgdGhpcy5vbignYWN0aW9uOnN0YXJ0JywgdGhpcy50cmFja0FjdGlvbiwgdGhpcyk7XG4gIHRoaXMuYXBwLm9uKCdyZWxvYWQnLCB0aGlzLnJlbmRlclZpZXcsIHRoaXMpO1xuXG4gIHRoaXMuYXBwVmlldyA9IG5ldyBBcHBWaWV3KHtcbiAgICBhcHA6IHRoaXMuYXBwXG4gIH0pO1xuXG4gIHRoaXMuYXBwVmlldy5yZW5kZXIoKTtcbiAgdGhpcy5idWlsZFJvdXRlcygpO1xuICB0aGlzLmluaXRpYWxpemUob3B0aW9ucyk7XG59XG5cbi8qKlxuICogU2V0IHVwIGluaGVyaXRhbmNlLlxuICovXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlUm91dGVyLnByb3RvdHlwZSk7XG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2xpZW50Um91dGVyO1xuXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmN1cnJlbnRGcmFnbWVudCA9IG51bGw7XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUucHJldmlvdXNGcmFnbWVudCA9IG51bGw7XG5cbi8qKlxuICogSW4gYSBjb250cm9sbGVyIGFjdGlvbiwgY2FuIGFjY2VzcyB0aGUgY3VycmVudCByb3V0ZVxuICogZGVmaW5pdGlvbiB3aXRoIGB0aGlzLmN1cnJlbnRSb3V0ZWAuXG4gKi9cbkNsaWVudFJvdXRlci5wcm90b3R5cGUuY3VycmVudFJvdXRlID0gbnVsbDtcblxuLyoqXG4gKiBJbnN0YW5jZSBvZiBCYWNrYm9uZS5Sb3V0ZXIgdXNlZCB0byBtYW5hZ2UgYnJvd3NlciBoaXN0b3J5LlxuICovXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLl9yb3V0ZXIgPSBudWxsO1xuXG4vKipcbiAqIFdlIG5lZWQgdG8gcmV2ZXJzZSB0aGUgcm91dGVzIGluIHRoZSBjbGllbnQgYmVjYXVzZVxuICogQmFja2JvbmUuSGlzdG9yeSBtYXRjaGVzIGluIHJldmVyc2UuXG4gKi9cbkNsaWVudFJvdXRlci5wcm90b3R5cGUucmV2ZXJzZVJvdXRlcyA9IHRydWU7XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IF8ubm9vcDtcblxuLyoqXG4gKiBQaWdneWJhY2sgb24gYWRkaW5nIG5ldyByb3V0ZSBkZWZpbml0aW9uIGV2ZW50c1xuICogdG8gYWxzbyBhZGQgdG8gQmFja2JvbmUuUm91dGVyLlxuICovXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmFkZEJhY2tib25lUm91dGUgPSBmdW5jdGlvbihyb3V0ZU9iaikge1xuICB2YXIgaGFuZGxlciwgbmFtZSwgcGF0dGVybiwgcm91dGU7XG5cbiAgLy8gQmFja2JvbmUuSGlzdG9yeSB3YW50cyBubyBsZWFkaW5nIHNsYXNoIG9uIHN0cmluZ3MuXG4gIHBhdHRlcm4gPSAocm91dGVPYmpbMF0gaW5zdGFuY2VvZiBSZWdFeHApID8gcm91dGVPYmpbMF0gOiByb3V0ZU9ialswXS5zbGljZSgxKTtcbiAgcm91dGUgPSByb3V0ZU9ialsxXTtcbiAgaGFuZGxlciA9IHJvdXRlT2JqWzJdO1xuICBuYW1lID0gcm91dGUuY29udHJvbGxlciArIFwiOlwiICsgcm91dGUuYWN0aW9uO1xuXG4gIHRoaXMuX3JvdXRlci5yb3V0ZShwYXR0ZXJuLCBuYW1lLCBoYW5kbGVyKTtcbn07XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUuZ2V0SGFuZGxlciA9IGZ1bmN0aW9uKGFjdGlvbiwgcGF0dGVybiwgcm91dGUpIHtcbiAgdmFyIHJvdXRlciA9IHRoaXM7XG5cbiAgLy8gYWJzdHJhY3QgYWN0aW9uIGNhbGxcbiAgZnVuY3Rpb24gYWN0aW9uQ2FsbChhY3Rpb24sIHBhcmFtcykge1xuICAgIGFjdGlvbi5jYWxsKHJvdXRlciwgcGFyYW1zLCByb3V0ZXIuZ2V0UmVuZGVyQ2FsbGJhY2socm91dGUpKTtcbiAgfVxuXG4gIC8vIFRoaXMgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBieSBCYWNrYm9uZS5oaXN0b3J5LlxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmFtcywgcGFyYW1zQXJyYXksIHJlZGlyZWN0O1xuXG4gICAgcm91dGVyLnRyaWdnZXIoJ2FjdGlvbjpzdGFydCcsIHJvdXRlLCBmaXJzdFJlbmRlcik7XG4gICAgcm91dGVyLmN1cnJlbnRSb3V0ZSA9IHJvdXRlO1xuXG4gICAgaWYgKGZpcnN0UmVuZGVyKSB7XG4gICAgICBmaXJzdFJlbmRlciA9IGZhbHNlO1xuICAgICAgQmFzZVZpZXcuZ2V0Q2hpbGRWaWV3cyhyb3V0ZXIuYXBwLCBudWxsLCBmdW5jdGlvbih2aWV3cykge1xuICAgICAgICByb3V0ZXIuY3VycmVudFZpZXcgPSByb3V0ZXIuZ2V0TWFpblZpZXcodmlld3MpO1xuICAgICAgICByb3V0ZXIudHJpZ2dlcignYWN0aW9uOmVuZCcsIHJvdXRlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXNBcnJheSA9IF8udG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgcGFyYW1zID0gcm91dGVyLmdldFBhcmFtc0hhc2gocGF0dGVybiwgcGFyYW1zQXJyYXksIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICByZWRpcmVjdCA9IHJvdXRlci5nZXRSZWRpcmVjdChyb3V0ZSwgcGFyYW1zKTtcbiAgICAgIC8qKlxuICAgICAgICogSWYgYHJlZGlyZWN0YCBpcyBwcmVzZW50LCB0aGVuIGRvIGEgcmVkaXJlY3QgYW5kIHJldHVybi5cbiAgICAgICAqL1xuICAgICAgaWYgKHJlZGlyZWN0ICE9IG51bGwpIHtcbiAgICAgICAgcm91dGVyLnJlZGlyZWN0VG8ocmVkaXJlY3QsIHtyZXBsYWNlOiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYWN0aW9uIFxcXCJcIiArIHJvdXRlLmFjdGlvbiArIFwiXFxcIiBmb3IgY29udHJvbGxlciBcXFwiXCIgKyByb3V0ZS5jb250cm9sbGVyICsgXCJcXFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGlvbkNhbGwoYWN0aW9uLCBwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDYW4gYmUgb3ZlcnJpZGRlbiBieSBhcHBsaWNhdGlvbnNcbiAqIGlmIHRoZSBpbml0aWFsIHJlbmRlciBpcyBtb3JlIGNvbXBsaWNhdGVkLlxuICovXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmdldE1haW5WaWV3ID0gZnVuY3Rpb24odmlld3MpIHtcbiAgdmFyICRjb250ZW50ID0gdGhpcy5hcHBWaWV3LiRjb250ZW50O1xuICByZXR1cm4gXy5maW5kKHZpZXdzLCBmdW5jdGlvbih2aWV3KSB7XG4gICAgcmV0dXJuIHZpZXcuJGVsLnBhcmVudCgpLmlzKCRjb250ZW50KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFByb3h5IHRvIEJhY2tib25lLlJvdXRlci5cbiAqL1xuQ2xpZW50Um91dGVyLnByb3RvdHlwZS5uYXZpZ2F0ZSA9IGZ1bmN0aW9uKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIGZyYWdtZW50ID0gQmFja2JvbmUuaGlzdG9yeS5nZXRGcmFnbWVudChwYXRoKTtcblxuICAvLyBjaGVjayBpZiBsb2NhbCByb3V0ZXIgY2FuIGhhbmRsZSByb3V0ZVxuICBpZiAodGhpcy5tYXRjaGVzQW55Um91dGUoZnJhZ21lbnQpKSB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlLmFwcGx5KHRoaXMuX3JvdXRlciwgYXJndW1lbnRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJlZGlyZWN0VG8oZnJhZ21lbnQsIHtwdXNoU3RhdGU6IGZhbHNlfSk7XG4gIH1cbn07XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUuZ2V0UGFyYW1zSGFzaCA9IGZ1bmN0aW9uKHBhdHRlcm4sIHBhcmFtc0FycmF5LCBzZWFyY2gpIHtcbiAgdmFyIHBhcmFtTmFtZXMsIHBhcmFtcywgcXVlcnk7XG5cbiAgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBwYXJhbU5hbWVzID0gcGFyYW1zQXJyYXkubWFwKGZ1bmN0aW9uKHZhbCwgaSkgeyByZXR1cm4gU3RyaW5nKGkpOyB9KTtcbiAgfSBlbHNlIHtcbiAgICBwYXJhbU5hbWVzID0gKHBhdHRlcm4ubWF0Y2goZXh0cmFjdFBhcmFtTmFtZXNSZSkgfHwgW10pLm1hcChmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gbmFtZS5zbGljZSgxKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhcmFtcyA9IChwYXJhbU5hbWVzIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24obWVtbywgbmFtZSwgaSkge1xuICAgIG1lbW9bbmFtZV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zQXJyYXlbaV0pO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCB7fSk7XG5cbiAgcXVlcnkgPSBzZWFyY2guc2xpY2UoMSkuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24obWVtbywgcXVlcnlQYXJ0KSB7XG4gICAgdmFyIHBhcnRzID0gcXVlcnlQYXJ0LnNwbGl0KCc9Jyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIG1lbW9bcGFydHNbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdLnJlcGxhY2UocGx1c1JlLCAnICcpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIHt9KTtcblxuICByZXR1cm4gXy5leHRlbmQocXVlcnksIHBhcmFtcyk7XG59O1xuXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLm1hdGNoaW5nUm91dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBfLmZpbmQoQmFja2JvbmUuaGlzdG9yeS5oYW5kbGVycywgZnVuY3Rpb24oaGFuZGxlcikge1xuICAgIHJldHVybiBoYW5kbGVyLnJvdXRlLnRlc3QocGF0aCk7XG4gIH0pO1xufTtcblxuQ2xpZW50Um91dGVyLnByb3RvdHlwZS5tYXRjaGVzQW55Um91dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiB0aGlzLm1hdGNoaW5nUm91dGUocGF0aCkgIT0gbnVsbDtcbn07XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUucmVkaXJlY3RUbyA9IGZ1bmN0aW9uKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIGhhc2hQYXJ0cztcblxuICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIF8uZGVmYXVsdHMob3B0aW9ucywge1xuICAgIHRyaWdnZXI6IHRydWUsXG4gICAgcHVzaFN0YXRlOiB0cnVlLFxuICAgIHJlcGxhY2U6IGZhbHNlXG4gIH0pO1xuXG4gIGlmIChvcHRpb25zLnB1c2hTdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAvLyBEbyBhIGZ1bGwtcGFnZSByZWRpcmVjdC5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG4gIH0gZWxzZSB7XG4gICAgLy8gRG8gYSBwdXNoU3RhdGUgbmF2aWdhdGlvbi5cbiAgICBoYXNoUGFydHMgPSBwYXRoLnNwbGl0KCcjJyk7XG4gICAgcGF0aCA9IGhhc2hQYXJ0c1swXTtcblxuICAgIC8vIEJ1dCB0aGVuIHRyaWdnZXIgdGhlIGhhc2ggYWZ0ZXJ3YXJkcy5cbiAgICBpZiAoaGFzaFBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMub25jZSgnYWN0aW9uOmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hQYXJ0c1sxXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIElnbm9yZSBoYXNoIGZvciByb3V0aW5nLlxuICAgIHRoaXMubmF2aWdhdGUocGF0aCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUuaGFuZGxlRXJyID0gZnVuY3Rpb24oZXJyLCByb3V0ZSkge1xuICB0aGlzLnRyaWdnZXIoJ2FjdGlvbjplcnJvcicsIGVyciwgcm91dGUpO1xufVxuXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmdldFJlbmRlckNhbGxiYWNrID0gZnVuY3Rpb24ocm91dGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVyciwgdmlld1BhdGgsIGxvY2Fscykge1xuICAgIGlmIChlcnIpIHJldHVybiB0aGlzLmhhbmRsZUVycihlcnIsIHJvdXRlKTtcblxuICAgIHZhciBWaWV3LCBfcm91dGVyID0gdGhpcztcblxuICAgIGlmICh0aGlzLmN1cnJlbnRWaWV3KSB7XG4gICAgICB0aGlzLmN1cnJlbnRWaWV3LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0cyA9IHRoaXMuZGVmYXVsdEhhbmRsZXJQYXJhbXModmlld1BhdGgsIGxvY2Fscywgcm91dGUpO1xuICAgIHZpZXdQYXRoID0gZGVmYXVsdHNbMF07XG4gICAgbG9jYWxzID0gZGVmYXVsdHNbMV07XG5cbiAgICBsb2NhbHMgPSBsb2NhbHMgfHwge307XG4gICAgXy5leHRlbmQobG9jYWxzLCB7IGZldGNoX3N1bW1hcnk6IEJhc2VWaWV3LmV4dHJhY3RGZXRjaFN1bW1hcnkodGhpcy5hcHAubW9kZWxVdGlscywgbG9jYWxzKSB9KTtcblxuICAgIC8vIEluamVjdCB0aGUgYXBwLlxuICAgIGxvY2Fscy5hcHAgPSB0aGlzLmFwcDtcbiAgICB0aGlzLmdldFZpZXcodmlld1BhdGgsIHRoaXMub3B0aW9ucy5lbnRyeVBhdGgsIGZ1bmN0aW9uKFZpZXcpIHtcbiAgICAgIF9yb3V0ZXIuY3VycmVudFZpZXcgPSBuZXcgVmlldyhsb2NhbHMpO1xuICAgICAgX3JvdXRlci5yZW5kZXJWaWV3KCk7XG5cbiAgICAgIF9yb3V0ZXIudHJpZ2dlcignYWN0aW9uOmVuZCcsIHJvdXRlLCBmaXJzdFJlbmRlcik7XG4gICAgfSk7XG4gIH0uYmluZCh0aGlzKTtcbn07XG5cbkNsaWVudFJvdXRlci5wcm90b3R5cGUucmVuZGVyVmlldyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwcFZpZXcuc2V0Q3VycmVudFZpZXcodGhpcy5jdXJyZW50Vmlldyk7XG59O1xuXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoe1xuICAgIHB1c2hTdGF0ZTogdHJ1ZSxcbiAgICBoYXNoQ2hhbmdlOiBmYWxzZSxcbiAgICByb290OiB0aGlzLm9wdGlvbnMucm9vdFBhdGggfHwgZGVmYXVsdFJvb3RQYXRoXG4gIH0pO1xufTtcblxuQ2xpZW50Um91dGVyLnByb3RvdHlwZS50cmFja0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByZXZpb3VzRnJhZ21lbnQgPSB0aGlzLmN1cnJlbnRGcmFnbWVudDtcbiAgdGhpcy5jdXJyZW50RnJhZ21lbnQgPSBCYWNrYm9uZS5oaXN0b3J5LmdldEZyYWdtZW50KCk7XG59O1xuXG5DbGllbnRSb3V0ZXIucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbihrZXksIGVudHJ5UGF0aCwgY2FsbGJhY2spIHtcbiAgdmFyIFZpZXcgPSBCYXNlVmlldy5nZXRWaWV3KGtleSwgZW50cnlQYXRoLCBmdW5jdGlvbihWaWV3KSB7XG4gICAgLy8gVE9ETzogTWFrZSBpdCBmdW5jdGlvbiAoZXJyLCBWaWV3KVxuICAgIGlmICghXy5pc0Z1bmN0aW9uKFZpZXcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3ICdcIiArIGtleSArIFwiJyBub3QgZm91bmQuXCIpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKFZpZXcpO1xuICB9KTtcbn07XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIGFwcCBpbnN0YW5jZSB0aGF0IGlzIHNoYXJlZCBiZXR3ZWVuIGNsaWVudCBhbmQgc2VydmVyLlxuICogVGhlIGNsaWVudCBhbHNvIHN1YmNsYXNzZXMgaXQgZm9yIGNsaWVudC1zcGVjaWZpYyBzdHVmZi5cbiAqL1xuXG52YXIgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICAgIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgRmV0Y2hlciA9IHJlcXVpcmUoJy4vZmV0Y2hlcicpLFxuICAgIE1vZGVsVXRpbHMgPSByZXF1aXJlKCcuL21vZGVsVXRpbHMnKSxcbiAgICBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyksXG4gICAgQ2xpZW50Um91dGVyO1xuXG5pZiAoIWlzU2VydmVyKSB7XG4gIENsaWVudFJvdXRlciA9IHJlcXVpcmUoJ2FwcC9yb3V0ZXInKTtcbiAgQmFja2JvbmUuJCA9IHdpbmRvdy4kIHx8IHJlcXVpcmUoJ2pxdWVyeScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cbiAgZGVmYXVsdHM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICB0ZW1wbGF0ZUVuZ2luZTogJ2hhbmRsZWJhcnMnLFxuICAgIHRlbXBsYXRlQWRhcHRlcjogJ3JlbmRyLWhhbmRsZWJhcnMnXG4gIH0sXG5cbiAgLy8gU2V0IGtleXMgdG8gdW5kZWZpbmVkIHNvIHJ1bnRpbWUgVjggaXMgaGFwcGllclxuICB0ZW1wbGF0ZUFkYXB0ZXI6IHVuZGVmaW5lZCxcbiAgcmVxOiB1bmRlZmluZWQsXG4gIG1vZGVsVXRpbHM6IHVuZGVmaW5lZCxcbiAgZmV0Y2hlcjogdW5kZWZpbmVkLFxuXG4gIC8qKlxuICAgKiBAc2hhcmVkXG4gICAqL1xuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oYXR0cmlidXRlcywgb3B0aW9ucykge1xuICAgIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzIHx8IHt9O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgZW50cnlQYXRoID0gdGhpcy5vcHRpb25zLmVudHJ5UGF0aCB8fCAnJztcbiAgICBpZiAoIWlzU2VydmVyKSB7XG4gICAgICAvLyB0aGUgZW50cnkgcGF0aCBtdXN0IGFsd2F5cyBiZSBlbXB0eSBmb3IgdGhlIGNsaWVudFxuICAgICAgZW50cnlQYXRoID0gICcnO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWxVdGlscyA9IHRoaXMub3B0aW9ucy5tb2RlbFV0aWxzIHx8IG5ldyBNb2RlbFV0aWxzKGVudHJ5UGF0aCk7XG5cbiAgICAvKipcbiAgICAgKiBPbiB0aGUgc2VydmVyLXNpZGUsIHlvdSBjYW4gYWNjZXNzIHRoZSBFeHByZXNzIHJlcXVlc3QsIGByZXFgLlxuICAgICAqL1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxKSB7XG4gICAgICB0aGlzLnJlcSA9IHRoaXMub3B0aW9ucy5yZXE7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplVGVtcGxhdGVBZGFwdGVyKGVudHJ5UGF0aCwgYXR0cmlidXRlcyk7XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50aWF0ZSB0aGUgYEZldGNoZXJgLCB3aGljaCBpcyB1c2VkIG9uIGNsaWVudCBhbmQgc2VydmVyLlxuICAgICAqL1xuICAgIHRoaXMuZmV0Y2hlciA9IG5ldyBGZXRjaGVyKHtcbiAgICAgIGFwcDogdGhpc1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgYENsaWVudFJvdXRlcmAgb24gdGhlIGNsaWVudC1zaWRlLlxuICAgICAqL1xuICAgIGlmICghaXNTZXJ2ZXIpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuQ2xpZW50Um91dGVyKSB7XG4gICAgICAgIENsaWVudFJvdXRlciA9IHRoaXMub3B0aW9ucy5DbGllbnRSb3V0ZXI7XG4gICAgICB9XG5cbiAgICAgIG5ldyBDbGllbnRSb3V0ZXIoe1xuICAgICAgICBhcHA6IHRoaXMsXG4gICAgICAgIGVudHJ5UGF0aDogZW50cnlQYXRoLFxuICAgICAgICBhcHBWaWV3Q2xhc3M6IHRoaXMuZ2V0QXBwVmlld0NsYXNzKCksXG4gICAgICAgIHJvb3RQYXRoOiBhdHRyaWJ1dGVzLnJvb3RQYXRoXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBCYWNrYm9uZS5Nb2RlbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAc2hhcmVkXG4gICAqXG4gICAqIEluaXRpYWxpemUgdGhlIGB0ZW1wbGF0ZUFkYXB0ZXJgLCBhbGxvd2luZyBhcHBsaWNhdGlvbiBkZXZlbG9wZXJzIHRvIHVzZSB3aGljaGV2ZXJcbiAgICogdGVtcGxhdGluZyBzeXN0ZW0gdGhleSB3YW50LlxuICAgKlxuICAgKiBXZSBjYW4ndCB1c2UgYHRoaXMuZ2V0KCd0ZW1wbGF0ZUFkYXB0ZXInKWAgaGVyZSBiZWNhdXNlIGBCYWNrYm9uZS5Nb2RlbGAnc1xuICAgKiBjb25zdHJ1Y3RvciBoYXMgbm90IHlldCBiZWVuIGNhbGxlZC5cbiAgICovXG4gIGluaXRpYWxpemVUZW1wbGF0ZUFkYXB0ZXI6IGZ1bmN0aW9uKGVudHJ5UGF0aCwgYXR0cmlidXRlcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGVtcGxhdGVBZGFwdGVySW5zdGFuY2UpIHtcbiAgICAgIHRoaXMudGVtcGxhdGVBZGFwdGVyID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlQWRhcHRlckluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGVtcGxhdGVBZGFwdGVyTW9kdWxlID0gYXR0cmlidXRlcy50ZW1wbGF0ZUFkYXB0ZXIgfHwgdGhpcy5kZWZhdWx0cy50ZW1wbGF0ZUFkYXB0ZXIsXG4gICAgICAgIHRlbXBsYXRlQWRhcHRlck9wdGlvbnMgPSB7ZW50cnlQYXRoOiBlbnRyeVBhdGh9LFxuICAgICAgICB0ZW1wbGF0ZUVuZ2luZSA9IHJlcXVpcmUoYXR0cmlidXRlcy50ZW1wbGF0ZUVuZ2luZSB8fCB0aGlzLmRlZmF1bHRzLnRlbXBsYXRlRW5naW5lKTtcblxuICAgICAgdGVtcGxhdGVBZGFwdGVyT3B0aW9ucyA9IHRoaXMuc2V0VGVtcGxhdGVGaW5kZXIodGVtcGxhdGVBZGFwdGVyT3B0aW9ucyk7XG4gICAgICB0aGlzLnRlbXBsYXRlQWRhcHRlciA9IHJlcXVpcmUodGVtcGxhdGVBZGFwdGVyTW9kdWxlKSh0ZW1wbGF0ZUFkYXB0ZXJPcHRpb25zLCB0ZW1wbGF0ZUVuZ2luZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAc2hhcmVkXG4gICAqIE92ZXJyaWRlIHRoaXMgaW4gYXBwL2FwcCB0byByZXR1cm4gYSBjdXN0b20gdGVtcGxhdGUgZmluZGVyXG4gICAqL1xuICBnZXRUZW1wbGF0ZUZpbmRlcjogXy5ub29wLFxuXG4gIC8qKlxuICAgKiBAc2hhcmVkXG4gICAqL1xuICBzZXRUZW1wbGF0ZUZpbmRlcjogZnVuY3Rpb24odGVtcGxhdGVBZGFwdGVyT3B0aW9ucykge1xuICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5nZXRUZW1wbGF0ZUZpbmRlcikgJiYgdGhpcy5nZXRUZW1wbGF0ZUZpbmRlciAhPT0gXy5ub29wKSB7XG4gICAgICB0ZW1wbGF0ZUFkYXB0ZXJPcHRpb25zLnRlbXBsYXRlRmluZGVyID0gdGhpcy5nZXRUZW1wbGF0ZUZpbmRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGVBZGFwdGVyT3B0aW9ucztcbiAgfSxcblxuICAvKipcbiAgICogQHNoYXJlZFxuICAgKi9cbiAgZmV0Y2g6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZmV0Y2hlci5mZXRjaC5hcHBseSh0aGlzLmZldGNoZXIsIGFyZ3VtZW50cyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBjbGllbnRcbiAgICovXG4gIGdldEFwcFZpZXdDbGFzczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXF1aXJlKCcuLi9jbGllbnQvYXBwX3ZpZXcnKTtcbiAgfSxcblxuICAvKipcbiAgICogQGNsaWVudFxuICAgKi9cbiAgYm9vdHN0cmFwRGF0YTogZnVuY3Rpb24obW9kZWxNYXAsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5mZXRjaGVyLmJvb3RzdHJhcERhdGEobW9kZWxNYXAsIGNhbGxiYWNrKTtcbiAgfSxcblxuICAvKipcbiAgICogQGNsaWVudFxuICAgKi9cbiAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucm91dGVyLnN0YXJ0KCk7XG4gICAgdGhpcy50cmlnZ2VyKCdzdGFydCcpO1xuICB9XG59KTtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBzeW5jZXIgPSByZXF1aXJlKCcuLi9zeW5jZXInKSxcbiAgICBCYXNlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyksXG4gICAgU3VwZXIgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLFxuICAgIGlzU2VydmVyID0gKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKTtcblxuaWYgKCFpc1NlcnZlcikge1xuICBCYWNrYm9uZS4kID0gd2luZG93LiQgfHwgcmVxdWlyZSgnanF1ZXJ5Jyk7XG59XG5cbnZhciBCYXNlQ29sbGVjdGlvbiA9IFN1cGVyLmV4dGVuZCh7XG5cbiAgbW9kZWw6IEJhc2VNb2RlbCxcbiAgcGFyYW1zOiB1bmRlZmluZWQsXG4gIG1ldGE6IHVuZGVmaW5lZCxcblxuICAvKipcbiAgICogUHJvdmlkZSB0aGUgYWJpbGl0eSB0byBzZXQgZGVmYXVsdCBwYXJhbXMgZm9yIGV2ZXJ5ICdmZXRjaCcgY2FsbC5cbiAgICovXG4gIGRlZmF1bHRQYXJhbXM6IG51bGwsXG5cbiAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKG1vZGVscywgb3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqIENhcHR1cmUgdGhlIG9wdGlvbnMgYXMgaW5zdGFuY2UgdmFyaWFibGUuXG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBhcHAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgdGhpcy5hcHAgPSB0aGlzLm9wdGlvbnMuYXBwO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmFtcyB0aGF0IHdlcmUgdXNlZCB0b1xuICAgICAqIHF1ZXJ5IGZvciB0aGVzZSBtb2RlbHMuXG4gICAgICovXG4gICAgdGhpcy5wYXJhbXMgPSB0aGlzLm9wdGlvbnMucGFyYW1zIHx8IHt9O1xuICAgIF8uZGVmYXVsdHModGhpcy5wYXJhbXMsIHRoaXMuZGVmYXVsdFBhcmFtcyB8fCB7fSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgJ21ldGEnIHByb3BlcnR5IHRvIHN0b3JlIHRoZSBwYXJ0cyBvZiB0aGUgcmVzcG9uc2VcbiAgICAgKiB0aGF0IGFyZW4ndCBwYXJ0IG9mIHRoZSBqc29uS2V5LlxuICAgICAqL1xuICAgIHRoaXMubWV0YSA9IHt9O1xuICAgIGlmIChfLmlzT2JqZWN0KHRoaXMub3B0aW9ucy5tZXRhKSkge1xuICAgICAgXy5leHRlbmQodGhpcy5tZXRhLCB0aGlzLm9wdGlvbnMubWV0YSk7XG4gICAgICBkZWxldGUgdGhpcy5vcHRpb25zLm1ldGE7XG4gICAgfVxuXG4gICAgU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUoKTtcbiAgfSxcblxuICAvKipcbiAgICogTWFrZSBzdXJlIHRoYXQgYG1vZGVsLmFwcGAgaXMgc2V0IGZvciBhbGwgb3BlcmF0aW9ucyBsaWtlXG4gICAqIGB0aGlzLmFkZCgpYCwgYHRoaXMucmVzZXQoKWAsIGB0aGlzLnNldCgpYCwgYHRoaXMucHVzaCgpYCwgZXRjLlxuICAgKi9cbiAgX3ByZXBhcmVNb2RlbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGVsO1xuICAgIG1vZGVsID0gU3VwZXIucHJvdG90eXBlLl9wcmVwYXJlTW9kZWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBtb2RlbC5hcHAgPSB0aGlzLmFwcDtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIElkZW1wb3RlbnQgcGFyc2VcbiAgICovXG4gIHBhcnNlOiBmdW5jdGlvbihyZXNwLCBtb2RpZnlJbnN0YW5jZSkge1xuICAgIHZhciBqc29uUmVzcCwgbWV0YSwgcGFyc2VkO1xuXG4gICAgaWYgKG1vZGlmeUluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIG1vZGlmeUluc3RhbmNlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHJlc3AgIT0gbnVsbCAmJiB0aGlzLmpzb25LZXkgJiYgKGpzb25SZXNwID0gcmVzcFt0aGlzLmpzb25LZXldKSkge1xuICAgICAgaWYgKG1vZGlmeUluc3RhbmNlKSB7XG4gICAgICAgIG1ldGEgPSBfLm9taXQocmVzcCwgdGhpcy5qc29uS2V5KTtcbiAgICAgICAgXy5leHRlbmQodGhpcy5tZXRhLCBtZXRhKTtcbiAgICAgIH1cbiAgICAgIHBhcnNlZCA9IGpzb25SZXNwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWQgPSByZXNwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJzZU1vZGVscyhwYXJzZWQpO1xuICB9LFxuXG4gIHBhcnNlTW9kZWxzOiBmdW5jdGlvbihyZXNwKSB7XG4gICAgdmFyIGpzb25LZXksIGpzb25LZXlSZXNwO1xuXG4gICAgcmVzcCA9IF8uY2xvbmUocmVzcCk7XG4gICAganNvbktleSA9IHRoaXMubW9kZWwucHJvdG90eXBlLmpzb25LZXk7XG4gICAgXy5lYWNoKHJlc3AsIGZ1bmN0aW9uKG1vZGVsUmVzcCwgaSkge1xuICAgICAganNvbktleVJlc3AgPSBtb2RlbFJlc3BbanNvbktleV07XG4gICAgICBpZiAoanNvbktleVJlc3ApIHtcbiAgICAgICAgcmVzcFtpXSA9IGpzb25LZXlSZXNwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXNwO1xuICB9LFxuXG4gIGZldGNoOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAvLyBFYWNoIHRpbWUgbmV3IG1vZGVscyBhcmUgZmV0Y2hlZCwgc3RvcmUgdGhlIHBhcmFtcyB1c2VkLlxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIF8uZGVmYXVsdHMob3B0aW9ucy5kYXRhLCB0aGlzLmRlZmF1bHRQYXJhbXMgfHwge30pO1xuICAgICAgdGhpcy5wYXJhbXMgPSBvcHRpb25zLmRhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN1cGVyLnByb3RvdHlwZS5mZXRjaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSBtZXRob2QgdG8gc3RvcmUgdGhlIGNvbGxlY3Rpb24gYW5kIGl0cyBtb2RlbHMuXG4gICAqL1xuICBzdG9yZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYXBwICYmIHRoaXMuYXBwLmZldGNoZXIpIHtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihtb2RlbCkge1xuICAgICAgICBtb2RlbC5zdG9yZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFwcC5mZXRjaGVyLmNvbGxlY3Rpb25TdG9yZS5zZXQodGhpcyk7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBNaXgtaW4gdGhlIGBzeW5jZXJgLCBzaGFyZWQgYmV0d2VlbiBgQmFzZU1vZGVsYCBhbmQgYEJhc2VDb2xsZWN0aW9uYCwgd2hpY2hcbiAqIGVuY2Fwc3VsYXRlcyBsb2dpYyBmb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUEkuXG4gKi9cbl8uZXh0ZW5kKEJhc2VDb2xsZWN0aW9uLnByb3RvdHlwZSwgc3luY2VyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlQ29sbGVjdGlvbjtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBzeW5jZXIgPSByZXF1aXJlKCcuLi9zeW5jZXInKSxcbiAgICBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyk7XG5cbmlmICghaXNTZXJ2ZXIpIHtcbiAgQmFja2JvbmUuJCA9IHdpbmRvdy4kIHx8IHJlcXVpcmUoJ2pxdWVyeScpO1xufVxuXG52YXIgQmFzZU1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcblxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oYXR0cmlidXRlcywgb3B0aW9ucykge1xuICAgIC8vIENhcHR1cmUgdGhlIG9wdGlvbnMgYXMgaW5zdGFuY2UgdmFyaWFibGUuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBhcHAgaW5zdGFuY2UuXG4gICAgdGhpcy5hcHAgPSB0aGlzLm9wdGlvbnMuYXBwO1xuXG4gICAgaWYgKCF0aGlzLmFwcCAmJiB0aGlzLm9wdGlvbnMuY29sbGVjdGlvbikge1xuICAgICAgdGhpcy5hcHAgPSB0aGlzLm9wdGlvbnMuY29sbGVjdGlvbi5hcHA7XG4gICAgfVxuXG4gICAgQmFja2JvbmUuTW9kZWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUoKTtcbiAgICB0aGlzLm9uKCdjaGFuZ2U6JyArIHRoaXMuaWRBdHRyaWJ1dGUsIHRoaXMuc3RvcmUsIHRoaXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJZGVtcG90ZW50IHBhcnNlXG4gICAqL1xuICBwYXJzZTogZnVuY3Rpb24ocmVzcCkge1xuICAgIGlmIChyZXNwICE9IG51bGwgJiYgdGhpcy5qc29uS2V5KSB7XG4gICAgICByZXR1cm4gcmVzcFt0aGlzLmpzb25LZXldIHx8IHJlc3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNwO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSW5zdGFuY2UgbWV0aG9kIHRvIHN0b3JlIGluIHRoZSBtb2RlbFN0b3JlLlxuICAgKi9cbiAgc3RvcmU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmlkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hcHAgJiYgdGhpcy5hcHAuZmV0Y2hlcikge1xuICAgICAgdGhpcy5hcHAuZmV0Y2hlci5tb2RlbFN0b3JlLnNldCh0aGlzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIE1peC1pbiB0aGUgYHN5bmNlcmAsIHNoYXJlZCBiZXR3ZWVuIGBCYXNlTW9kZWxgIGFuZCBgQmFzZUNvbGxlY3Rpb25gLCB3aGljaFxuICogZW5jYXBzdWxhdGVzIGxvZ2ljIGZvciBmZXRjaGluZyBkYXRhIGZyb20gdGhlIEFQSS5cbiAqL1xuXy5leHRlbmQoQmFzZU1vZGVsLnByb3RvdHlwZSwgc3luY2VyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlTW9kZWw7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKSxcbiAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuICBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyksXG4gIGlzQU1ERW52aXJvbm1lbnQgPSAhaXNTZXJ2ZXIgJiYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnKSxcbiAgbG9hZE51bWJlciA9IDA7XG5cbmlmICghaXNTZXJ2ZXIpIHtcbiAgQmFja2JvbmUuJCA9IHdpbmRvdy4kIHx8IHJlcXVpcmUoJ2pxdWVyeScpO1xufVxuXG5cbmZ1bmN0aW9uIHN0cmluZ1JvdXRlRGVmaW5pdGlvblRvT2JqZWN0KGVsZW1lbnQpIHtcbiAgdmFyIHBhcnRzID0gZWxlbWVudC5zcGxpdCgnIycpO1xuICByZXR1cm4ge1xuICAgIGNvbnRyb2xsZXI6IHBhcnRzWzBdLFxuICAgIGFjdGlvbjogcGFydHNbMV1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSb3V0ZURlZmluaXRpb25zKGRlZmluaXRpb25zKSB7XG4gIHJldHVybiBkZWZpbml0aW9ucy5yZWR1Y2UoZnVuY3Rpb24ocm91dGUsIGVsZW1lbnQpIHtcbiAgICBpZiAoXy5pc1N0cmluZyhlbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IHN0cmluZ1JvdXRlRGVmaW5pdGlvblRvT2JqZWN0KGVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gXy5leHRlbmQocm91dGUsIGVsZW1lbnQpO1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogQmFzZSByb3V0ZXIgY2xhc3Mgc2hhcmVkIGJldHdlZW4gQ2xpZW50Um91dGVyIGFuZCBTZXJ2ZXJSb3V0ZXIuXG4gKi9cbmZ1bmN0aW9uIEJhc2VSb3V0ZXIob3B0aW9ucykge1xuICB0aGlzLnJvdXRlID0gdGhpcy5yb3V0ZS5iaW5kKHRoaXMpO1xuICB0aGlzLl9yb3V0ZXMgPSBbXTtcbiAgdGhpcy5faW5pdE9wdGlvbnMob3B0aW9ucyk7XG59XG5cbl8uZXh0ZW5kKEJhc2VSb3V0ZXIucHJvdG90eXBlLCBCYWNrYm9uZS5FdmVudHMsIHtcbiAgLyoqXG4gICAqIENvbmZpZ1xuICAgKiAgIC0gZXJyb3JIYW5kbGVyOiBmdW5jdGlvbiB0byBjb3JyZWN0bHkgaGFuZGxlIGVycm9yXG4gICAqICAgLSBwYXRoc1xuICAgKiAgICAgLSBlbnRyeVBhdGggKHJlcXVpcmVkKVxuICAgKiAgICAgLSByb3V0ZXMgKG9wdGlvbmFsKVxuICAgKiAgICAgLSBjb250cm9sbGVyRGlyIChvcHRpb25hbClcbiAgICovXG4gIG9wdGlvbnM6IG51bGwsXG5cbiAgLyoqXG4gICAqIEludGVybmFsbHkgc3RvcmVkIHJvdXRlIGRlZmluaXRpb25zLlxuICAgKi9cbiAgX3JvdXRlczogbnVsbCxcblxuICByZXZlcnNlUm91dGVzOiBmYWxzZSxcblxuICBpbml0aWFsaXplOiBfLm5vb3AsXG5cbiAgX2luaXRPcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGVudHJ5UGF0aDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucGF0aHMgPSBvcHRpb25zLnBhdGhzIHx8IHt9O1xuXG4gICAgZW50cnlQYXRoID0gb3B0aW9ucy5wYXRocy5lbnRyeVBhdGggfHwgb3B0aW9ucy5lbnRyeVBhdGg7XG4gICAgb3B0aW9ucy5wYXRocyA9IF8uZGVmYXVsdHMob3B0aW9ucy5wYXRocywge1xuICAgICAgZW50cnlQYXRoOiBlbnRyeVBhdGgsXG4gICAgICByb3V0ZXM6IGVudHJ5UGF0aCArICdhcHAvcm91dGVzJyxcbiAgICAgIGNvbnRyb2xsZXJEaXI6IGVudHJ5UGF0aCArICdhcHAvY29udHJvbGxlcnMnXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9LFxuXG4gIGdldENvbnRyb2xsZXJQYXRoOiBmdW5jdGlvbihjb250cm9sbGVyTmFtZSkge1xuICAgIHZhciBjb250cm9sbGVyRGlyID0gdGhpcy5vcHRpb25zLnBhdGhzLmNvbnRyb2xsZXJEaXI7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXJEaXIgKyAnLycgKyBjb250cm9sbGVyTmFtZSArICdfY29udHJvbGxlcic7XG4gIH0sXG5cbiAgbG9hZENvbnRyb2xsZXI6IGZ1bmN0aW9uKGNvbnRyb2xsZXJOYW1lKSB7XG4gICAgdmFyIGNvbnRyb2xsZXJQYXRoID0gdGhpcy5nZXRDb250cm9sbGVyUGF0aChjb250cm9sbGVyTmFtZSk7XG4gICAgcmV0dXJuIHJlcXVpcmUoY29udHJvbGxlclBhdGgpO1xuICB9LFxuXG4gIGdldEFjdGlvbjogZnVuY3Rpb24ocm91dGUpIHtcbiAgICB2YXIgY29udHJvbGxlciwgYWN0aW9uO1xuXG4gICAgaWYgKHJvdXRlLmNvbnRyb2xsZXIpIHtcbiAgICAgIGlmIChpc0FNREVudmlyb25tZW50KSB7XG4gICAgICAgIGFjdGlvbiA9IHRoaXMuZ2V0Q29udHJvbGxlclBhdGgocm91dGUuY29udHJvbGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250cm9sbGVyID0gdGhpcy5sb2FkQ29udHJvbGxlcihyb3V0ZS5jb250cm9sbGVyKTtcbiAgICAgICAgYWN0aW9uID0gY29udHJvbGxlcltyb3V0ZS5hY3Rpb25dO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH0sXG5cbiAgZ2V0UmVkaXJlY3Q6IGZ1bmN0aW9uKHJvdXRlLCBwYXJhbXMpIHtcbiAgICB2YXIgcmVkaXJlY3QgPSByb3V0ZS5yZWRpcmVjdDtcblxuICAgIGlmICh0eXBlb2YgcmVkaXJlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZGlyZWN0ID0gcmVkaXJlY3QocGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVkaXJlY3Q7XG4gIH0sXG5cbiAgZ2V0Um91dGVCdWlsZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmVxdWlyZSh0aGlzLm9wdGlvbnMucGF0aHMucm91dGVzKTtcbiAgfSxcblxuICBidWlsZFJvdXRlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvdXRlQnVpbGRlciA9IHRoaXMuZ2V0Um91dGVCdWlsZGVyKCksXG4gICAgICByb3V0ZXMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNhcHR1cmVSb3V0ZXMoKSB7XG4gICAgICByb3V0ZXMucHVzaChfLnRvQXJyYXkoYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgcm91dGVCdWlsZGVyKGNhcHR1cmVSb3V0ZXMpO1xuICAgIGlmICh0aGlzLnJldmVyc2VSb3V0ZXMpIHtcbiAgICAgIHJvdXRlcyA9IHJvdXRlcy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgcm91dGVzLmZvckVhY2godGhpcy5hZGRSb3V0ZURlZmluaXRpb24sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXMucm91dGVzKCk7XG4gIH0sXG5cbiAgYWRkUm91dGVEZWZpbml0aW9uOiBmdW5jdGlvbihyb3V0ZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJvdXRlLmFwcGx5KHRoaXMsIHJvdXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZXJyb3IubWVzc2FnZSA9ICdFcnJvciBidWlsZGluZyByb3V0ZXMgKCcgKyBlcnJvci5tZXNzYWdlICsgJyknO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29weSBvZiBjdXJyZW50IHJvdXRlIGRlZmluaXRpb25zLlxuICAgKi9cbiAgcm91dGVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcm91dGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKHJvdXRlKSB7XG4gICAgICByZXR1cm4gcm91dGUuc2xpY2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHBhc3NlZCB0byByb3V0ZXMgZmlsZSB0byBidWlsZCB1cCByb3V0ZXMgZGVmaW5pdGlvbi5cbiAgICogQWRkcyBhIHNpbmdsZSByb3V0ZSBkZWZpbml0aW9uLlxuICAgKi9cbiAgcm91dGU6IGZ1bmN0aW9uKHBhdHRlcm4sIGNvbnRyb2xsZXIsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVhbEFjdGlvbiwgYWN0aW9uLCBoYW5kbGVyLCByb3V0ZSwgcm91dGVPYmosIHJvdXRlckNvbnRleHQgPSB0aGlzO1xuXG4gICAgcm91dGUgPSBwYXJzZVJvdXRlRGVmaW5pdGlvbnMoW2NvbnRyb2xsZXIsIG9wdGlvbnNdKTtcbiAgICByZWFsQWN0aW9uID0gdGhpcy5nZXRBY3Rpb24ocm91dGUpO1xuXG4gICAgaWYgKGlzU2VydmVyKSB7XG4gICAgICBhY3Rpb24gPSByZWFsQWN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb24gPSBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG15TG9hZE51bWJlciA9ICsrbG9hZE51bWJlcjtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAvLyBUbyBwcmV2ZW50IHJhY2UgY29uZGl0aW9ucyB3ZSBlbnN1cmUgdGhhdCBubyBmdXR1cmUgcmVxdWVzdHMgaGF2ZSBiZWVuIHByb2Nlc3NlZCBpbiB0aGUgbWVhbiB0aW1lLlxuICAgICAgICAgIGlmIChteUxvYWROdW1iZXIgPT09IGxvYWROdW1iZXIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGluIEFNRCBlbnZpcm9ubWVudCByZWFsQWN0aW9uIGlzIHRoZSBzdHJpbmcgY29udGFpbmluZyBwYXRoIHRvIHRoZSBjb250cm9sbGVyXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgYmUgbG9hZGVkIGFzeW5jIChtaWdodCBiZSBwcmVsb2FkZWQpXG4gICAgICAgIC8vIE9ubHkgdXNlZCBpbiBBTUQgZW52aXJvbm1lbnRcbiAgICAgICAgaWYgKHR5cGVvZiByZWFsQWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJvdXRlckNvbnRleHQuX3JlcXVpcmVBTUQoW3JlYWxBY3Rpb25dLCBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAvLyBjaGVjayB3ZSBoYXZlIGV2ZXJ5dGhpbmcgd2UgbmVlZFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sbGVyW3JvdXRlLmFjdGlvbl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGFjdGlvbiBcXFwiXCIgKyByb3V0ZS5hY3Rpb24gKyBcIlxcXCIgZm9yIGNvbnRyb2xsZXIgXFxcIlwiICsgcm91dGUuY29udHJvbGxlciArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRyb2xsZXJbcm91dGUuYWN0aW9uXS5jYWxsKHNlbGYsIHBhcmFtcywgbmV4dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVhbEFjdGlvbi5jYWxsKHNlbGYsIHBhcmFtcywgbmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIShwYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwKSAmJiBwYXR0ZXJuLnNsaWNlKDAsIDEpICE9PSAnLycpIHtcbiAgICAgIHBhdHRlcm4gPSBcIi9cIiArIHBhdHRlcm47XG4gICAgfVxuXG4gICAgaGFuZGxlciA9IHRoaXMuZ2V0SGFuZGxlcihhY3Rpb24sIHBhdHRlcm4sIHJvdXRlKTtcbiAgICByb3V0ZU9iaiA9IFtwYXR0ZXJuLCByb3V0ZSwgaGFuZGxlcl07XG5cbiAgICB0aGlzLl9yb3V0ZXMucHVzaChyb3V0ZU9iaik7XG4gICAgdGhpcy50cmlnZ2VyKCdyb3V0ZTphZGQnLCByb3V0ZU9iaik7XG5cbiAgICByZXR1cm4gcm91dGVPYmo7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGV4cG9zaW5nIGZvciBtb2NraW5nIGluIHRlc3RcbiAgICovXG4gIF9yZXF1aXJlQU1EOiByZXF1aXJlLFxuXG4gIC8qKlxuICAgKiBTdXBwb3J0IG9taXR0aW5nIHZpZXcgcGF0aDsgZGVmYXVsdCBpdCB0byBcIjpjb250cm9sbGVyLzphY3Rpb25cIi5cbiAgICovXG4gIGRlZmF1bHRIYW5kbGVyUGFyYW1zOiBmdW5jdGlvbih2aWV3UGF0aCwgbG9jYWxzLCByb3V0ZSkge1xuICAgIGlmICh0eXBlb2Ygdmlld1BhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2NhbHMgPSB2aWV3UGF0aDtcbiAgICAgIHZpZXdQYXRoID0gcm91dGUuY29udHJvbGxlciArICcvJyArIHJvdXRlLmFjdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIFt2aWV3UGF0aCwgbG9jYWxzXTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kcyB0byBiZSBleHRlbmRlZCBieSBzdWJjbGFzc2VzLlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgZ2V0SGFuZGxlcjogXy5ub29wXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlUm91dGVyO1xubW9kdWxlLmV4cG9ydHMuc2V0QU1ERW52aXJvbm1lbnQgPSBmdW5jdGlvbihmbGFnKSB7XG4gIGlzQU1ERW52aXJvbm1lbnQgPSBmbGFnO1xufTtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKSxcbiAgICBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyksXG4gICAgTW9kZWxTdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUvbW9kZWxfc3RvcmUnKSxcbiAgICBDb2xsZWN0aW9uU3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlL2NvbGxlY3Rpb25fc3RvcmUnKSxcbiAgICBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyk7XG5cbmlmICghaXNTZXJ2ZXIpIHtcbiAgQmFja2JvbmUuJCA9IHdpbmRvdy4kIHx8IHJlcXVpcmUoJ2pxdWVyeScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZldGNoZXI7XG5cbmZ1bmN0aW9uIEZldGNoZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLmFwcCA9IHRoaXMub3B0aW9ucy5hcHA7XG4gIHRoaXMubW9kZWxVdGlscyA9IHRoaXMuYXBwLm1vZGVsVXRpbHM7XG4gIHRoaXMubW9kZWxTdG9yZSA9IG5ldyBNb2RlbFN0b3JlKHtcbiAgICBhcHA6IHRoaXMuYXBwLFxuICAgIG1vZGVsVXRpbHM6IHRoaXMubW9kZWxVdGlsc1xuICB9KTtcbiAgdGhpcy5jb2xsZWN0aW9uU3RvcmUgPSBuZXcgQ29sbGVjdGlvblN0b3JlKHtcbiAgICBhcHA6IHRoaXMuYXBwLFxuICAgIG1vZGVsVXRpbHM6IHRoaXMubW9kZWxVdGlsc1xuICB9KTtcbn1cblxuRmV0Y2hlci5wcm90b3R5cGUuYnVpbGRPcHRpb25zID0gZnVuY3Rpb24oYWRkaXRpb25hbE9wdGlvbnMsIHBhcmFtcykge1xuICB2YXIgb3B0aW9ucyA9IHthcHA6IHRoaXMuYXBwLCBwYXJzZTogdHJ1ZX07XG4gIF8uZGVmYXVsdHMob3B0aW9ucywgYWRkaXRpb25hbE9wdGlvbnMpO1xuICBfLmRlZmF1bHRzKG9wdGlvbnMsIHBhcmFtcyk7XG4gIHJldHVybiBvcHRpb25zO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIE1vZGVsIG9yIENvbGxlY3Rpb24uXG4gKi9cbkZldGNoZXIucHJvdG90eXBlLmdldE1vZGVsT3JDb2xsZWN0aW9uRm9yU3BlYyA9IGZ1bmN0aW9uKHNwZWMsIGF0dHJzT3JNb2RlbHMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmIChzcGVjLm1vZGVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TW9kZWxGb3JTcGVjKHNwZWMsIGF0dHJzT3JNb2RlbHMsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb2xsZWN0aW9uRm9yU3BlYyhzcGVjLCBhdHRyc09yTW9kZWxzLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBDb2xsZWN0aW9uLlxuICovXG5GZXRjaGVyLnByb3RvdHlwZS5nZXRDb2xsZWN0aW9uRm9yU3BlYyA9IGZ1bmN0aW9uKHNwZWMsIG1vZGVscywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIGNvbGxlY3Rpb25PcHRpb25zID0gdGhpcy5idWlsZE9wdGlvbnMob3B0aW9ucywgXy5leHRlbmQoe3BhcmFtczogc3BlYy5wYXJhbXN9LCBzcGVjLnBhcmFtcykpO1xuICBtb2RlbHMgPSBtb2RlbHMgfHwgW107XG4gIHJldHVybiB0aGlzLm1vZGVsVXRpbHMuZ2V0Q29sbGVjdGlvbihzcGVjLmNvbGxlY3Rpb24sIG1vZGVscywgY29sbGVjdGlvbk9wdGlvbnMsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBNb2RlbC5cbiAqL1xuRmV0Y2hlci5wcm90b3R5cGUuZ2V0TW9kZWxGb3JTcGVjID0gZnVuY3Rpb24oc3BlYywgYXR0cmlidXRlcywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIG1vZGVsT3B0aW9ucyA9IHRoaXMuYnVpbGRPcHRpb25zKG9wdGlvbnMpO1xuXG4gIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzIHx8IHt9O1xuICBfLmRlZmF1bHRzKGF0dHJpYnV0ZXMsIHNwZWMucGFyYW1zKTtcblxuICByZXR1cm4gdGhpcy5tb2RlbFV0aWxzLmdldE1vZGVsKHNwZWMubW9kZWwsIGF0dHJpYnV0ZXMsIG1vZGVsT3B0aW9ucywgY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIG1hcCBmZXRjaFNwZWNzIHRvIG1vZGVscyBhbmQgZmV0Y2ggZGF0YSBpbiBwYXJhbGxlbFxuICovXG5GZXRjaGVyLnByb3RvdHlwZS5fcmV0cmlldmUgPSBmdW5jdGlvbihmZXRjaFNwZWNzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgYmF0Y2hlZFJlcXVlc3RzID0ge307XG5cbiAgXy5lYWNoKGZldGNoU3BlY3MsIGZ1bmN0aW9uKHNwZWMsIG5hbWUpIHtcbiAgICBiYXRjaGVkUmVxdWVzdHNbbmFtZV0gPSBmdW5jdGlvbihjYikge1xuICAgICAgdmFyIG1vZGVsO1xuXG4gICAgICB2YXIgcmVhZEZyb21DYWNoZSA9IG9wdGlvbnMucmVhZEZyb21DYWNoZTtcblxuICAgICAgLy8gSWYgcHJlc2VudCwgdGhlIGluZGl2aWR1YWwgc3BlYyBjYW4gb3ZlcndyaXRlIHRoZSBmZXRjaFNwZWMuXG4gICAgICBpZiAoIV8uaXNVbmRlZmluZWQoc3BlYy5yZWFkRnJvbUNhY2hlKSAmJiAhXy5pc051bGwoc3BlYy5yZWFkRnJvbUNhY2hlKSkge1xuICAgICAgICByZWFkRnJvbUNhY2hlID0gc3BlYy5yZWFkRnJvbUNhY2hlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlYWRGcm9tQ2FjaGUpIHtcbiAgICAgICAgdGhpcy5mZXRjaEZyb21BcGkoc3BlYywgb3B0aW9ucywgY2IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZWwgPSBudWxsO1xuXG4gICAgICAgIC8vIEZpcnN0LCBzZWUgaWYgd2UgaGF2ZSBzdG9yZWQgdGhlIG1vZGVsIG9yIGNvbGxlY3Rpb24uXG4gICAgICAgIGlmIChzcGVjLm1vZGVsICE9IG51bGwpIHtcblxuICAgICAgICAgIHRoaXMuX3JldHJpZXZlTW9kZWwoc3BlYywgZnVuY3Rpb24oZXJyLCBtb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaERhdGEoc3BlYywgbW9kZWwsIG9wdGlvbnMsIGNiKTtcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoc3BlYy5jb2xsZWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25TdG9yZS5nZXQoc3BlYy5jb2xsZWN0aW9uLCBzcGVjLnBhcmFtcywgZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaERhdGEoc3BlYywgY29sbGVjdGlvbiwgb3B0aW9ucywgY2IpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpO1xuICB9LCB0aGlzKTtcbiAgYXN5bmMucGFyYWxsZWwoYmF0Y2hlZFJlcXVlc3RzLCBjYWxsYmFjayk7XG59O1xuXG5GZXRjaGVyLnByb3RvdHlwZS5fcmVmcmVzaERhdGEgPSBmdW5jdGlvbihzcGVjLCBtb2RlbE9yQ29sbGVjdGlvbiwgb3B0aW9ucywgY2IpIHtcblxuICAvLyBJZiB3ZSBmb3VuZCB0aGUgbW9kZWwvY29sbGVjdGlvbiBpbiB0aGUgc3RvcmUsIHRoZW4gcmV0dXJuIHRoYXQuXG4gIGlmICghdGhpcy5uZWVkc0ZldGNoKG1vZGVsT3JDb2xsZWN0aW9uLCBzcGVjKSkge1xuICAgIGNiKG51bGwsIG1vZGVsT3JDb2xsZWN0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvKipcbiAgICAgKiBFbHNlLCBmZXRjaCBhbmV3LlxuICAgICAqL1xuICAgIHRoaXMuZmV0Y2hGcm9tQXBpKHNwZWMsIG9wdGlvbnMsIGNiKTtcbiAgfVxufVxuXG5GZXRjaGVyLnByb3RvdHlwZS5fcmV0cmlldmVNb2RlbCA9IGZ1bmN0aW9uKHNwZWMsIGNhbGxiYWNrKSB7XG4gIHZhciBmZXRjaGVyID0gdGhpcztcblxuICAvLyBBdHRlbXB0IHRvIGZldGNoIGZyb20gdGhlIG1vZGVsU3RvcmUgYmFzZWQgb24gdGhlIGlkQXR0cmlidXRlXG4gIHRoaXMubW9kZWxVdGlscy5tb2RlbElkQXR0cmlidXRlKHNwZWMubW9kZWwsIGZ1bmN0aW9uKGlkQXR0cmlidXRlKSB7XG4gICAgdmFyIG1vZGVsID0gZmV0Y2hlci5tb2RlbFN0b3JlLmdldChzcGVjLm1vZGVsLCBzcGVjLnBhcmFtc1tpZEF0dHJpYnV0ZV0pO1xuICAgIGlmIChtb2RlbCkgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1vZGVsKTtcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBvdGhlciBrZXlzIHRoYW4gdGhlIGlkIGluIHRoZSBwYXJhbXMsIHJldHVybiBudWxsO1xuICAgIGlmIChfLmlzRW1wdHkoXy5vbWl0KHNwZWMucGFyYW1zLCBpZEF0dHJpYnV0ZSkpKVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG51bGwpO1xuXG4gICAgLy8gQXR0ZW1wdCB0byBmZXRjaCB0aGUgbW9kZWwgaW4gdGhlIG1vZGVsU3RvcmUgYmFzZWQgb24gdGhlIG90aGVyIHBhcmFtc1xuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBmZXRjaGVyLm1vZGVsU3RvcmUuZmluZChzcGVjLm1vZGVsLCBzcGVjLnBhcmFtcykpO1xuICB9KTtcbn07XG5cbkZldGNoZXIucHJvdG90eXBlLm5lZWRzRmV0Y2ggPSBmdW5jdGlvbihtb2RlbE9yQ29sbGVjdGlvbiwgc3BlYykge1xuICBpZiAobW9kZWxPckNvbGxlY3Rpb24gPT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHRoaXMubW9kZWxVdGlscy5pc01vZGVsKG1vZGVsT3JDb2xsZWN0aW9uKSAmJiB0aGlzLmlzTWlzc2luZ0tleXMobW9kZWxPckNvbGxlY3Rpb24uYXR0cmlidXRlcywgc3BlYy5lbnN1cmVLZXlzKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHNwZWMubmVlZHNGZXRjaCA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gIGlmICh0eXBlb2Ygc3BlYy5uZWVkc0ZldGNoID09PSAnZnVuY3Rpb24nICYmIHNwZWMubmVlZHNGZXRjaChtb2RlbE9yQ29sbGVjdGlvbikpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5GZXRjaGVyLnByb3RvdHlwZS5pc01pc3NpbmdLZXlzID0gZnVuY3Rpb24obW9kZWxEYXRhLCBrZXlzKSB7XG4gIHZhciBrZXk7XG5cbiAgaWYgKGtleXMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghXy5pc0FycmF5KGtleXMpKSB7XG4gICAga2V5cyA9IFtrZXlzXTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAobW9kZWxEYXRhW2tleV0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbkZldGNoZXIucHJvdG90eXBlLmZldGNoRnJvbUFwaSA9IGZ1bmN0aW9uKHNwZWMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWxPckNvbGxlY3Rpb25Gb3JTcGVjKHNwZWMpLFxuICAgICAgZmV0Y2hlciA9IHRoaXM7XG5cbiAgbW9kZWwuZmV0Y2goe1xuICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyB8fCB7fSxcbiAgICBkYXRhOiBzcGVjLnBhcmFtcyxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihtb2RlbCwgYm9keSkge1xuICAgICAgY2FsbGJhY2sobnVsbCwgbW9kZWwpO1xuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uKG1vZGVsLCByZXNwLCBvcHRpb25zKSB7XG4gICAgICB2YXIgYm9keSwgcmVzcE91dHB1dCwgZXJyO1xuXG4gICAgICBib2R5ID0gcmVzcC5ib2R5O1xuICAgICAgcmVzcC5ib2R5ID0gdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnID8gYm9keS5zbGljZSgwLCAxNTApIDogYm9keTtcbiAgICAgIHJlc3BPdXRwdXQgPSBKU09OLnN0cmluZ2lmeShyZXNwKTtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihcIkVSUk9SIGZldGNoaW5nIG1vZGVsICdcIiArIGZldGNoZXIubW9kZWxVdGlscy5tb2RlbE5hbWUobW9kZWwuY29uc3RydWN0b3IpICsgXCInIHdpdGggb3B0aW9ucyAnXCIgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zKSArIFwiJy4gUmVzcG9uc2U6IFwiICsgcmVzcE91dHB1dCk7XG4gICAgICBlcnIuc3RhdHVzID0gcmVzcC5zdGF0dXM7XG4gICAgICBlcnIuYm9keSA9IGJvZHk7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5GZXRjaGVyLnByb3RvdHlwZS5yZXRyaWV2ZU1vZGVsc0ZvckNvbGxlY3Rpb25OYW1lID0gZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUsIG1vZGVsSWRzKSB7XG4gIHZhciBtb2RlbE5hbWUgPSB0aGlzLm1vZGVsVXRpbHMuZ2V0TW9kZWxOYW1lRm9yQ29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICByZXR1cm4gdGhpcy5yZXRyaWV2ZU1vZGVscyhtb2RlbE5hbWUsIG1vZGVsSWRzKTtcbn07XG5cbkZldGNoZXIucHJvdG90eXBlLnJldHJpZXZlTW9kZWxzID0gZnVuY3Rpb24obW9kZWxOYW1lLCBtb2RlbElkcykge1xuICByZXR1cm4gbW9kZWxJZHMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxTdG9yZS5nZXQobW9kZWxOYW1lLCBpZCk7XG4gIH0sIHRoaXMpO1xufTtcblxuRmV0Y2hlci5wcm90b3R5cGUuc3VtbWFyaXplID0gZnVuY3Rpb24obW9kZWxPckNvbGxlY3Rpb24pIHtcbiAgdmFyIHN1bW1hcnkgPSB7fSxcbiAgICAgIGlkQXR0cmlidXRlO1xuXG4gIGlmICh0aGlzLm1vZGVsVXRpbHMuaXNDb2xsZWN0aW9uKG1vZGVsT3JDb2xsZWN0aW9uKSkge1xuICAgIGlkQXR0cmlidXRlID0gbW9kZWxPckNvbGxlY3Rpb24ubW9kZWwucHJvdG90eXBlLmlkQXR0cmlidXRlO1xuICAgIHN1bW1hcnkgPSB7XG4gICAgICBjb2xsZWN0aW9uOiB0aGlzLm1vZGVsVXRpbHMubW9kZWxOYW1lKG1vZGVsT3JDb2xsZWN0aW9uLmNvbnN0cnVjdG9yKSxcbiAgICAgIGlkczogbW9kZWxPckNvbGxlY3Rpb24ucGx1Y2soaWRBdHRyaWJ1dGUpLFxuICAgICAgcGFyYW1zOiBtb2RlbE9yQ29sbGVjdGlvbi5wYXJhbXMsXG4gICAgICBtZXRhOiBtb2RlbE9yQ29sbGVjdGlvbi5tZXRhXG4gICAgfTtcbiAgfSBlbHNlIGlmICh0aGlzLm1vZGVsVXRpbHMuaXNNb2RlbChtb2RlbE9yQ29sbGVjdGlvbikpIHtcbiAgICBzdW1tYXJ5ID0ge1xuICAgICAgbW9kZWw6IHRoaXMubW9kZWxVdGlscy5tb2RlbE5hbWUobW9kZWxPckNvbGxlY3Rpb24uY29uc3RydWN0b3IpLFxuICAgICAgaWQ6IG1vZGVsT3JDb2xsZWN0aW9uLmlkXG4gICAgfTtcbiAgfVxuICByZXR1cm4gc3VtbWFyeTtcbn07XG5cbkZldGNoZXIucHJvdG90eXBlLnN0b3JlUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgXy5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uKG1vZGVsT3JDb2xsZWN0aW9uKSB7XG4gICAgbW9kZWxPckNvbGxlY3Rpb24uc3RvcmUoKTtcbiAgfSk7XG59O1xuXG5GZXRjaGVyLnByb3RvdHlwZS5ib290c3RyYXBEYXRhID0gZnVuY3Rpb24obW9kZWxNYXAsIGNhbGxiYWNrKSB7XG4gIHZhciByZXN1bHRzID0ge30sXG4gICAgICBmZXRjaGVyID0gdGhpcztcblxuICBhc3luYy5mb3JFYWNoKF8ua2V5cyhtb2RlbE1hcCksIGZ1bmN0aW9uKG5hbWUsIGNiKSB7XG4gICAgdmFyIG1hcCA9IG1vZGVsTWFwW25hbWVdO1xuICAgIGZldGNoZXIuZ2V0TW9kZWxPckNvbGxlY3Rpb25Gb3JTcGVjKG1hcC5zdW1tYXJ5LCBtYXAuZGF0YSwgXy5waWNrKG1hcC5zdW1tYXJ5LCAncGFyYW1zJywgJ21ldGEnKSwgZnVuY3Rpb24obW9kZWxPckNvbGxlY3Rpb24pIHtcbiAgICAgIHJlc3VsdHNbbmFtZV0gPSBtb2RlbE9yQ29sbGVjdGlvbjtcbiAgICAgIGNiKG51bGwpO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgY2FsbGJhY2socmVzdWx0cyk7XG4gICAgfVxuICB9KTtcbn07XG5cbkZldGNoZXIucHJvdG90eXBlLmh5ZHJhdGUgPSBmdW5jdGlvbihzdW1tYXJpZXMsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhciByZXN1bHRzID0ge30sXG4gICAgICBmZXRjaGVyID0gdGhpcztcblxuICAvKipcbiAgICogU3VwcG9ydCBib3RoIChzdW1tYXJpZXMsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgKiBhbmQgKHN1bW1hcmllcywgY2FsbGJhY2spLlxuICAgKi9cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB9XG5cbiAgYXN5bmMuZm9yRWFjaChfLmtleXMoc3VtbWFyaWVzKSwgZnVuY3Rpb24obmFtZSwgY2IpIHtcbiAgICB2YXIgc3VtbWFyeSA9IHN1bW1hcmllc1tuYW1lXTtcbiAgICBpZiAoc3VtbWFyeS5tb2RlbCAhPSBudWxsKSB7XG4gICAgICByZXN1bHRzW25hbWVdID0gZmV0Y2hlci5tb2RlbFN0b3JlLmdldChzdW1tYXJ5Lm1vZGVsLCBzdW1tYXJ5LmlkKTtcblxuICAgICAgaWYgKChyZXN1bHRzW25hbWVdICE9IG51bGwpICYmIChvcHRpb25zLmFwcCAhPSBudWxsKSkge1xuICAgICAgICByZXN1bHRzW25hbWVdLmFwcCA9IG9wdGlvbnMuYXBwO1xuICAgICAgfVxuXG4gICAgICBjYihudWxsKTtcblxuICAgIH0gZWxzZSBpZiAoc3VtbWFyeS5jb2xsZWN0aW9uICE9IG51bGwpIHtcbiAgICAgIC8vIEFsc28gc3VwcG9ydCBnZXR0aW5nIGFsbCBtb2RlbHMgZm9yIGEgY29sbGVjdGlvbi5cbiAgICAgIGZldGNoZXIuY29sbGVjdGlvblN0b3JlLmdldChzdW1tYXJ5LmNvbGxlY3Rpb24sIHN1bW1hcnkucGFyYW1zLCBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2xsZWN0aW9uIG9mIHR5cGUgXFxcIlwiICsgc3VtbWFyeS5jb2xsZWN0aW9uICsgXCJcXFwiIG5vdCBmb3VuZCBmb3IgcGFyYW1zOiBcIiArIEpTT04uc3RyaW5naWZ5KHN1bW1hcnkucGFyYW1zKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzW25hbWVdID0gY29sbGVjdGlvbjtcblxuICAgICAgICBjYihudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY2FsbGJhY2soZXJyLCByZXN1bHRzKTtcbiAgfSk7XG59O1xuXG5GZXRjaGVyLnByb3RvdHlwZS5wZW5kaW5nRmV0Y2hlcyA9IDA7XG5cbkZldGNoZXIucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24oZmV0Y2hTcGVjcywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIGZldGNoZXIgPSB0aGlzO1xuXG4gIC8qKlxuICAgKiBTdXBwb3J0IGJvdGggKGZldGNoU3BlY3MsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgKiBhbmQgKGZldGNoU3BlY3MsIGNhbGxiYWNrKS5cbiAgICovXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgfVxuXG4gIC8vIERpZmZlcmVudCBkZWZhdWx0cyBmb3IgY2xpZW50IHYgc2VydmVyLlxuICBpZiAoaXNTZXJ2ZXIpIHtcbiAgICBpZiAob3B0aW9ucy5yZWFkRnJvbUNhY2hlID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMucmVhZEZyb21DYWNoZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53cml0ZVRvQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy53cml0ZVRvQ2FjaGUgPSBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdGlvbnMucmVhZEZyb21DYWNoZSA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnJlYWRGcm9tQ2FjaGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53cml0ZVRvQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy53cml0ZVRvQ2FjaGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMucGVuZGluZ0ZldGNoZXMrKztcbiAgdGhpcy50cmlnZ2VyKCdmZXRjaDpzdGFydCcsIGZldGNoU3BlY3MpO1xuICB0aGlzLl9yZXRyaWV2ZShmZXRjaFNwZWNzLCBvcHRpb25zLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICBmZXRjaGVyLnBlbmRpbmdGZXRjaGVzLS07XG4gICAgZmV0Y2hlci50cmlnZ2VyKCdmZXRjaDplbmQnLCBmZXRjaFNwZWNzLCBlcnIsIHJlc3VsdHMpO1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgIGlmIChvcHRpb25zLndyaXRlVG9DYWNoZSkge1xuICAgICAgZmV0Y2hlci5zdG9yZVJlc3VsdHMocmVzdWx0cyk7XG4gICAgfVxuICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICB9KTtcbn07XG5cbi8vIE1peGluIEJhY2tib25lLkV2ZW50cyBmb3IgZXZlbnRzIHRoYXQgd29yayBpbiBjbGllbnQgJiBzZXJ2ZXIuXG5fLmV4dGVuZChGZXRjaGVyLnByb3RvdHlwZSwgQmFja2JvbmUuRXZlbnRzKTtcbiIsIi8qKlxuICogU2luY2Ugd2UgbWFrZSByZW5kciBmaWxlcyBBTUQgZnJpZW5kbHkgb24gYXBwIHNldHVwIHN0YWdlXG4gKiB3ZSBuZWVkIHRvIHByZXRlbmQgdGhhdCB0aGlzIGNvZGUgaXMgcHVyZSBjb21tb25qc1xuICogbWVhbnMgbm8gQU1ELXN0eWxlIHJlcXVpcmUgY2FsbHMuXG4gKi9cbnZhciBCYXNlTW9kZWwgPSByZXF1aXJlKFwiLi9iYXNlL21vZGVsXCIpLFxuICAgIEJhc2VDb2xsZWN0aW9uID0gcmVxdWlyZShcIi4vYmFzZS9jb2xsZWN0aW9uXCIpO1xuXG52YXIgdHlwZVBhdGggPSB7XG4gIG1vZGVsOiBcImFwcC9tb2RlbHMvXCIsXG4gIGNvbGxlY3Rpb246IFwiYXBwL2NvbGxlY3Rpb25zL1wiXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsVXRpbHM7XG5cbmZ1bmN0aW9uIE1vZGVsVXRpbHMoZW50cnlQYXRoKSB7XG4gIHRoaXMuZW50cnlQYXRoID0gZW50cnlQYXRoO1xuICB0aGlzLl9jbGFzc01hcCA9IHt9O1xufVxuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uKHBhdGgsIGF0dHJzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgTW9kZWw7XG4gIGF0dHJzID0gYXR0cnMgfHwge307XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmdldE1vZGVsQ29uc3RydWN0b3IocGF0aCwgZnVuY3Rpb24oTW9kZWwpIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBNb2RlbChhdHRycywgb3B0aW9ucykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIE1vZGVsID0gdGhpcy5nZXRNb2RlbENvbnN0cnVjdG9yKHBhdGgpO1xuICAgIHJldHVybiBuZXcgTW9kZWwoYXR0cnMsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5nZXRDb2xsZWN0aW9uID0gZnVuY3Rpb24ocGF0aCwgbW9kZWxzLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIgQ29sbGVjdGlvbjtcbiAgbW9kZWxzID0gbW9kZWxzIHx8IFtdO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5nZXRDb2xsZWN0aW9uQ29uc3RydWN0b3IocGF0aCwgZnVuY3Rpb24oQ29sbGVjdGlvbikge1xuICAgICAgY2FsbGJhY2sobmV3IENvbGxlY3Rpb24obW9kZWxzLCBvcHRpb25zKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgQ29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbkNvbnN0cnVjdG9yKHBhdGgpO1xuICAgIHJldHVybiBuZXcgQ29sbGVjdGlvbihtb2RlbHMsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5nZXRNb2RlbENvbnN0cnVjdG9yID0gZnVuY3Rpb24ocGF0aCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuZmV0Y2hDb25zdHJ1Y3RvcignbW9kZWwnLCBwYXRoLCBjYWxsYmFjayk7XG59O1xuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5nZXRDb2xsZWN0aW9uQ29uc3RydWN0b3IgPSBmdW5jdGlvbihwYXRoLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5mZXRjaENvbnN0cnVjdG9yKCdjb2xsZWN0aW9uJywgcGF0aCwgY2FsbGJhY2spO1xufTtcblxuTW9kZWxVdGlscy5wcm90b3R5cGUuZ2V0RnVsbFBhdGggPSBmdW5jdGlvbih0eXBlLCBwYXRoKSB7XG4gIHJldHVybiB0aGlzLmVudHJ5UGF0aCArIHR5cGVQYXRoW3R5cGVdICsgcGF0aDtcbn07XG5cbk1vZGVsVXRpbHMucHJvdG90eXBlLmZldGNoQ29uc3RydWN0b3IgPSBmdW5jdGlvbih0eXBlLCBwYXRoLCBjYWxsYmFjaykge1xuICBwYXRoID0gdGhpcy51bmRlcnNjb3JpemUocGF0aCk7XG5cbiAgdmFyIGZ1bGxQYXRoID0gdGhpcy5nZXRGdWxsUGF0aCh0eXBlLCBwYXRoKTtcblxuICBpZiAodGhpcy5fY2xhc3NNYXBbcGF0aF0pIHtcbiAgICByZXR1cm4gKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSA/IGNhbGxiYWNrKHRoaXMuX2NsYXNzTWFwW3BhdGhdKSA6IHRoaXMuX2NsYXNzTWFwW3BhdGhdO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gT25seSB1c2VkIGluIEFNRCBlbnZpcm9ubWVudFxuICAgIGlmICh0eXBlb2YgZGVmaW5lICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl9yZXF1aXJlQU1EKFtmdWxsUGF0aF0sIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodGhpcy5fcmVxdWlyZShmdWxsUGF0aCkpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVpcmUoZnVsbFBhdGgpO1xuICB9XG59O1xuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5fcmVxdWlyZSA9IHJlcXVpcmU7XG5cbk1vZGVsVXRpbHMucHJvdG90eXBlLl9yZXF1aXJlQU1EID0gcmVxdWlyZTtcblxuTW9kZWxVdGlscy5wcm90b3R5cGUuaXNNb2RlbCA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQmFzZU1vZGVsO1xufTtcblxuTW9kZWxVdGlscy5wcm90b3R5cGUuaXNDb2xsZWN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBCYXNlQ29sbGVjdGlvbjtcbn07XG5cbk1vZGVsVXRpbHMucHJvdG90eXBlLmdldE1vZGVsTmFtZUZvckNvbGxlY3Rpb25OYW1lID0gZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUpIHtcbiAgdmFyIENvbGxlY3Rpb247XG4gIENvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb25Db25zdHJ1Y3Rvcihjb2xsZWN0aW9uTmFtZSk7XG4gIHJldHVybiB0aGlzLm1vZGVsTmFtZShDb2xsZWN0aW9uLnByb3RvdHlwZS5tb2RlbCk7XG59O1xuXG5Nb2RlbFV0aWxzLnVwcGVyY2FzZVJlID0gLyhbQS1aXSkvZztcblxuTW9kZWxVdGlscy5wcm90b3R5cGUudW5kZXJzY29yaXplID0gZnVuY3Rpb24obmFtZSkge1xuICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBuYW1lID0gbmFtZS5yZXBsYWNlKE1vZGVsVXRpbHMudXBwZXJjYXNlUmUsIGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gXCJfXCIgKyBjLnRvTG93ZXJDYXNlKCk7XG4gIH0pO1xuICBpZiAobmFtZVswXSA9PT0gXCJfXCIpIHtcbiAgICBuYW1lID0gbmFtZS5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gbmFtZTtcbn07XG5cbi8qKlxuICogVGhlICduYW1lJyBwcm9wZXJ0eSBpcyBhZGRlZCB0byB0aGUgY29uc3RydWN0b3Igd2hlbiB1c2luZyBhIG5hbWVkIGZ1bmN0aW9uLFxuICogYW5kIGl0IGNhbm5vdCBiZSBjaGFuZ2VkLiAgSS5lLjpcbiAqXG4gKiBmdW5jdGlvbiBNeUNsYXNzKCl7fVxuICogTXlDbGFzcy5uYW1lXG4gKiAtPiBcIk15Q2xhc3NcIlxuICpcbiAqIFdlIGZpcnN0IGxvb2sgZm9yIHRoZSAnaWQnIHByb3BlcnR5IG9mIHRoZSBjb25zdHJ1Y3Rvciwgd2hpY2ggaXMgY29tcGF0aWJsZVxuICogd2l0aCBzdGFuZGFyZCBCYWNrYm9uZS1zdHlsZSBjbGFzcyBpbmhlcml0YW5jZS5cbiAqXG4gKiB2YXIgTXlDbGFzcyA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7fSk7XG4gKiBNeUNsYXNzLm5hbWVcbiAqIC0+IFwiXCJcbiAqIE15Q2xhc3MuaWQgPSBcIk15Q2xhc3NcIlxuICovXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5tb2RlbE5hbWUgPSBmdW5jdGlvbihtb2RlbE9yQ29sbGVjdGlvbkNsYXNzKSB7XG4gIHJldHVybiB0aGlzLnVuZGVyc2Nvcml6ZShtb2RlbE9yQ29sbGVjdGlvbkNsYXNzLmlkIHx8IG1vZGVsT3JDb2xsZWN0aW9uQ2xhc3MubmFtZSk7XG59O1xuXG5Nb2RlbFV0aWxzLnByb3RvdHlwZS5tb2RlbElkQXR0cmlidXRlID0gZnVuY3Rpb24obW9kZWxOYW1lLCBjYWxsYmFjaykge1xuICB0aGlzLmdldE1vZGVsQ29uc3RydWN0b3IobW9kZWxOYW1lLCBmdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuICAgIGNhbGxiYWNrKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5pZEF0dHJpYnV0ZSk7XG4gIH0pO1xufTtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIFN1cGVyID0gcmVxdWlyZSgnLi9tZW1vcnlfc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uU3RvcmU7XG5cbmZ1bmN0aW9uIENvbGxlY3Rpb25TdG9yZSgpIHtcbiAgU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuXy5leHRlbmQoQ29sbGVjdGlvblN0b3JlLnByb3RvdHlwZSwgU3VwZXIucHJvdG90eXBlLCB7XG4gIGV4cGlyZVNlY29uZHM6IG51bGwsXG5cbiAgc2V0OiBmdW5jdGlvbihjb2xsZWN0aW9uLCBwYXJhbXMpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5fZ2V0U3RvcmVLZXlGb3JDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIHBhcmFtcyk7XG4gICAgcmV0dXJuIFN1cGVyLnByb3RvdHlwZS5zZXQuY2FsbCh0aGlzLCBrZXksIGNvbGxlY3Rpb24sIHRoaXMuZXhwaXJlU2Vjb25kcyk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbihjb2xsZWN0aW9uTmFtZSwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGNhY2hlZENvbGxlY3Rpb247XG5cbiAgICB0aGlzLm1lcmdlUGFyYW1zKGNvbGxlY3Rpb25OYW1lLCBwYXJhbXMsIGZ1bmN0aW9uIChtZXJnZWRQYXJhbXMpIHtcbiAgICAgIHZhciBrZXkgPSBzZWxmLl9nZXRTdG9yZUtleShjb2xsZWN0aW9uTmFtZSwgbWVyZ2VkUGFyYW1zKTtcbiAgICAgIGNhY2hlZENvbGxlY3Rpb24gPSBTdXBlci5wcm90b3R5cGUuZ2V0LmNhbGwoc2VsZiwga2V5KTtcblxuICAgICAgaWYgKF8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgY2FsbGJhY2soY2FjaGVkQ29sbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FjaGVkQ29sbGVjdGlvbjtcbiAgfSxcblxuICBjbGVhcjogZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUsIHBhcmFtcykge1xuICAgIGlmICghXy5pc1VuZGVmaW5lZChjb2xsZWN0aW9uTmFtZSkgJiYgcGFyYW1zKSB7XG4gICAgICB2YXIga2V5ID0gdGhpcy5fZ2V0U3RvcmVLZXkoY29sbGVjdGlvbk5hbWUsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gU3VwZXIucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcywga2V5KTsgICAgICBcbiAgICB9IGVsc2UgaWYgKCFfLmlzVW5kZWZpbmVkKGNvbGxlY3Rpb25OYW1lKSAmJiAhcGFyYW1zKSB7XG4gICAgICB2YXIgY2FjaGVkSXRlbXMgPSB0aGlzLl9nZXRDYWNoZWRJdGVtc0J5Q29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSksXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBzdG9yZUtleTtcbiAgICAgICBfLmVhY2goY2FjaGVkSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgc3RvcmVLZXkgPSBzZWxmLl9nZXRTdG9yZUtleShjb2xsZWN0aW9uTmFtZSwgaXRlbS52YWx1ZS5wYXJhbXMpO1xuICAgICAgICAgIFN1cGVyLnByb3RvdHlwZS5jbGVhci5jYWxsKHNlbGYsIHN0b3JlS2V5KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBTdXBlci5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzLCBudWxsKTtcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VQYXJhbXM6IGZ1bmN0aW9uKGNvbGxlY3Rpb25OYW1lLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5tb2RlbFV0aWxzLmdldENvbGxlY3Rpb25Db25zdHJ1Y3Rvcihjb2xsZWN0aW9uTmFtZSwgZnVuY3Rpb24oQ29sbGVjdGlvbikge1xuICAgICAgdmFyIG1lcmdlZFBhcmFtcyA9IF8uZXh0ZW5kKHt9LCBDb2xsZWN0aW9uLnByb3RvdHlwZS5kZWZhdWx0UGFyYW1zLCBwYXJhbXMpO1xuICAgICAgY2FsbGJhY2sobWVyZ2VkUGFyYW1zKTtcbiAgICB9KTtcbiAgfSxcblxuICBfZ2V0Q2FjaGVkSXRlbXNCeUNvbGxlY3Rpb246ZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUpIHtcbiAgICB2YXIgcHJlZml4ID0gdGhpcy5fZm9ybWF0S2V5KHRoaXMubW9kZWxVdGlscy51bmRlcnNjb3JpemUoY29sbGVjdGlvbk5hbWUpKTtcblxuICAgIHJldHVybiBfLmZpbHRlcih0aGlzLmNhY2hlLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgcmV0dXJuIHN0YXJ0c1dpdGgoa2V5LCBwcmVmaXgpO1xuICAgIH0pO1xuICB9LFxuXG4gIF9nZXRTdG9yZUtleUZvckNvbGxlY3Rpb246IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBhcmFtcykge1xuICAgIHZhciBjb2xsZWN0aW9uTmFtZSA9IHRoaXMubW9kZWxVdGlscy5tb2RlbE5hbWUoY29sbGVjdGlvbi5jb25zdHJ1Y3Rvcik7XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwgY29sbGVjdGlvbi5wYXJhbXM7XG4gICAgcmV0dXJuIHRoaXMuX2dldFN0b3JlS2V5KGNvbGxlY3Rpb25OYW1lLCBwYXJhbXMpO1xuICB9LFxuXG4gIF9nZXRTdG9yZUtleTogZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUsIHBhcmFtcykge1xuICAgIHZhciB1bmRlcnNjb3JlZCA9IHRoaXMubW9kZWxVdGlscy51bmRlcnNjb3JpemUoY29sbGVjdGlvbk5hbWUpO1xuICAgIHJldHVybiB1bmRlcnNjb3JlZCArIFwiOlwiICsgSlNPTi5zdHJpbmdpZnkoc29ydFBhcmFtcyhwYXJhbXMpKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHNvcnRQYXJhbXMocGFyYW1zKSB7XG4gIHZhciBzb3J0ZWQgPSB7fTtcbiAgXy5jaGFpbihwYXJhbXMpLmtleXMoKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBzb3J0ZWRba2V5XSA9IHBhcmFtc1trZXldO1xuICB9KTtcbiAgcmV0dXJuIHNvcnRlZDtcbn1cblxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHJpbmcsIHByZWZpeCkge1xuICByZXR1cm4gc3RyaW5nLnNsaWNlKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTWVtb3J5U3RvcmU7XG5cbmZ1bmN0aW9uIE1lbW9yeVN0b3JlKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5hcHAgPSB0aGlzLm9wdGlvbnMuYXBwO1xuICB0aGlzLm1vZGVsVXRpbHMgPSB0aGlzLm9wdGlvbnMubW9kZWxVdGlscztcbiAgdGhpcy5jYWNoZSA9IHt9O1xufVxuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuY2FjaGVWZXJzaW9uID0gJyc7XG5cbk1lbW9yeVN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKCFrZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHRoaXMudmFsaWRhdGVFeHBpcmF0aW9uKGtleSwgdGhpcy5fZ2V0KGtleSkpO1xufTtcblxuTWVtb3J5U3RvcmUucHJvdG90eXBlLnZhbGlkYXRlRXhwaXJhdGlvbiA9IGZ1bmN0aW9uKGtleSwgZGF0YSkge1xuICBpZiAoZGF0YSAmJiBkYXRhLmV4cGlyZXMgJiYgRGF0ZS5ub3coKSA+IGRhdGEuZXhwaXJlcykge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc29sZS5sb2coXCJNZW1vcnlTdG9yZTogRXhwaXJpbmcga2V5IFxcXCJcIiArIGtleSArIFwiXFxcIi5cIik7XG4gICAgfVxuICAgIHRoaXMuY2xlYXIoa2V5KTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS52YWx1ZSkge1xuICAgIGRhdGEgPSBkYXRhLnZhbHVlO1xuICB9XG4gIHJldHVybiBkYXRhO1xufTtcblxuTWVtb3J5U3RvcmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUsIHR0bFNlYykge1xuICB2YXIgZXhwaXJlcztcblxuICBpZiAoIWtleSB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGV4cGlyZXMgPSB0dGxTZWMgPyBEYXRlLm5vdygpICsgdHRsU2VjICogMTAwMCA6IG51bGw7XG4gIHRoaXMuX3NldChrZXksIHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgZXhwaXJlczogZXhwaXJlc1xuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uKGtleSkge1xuICByZXR1cm4gdGhpcy5jYWNoZVt0aGlzLl9mb3JtYXRLZXkoa2V5KV07XG59O1xuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuX3NldCA9IGZ1bmN0aW9uKGtleSwgZGF0YSkge1xuICB0aGlzLmNhY2hlW3RoaXMuX2Zvcm1hdEtleShrZXkpXSA9IGRhdGE7XG59O1xuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuX2NsZWFyID0gZnVuY3Rpb24oa2V5KSB7XG4gIGRlbGV0ZSB0aGlzLmNhY2hlW3RoaXMuX2Zvcm1hdEtleShrZXkpXTtcbn07XG5cbk1lbW9yeVN0b3JlLnByb3RvdHlwZS5fY2xlYXJBbGwgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYWNoZSA9IHt9O1xufTtcblxuTWVtb3J5U3RvcmUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmIChrZXkgIT0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLl9jbGVhcihrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLl9jbGVhckFsbCgpO1xuICB9XG59O1xuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuX3ZlcnNpb25LZXkgPSBmdW5jdGlvbihrZXkpIHtcbiAgcmV0dXJuIGtleSArIFwiOlwiICsgdGhpcy5jYWNoZVZlcnNpb247XG59O1xuXG5NZW1vcnlTdG9yZS5wcm90b3R5cGUuX2Zvcm1hdEtleSA9IGZ1bmN0aW9uKGtleSkge1xuICByZXR1cm4gdGhpcy5fdmVyc2lvbktleShrZXkpO1xufTtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuICAgIFN1cGVyID0gcmVxdWlyZSgnLi9tZW1vcnlfc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbFN0b3JlO1xuXG5mdW5jdGlvbiBNb2RlbFN0b3JlKCkge1xuICBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5fLmV4dGVuZChNb2RlbFN0b3JlLnByb3RvdHlwZSwgU3VwZXIucHJvdG90eXBlLCB7XG4gIGV4cGlyZVNlY29uZHM6IG51bGwsXG5cbiAgc2V0OiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHZhciBrZXksIG1vZGVsTmFtZTtcblxuICAgIG1vZGVsTmFtZSA9IHRoaXMubW9kZWxVdGlscy5tb2RlbE5hbWUobW9kZWwuY29uc3RydWN0b3IpO1xuICAgIGlmIChtb2RlbE5hbWUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmRlZmluZWQgbW9kZWxOYW1lIGZvciBtb2RlbCcpO1xuICAgIH1cblxuICAgIGtleSA9IHRoaXMuX2dldE1vZGVsU3RvcmVLZXkobW9kZWxOYW1lLCBtb2RlbC5pZCk7XG5cbiAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIGZ1bGx5IHBhcnNlZCBtb2RlbCBiZWZvcmUgd2Ugc3RvcmUgdGhlIGF0dHJpYnV0ZXNcbiAgICBtb2RlbC5wYXJzZShtb2RlbC5hdHRyaWJ1dGVzKTtcblxuICAgIHJldHVybiBTdXBlci5wcm90b3R5cGUuc2V0LmNhbGwodGhpcywga2V5LCBtb2RlbCwgdGhpcy5leHBpcmVTZWNvbmRzKTtcbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKG1vZGVsTmFtZSwgaWQpIHtcbiAgICB2YXIga2V5LCBtb2RlbDtcblxuICAgIGtleSA9IHRoaXMuX2dldE1vZGVsU3RvcmVLZXkobW9kZWxOYW1lLCBpZCk7XG4gICAgcmV0dXJuIFN1cGVyLnByb3RvdHlwZS5nZXQuY2FsbCh0aGlzLCBrZXkpO1xuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbihtb2RlbE5hbWUsIGlkKSB7XG4gICAgaWYgKG1vZGVsTmFtZSAmJiBpZCkge1xuICAgICAgdmFyIGtleSA9IHRoaXMuX2dldE1vZGVsU3RvcmVLZXkobW9kZWxOYW1lLCBpZCk7XG4gICAgICByZXR1cm4gU3VwZXIucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcywga2V5KTtcbiAgICB9IGVsc2UgaWYgKG1vZGVsTmFtZSAmJiAhaWQpIHtcbiAgICAgIHZhciBjYWNoZWRJdGVtcyA9IHRoaXMuX2dldENhY2hlZEl0ZW1zQnlNb2RlbChtb2RlbE5hbWUpLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgbW9kZWxTdG9yZUtleTtcbiAgICAgICAgXy5lYWNoKGNhY2hlZEl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIG1vZGVsU3RvcmVLZXkgPSBzZWxmLl9nZXRNb2RlbFN0b3JlS2V5KG1vZGVsTmFtZSwgaXRlbS52YWx1ZS5pZCk7XG4gICAgICAgICAgU3VwZXIucHJvdG90eXBlLmNsZWFyLmNhbGwoc2VsZiwgbW9kZWxTdG9yZUtleSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gU3VwZXIucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcywgbnVsbCk7XG4gICAgfVxuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uKG1vZGVsTmFtZSwgcGFyYW1zKSB7XG4gICAgdmFyIHByZWZpeCA9IHRoaXMuX2Zvcm1hdEtleSh0aGlzLl9rZXlQcmVmaXgobW9kZWxOYW1lKSksXG4gICAgICBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jYWNoZSksXG4gICAgICBhZmZlY3RlZEtleXMgPSBrZXlzLmZpbHRlcihnZXRTdGFydHNXaXRoRmlsdGVyKHByZWZpeCkpLFxuICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICBmb3VuZEtleTtcblxuICAgIGZvdW5kS2V5ID0gXy5maW5kKGFmZmVjdGVkS2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGNhY2hlZE1vZGVsID0gc2VsZi5jYWNoZVtrZXldLnZhbHVlLFxuICAgICAgICBtb2RlbFN0b3JlS2V5ID0gc2VsZi5fZ2V0TW9kZWxTdG9yZUtleShtb2RlbE5hbWUsIGNhY2hlZE1vZGVsLmlkKSxcbiAgICAgICAgbW9kZWwgPSBTdXBlci5wcm90b3R5cGUuZ2V0LmNhbGwoc2VsZiwgbW9kZWxTdG9yZUtleSk7XG5cbiAgICAgIHJldHVybiBtb2RlbCAmJiBpc09iamVjdFN1YnNldChwYXJhbXMsIG1vZGVsLnRvSlNPTigpKTtcbiAgICB9KTtcblxuICAgIGlmIChmb3VuZEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZm91bmRLZXldLnZhbHVlO1xuICAgIH1cbiAgfSxcblxuICBfZ2V0Q2FjaGVkSXRlbXNCeU1vZGVsOmZ1bmN0aW9uKG1vZGVsTmFtZSkge1xuICAgIHZhciBwcmVmaXggPSB0aGlzLl9mb3JtYXRLZXkodGhpcy5fa2V5UHJlZml4KG1vZGVsTmFtZSkpO1xuICAgIHJldHVybiBfLmZpbHRlcih0aGlzLmNhY2hlLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgcmV0dXJuIHN0YXJ0c1dpdGgoa2V5LCBwcmVmaXgpO1xuICAgIH0pO1xuICB9LFxuXG4gIF9mb3JtYXRLZXk6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBTdXBlci5wcm90b3R5cGUuX2Zvcm1hdEtleS5jYWxsKHRoaXMsIFwiX21zOlwiICsga2V5KTtcbiAgfSxcblxuICBfa2V5UHJlZml4OiBmdW5jdGlvbihtb2RlbE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFV0aWxzLnVuZGVyc2Nvcml6ZShtb2RlbE5hbWUpO1xuICB9LFxuXG4gIF9nZXRNb2RlbFN0b3JlS2V5OiBmdW5jdGlvbihtb2RlbE5hbWUsIGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2tleVByZWZpeChtb2RlbE5hbWUpICsgXCI6XCIgKyBpZDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldFN0YXJ0c1dpdGhGaWx0ZXIocHJlZml4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0YXJ0c1dpdGgoc3RyaW5nLCBwcmVmaXgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0cmluZywgcHJlZml4KSB7XG4gIHJldHVybiBzdHJpbmcuc2xpY2UoMCwgcHJlZml4Lmxlbmd0aCkgPT0gcHJlZml4O1xufVxuXG5mdW5jdGlvbiBpc09iamVjdFN1YnNldChwb3RlbnRpYWxTdWJzZXQsIG9iamVjdFRvVGVzdCkge1xuICAvLyBjaGVjayBhbGwgdGhlIGtleXMgb2YgdGhlIHN1YnNldCwgYW5kIHN1cmUgdGhlaXIgdmFsdWVzIGFyZSB0aGUgc2FtZSBpbiB0aGUgb2JqZWN0VG9UZXN0XG4gIHJldHVybiBfLmFsbChwb3RlbnRpYWxTdWJzZXQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9UZXN0W2tleV0gPT0gdmFsdWU7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBgc3luY2VyYCBpcyBhIGNvbGxlY3Rpb24gb2YgaW5zdGFuY2UgbWV0aG9kcyB0aGF0IGFyZSBtaXhlZCBpbnRvIHRoZSBwcm90b3R5cGVzXG4gKiBvZiBgQmFzZU1vZGVsYCBhbmQgYEJhc2VDb2xsZWN0aW9uYC4gVGhlIHB1cnBvc2UgaXMgdG8gZW5jYXBzdWxhdGUgc2hhcmVkIGxvZ2ljXG4gKiBmb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBBUEkuXG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgQmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpLFxuXG4gICAgLy8gUHVsbCBvdXQgcGFyYW1zIGluIHBhdGgsIGxpa2UgJy91c2Vycy86aWQnLlxuICAgIGV4dHJhY3RQYXJhbU5hbWVzUmUgPSAvOihbYS16Xy1dKykvaWcsXG5cbiAgICBtZXRob2RNYXAgPSB7XG4gICAgICAnY3JlYXRlJzogJ1BPU1QnLFxuICAgICAgJ3VwZGF0ZSc6ICdQVVQnLFxuICAgICAgJ2RlbGV0ZSc6ICdERUxFVEUnLFxuICAgICAgJ3JlYWQnOiAnR0VUJ1xuICAgIH0sXG5cbiAgICBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyk7XG5cbmlmIChpc1NlcnZlcikge1xuICAvLyBoaWRlIGl0IGZyb20gcmVxdWlyZWpzIHNpbmNlIGl0J3Mgc2VydmVyIG9ubHlcbiAgdmFyIHNlcnZlck9ubHlfcXMgPSAncXMyJztcbiAgdmFyIHFzID0gcmVxdWlyZShzZXJ2ZXJPbmx5X3FzKTtcbn0gZWxzZSB7XG4gIHZhciAkID0gd2luZG93LiQgfHwgcmVxdWlyZSgnanF1ZXJ5Jyk7XG4gIEJhY2tib25lLiQgPSAkO1xufVxuXG52YXIgc3luY2VyID0gbW9kdWxlLmV4cG9ydHM7XG5cbmZ1bmN0aW9uIGNsaWVudFN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykge1xuICB2YXIgZXJyb3I7XG4gIG9wdGlvbnMgPSBfLmNsb25lKG9wdGlvbnMpO1xuICBpZiAoIV8uaXNVbmRlZmluZWQob3B0aW9ucy5kYXRhKSkgb3B0aW9ucy5kYXRhID0gXy5jbG9uZShvcHRpb25zLmRhdGEpO1xuICBvcHRpb25zLnVybCA9IHRoaXMuZ2V0VXJsKG9wdGlvbnMudXJsLCB0cnVlLCBvcHRpb25zLmRhdGEpO1xuICBlcnJvciA9IG9wdGlvbnMuZXJyb3I7XG4gIGlmIChlcnJvcikge1xuICAgIG9wdGlvbnMuZXJyb3IgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgIHZhciBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICBjb250ZW50VHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyksXG4gICAgICAgICAgcmVzcDtcbiAgICAgIGlmIChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IC0xKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG4gICAgICByZXNwID0ge1xuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXNcbiAgICAgIH07XG4gICAgICBlcnJvcihyZXNwKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIEJhY2tib25lLnN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHNlcnZlclN5bmMobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykge1xuICB2YXIgYXBpLCB1cmxQYXJ0cywgdmVyYiwgcmVxLCBxdWVyeVN0cjtcblxuICBvcHRpb25zID0gXy5jbG9uZShvcHRpb25zKTtcbiAgaWYgKCFfLmlzVW5kZWZpbmVkKG9wdGlvbnMuZGF0YSkpIG9wdGlvbnMuZGF0YSA9IF8uY2xvbmUob3B0aW9ucy5kYXRhKTtcbiAgb3B0aW9ucy51cmwgPSB0aGlzLmdldFVybChvcHRpb25zLnVybCwgZmFsc2UsIG9wdGlvbnMuZGF0YSk7XG4gIHZlcmIgPSBtZXRob2RNYXBbbWV0aG9kXTtcbiAgdXJsUGFydHMgPSBvcHRpb25zLnVybC5zcGxpdCgnPycpO1xuICByZXEgPSB0aGlzLmFwcC5yZXE7XG4gIHF1ZXJ5U3RyID0gdXJsUGFydHNbMV0gfHwgJyc7XG4gIGlmICghXy5pc0VtcHR5KG9wdGlvbnMuZGF0YSkpIHF1ZXJ5U3RyICs9ICcmJyArIHFzLnN0cmluZ2lmeShvcHRpb25zLmRhdGEpO1xuICAvKipcbiAgICogaWYgcXVlcnlTdHIgaXMgaW5pdGlhbGx5IGFuIGVtcHR5IHN0cmluZywgbGVhZGluZyAnJicgd2lsbCBzdGlsbCBnZXQgcGFyc2VkIGNvcnJlY3RseSBieSBxcy5wYXJzZSBiZWxvdy5cbiAgICogZS5nLiAgcXMucGFyc2UoJyZiYXo9cXV1eCcpID0+IHsgYmF6OiAncXV1eCcgfVxuICAgKi9cblxuICBhcGkgPSB7XG4gICAgbWV0aG9kOiB2ZXJiLFxuICAgIHBhdGg6IHVybFBhcnRzWzBdLFxuICAgIHF1ZXJ5OiBxcy5wYXJzZShxdWVyeVN0ciksXG4gICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzIHx8IHt9LFxuICAgIGFwaTogXy5yZXN1bHQodGhpcywgJ2FwaScpLFxuICAgIGJvZHk6IHt9XG4gIH07XG5cbiAgaWYgKHZlcmIgPT09ICdQT1NUJyB8fCB2ZXJiID09PSAnUFVUJykge1xuICAgIGFwaS5ib2R5ID0gbW9kZWwudG9KU09OKCk7XG4gIH1cblxuICByZXEuZGF0YUFkYXB0ZXIucmVxdWVzdChyZXEsIGFwaSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZSwgYm9keSkge1xuICAgIHZhciByZXNwO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJlc3AgPSB7XG4gICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0aGUgc3RhdHVzQ29kZSwgc28gbG93ZXItbGV2ZWwgY29kZSBjYW4gaGFuZGxlIGkuZS4gNDAxIHByb3Blcmx5LlxuICAgICAgICBzdGF0dXM6IGVyci5zdGF0dXNcbiAgICAgIH07XG5cbiAgICAgIGlmIChvcHRpb25zLmVycm9yKSB7XG4gICAgICAgIC8vIFRoaXMgYGVycm9yYCBoYXMgc2lnbmF0dXJlIG9mICQuYWpheCwgbm90IEJhY2tib25lLnN5bmMuXG4gICAgICAgIG9wdGlvbnMuZXJyb3IocmVzcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgYHN1Y2Nlc3NgIGhhcyBzaWduYXR1cmUgb2YgJC5hamF4LCBub3QgQmFja2JvbmUuc3luYy5cbiAgICAgIG9wdGlvbnMuc3VjY2Vzcyhib2R5KTtcbiAgICB9XG4gIH0pO1xufVxuXG5zeW5jZXIuY2xpZW50U3luYyA9IGNsaWVudFN5bmM7XG5zeW5jZXIuc2VydmVyU3luYyA9IHNlcnZlclN5bmM7XG5zeW5jZXIuc3luYyA9IGZ1bmN0aW9uIHN5bmMoKSB7XG4gIHZhciBzeW5jTWV0aG9kID0gaXNTZXJ2ZXIgPyBzZXJ2ZXJTeW5jIDogY2xpZW50U3luYztcbiAgcmV0dXJuIHN5bmNNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbi8qKlxuICogJ21vZGVsJyBpcyBlaXRoZXIgYSBtb2RlbCBvciBjb2xsZWN0aW9uIHRoYXRcbiAqIGhhcyBhICd1cmwnIHByb3BlcnR5LCB3aGljaCBjYW4gYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24uXG4gKi9cbnN5bmNlci5nZXRVcmwgPSBmdW5jdGlvbiBnZXRVcmwodXJsLCBjbGllbnRQcmVmaXgsIHBhcmFtcykge1xuICBpZiAoY2xpZW50UHJlZml4ID09IG51bGwpIHtcbiAgICBjbGllbnRQcmVmaXggPSBmYWxzZTtcbiAgfVxuICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gIHVybCA9IHVybCB8fCBfLnJlc3VsdCh0aGlzLCAndXJsJyk7XG4gIGlmIChjbGllbnRQcmVmaXggJiYgIX51cmwuaW5kZXhPZignOi8vJykpIHtcbiAgICB1cmwgPSB0aGlzLmZvcm1hdENsaWVudFVybCh1cmwsIF8ucmVzdWx0KHRoaXMsICdhcGknKSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuaW50ZXJwb2xhdGVQYXJhbXModGhpcywgdXJsLCBwYXJhbXMpO1xufTtcblxuc3luY2VyLmZvcm1hdENsaWVudFVybCA9IGZ1bmN0aW9uKHVybCwgYXBpKSB7XG4gIHZhciBwcmVmaXggPSB0aGlzLmFwcC5nZXQoJ2FwaVBhdGgnKSB8fCAnL2FwaSc7XG4gIGlmIChhcGkpIHtcbiAgICBwcmVmaXggKz0gJy8nICsgYXBpO1xuICB9XG4gIHByZWZpeCArPSAnLy0nO1xuICByZXR1cm4gcHJlZml4ICsgdXJsO1xufTtcblxuLyoqXG4gKiBEZWVwbHktY29tcGFyZSB0d28gb2JqZWN0cyB0byBzZWUgaWYgdGhleSBkaWZmZXIuXG4gKi9cbnN5bmNlci5vYmplY3RzRGlmZmVyID0gZnVuY3Rpb24gb2JqZWN0c0RpZmZlcihkYXRhMSwgZGF0YTIpIHtcbiAgdmFyIGNoYW5nZWQgPSBmYWxzZSxcbiAgICAgIGtleXMsXG4gICAgICBrZXksXG4gICAgICB2YWx1ZTEsXG4gICAgICB2YWx1ZTI7XG5cbiAga2V5cyA9IF8udW5pcXVlKF8ua2V5cyhkYXRhMSkuY29uY2F0KF8ua2V5cyhkYXRhMikpKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIHZhbHVlMSA9IGRhdGExW2tleV07XG4gICAgdmFsdWUyID0gZGF0YTJba2V5XTtcblxuICAgIC8vIElmIGF0dHJpYnV0ZSBpcyBhbiBvYmplY3QgcmVjdXJzZVxuICAgIGlmIChfLmlzT2JqZWN0KHZhbHVlMSkgJiYgXy5pc09iamVjdCh2YWx1ZTIpKSB7XG4gICAgICBjaGFuZ2VkID0gdGhpcy5vYmplY3RzRGlmZmVyKHZhbHVlMSwgdmFsdWUyKTtcbiAgICAvLyBUZXN0IGZvciBlcXVhbGl0eVxuICAgIH0gZWxzZSBpZiAoIV8uaXNFcXVhbCh2YWx1ZTEsIHZhbHVlMikpIHtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2hhbmdlZDtcbn07XG5cbi8qKlxuICogVGhpcyBtYXBzIGkuZS4gJy9saXN0aW5ncy86aWQnIHRvICcvbGlzdGluZ3MvMycgaWZcbiAqIHRoZSBtb2RlbCB5b3Ugc3VwcGx5IGhhcyBtb2RlbC5nZXQoJ2lkJykgPT0gMy5cbiAqL1xuc3luY2VyLmludGVycG9sYXRlUGFyYW1zID0gZnVuY3Rpb24gaW50ZXJwb2xhdGVQYXJhbXMobW9kZWwsIHVybCwgcGFyYW1zKSB7XG4gIHZhciBtYXRjaGVzID0gdXJsLm1hdGNoKGV4dHJhY3RQYXJhbU5hbWVzUmUpO1xuXG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICBpZiAobWF0Y2hlcykge1xuICAgIG1hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgdmFyIHByb3BlcnR5ID0gcGFyYW0uc2xpY2UoMSksXG4gICAgICAgICAgdmFsdWU7XG5cbiAgICAgIC8vIElzIGNvbGxlY3Rpb24/IFRoZW4gdXNlIG9wdGlvbnMuXG4gICAgICBpZiAobW9kZWwubGVuZ3RoICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSBtb2RlbC5vcHRpb25zW3Byb3BlcnR5XTtcblxuICAgICAgLy8gT3RoZXJ3aXNlIGl0J3MgYSBtb2RlbDsgdXNlIGF0dHJzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBtb2RlbC5nZXQocHJvcGVydHkpO1xuICAgICAgfVxuICAgICAgdXJsID0gdXJsLnJlcGxhY2UocGFyYW0sIHZhbHVlKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBEZWxldGUgdGhlIHBhcmFtIGZyb20gcGFyYW1zIGhhc2gsIHNvIHdlIGRvbid0IGdldCB1cmxzIGxpa2U6XG4gICAgICAgKiAvdjEvdGhyZWFkcy8xMjM0P2lkPTEyMzQuLi5cbiAgICAgICAqL1xuICAgICAgZGVsZXRlIHBhcmFtc1twcm9wZXJ0eV07XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIFNlcGFyYXRlIGRlbGV0aW9uIG9mIGlkQXR0cmlidXRlIGZyb20gcGFyYW1zIGhhc2ggbmVjZXNzYXJ5IGlmIHVzaW5nIHVybFJvb3QgaW4gdGhlIG1vZGVsXG4gICAqIHNvIHdlIGRvbid0IGdldCB1cmxzIGxpa2U6IC92MS90aHJlYWRzLzEyMzQ/aWQ9MTIzNFxuICAgKi9cbiAgZGVsZXRlIHBhcmFtc1ttb2RlbC5pZEF0dHJpYnV0ZV1cbiAgcmV0dXJuIHVybDtcbn07XG4iXX0=
