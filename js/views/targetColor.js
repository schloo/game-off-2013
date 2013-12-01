define([ 	'backbone',
			'models/color',
			'views/abstractColor',
			'tinycolor'
		], function(Backbone, ColorModel, AbstractColor, tinycolor) {

	var TargetColor = AbstractColor.extend({

		initialize: function() {


			AbstractColor.prototype.initialize.call(this);


			this.color.set('color',this.color.random());
			this.color.set('listening',false);

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

			if (this.color.get('listening') && opts.changed.distance < this.colorDistance.model.get('threshold')) {
				this.color.set('threshold',true);
				this.color.get('listening', false);
				// this.setColor();
			}
		},

		setColor: function(targetColor, time) {
			this.color.set('threshold',false);
			this.color.set('listening',true);
			if (this.stepper) { clearInterval(this.stepper); }
			var ths = this;
			var steps = 50;
			var min = 1500;
			var max = 3500;

			if ( targetColor ) {
				targetColor = tinycolor(targetColor).toHsl();
			} else {
				targetColor = this.color.random().toHsl();
			}

			var currentColor = this.color.getColor('hsl');

			if ( !time ) {
				time = Math.floor(Math.random() * (max-min)) + min;
			}



			var step = 0;

			var getStep = function(start, end, i) {
				return start + ((end-start)/steps*i);
			}

			this.stepper = setInterval(function(){
				step++;

				if (step >= steps) {
					clearInterval(ths.stepper);
				}

				var h = getStep(currentColor.h, targetColor.h, step);
				var s = getStep(currentColor.s, targetColor.s, step);
				var l = getStep(currentColor.l, targetColor.l, step);
				var c = 'hsl('+h+','+s+','+l+',)';
				ths.color.set('color',c);

			},time/steps);
		},

		walk: function() {
			if (this.stepper) { clearInterval(this.stepper); }
			this.setColor();
		}

	});
	return TargetColor;
});