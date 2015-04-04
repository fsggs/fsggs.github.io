/**
 * Main script for Launcher and Game
 * @version 0.0.1
 */
if (!jQuery) {
	jQuery = alert('jQuery not found, critical error! :(');
	window.close();
}

var cache;

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
			window.applicationCache.update();
			console.log('Verifing application version.');
			event.preventDefault();
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

/**
 * Application Cache Loader
 */
jQuery(function () {
	// Проверяем подключение
	if (navigator.onLine) {
		console.log('Connectiong to update server establishment.');
	}
	else {
		console.log('Невозможно установить соединение с сервером');
	}
	// Получаем объект Application Cache
	cache = window.applicationCache;
	if (cache) {
		// Ресурсы уже кэшированнны.
		cache.addEventListener('cached', function (e) {
			ProgressHide();
		}, false);
		// Начало скачивания ресурсов. progress_max - количество ресурсов.
		cache.addEventListener('downloading', function (e) {
			ProgressShow();
		}, false);
		// Процесс скачивания ресурсов. Индикатор прогресса изменяется
		cache.addEventListener('progress', function (e) {
			ProgressChange(e);
		}, false);
		// Скачивание ресурсов завершено. Обновляем кэш. Перезагружаем страницу.
		cache.addEventListener('updateready', function (e) {
			ProgressHide();
			window.applicationCache.swapCache();
			location.reload();
		}, false);
		cache.addEventListener('noupdate', function (e) {
			ProgressHide();
		}, false)
	}
});
//------------------- Функции клиента ----------------//
var loadMainClientScreen = function () {
	jQuery('section.client').load('client/client.html', function () {
		jQuery(this).fadeIn('slow');
	});
	jQuery('title').html('Client loaded');
};
//------------------- Функции клиента ----------------//

//------------------- Функции управлением экраном загрузки ----------------//
function launcherSpin(prc, animate, callback) {
	var $spin = jQuery('section.launcher > .splash_screen > .loader > .loader-status > .spin');
	if (animate) {
		$spin.animate({
			width: prc + '%'
		}, 500, callback);
	} else {
		$spin.width(prc + '%');
		if (callback != 'undefined') callback();
	}
}

function ProgressShow() {
	launcherSpin(0, false);
}

function ProgressChange(e) {
	launcherSpin(Math.round(e.loaded / e.total * 100), true);
}

function ProgressHide() {
	launcherSpin(100, true, function () {
		jQuery('section.launcher').delay(1000).hide(300);
		loadMainClientScreen();
	});
}
//-------------------------------------------------------------------------//
