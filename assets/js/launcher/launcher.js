define([
    'jquery',
    'common/WindowManager',
    'jquery.draggable',
    'jquery.scrollbar'
], function ($, WindowManager) {
	$(document).ready(function () {
        /** Drag окошек */
		$('.draggable').draggable();

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
                    var _w = new WindowManager($, method[1]);
                    _w.render();
                    _w = undefined;
                    break;
                case 'fn':
                    if ("function" === typeof method[1]) {
                        method[1]();
                    } else {
                        console.log('Call undefined function: ' + method[1] + '()');
                    }
                    break;
                default:
                    console.log('Call unregistered link method: ' + attr);
            }
        }
    });
});
