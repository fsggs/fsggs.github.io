define([
    'jquery',
    'common/ErrorWindow',
    'underscore'
], function ($, ErrorWindow) {
    "use strict";

    function WindowManager($, windowClass, data) {
        var _w = undefined;
        var WindowManager = this;

        var __construct = function () {
            try {
                var _wClass = require(windowClass);

                if (_wClass && 'function' == typeof _wClass) {
                    _w = new _wClass($, data);
                } else {
                    _w = new ErrorWindow($);
                    _w.setMessage('Not found window: ~_w:' + _wClass);
                }
            } catch (e) {
                _w = new ErrorWindow($);
                _w.setMessage('Not found window: ~_w:' + windowClass);
            }
        };

        this.render = function (callback) {
            _w.render(function () {
                $('.draggable').draggable();
                if (callback) callback();
            });
        };

        __construct(WindowManager);
    }

    $(document).on('click', '.window > .close:not(".disabled")', function () {
        $(this).parent().remove();
    });

    return WindowManager;
});
