define([
    'jquery',
    'common/AbstractWindow',
    'jquery.storage'
], function ($, AbstractWindow) {
    "use strict";

    var network = window.application.network;
    var lc = window.application.console;

    function MasterServerWindow() {
        AbstractWindow.call(this);

        this.data = {
            id: 'master-server',
            template: 'assets/layouts/client/w_master_server.html',
            title: 'Master Server Config',
            classes: ['master-server'],
            width: 346,
            height: 105,
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
            lc.log('Trying connect to master server ' + url, 'Client');
            network.request(network.getApiServer(url), {}, function (response) {
                if (response) {
                    $('#master-server .apply').removeClass('disabled');
                    $('#master-server .status').text('Status: OK. ' + response.name + ' v.(' + response.version + ')');
                    lc.log('Status: OK. ' + response.name + ' v.(' + response.version + ')', 'Client');
                } else {
                    $('#master-server .apply').addClass('disabled');
                    $('#master-server .status').text('Status: Bad. Server not resolving.', 'Client');
                    lc.log('Status: Bad. Master server not resolving.');
                }
            });
        };
        var applyAction = function () {
            var url = $('#master-server input[name="server-url"]').val();
            network.request(network.getApiServer(url), {}, function (response) {
                if (response) {
                    $('#master-server .apply').removeClass('disabled');
                    network.setApiServer(url);
                    $.localStorage('master-server-url', url);

                    $('#master-server .status').text('Status: Saved. Connecting...');
                    setTimeout(closeWindow, 500);
                    network.Init(response);
                } else {
                    $('#master-server .apply').addClass('disabled');
                    $('#master-server .status').text('Status: Bad. Server not resolving.');
                    lc.log('Master server not resolving. Change gate...');
                }
            });
        };
    }

    MasterServerWindow.prototype = Object.create(AbstractWindow.prototype);
    MasterServerWindow.prototype.constructor = MasterServerWindow;

    return MasterServerWindow;
});
