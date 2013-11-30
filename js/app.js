define([ 	'backbone',
			'views/playerColor',
			'views/targetColor',
			'views/colorDistance',
			'views/leon',
			'views/decor',
		], function(Backbone, PlayerColorView, TargetColorView, ColorDistanceView, Leon, Decor) {

	var App = Backbone.View.extend({

		el: '#content',

		events: {
			'keydown': 'keydown',
		},

		initialize: function() {
			this.playerColor = new PlayerColorView();
			this.targetColor = new TargetColorView();
			this.colorDistance = new ColorDistanceView({ a: this.playerColor, b: this.targetColor });
			this.decor = new Decor();
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

	  		$('body').append(this.decor.render().el);

	  		this.leon.render().then(function(leon){
	  			this.$el.append(leon.el);
	  		}.bind(this));

	  		$('body').keydown(_.bind(this.keydown,this));
	  	},

	  	keydown: function(e) {
	  		this.playerColor.keydown(e);
	  		this.leon.keydown(e);
	  	}

	});
	return App;
});