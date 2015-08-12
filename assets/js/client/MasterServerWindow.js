define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable',
    'jquery.storage'
], function ($, AbstractWindow) {
    "use strict";

    var network = window.application.network;

    function MasterServerWindow() {
        this.data = {
            id: 'master-server',
            template: 'assets/layouts/client/w_master_server.html',
            title: '# Master Server Config',
            content: '',
            classes: ['master-server'],
            width: 346,
            height: 105,
            pos_x: 0,
            pos_y: 0,
            onOpen: function () {
                $(document).on('click', '#master-server .check', checkAction);
                $(document).on('click', '#master-server .apply:not(.disabled)', applyAction);
            },
            onClose: function () {
                $(document).off('click', '#master-server .check', checkAction);
                $(document).off('click', '#master-server .apply:not(.disabled)', applyAction);
            }
        };

        var closeWindow = function () {
            $('#master-server > .close').removeClass('disabled').trigger('click');
        };

        var checkAction = function () {
            var url = $('#master-server input[name="server-url"]').val();
            network.request(url + network.gateAPI, {}, function (response) {
                if (response) {
                    $('#master-server .apply').removeClass('disabled');
                    $('#master-server .status').text('Status: OK. ' + response.name + '(' + response.version + ')');
                } else {
                    $('#master-server .apply').addClass('disabled');
                    $('#master-server .status').text('Status: Bad. Server not resolving.');
                }
            });
        };
        var applyAction = function () {
            var url = $('#master-server input[name="server-url"]').val();
            network.request(url + network.gateAPI, {}, function (response) {
                if (response) {
                    $('#master-server .apply').removeClass('disabled');
                    network.gateUrl = url;
                    $.localStorage('master-server-url', url);

                    $('#master-server .status').text('Status: Saved. Connecting...');
                    setTimeout(closeWindow, 500);
                } else {
                    $('#master-server .apply').addClass('disabled');
                    $('#master-server .status').text('Status: Bad. Server not resolving.');
                }
            });
        };
    }

    MasterServerWindow.prototype = new AbstractWindow;

    return MasterServerWindow;
});
