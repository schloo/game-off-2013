define([ 	'backbone',
			'views/playerColor',
			'views/targetColor',
			'views/colorDistance',
			'views/leon',
		], function(Backbone, PlayerColorView, TargetColorView, ColorDistanceView, Leon) {

	var App = Backbone.View.extend({

		el: '#content',

		events: {
			'keydown': 'keydown',
		},

		initialize: function() {
			this.playerColor = new PlayerColorView();
			this.targetColor = new TargetColorView();
			this.colorDistance = new ColorDistanceView({ a: this.playerColor, b: this.targetColor });
			this.leon = new Leon({});
			this.targetColor.setColorDistance(this.colorDistance);
			this.playerColor.setTargetPlayer(this.leon);
		},

	  	index: function() {
	  		this.render();
	  	},

	  	render: function() {
	  		this.$el.append(this.playerColor.render().el);
	  		this.$el.append(this.targetColor.render().el);
	  		this.$el.append(this.colorDistance.render().el);

	  		this.leon.render().then(function(leon){
	  			this.$el.append(leon.el);
	  		}.bind(this));
	  	},

	  	keydown: function(e) {
	  		this.playerColor.keydown(e);
	  		this.leon.keydown(e);
	  	}

	});
	return App;
});