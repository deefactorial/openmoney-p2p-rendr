if(typeof window === 'undefined') {
  var should = require("should");
  var UsersShowView = require('../../../app/views/users/show');
  var App = require('../../../app/app');
} else {
  var UsersShowView = require('app/views/users/show');
  var App = require('app/app');
}

if (typeof describe !== 'undefined') {
  describe('UsersShowView', function () {

    beforeEach(function () {
      this.app = new App({rootPath: '/'});
    });

    it('should have repos data in getTemplateData', function () {
      var repos = [{foo: 'bar'}];
      var view = new UsersShowView({repos: repos, app: this.app});
      var data = view.getTemplateData();
      data.should.have.property('repos', repos);
    });

  });
}