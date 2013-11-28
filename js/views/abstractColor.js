define([ 	'backbone',
			'models/color'
		], function(Backbone, ColorModel) {

	var AbstractColor = Backbone.View.extend({

		className: 'color',

		initialize: function(options) {
			this.color = new ColorModel({ color: (options || {}).color || null });

			this.listenTo(this.color, 'change', this.render);
		},

		render: function() {
			this.$el.css('background-color',this.color.getColor());
			return this;
		},

	});
	return AbstractColor;
});