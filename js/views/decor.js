define([
	'backbone',
	'collections/decor'
], function(Backbone, DecorCollection) {

	var DecorView = Backbone.View.extend({

		initialize: function(options) {
			this.leon = options.leon;

			this.$el.attr('id', 'background');

			this.collection = new DecorCollection();
			this.listenTo(this.collection, 'add', this.renderFurniture);


			this.listenTo(this.leon.model,'change:walk',_.bind(this.scroll,this));

			this.timeAmount = 200;
	  		this.steps = 20;
	  		this.amountToMove = 5;
	  		this.amountToIncrease = 0.001;
		},

		render: function() {
			this.$furniture = $('<div id="furniture" />');
			this.$el.append(this.$furniture);
			this.collection.add(this.collection.makeNewFurniture());
			return this;
		},

		renderFurniture: function(obj) {
			this.$furniture.append('<div style="left: 90%" class="furniture '+obj.get('type')+'" />');
		},

	  	scroll: function(model) {


  			if ( model.changed.walk === true) {

  				this.move();
  				this.scrollingInterval = setInterval(function(){
  					this.move();
  				}.bind(this),this.timeAmount/this.steps);

  			} else if ( this.scrollingInterval ) {
  				clearInterval(this.scrollingInterval);
  			}
	  	},

	  	move: function() {


	  		this.$('.furniture').each(function(i, furniture){

	  			var left = parseFloat($(furniture).css('left'));
	  			left = (left-(this.amountToMove/this.steps));
	  			$(furniture).css({ left: left+'px' });
	  		}.bind(this));


	  		this.amountToMove += this.amountToIncrease;
	  	}

	});
	return DecorView;
});

