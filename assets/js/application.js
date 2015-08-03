requirejs.config({
	baseUrl: "assets/js/",
	paths: {
		'jquery': 'libs/jquery/jquery-2.1.4.min',
		'jquery.draggable': 'libs/jquery.draggable',
		'jquery.scrollbar': 'libs/jquery.mCustomScrollbar.min'
	},
	"shim": {
		"jquery.draggable": ["jquery"],
		"jquery.scrollbar": ["jquery"]
	}
});

require(['launcher/launcher']);


