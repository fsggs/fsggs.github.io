/**
 * Application
 *
 * @constructor
 */
function Application() {
    this.network = undefined;
}

window.application = new Application();


/**
 * ADM
 */
requirejs.config({
	baseUrl: "assets/js/",
	paths: {
		'jquery': 'libs/jquery/jquery-2.1.4.min',
		'jquery.draggable': 'libs/jquery.draggable',
		'jquery.scrollbar': 'libs/jquery.mCustomScrollbar.min',
        'jquery.storage': 'libs/jquery.storage'
	},
	shim: {
		'jquery.draggable': ['jquery'],
		'jquery.scrollbar': ['jquery'],
        'jquery.storage': ['jquery']
	}
});

require([
    'network',
    'launcher/launcher',
    'launcher/master-server',
    'launcher/key-handler'
]);


