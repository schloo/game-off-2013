define([
	'backbone',
	'views/furniture'
], function(Backbone, FurnitureView) {

	var Furniture = Backbone.Model.extend({

		types: [
			{ name: 'bookshelf', color: '40250d'},
			{ name: 'chair', color: '1f8599'},
			{ name: 'couch', color: '80196f'},
			{ name: 'curtains', color: '4d1a80'},
			{ name: 'fireplace', color: '4d0f0f'},
			{ name: 'ottoman', color: '29cc5f'},
			{ name: 'pot', color: '732e16'},
		],

		initialize: function(options) {
			this.set('type', (options || {}).type || this.getRandomType( (options || {}).current));
			this.set('position', (options || {}).initialLeft || 100 );
			this.amountToMove = 0.5;
			this.threshold = 45;
			this.view = new FurnitureView({ model: this });

			this.listenTo(this, 'change:position', this.changePosition);
		},

		getRandomType: function(num) {

			if ( num === undefined) {
				num = Math.floor(Math.random()*this.types.length);
			} else {
				num = num % this.types.length;
			}
			return this.types[num];
		},

		getName: function() {
			return this.get('type').name;
		},

		getColor: function() {
			return this.get('type').color;
		},

		move: function() {
			left = (this.get('position')-(this.amountToMove));
			this.set('position',left);
		},

		changePosition: function() {
			var pos = this.get('position');
			if ( pos < this.threshold ) {
				this.set('collision',true);
			} else if ( pos < -30 ) {
				this.set('off-screen',true);
			}
		}

	});
	return Furniture;
});