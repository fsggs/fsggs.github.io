define([
    'jquery',
    'FPSMeter',
    'jquery.draggable',
    'jquery.scrollbar',
    'launcher/MasterServerWindow',
    'client/ConsoleWindow',
    'common/TestWindow'
], function ($) {
    function ClientScreen() {

    }

    var screen = new ClientScreen();

    $(document).ready(function () {
        var meter = new FPSMeter($('#fps'), {});

        function tick() {
            setTimeout(tick, 1000 / 60);
            meter.tick();
        }

        requestAnimationFrame(tick);
    });

    return ClientScreen;
});
