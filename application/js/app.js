define([ 	'backbone',
			'views/playerColor',
			'views/targetColor',
			'views/colorDistance'
		], function(Backbone, PlayerColorView, TargetColorView, ColorDistanceView) {

	var App = Backbone.View.extend({

		el: 'body',

		events: {
			'keydown': 'keydown',
		},

		initialize: function() {
			this.playerColor = new PlayerColorView();
			this.targetColor = new TargetColorView();
			this.colorDistance = new ColorDistanceView({ a: this.playerColor, b: this.targetColor });
			this.targetColor.setColorDistance(this.colorDistance);
		},

	  	index: function() {
	  		this.render();
	  	},

	  	render: function() {
	  		this.$el.append(this.playerColor.render().el);
	  		this.$el.append(this.targetColor.render().el);
	  		this.$el.append(this.colorDistance.render().el);
	  	},

	  	keydown: function(e) {
	  		this.playerColor.keydown(e);
	  	}

	});
	return App;
});