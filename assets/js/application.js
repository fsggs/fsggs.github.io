requirejs.config({
    baseUrl: "assets/js/",
    paths: {
        'jquery': 'libs/jquery/jquery-2.1.4.min',
        'jquery.draggable': 'libs/jquery.draggable',
        'jquery.scrollbar': 'libs/jquery.mCustomScrollbar.min',
        'jquery.storage': 'libs/jquery.storage',
        'underscore': 'libs/underscore.js/underscore-1.8.3.min'
    },
    shim: {
        'jquery.draggable': ['jquery'],
        'jquery.scrollbar': ['jquery'],
        'jquery.storage': ['jquery'],
        'underscore': ['jquery']
    }
});

define('Application', [
    'jquery'
], function ($) {
    /**
     * Application
     *
     * @constructor
     */
    function Application() {
        this.network = undefined;
        this.stackWindows = [];
    }

    if (!window.application) {
        window.application = new Application();
    }

    return Application;
});

require([
    'Application',
    'Network',
    'common/ScreenManager',
    'common/WindowManager',
    'launcher/Launcher',
    'common/key-handler',
    'client/ClientScreen'
]);




