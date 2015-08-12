define([
    'jquery',
    'common/ErrorWindow',
    'underscore'
], function ($, ErrorWindow) {
    "use strict";

    function WindowManager(windowClass, data) {
        var _w = undefined;
        var WindowManager = this;

        function showErrorWindow(className) {
            console.warn('Not found window: ~_w:' + className);
            _w = new ErrorWindow();
            _w.setContent('Not found window: ~_w:' + className);
            _w.toCenter();
        }

        var __construct = function () {
            try {
                var _wClass = require(windowClass);

                if (_wClass && 'function' == typeof _wClass) {
                    _w = new _wClass(data);
                } else {
                    showErrorWindow(_wClass);
                }
            } catch (e) {
                showErrorWindow(windowClass);
            }
        };

        this.render = function (callback, onCenter) {
            _w.render(function () {
                $('.draggable').draggable();
                if (callback) callback();
            }, onCenter);
        };

        __construct(WindowManager);
    }

    $(document).on('mousedown', '.window', function () {
        if (!$(this).is(':last-child')) {
            $(this).detach().appendTo('body');
        }
    });

    $(document).on('click', '.window .close:not(".disabled")', function () {
        //TODO:: dispatch event
        $(this).parent().remove();
    });

    return WindowManager;
});
