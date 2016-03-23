define([
    'jquery',
    'common/AbstractWindow'
], function ($, AbstractWindow) {
    "use strict";

    function ErrorWindow() {
        AbstractWindow.call(this);

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

    ErrorWindow.prototype = Object.create(AbstractWindow.prototype);
    ErrorWindow.prototype.constructor = ErrorWindow;

    return ErrorWindow;
});
