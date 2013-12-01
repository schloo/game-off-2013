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

			this.countdownThreshold = 12;

		},

	  	index: function() {
	  		this.$el.html('<p id="instructions"><strong>Freedom!</strong>Leon finally gets to explore outside of his cage and see the rest of the house! Help Leon stay hidden by changing his color as he walks. Use the arrow keys to control his color: up/down makes the color brighter and darker, and left/right changes which color it is.<a href="#game">Play!</a></p>');
	  		$('a').click(function(){
	  			setTimeout(function(){
	  				window.location.reload();
	  			},1);
	  		})
	  	},

	  	death: function() {
	  		this.decor.remove();
	  		this.$el.html('<p id="instructions"><strong>Captured.</strong>Leon was found by his human. Sorry Leon! Maybe next time.<a href="#game">Try Again</a></p>');
	  		$('a').click(function(){
	  			setTimeout(function(){
	  				window.location.reload();
	  			},1);
	  		})


	  	},

	  	game: function() {
	  		this.$el.html('');
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
	  		// console.log('collision', model);

	  		this.leon.model.set('walk',false);
	  		this.targetColor.setColor(model.getColor(), 200);


	  		this.startTime = (new Date()).getTime()/1000;
	  		this.count();
	  		this.countdownInterval = setInterval(function(){
	  			this.count();
	  		}.bind(this),100);
	  	},

	  	colorMatch: function(model) {
	  		// console.log('color match', model);

	  		this.leon.model.set('walk',true);
	  		this.playerColor.setColor('156b15',200);
	  		this.decor.collection.add(new FurnitureModel({ initialLeft: 155, current: this.decor.collection.models.length }));
	  		model.set('threshold',false);
	  		model.set('listening',false);

	  		this.$countdown.hide();
	  		clearInterval(this.countdownInterval);
	  	},

	  	count: function() {
	  		if ( ! this.$countdown) {
	  			this.$countdown = $('<div id="countdown" />');
	  			this.$el.append(this.$countdown);
	  		}
	  		this.$countdown.show();

	  		var time = parseInt((new Date()).getTime()/1000 - this.startTime);
	  		if ((this.countdownThreshold-time) <= 0) {

				window.location.hash = 'death';
			} else {
				this.$countdown.html('HUMAN WILL FIND YOU IN ' + (this.countdownThreshold-time) + ' seconds');
			}


	  	},


	});
	return App;
});