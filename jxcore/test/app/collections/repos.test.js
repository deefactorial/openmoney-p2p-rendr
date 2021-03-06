if(typeof window === 'undefined') {
  var should = require("should");
  var Repos = require('../../../app/collections/repos');
} else {
  var Repos = require('app/collections/repos');
}


if(typeof describe !== 'undefined') {
  describe('Repos', function () {

    it('should have a default url if params.user is not specified', function () {
      var repos = new Repos();
      repos.url().should.equal('/repositories');
    });

    it('should have a unique url if params.user is specified', function () {
      var repos = new Repos();
      repos.params.user = 'someusername';
      repos.url().should.equal('/users/:user/repos');
    });

  });
}