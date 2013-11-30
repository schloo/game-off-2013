define([
	'backbone',
	'collections/decor'
], function(Backbone, DecorCollection) {

	var DecorView = Backbone.View.extend({

		initialize: function(options) {
			this.$el.attr('id', 'background');

			this.collection = new DecorCollection();
			this.listenTo(this.collection, 'add', this.renderFurniture);
			this.collection.add(this.collection.makeNewFurniture());

		},

		render: function() {
			return this;
		},

		renderFurniture: function(obj) {
			this.$el.append('<div class="furniture '+obj.get('type')+'" />');
		}

	});
	return DecorView;
});

