define([
    'jquery',
    'common/WindowManager',
    'launcher/MasterServerWindow'
], function ($, WindowManager) {
    /**
     * Перехватчик нажатий на клавиши
     */
    $(document).keydown(function (event) {
        console.log('::' + event.keyCode);
        switch (event.keyCode) {
            case 192: //~tilda~
                if (!$('input:focus').length
                    || $('#console-input > input:focus').length) {
                    event.preventDefault();
                    if ($('section.console').is(':hidden')) {
                        $('section.console').show();
                        $('#console-input').find('> input').focus();
                        $("#console-panel").mCustomScrollbar('scrollTo', 'last', {
                            scrollInertia: 0
                        });
                    } else {
                        $('section.console').hide();
                    }
                }
                break;
            case 113: //F2
                if (!$('#master-server').is(':visible')) {
                    event.preventDefault();
                    var _w = new WindowManager($, 'launcher/MasterServerWindow');
                    _w.render();
                    _w = undefined;
                }
                break;
            case 116: //F5
                var status = window.applicationCache.status;
                if (1 === status || 3 < status) {
                    window.applicationCache.update();
                    console.log('Verifying application version.');
                    event.preventDefault();
                } else {
                    console.log('Application not initialized.');
                }
                status = undefined;
                break;
            case 27: //ESC
                if (!$('section.console').is(':hidden')) {
                    event.preventDefault();
                    $('console').hide();
                }
                break;
            case 13: //Enter
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
                break;
        }
    });
});
