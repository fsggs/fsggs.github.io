define([
    'jquery',
    'common/AbstractWindow',
    'underscore',
    'jquery.draggable',
    'jquery.scrollbar',
    'jquery.storage'
], function ($, AbstractWindow) {
    "use strict";

    function MasterServerWindow($) {
        var network = window.application.network;
        var _w = this;
        this.gateAPI = 'getVersion.json';

        var checkAction = function () {
            var url = $('#master-server input[name="server-url"]').val();
            network.request(url + _w.gateAPI, {}, function (response) {
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
            network.request(url + _w.gateAPI, {}, function (response) {
                if (response) {
                    $('#master-server .apply').removeClass('disabled');
                    network.gateUrl = url;
                    $.localStorage('master-server-url', url);

                    $('#master-server .status').text('Status: Saved. Connecting...');
                    setTimeout(_w.render, 500);
                } else {
                    $('#master-server .apply').addClass('disabled');
                    $('#master-server .status').text('Status: Bad. Server not resolving.');
                }
            });
        };

        this.render = function (callback) {
            if (!$('#master-server').length) {
                network.loadHtml('assets/layouts/launcher/w_master_server.html',
                    function (data) {
                        $('body').prepend(data);
                        $('#master-server').show();
                        $(document).on('click', '#master-server .check', checkAction);
                        $(document).on('click', '#master-server .apply:not(.disabled)', applyAction);
                        if (callback) callback();
                    }
                );
            } else {
                if (($('#master-server').is(':visible'))) {
                    $('#master-server').hide();
                    $(document).off('click', '#master-server .check', checkAction);
                    $(document).off('click', '#master-server .apply:not(.disabled)', applyAction);
                } else {
                    $('#master-server').show();
                    $(document).on('click', '#master-server .check', checkAction);
                    $(document).on('click', '#master-server .apply:not(.disabled)', applyAction);
                }
                if (callback) callback();
            }
        }
    }

    MasterServerWindow.prototype = Object.create(AbstractWindow.prototype);


    var network = window.application.network;
    var _w = new MasterServerWindow($);

    $(document).ready(function () {
        if (!$.localStorage('master-server-url')) {
            _w.render();
        } else {
            var url = $.localStorage('master-server-url');
            network.request(url + _w.gateAPI, {}, function (response) {
                if (response) {
                    network.gateUrl = url;
                    $('#client').trigger('master-server.connected');
                } else {
                    _w.render();
                }
            });
        }
    });

    return MasterServerWindow;
});
