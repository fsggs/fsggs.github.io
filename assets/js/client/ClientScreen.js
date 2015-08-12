define([
    'jquery',
    'common/WindowManager',
    'jquery.hotkeys',
    'jquery.storage',

    'FPSMeter',
    'client/MasterServerWindow',
    'client/ConsoleWindow',
    'common/TestWindow'
], function ($, WindowManager) {
    "use strict";

    function ClientScreen() {
        var network = window.application.network;

        this.registerKeys = function () {
            $(document).on('keydown', null, 'F2', keyShowMasterWindow);
            $(document).on('keydown', null, 'F5', keyUpdateClient);
            $(document).on('keydown', null, '`', keyConsoleWindow);
            $(document).on('keydown', null, 'ESC', keyESCCloseConsole);
        };

        /** Check Master Server **/
        this.checkMasterServer = function () {
            var MasterServerWindow = new WindowManager('client/MasterServerWindow');
            if (!$.localStorage('master-server-url')) {
                MasterServerWindow.render(null, true);
            } else {
                var url = $.localStorage('master-server-url');
                network.request(url + network.gateAPI, {}, function (response) {
                    if (response) {
                        network.gateUrl = url;
                        $('#client').trigger('master-server.connected');
                    } else {
                        MasterServerWindow.render(null, true);
                    }
                });
            }
        };

        /** FPS Meter **/
        this.showFPS = function () {
            var meter = new FPSMeter($('#fps'), {});

            function tick() {
                setTimeout(tick, 1000 / 60);
                meter.tick();
            }

            requestAnimationFrame(tick);
        };

        var keyShowMasterWindow = function (event) {
            if (!$('#master-server').is(':visible')) {
                event.preventDefault();
                var MasterServerWindow = new WindowManager('client/MasterServerWindow');
                MasterServerWindow.render(null, true);
            }
        };

        var keyUpdateClient = function (event) {
            var status = window.applicationCache.status;
            if (1 === status || 3 < status) {
                window.applicationCache.update();
                console.log('Verifying application version.');
                event.preventDefault();
            } else {
                console.log('Application not initialized.');
            }
        };

        var keyConsoleWindow = function (event) {
            if (!$('input:focus').length
                || $('#console-input > input:focus').length) {
                event.preventDefault();

                if (!$('section.console').is(':visible')) {
                    event.preventDefault();
                    var ConsoleWindow = new WindowManager('client/ConsoleWindow');
                    ConsoleWindow.render();
                } else {
                    $('section.console > .close').trigger('click');
                }
            }
        };

        var keyESCCloseConsole = function (event) {
            if ($('section.console').is(':visible')) {
                event.preventDefault();
                $('section.console > .close').trigger('click');
            }
        };
    }

    var screen = new ClientScreen();

    $(document).ready(function () {
        screen.checkMasterServer();
        screen.showFPS();

        screen.registerKeys();
    });

    return ClientScreen;
});
