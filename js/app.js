define([ 	'backbone',
			'views/playerColor',
			'views/targetColor',
			'views/colorDistance',
			'views/leon',
			'views/decor',
			'models/furniture'
		], function(Backbone, PlayerColorView, TargetColorView, ColorDistanceView, Leon, Decor, FurnitureModel) {

	var App = Backbone.View.extend({

		el: '#content',

		initialize: function() {
			this.playerColor = new PlayerColorView();
			this.targetColor = new TargetColorView();
			this.colorDistance = new ColorDistanceView({ a: this.playerColor, b: this.targetColor });
			this.leon = new Leon();
			this.decor = new Decor({ leon : this.leon, parent: this });
			this.targetColor.setColorDistance(this.colorDistance);
			this.playerColor.setTargetPlayer(this.leon);

			$('body').keydown(_.bind(this.keydown,this));
			$('body').keyup(_.bind(this.keyup,this));


			this.listenTo(this.targetColor.color, 'change:threshold', this.colorMatch);
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
	  			leon.model.set('walk',true);
	  		}.bind(this));


	  	},

	  	keydown: function(e) {
	  		this.playerColor.keydown(e);
	  		// this.leon.keydown(e);
	  	},

	  	keyup: function(e) {
	  		// this.leon.keyup(e);
	  	},

	  	collision: function(model) {
	  		console.log('collision', model);
	  		this.leon.model.set('walk',false);
	  		this.targetColor.setColor(model.getColor(), 200);

	  	},

	  	colorMatch: function(model) {
	  		console.log('color match', model);
	  		this.leon.model.set('walk',true);
	  		this.decor.collection.add(new FurnitureModel({ initialLeft: 155 }));
	  		model.set('threshold',false);
	  		model.set('listening',false);
	  	}

	});
	return App;
});