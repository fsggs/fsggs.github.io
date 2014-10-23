/**
 * Main script for Launcher and Game
 * @version 0.0.1
 */
if (!jQuery) {
	jQuery = alert('jQuery not found, critical error! :(');
	window.close();
}

var cache;
// Переменные прогресса
var progress_value = 0;
var progress_max = 1;

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
 * Перехватчик нажатий на клавиши
 */
jQuery(document).keydown(function (event) {
	//console.log(event.keyCode);
	switch (event.keyCode) {
		case 192: //~tilda~
			if (!jQuery('input:focus').length
				|| jQuery('#console-input > input:focus').length) {
				event.preventDefault();
				if(jQuery('console').is(':hidden')){
					jQuery('console').show();
					jQuery('#console-input').find('> input').focus();
					jQuery("#console-panel").mCustomScrollbar('scrollTo', 'last',{
						scrollInertia: 0
					});
				} else {
					jQuery('console').hide();
				}
			}
			break;
		case 116: //F5
			window.applicationCache.update();
			console.log('Verifing application version.');
			event.preventDefault();
			break;
		case 27: //ESC
			if (!jQuery('console').is(':hidden')) {
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
					jQuery("#console-panel").mCustomScrollbar('scrollTo','last');
				}
			}
			break;
	}
});

/**
 * Application Cache Loader
 */
jQuery(function() {
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
		cache.addEventListener('cached', function(e) {
			ProgressHide();
		}, false);
		// Начало скачивания ресурсов. progress_max - количество ресурсов.
		cache.addEventListener('downloading', function(e) {
			ProgressShow();
			//progress_max = 3;
		}, false);
		// Процесс скачивания ресурсов. Индикатор прогресса изменяется
		cache.addEventListener('progress', function(e) {
			ProgressChange();
		},	false);
		// Скачивание ресурсов завершено. Обновляем кэш. Перезагружаем страницу.
		cache.addEventListener('updateready', function(e) {
			ProgressHide();
			window.applicationCache.swapCache();
			location.reload();
		}, false);
	}
});

//------------------- Функции управлением экраном загрузки ----------------//
function ProgressShow() {
	//jQuery("#progressbar").show(300);
	//progress_value = 0;
}

function ProgressChange() {
	//progress_value++;
	//jQuery("#progress").attr({
	//	max: progress_max,
	//	value: progress_value
	//});
}

function ProgressHide() {
	//jQuery("#progressbar").hide(300);
}
//-------------------------------------------------------------------------//

