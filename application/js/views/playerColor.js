define([ 	'backbone',
			'models/color',
			'views/abstractColor'
		], function(Backbone, ColorModel, AbstractColor) {

	var PlayerColor = AbstractColor.extend({

	  	keydown: function(e) {
	  		var rangeVal = function(val,subtract) {
	  			return val = ((val-subtract)-1)*-1;
	  		}

	  		switch(e.which) {
	  			case 38: case 40: // up, down
	  				e.preventDefault();
	  				this.changeBrightness(rangeVal(e.which,38));
	  			break;
	  			case 37: case 39: // left, right
	  				e.preventDefault();
	  				this.changeHue(rangeVal(e.which,37));
	  			break;
	  		}
	  	},

	  	changeBrightness: function(val) {
	  		val *= 0.03;

	  		var min = 0, max = 1, key = 'l', attrs = {};

	  		var v = this.color.getColor('hsl')[key];


	  		if (val+v > max || val+v < min) {
	  			val = 0;
	  		}

	  		attrs[key] = val+v;
	  		this.color.setColor(attrs);
	  	},

	  	changeHue: function(val) {
	  		val *= 4;

	  		var min = 0, max = 360, key = 'h', attrs = {};

	  		var v = this.color.getColor('hsl')[key];

	  		if (val+v > max) {
	  			v += -360;
	  		}
	  		if (val+v < min) {
	  			val += 360;
	  		}

	  		attrs[key] = val+v;
	  		this.color.setColor(attrs);

	  	}

	});
	return PlayerColor;
});