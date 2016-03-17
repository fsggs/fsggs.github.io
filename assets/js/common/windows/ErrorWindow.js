define([
    'jquery',
    'common/AbstractWindow'
], function ($, AbstractWindow) {
    "use strict";

    function ErrorWindow() {
        this.data = {
            id: undefined,
            template: 'assets/layouts/common/w_error.html',
            title: 'Error',
            classes: ['error'],
            content: '',
            width: 350,
            height: 80
        };
    }

    ErrorWindow.prototype = new AbstractWindow;

    return ErrorWindow;
});
