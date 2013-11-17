require([ 'backbone', 'app'], function(Backbone, App) {
	var Router = Backbone.Router.extend({

	  routes: {
	  	"": 					"index",
	    "help":                 "help",    // #help
	    "search/:query":        "search",  // #search/kiwis
	    "search/:query/p:page": "search"   // #search/kiwis/p7
	  },

	  initialize: function() {
	  	this.app = new App();
	  	Backbone.history.start();
	  },

	  index: function() {
	  	this.app.index();
	  },

	  help: function() {
		console.log('help');
	  },

	  search: function(query, page) {
		console.log('search');
	  }

	})
	return new Router();
});