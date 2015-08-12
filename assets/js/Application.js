requirejs.config({
    baseUrl: "assets/js/",
    paths: {
        'jquery': 'libs/jquery/jquery-2.1.4.min',
        'jquery.draggable': 'libs/jquery.draggable',
        'jquery.scrollbar': 'libs/jquery.mCustomScrollbar.min',
        'jquery.storage': 'libs/jquery.storage',
        'jquery.hotkeys': 'libs/jquery.hotkeys',
        'FPSMeter': 'libs/fpsmeter/fpsmeter-0.3.1',
        'underscore': 'libs/underscore.js/underscore-1.8.3.min'
    },
    shim: {
        'jquery.draggable': ['jquery'],
        'jquery.scrollbar': ['jquery'],
        'jquery.storage': ['jquery'],
        'jquery.hotkeys': ['jquery'],
        'underscore': ['jquery']
    }
});

define('Application', [
], function () {
    "use strict";

    function Application() {
        this.network = undefined;
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
    'client/ClientScreen'
]);




