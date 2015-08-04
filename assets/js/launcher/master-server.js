define([
    'jquery',
    'jquery.draggable',
    'jquery.scrollbar',
    'jquery.storage'
], function ($) {
    var network = window.application.network;

    var checkAction = function () {
        var url = $('#master-server input[name="server-url"]').val();
        network.request(url + 'getVersion.json', {}, function (response) {
            if(response){
                $('#master-server .apply').removeClass('disabled');
            } else {
                $('#master-server .apply').addClass('disabled');
            }
        });
    };
    var applyAction = function () {
        var url = $('#master-server input[name="server-url"]').val();
        network.request(url + 'getVersion.json', {}, function (response) {
            if(response){
                $('#master-server .apply').removeClass('disabled');
                network.gateUrl = url;
                $.localStorage('master-server-url', url);
                _w_master_server();
            } else {
                $('#master-server .apply').addClass('disabled');
            }
        });
    };

    function _w_master_server() {
        if (!$('#master-server').length) {
            network.loadHtml('launcher/w_master_server.html',
                function (data) {
                    $('body').prepend(data);
                    $('#master-server').show();
                    $(document).on('click', '#master-server .check', checkAction);
                    $(document).on('click', '#master-server .apply:not(.disabled)', applyAction);
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
        }
    }

    $(document).ready(function () {
        if (!$.localStorage('master-server-url')) {
            _w_master_server();
        } else {
            var url = $.localStorage('master-server-url');
            network.request(url + 'getVersion.json', {}, function (response) {
                if(response){
                    network.gateUrl = url;
                } else {
                    _w_master_server();
                }
            });
        }
    });
});
