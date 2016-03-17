define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable',
    'jquery.scrollbar'
], function ($, AbstractWindow) {
    "use strict";

    var lc = application.console;

    function ConsoleWindow() {
        this.data = {
            id: 'console',
            template: 'assets/layouts/client/w_console.html',
            title: 'Debug console',
            classes: ['console'],
            width: 450,
            height: 350,
            pos_x: 0,
            pos_y: 5,
            onOpen: function () {
                $('#console-input').find('> input').focus();

                if ('' == $('#console-panel').html()) {
                    loadMessages();
                }

                $('#console-panel').mCustomScrollbar({
                    axis: 'y',
                    autoHideScrollbar: true
                });

                if ($('#console-panel').hasClass('mCustomScrollbar')) {
                    scrollConsoleToLast();
                }
                $(document).on('keydown', null, 'RETURN', keySendMessageToConsole);
                $(document).on('console.message.receive', sendMessageToConsole);
            },
            beforeRender: function (_w) {
                _w.data.pos_x = $(window).width() - (_w.data.width + 10);
                _w.data.pos_y = 5;
            },
            onClose: function () {
                $(document).off('keydown', null, 'RETURN', keySendMessageToConsole);
                $(document).off('console.message.receive', sendMessageToConsole);
            },
            onHide: function () {
                $(document).off('keydown', null, 'RETURN', keySendMessageToConsole);
                $(document).off('console.message.receive', sendMessageToConsole);
            }
        };

        var loadMessages = function () {
            var messages = '';
            $.each(lc.getAllMessages(), function (index, message) {
                messages += "<p class=\"message\">" + message + "</p> \r\n";
            });

            $('#console-panel').append(messages);
        };

        var scrollConsoleToLast = function () {
            $("#console-panel").mCustomScrollbar('scrollTo', 'last', {
                scrollInertia: 0
            });
        };

        var sendMessageToConsole = function (event, message) {
            $('#console-panel .mCSB_container')
                .append('<p class="message">' + message + '</p>');
            $("#console-panel").mCustomScrollbar('scrollTo', 'last');
        };

        var keySendMessageToConsole = function (event) {
            if ($('#console-input > input:focus').length) {
                event.preventDefault();
                var message = $('#console-input > input').val();
                if (message.trim() != '') {
                    $('#console-input > input').val('');
                    lc.addMessage(message);
                }
            }
        };
    }

    ConsoleWindow.prototype = new AbstractWindow;

    return ConsoleWindow;
});
