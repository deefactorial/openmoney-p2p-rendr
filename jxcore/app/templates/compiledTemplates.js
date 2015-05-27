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

templates["replications/index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"sync-app\">\n\n    <header>\n        <a class=switch href=#>Back</a>\n        <h1>Sync Todos</h1>\n        <input id=\"new-replication\" type=url placeholder=\"https://you.iriscouch.com/todos\">\n    </header>\n\n    <section id=\"sync-main\">\n        <ul id=\"replication-list\"></ul>\n    </section>\n\n    <footer>\n        <div id=sync-stats>\n            <div id=\"replication-count\"></div>\n        </div>\n    </footer>\n\n</div>";
  },"useData":true});

templates["replications/show"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<script type=\"text/template\" id=\"replication-item-template\">\n    <div class=\"view\">\n        <label><%= url %></label>\n        <a class=\"destroy\"></a>\n    </div>\n</script>\n\n<script type=\"text/template\" id=\"sync-stats-template\">\n    <div class=docs>\n        <%= read %>↔<%= written %>\n    </div>\n    <div class=\"replication-count\">Syncing <b><%= count %></b> <%= count == 1 ? 'database' : 'databases' %></div>\n</script>";
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

templates["todos/index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"todoapp\">\n\n    <header>\n        <a class=switch href=#sync-app>Sync</a>\n        <h1>Todos</h1>\n        <input id=\"new-todo\" type=\"text\" placeholder=\"What needs to be done?\">\n    </header>\n\n    <section id=\"main\">\n        <input id=\"toggle-all\" type=\"checkbox\">\n        <label for=\"toggle-all\">Mark all as complete</label>\n        <ul id=\"todo-list\"></ul>\n    </section>\n\n    <footer>\n        <div id=stats>\n            <a id=\"clear-completed\">Clear completed</a>\n            <div id=\"todo-count\"></div>\n        </div>\n    </footer>\n\n</div>";
  },"useData":true});

templates["todos/show"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<script type=\"text/template\" id=\"item-template\">\n    <div class=\"view\">\n        <input class=\"toggle\" type=\"checkbox\" <%= done ? 'checked=\"checked\"' : '' %> />\n        <label><%= title %></label>\n        <a class=\"destroy\"></a>\n    </div>\n    <input class=\"edit\" type=\"text\" value=\"<%= title %>\" />\n</script>\n\n<script type=\"text/template\" id=\"stats-template\">\n    <% if (done) { %>\n    <a id=\"clear-completed\">Clear <%= done %> completed <%= done == 1 ? 'item' : 'items' %></a>\n    <% } %>\n    <div class=\"todo-count\"><b><%= remaining %></b> <%= remaining == 1 ? 'item' : 'items' %> left</div>\n</script>";
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