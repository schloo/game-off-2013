define([
	'backbone',
	'models/furniture'
], function(Backbone, FurnitureModel) {

	var Furniture = Backbone.Collection.extend({

		model: FurnitureModel,

		initialize: function(options) {
			this.parent = options.parent;

			this.on("add", function(model) {
				model.collection = this;
			  	this.listenTo(model, 'change:collision', this.collision);
			  	this.listenTo(model, 'change:off-screen', this.removeFurniture);
			}.bind(this));
		},

		move: function() {
			_.each(this.models,function(model){
				model.move();
			});
		},

		collision: function(model) {
			this.parent.collision(model);
		},

		removeFurniture: function(model) {
			this.remove(model);
		}

	});
	return Furniture;
});