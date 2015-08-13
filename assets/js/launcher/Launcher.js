define([
    'jquery',
    'common/WindowManager',
    'jquery.scrollbar'
], function ($, WindowManager) {
	$(document).ready(function () {
        /** Скроллбар */
        $('.scrollbar-box').mCustomScrollbar({
            axis: 'y',
            autoHideScrollbar: true
        });
	});

    $(document).on('click', '.link', function (e) {
        e.preventDefault();

        var attr = $(this).attr('data-href');

        if (typeof attr !== typeof undefined && attr !== false) {
            var method = attr.split(':');
            switch (method[0]) {
                case 'link':
                    window.location = method[1];
                    break;
                case '_w':
                    var _w = new WindowManager(method[1]);
                    _w.render();
                    _w = undefined;
                    break;
                case 'fn':
                    if ("function" === typeof application[method[1]]) {
                        application[method[1]]();
                    } else {
                        console.warn('Call undefined application method: ' + method[1] + '()');
                    }
                    break;
                default:
                    console.warn('Call unregistered link method: ' + attr);
            }
        }
    });
});
