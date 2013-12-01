define([ 	'backbone',
			'models/color',
			'tinycolor'
		], function(Backbone, ColorModel, tinycolor) {

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


		setColor: function(targetColor, time) {
			this.color.set('threshold',false);
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

	});
	return AbstractColor;
});