require([ 'backbone', 'app'], function(Backbone, App) {
	var Router = Backbone.Router.extend({
	  routes: {
	  	"": 					"index"
	  },

	  initialize: function() {
	  	this.app = new App();
	  	Backbone.history.start();
	  },

	  index: function() {
	  	this.app.index();
	  }
	});
	return new Router();
});