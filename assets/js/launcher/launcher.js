define(['jquery', 'jquery.draggable', 'jquery.scrollbar'], function ($) {

	/**
	 * Скроллбар
	 */
	$(window).load(function () {
		$('#console-panel').mCustomScrollbar({
			axis: 'y',
			autoHideScrollbar: true
		});
	});

	/**
	 * Drag окошек
	 */
	$(document).ready(function () {
		$('.draggable').draggable();
	});

	$(document).on('click', '.draggable > .close', function () {
		$(this).parent().hide();
	});

	/**
	 * Перехватчик нажатий на клавиши
	 */
	$(document).keydown(function (event) {
		//console.log(event.keyCode);
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
			case 116: //F5
				var status = window.applicationCache.status;
				if (1 === status || 3 < status) {
					window.applicationCache.update();
					console.log('Verifying application version.');
				} else {
					console.log('Application not initialized.');
				}
				event.preventDefault();
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
