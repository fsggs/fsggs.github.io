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
    'common/LiteConsole'
], function (LiteConsole) {
    "use strict";

    function Application() {
        this.network = undefined;
        this.console = new LiteConsole();
    }

    if (!window.application) {
        window.application = new Application();
    }

    Array.prototype.contains = function (object) {
        var i = this.length;
        while (i--) {
            if (this[i] === object) {
                return true;
            }
        }
        return false;
    };


    Array.prototype.add = function (key, value) {
        if (this.contains(key))
            this[key] = value;
        else {
            this.push(key);
            this[key] = value;
        }
    };


    Array.prototype.remove = function (key) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i] == key) {
                this.splice(i, 1);
                return;
            }
        }
    };

    application.console.log('Application started.', 'Launcher');
    application.console.addMessage('You using ' + navigator.version[0] + '(' + navigator.version[1] + ')', 'Client');

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




