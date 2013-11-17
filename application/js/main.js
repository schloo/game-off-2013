requirejs.config({
    baseUrl: 'js',
    shim: {
    	'backbone': {
        	deps: ['underscore', 'jquery'],
        	exports: 'Backbone'
    	},
    	'underscore': {
        	exports: '_'
    	},
    	'jquery': {
    		exports: '$'
    	}
    },
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        less: '//cdnjs.cloudflare.com/ajax/libs/less.js/1.4.1/less.min',
        tinycolor: 'lib/tinycolor'
    }
});

require(['router', 'less']);