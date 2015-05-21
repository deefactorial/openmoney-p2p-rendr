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
  //, pouch: {
  //  options: {
  //    query: {
  //      include_docs: true,
  //      fun: {
  //        map: function(doc, emit) {
  //          if (doc.type === 'repo') {
  //            emit(doc.date, null)
  //          }
  //        }
  //      }
  //    },
  //    changes: {
  //      include_docs: true,
  //      filter: function(doc) {
  //        return doc._deleted || doc.type === 'repo';
  //      }
  //    }
  //  }
  //},
  //parse: function(result) {
  //  return Base.prototype.parse.apply(_.pluck(result.rows, 'doc'));
  //}
});
module.exports.id = 'Repos';
