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

		},

		render: function() {
			this.$furniture = $('<div id="furniture" />');
			this.$el.append(this.$furniture);
			this.collection.add(this.collection.makeNewFurniture());
			return this;
		},

		renderFurniture: function(obj) {
			this.$furniture.append('<div class="furniture '+obj.get('type')+'" />');
		},

	  	scroll: function(model) {
	  		this.amount = 200;
	  		this.steps = 20;

  			if ( model.changed.walk === true) {

  				this.move();
  				this.scrollingInterval = setInterval(function(){
  					this.move();
  				}.bind(this),this.amount/this.steps);

  			} else if ( this.scrollingInterval ) {
  				clearInterval(this.scrollingInterval);
  			}
	  	},

	  	move: function() {
	  		this.amountToMove = 40;
	  		var left = parseInt(this.$furniture.css('left'));
	  		this.$furniture.css({ left: (left-(this.amountToMove/this.steps))+'px' });
	  	}

	});
	return DecorView;
});

