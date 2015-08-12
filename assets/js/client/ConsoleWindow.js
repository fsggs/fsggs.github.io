define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable',
    'jquery.scrollbar'
], function ($, AbstractWindow) {
    "use strict";

    function ConsoleWindow() {
        this.data = {
            id: 'console',
            template: 'assets/layouts/client/w_console.html',
            title: '# Debug console',
            classes: ['console'],
            width: 450,
            height: 350,
            pos_x: 0,
            pos_y: 5,
            onOpen: function () {
                $('#console-input').find('> input').focus();
                $('#console-panel').mCustomScrollbar({
                    axis: 'y',
                    autoHideScrollbar: true
                });
                if ($('#console-panel').hasClass('mCustomScrollbar')) {
                    scrollConsoleToLast();
                }
                $(document).on('keydown', null, 'RETURN', keySendMessageToConsole);
            },
            beforeRender: function (_w) {
                _w.data.pos_x = $(window).width() - (_w.data.width + 10);
                _w.data.pos_y = 5;
            },
            onClose: function () {
                $(document).on('keydown', null, 'RETURN', keySendMessageToConsole);
            },
            onHide: function () {
                $(document).on('keydown', null, 'RETURN', keySendMessageToConsole);
            }
        };

        var scrollConsoleToLast = function () {
            $("#console-panel").mCustomScrollbar('scrollTo', 'last', {
                scrollInertia: 0
            });
        };

        var keySendMessageToConsole = function (event) {
            if ($('#console-input > input:focus').length) {
                event.preventDefault();
                var message = $('#console-input > input').val();
                if (message.trim() != '') {
                    $('#console-input > input').val('');
                    $('#console-panel .mCSB_container')
                        .append('<p class="message">[Console]: ' + message + '</p>');
                    $("#console-panel").mCustomScrollbar('scrollTo', 'last');
                }
            }
        };
    }

    ConsoleWindow.prototype = new AbstractWindow;

    return ConsoleWindow;
});
