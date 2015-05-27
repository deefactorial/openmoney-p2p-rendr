var Base = require('./base');

module.exports = Base.extend({
  url: '/users/:login',
  idAttribute: 'login'
});
module.exports.id = '_User';
