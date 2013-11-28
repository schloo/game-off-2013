define([ 	'backbone',
			'models/color',
			'views/abstractColor'
		], function(Backbone, ColorModel, AbstractColor) {

	var TargetColor = AbstractColor.extend({

		initialize: function() {


			AbstractColor.prototype.initialize.call(this);


			this.color.set('color',this.color.random());

			this.walking = false;
			this.walk();
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
				this.colorWalk();
			}
		},

		colorWalk: function() {
			if (this.stepper) { clearInterval(this.stepper); }
			var ths = this;
			var steps = 50;
			var min = 1500;
			var max = 3500;

			var randomColor = this.color.random().toHsl();
			var currentColor = this.color.getColor('hsl');

			var time = Math.floor(Math.random() * (max-min)) + min;


			var step = 0;

			var getStep = function(start, end, i) {
				return start + ((end-start)/steps*i);
			}

			this.stepper = setInterval(function(){
				step++;

				if (step >= steps) {
					clearInterval(ths.stepper);
				}

				var h = getStep(currentColor.h, randomColor.h, step);
				var s = getStep(currentColor.s, randomColor.s, step);
				var l = getStep(currentColor.l, randomColor.l, step);
				var c = 'hsl('+h+','+s+','+l+',)';
				ths.color.set('color',c);

			},time/steps);
		},

		walk: function() {
			if (this.stepper) { clearInterval(this.stepper); }
			this.colorWalk();
		}

	});
	return TargetColor;
});