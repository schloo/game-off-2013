define([ 	'backbone',
			'models/colorDistance'
		], function(Backbone, ColorDistanceModel) {

	var ColorDistance = Backbone.View.extend({

		className: 'colorDistance',

		initialize: function(opts) {

			this.model = new ColorDistanceModel(opts);

			this.listenTo(this.model, 'change', this.render);
		},

		render: function(distance) {
			this.$el.html('Distance: ' + parseFloat(this.model.get('distance')).toFixed(2));
			return this;
		},

	});
	return ColorDistance;
});