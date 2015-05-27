var Repo = require('../models/repo')
  , Base = require('./base');
var _ = require('underscore');

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
