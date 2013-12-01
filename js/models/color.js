define(['backbone', 'tinycolor'], function(Backbone, tinycolor) {

	var Color = Backbone.Model.extend({

		initialize: function(opts) {
			if (opts.color === null) { opts.color = tinycolor('156b15'); }

			this.set('threshold',false);
			this.set('color',opts.color);
		},

		getColor: function(type) {
			var color = Backbone.Model.prototype.get.call(this, 'color');
			if (! color) return null;

			color = tinycolor(color);
			if (! type) { type = 'hex'; }
			type = 'to'+type.slice(0,1).toUpperCase() + type.slice(1);

			if (typeof color[type] === 'function') {
				switch(type) {
					case 'toHex' :
						return '#'+color[type]();
					break;
					default :
						return color[type]();
					break;
				}
			}
		},

		setColor: function(opts) {
			var color = this.getColor('hsl');
			_.each(['h','s','l'],function(k){
				if (! opts[k]) { opts[k] = color[k]; }
			});

			this.set('color','hsl('+opts.h+','+opts.s+','+opts.l+')');
		},

		random: function() {
			var hue = Math.floor(Math.random()*360);
			var saturation = 0.8;
			var lightness = Math.random();
			return tinycolor('hsl('+hue+','+saturation+','+lightness+',)');
		}

	});
	return Color;
});