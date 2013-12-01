define([ 	'backbone',
		], function(Backbone) {

	var FurnitureView = Backbone.View.extend({

		className: 'furniture',

		initialize: function(options) {
			this.model = options.model;
			this.$el.addClass(this.model.getName());
			this.listenTo(this.model,'change:position',this.render);
		},

		render: function() {
			this.$el.css('left', this.model.get('position')+'%');
			return this;
		},

	});
	return FurnitureView;
});