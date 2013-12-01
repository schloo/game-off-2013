require([ 'backbone', 'app'], function(Backbone, App) {
	var Router = Backbone.Router.extend({
	  routes: {
	  	"": "index",
	  	"game": "game",
	  	"death": "death",
	  },

	  initialize: function() {
	  	this.app = new App();
	  	Backbone.history.start();
	  },

	  index: function() {
	  	this.app.index();
	  },

	  game: function() {
	  	this.app.game();
	  },

	  death: function() {
	  	this.app.death();
	  }

	});
	return new Router();
});