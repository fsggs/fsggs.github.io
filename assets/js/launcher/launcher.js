define(['jquery', 'jquery.draggable', 'jquery.scrollbar'], function (jQuery) {

	/**
	 * Скроллбар
	 */
	jQuery(window).load(function () {
		jQuery('#console-panel').mCustomScrollbar({
			axis: 'y',
			autoHideScrollbar: true
		});
	});

	/**
	 * Drag окошек
	 */
	jQuery(document).ready(function () {
		jQuery('.draggable').draggable();
	});

	jQuery(document).on('click', '.draggable > .close', function () {
		jQuery(this).parent().hide();
	});

	/**
	 * Перехватчик нажатий на клавиши
	 */
	jQuery(document).keydown(function (event) {
		//console.log(event.keyCode);
		switch (event.keyCode) {
			case 192: //~tilda~
				if (!jQuery('input:focus').length
					|| jQuery('#console-input > input:focus').length) {
					event.preventDefault();
					if (jQuery('section.console').is(':hidden')) {
						jQuery('section.console').show();
						jQuery('#console-input').find('> input').focus();
						jQuery("#console-panel").mCustomScrollbar('scrollTo', 'last', {
							scrollInertia: 0
						});
					} else {
						jQuery('section.console').hide();
					}
				}
				break;
			case 116: //F5
				var status = window.applicationCache.status;
				if(1 === status || 3 < status ) {
					window.applicationCache.update();
					console.log('Verifying application version.');
				} else {
					console.log('Application not initialized.');
				}
				event.preventDefault();
				status = undefined;
				break;
			case 27: //ESC
				if (!jQuery('section.console').is(':hidden')) {
					event.preventDefault();
					jQuery('console').hide();
				}
				break;
			case 13: //Enter
				if (jQuery('#console-input > input:focus').length) {
					event.preventDefault();
					var message = jQuery('#console-input > input').val();
					if (message.trim() != '') {
						jQuery('#console-input > input').val('');
						jQuery('#console-panel .mCSB_container')
							.append('<p class="message">[Console]: ' + message + '</p>');
						jQuery("#console-panel").mCustomScrollbar('scrollTo', 'last');
					}
				}
				break;
		}
	});
});
