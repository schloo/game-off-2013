define([
	'backbone',
	'collections/decor',
	'models/furniture'
], function(Backbone, DecorCollection, FurnitureModel) {

	var DecorView = Backbone.View.extend({

		initialize: function(options) {
			this.parent = options.parent;

			this.leon = options.leon;

			this.$el.attr('id', 'background');

			this.collection = new DecorCollection({ parent: this });
			this.listenTo(this.collection, 'add', this.renderFurniture);

			this.listenTo(this.leon.model,'change:walk',_.bind(this.scroll,this));

			this.timeAmount = 200;
	  		this.steps = 20;

		},

		render: function() {
			this.$furniture = $('<div id="furniture" />');
			this.$el.append(this.$furniture);
			this.collection.add(new FurnitureModel());
			return this;
		},

		renderFurniture: function(model) {

			this.$furniture.append(model.view.render().el);
		},

	  	scroll: function(model) {

  			if ( model.changed.walk === true) {
  				clearInterval(this.scrollingInterval);
  				this.move();
  				this.scrollingInterval = setInterval(function(){
  					this.move();
  				}.bind(this),this.timeAmount/this.steps);

  			} else if ( this.scrollingInterval ) {
  				clearInterval(this.scrollingInterval);
  			}
	  	},

	  	move: function() {
	  		this.collection.move();
	  	},

	  	collision: function(model) {
	  		this.parent.collision(model);
	  	}

	});
	return DecorView;
});

