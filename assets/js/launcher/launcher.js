define(['jquery', 'jquery.draggable', 'jquery.scrollbar'], function ($) {
	$(document).ready(function () {
        /** Drag окошек */
		$('.draggable').draggable();

        /** Скроллбар */
        $('.scrollbar-box').mCustomScrollbar({
            axis: 'y',
            autoHideScrollbar: true
        });
	});

	$(document).on('click', '.window > .close:not(".disabled")', function () {
		$(this).parent().hide();
	});
});
