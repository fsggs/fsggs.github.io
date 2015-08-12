define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable',
    'jquery.scrollbar'
], function ($, AbstractWindow) {
    "use strict";

    function ConsoleWindow() {
        var _w = this;

        this.data = {
            id: 'console',
            template: 'assets/layouts/client/w_console.html',
            title: '# Debug console',
            classes: ['console'],
            content: '',
            width: 450,
            height: 350,
            pos_x: 0,
            pos_y: 5,
            onOpen: function () {
                $('#console-input').find('> input').focus();
                $('.scrollbar-box').mCustomScrollbar({
                    axis: 'y',
                    autoHideScrollbar: true
                });
                $("#console-panel").mCustomScrollbar('scrollTo', 'last', {
                    scrollInertia: 0
                });
                $(document).on('keydown', null, 'RETURN', keySendToConsole);
            },
            beforeRender: function () {
                _w.data.pos_x = $(window).width() - (_w.data.width + 10);
            },
            onClose: function () {
                $(document).on('keydown', keySendToConsole);
            },
            onHide: function () {
                $(document).on('keydown', keySendToConsole);
            }
        };

        var keySendToConsole = function (event) {
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
