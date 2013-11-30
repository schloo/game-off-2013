define([
	'backbone',
	'models/furniture'
], function(Backbone, Furniture) {

	var Furniture = Backbone.Collection.extend({

		model: Furniture,

		initialize: function(options) {

		},

		makeNewFurniture: function() {
			var furniture = new Furniture();
			return furniture;
		}

	});
	return Furniture;
});