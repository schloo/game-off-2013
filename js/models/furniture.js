define([
	'backbone',
], function(Backbone) {

	var Furniture = Backbone.Model.extend({

		types: [
			'bookshelf',
			'chair',
			'couch',
			'curtains',
			'fireplace',
			'ottoman',
			'pot'
		],

		initialize: function(options) {
			this.set('type', (options || {}).type || this.getRandomType());
		},

		getRandomType: function() {
			var random_int = Math.floor(Math.random()*this.types.length);
			return this.types[random_int];
		}

	});
	return Furniture;
});