define([
	'backbone',
	'q',
	'models/leon'
], function(Backbone, Q, LeonModel) {

	var Leon = Backbone.View.extend({

		id: 'leon',

		imgs: [
			'leon_walk1.png',
			'leon_walk2.png'
		],

		svgs: [
			'leon_shadow1.svg',
			'leon_shadow2.svg'
		],

		src: 'img/leon/',

		color: 'ffffff',

		initialize: function(options) {
			this.walkIndex = 0;
			this.model = new LeonModel();

			this.listenTo(this.model,'change:walk',_.bind(this.handleWalk,this));

		},

		preload: function() {
			var preloadDeferred, loads;

			preloadDeferred = Q.defer();
			loads = 0;

			// load leon images
			_.each(this.imgs, function(img){
				$.get(this.src+img);
			}.bind(this));


			for (var i=0; i<this.svgs.length; i++) {
				var src, $svg;
				src = this.src+this.svgs[i];
				(function(i){
					$.get(src, function(data){
						loads++;

						$svg = $(data).find('svg');
						$svg = $svg.removeAttr('xmlns:a');
						this.svgs[i] = $svg;

						if ( loads === this.svgs.length ) {
							preloadDeferred.resolve(this);
						}

					}.bind(this), 'xml');
				}.bind(this)(i));
			};

			return preloadDeferred.promise;

		},

		render: function() {

			var renderDeferred = Q.defer();


			this.preload().then(function(){

				this.$assets = $('<div id="leonAssets" />');
				this.$img = $('<img />');
				this.$svg = $('<div class="svg" />');

				this.$assets.append(this.$img);
				this.$assets.append(this.$svg);

				this.$el.append(this.$assets);

				this.drawWalk(this.walkIndex);
				renderDeferred.resolve(this);


			}.bind(this));

			return renderDeferred.promise;
		},

	  	// keydown: function(e) {

	  	// 	switch(e.which) {
	  	// 		case 32: // space
	  	// 			e.preventDefault();
	  	// 			this.model.set('walk',true);
	  	// 		break;
	  	// 	}
	  	// },

	  	// keyup: function(e) {
	  	// 	switch(e.which) {
	  	// 		case 32: // space
	  	// 			this.model.set('walk',false);
	  	// 		break;
	  	// 	}
	  	// },

	  	handleWalk: function(model) {
	  		if ( model.changed.walk === true) {
	  			this.walk();
	  			this.walkingInterval = setInterval(function(){
	  				this.walk();
	  			}.bind(this),200);
	  		} else if ( this.walkingInterval ) {
	  			clearInterval(this.walkingInterval);
	  		}
	  	},

	  	walk: function() {
  			this.drawWalk(this.walkIndex++);
  			if (this.walkIndex >= this.imgs.length) { this.walkIndex = 0; }
	  	},

	  	drawWalk: function(walkIndex) {
	  		if ( this.$img ) {
	  			this.$img.attr('src',this.src+this.imgs[walkIndex]);
	  			this.$svg.html(this.svgs[walkIndex]);
	  			this.drawColor();
	  		}
	  	},

	  	setColor: function(color) {
	  		if ( color[0] != '#' ) { color = '#' + color; }
	  		this.color = color;

	  		this.drawColor();
	  	},

	  	drawColor: function() {
	  		if ( this.$svg ) {
	  			this.$svg.find('svg').children().css('fill', this.color);
	  		}
	  	}

	});
	return Leon;
});