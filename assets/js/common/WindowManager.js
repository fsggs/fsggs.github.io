define([
    'jquery',
    'common/ErrorWindow',
    'underscore'
], function ($, ErrorWindow) {
    "use strict";

    var windows = [];

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
                windows.add(_w.data.id, _w);
                $('.draggable').draggable();
                if ($('#' + _w.data.id).hasClass('modal')) {
                    $('#modal-background').show();
                }
                if (callback) callback();
            }, onCenter);
        };

        __construct(WindowManager);
    }

    function loadWindow(id) {
        if (windows.contains(id)) {
            return windows[id];
        } else {
            console.error('Not found window ' + id + ' for close event!');
        }
        return null;
    }

    $(document).on('mousedown', '.window', function () {
        if (!$(this).is(':last-child')) {
            $(this).detach().appendTo('body');
        }
    });

    $(document).on('mousedown, click', '.window .close:not(".disabled")', function () {
        console.log('BU');

        var id = $(this).parent().attr('id');
        var _w = loadWindow(id);

        if ($(this).parent().hasClass('modal')) {
            $('#modal-background').hide();
        }

        if ($(this).hasClass('hide') || $(this).parent().hasClass('instance')) {
            if (undefined !== _w.data.onHide && 'function' === typeof _w.data.onHide) {
                _w.data.onHide();
            }
            $(this).parent().hide();
        } else {
            if (undefined !== _w.data.onClose && 'function' === typeof _w.data.onClose) {
                _w.data.onClose();
            }
            windows.remove(id);
            $(this).parent().remove();
        }
    });

    return WindowManager;
});
