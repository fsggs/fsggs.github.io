define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable',
    'jquery.scrollbar',
    'jquery.storage'
], function ($, AbstractWindow) {
    "use strict";

    function ErrorWindow($) {
        var network = window.application.network;
        var _w = this;
        var message = '';

        this.setMessage = function (text) {
            message = text;
        };

        this.render = function (callback) {
            if (!$('#error-window').length) {
                network.loadHtml('assets/layouts/common/w_error.html',
                    function (data) {
                        $('body').prepend(data);
                        $('#error-window .message').text(message);
                        $('#error-window').show();
                        if (callback) callback();
                    }
                );
            } else {
                if (($('#error-window').is(':visible'))) {
                    $('#error-window .message').text(message);
                    $('#error-window').hide();
                } else {
                    $('#error-window .message').text(message);
                    $('#error-window').show();
                }
                if (callback) callback();
            }
        }
    }

    ErrorWindow.prototype = Object.create(AbstractWindow.prototype);

    return ErrorWindow;
});
