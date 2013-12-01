define([ 	'backbone',
			'models/color',
			'views/abstractColor',
			'tinycolor'
		], function(Backbone, ColorModel, AbstractColor, tinycolor) {

	var TargetColor = AbstractColor.extend({

		initialize: function() {


			AbstractColor.prototype.initialize.call(this);


			this.color.set('color',this.color.random());


			this.walking = false;
			// this.walk();
		},

		setColorDistance: function(colorDistance) {
			this.colorDistance = colorDistance;

			this.listenTo(this.colorDistance.model, 'change', this.calculateDistance);
		},

		calculateDistance: function(opts) {

			if (! opts) {
				opts = { changed: {distance: this.colorDistance.model.get('distance')} };
			}

			if (opts.changed.distance < this.colorDistance.model.get('threshold')) {

				this.color.set('threshold',true);

				// this.setColor();
			}
		},


		walk: function() {
			if (this.stepper) { clearInterval(this.stepper); }
			this.setColor();
		}

	});
	return TargetColor;
});