define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable'
], function ($, AbstractWindow) {
    "use strict";

    function ConsoleWindow() {
        this.data = {
            id: 'console',
            template: 'assets/layouts/client/w_console.html',
            title: '# Debug console',
            classes: ['console'],
            content: '',
            width: 450,
            height: 350,
            pos_x: 0,
            pos_y: 0
        };

        var beforeRender = function() {

        }
    }

    ConsoleWindow.prototype = new AbstractWindow;

    return ConsoleWindow;
});
