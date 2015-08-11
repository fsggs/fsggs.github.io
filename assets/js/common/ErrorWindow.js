define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable'
], function ($, AbstractWindow) {
    "use strict";

    function ErrorWindow() {
        this.data = {
            id: undefined,
            template: 'assets/layouts/common/w_error.html',
            title: '# Error',
            classes: ['error'],
            content: '',
            width: 350,
            height: 80,
            pos_x: 0,
            pos_y: 0
        };
    }

    ErrorWindow.prototype = new AbstractWindow;

    return ErrorWindow;
});
