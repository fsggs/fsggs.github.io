/**
 * BootLauncher
 *
 * @constructor __construct
 */
function BootLauncher() {
    this.cache = undefined;
    this.cacheEnabled = true;

    var __construct = function (i) {
        if (window.applicationCache) {
            i.cache = window.applicationCache;
        }
    };

    var fadeIn = function (element) {
        element.style.opacity = 0;

        var last = +new Date();
        var tick = function () {
            element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };
        tick();
    };

    var launcherSpinAnimate = function (object, property, start_value, end_value, time, callback) {
        var frame_rate = 0.06; // 60 FPS
        var frame = 0;
        var delta = (end_value - start_value) / time / frame_rate;
        var handle = setInterval(function () {
            frame++;
            var value = parseInt(start_value + delta * frame);
            object.style[property] = value + "%";
            if (value >= end_value) {
                clearInterval(handle);
            }
        }, 1 / frame_rate);
        if (callback) callback();
    };

    //------------------- Функции клиента ----------------//
    this.loadMainClientScreen = function () {
        var client = document.querySelector('section.client');
        var request = new XMLHttpRequest();
        request.open('GET', 'client/client.html', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                client.innerHTML = request.responseText;
                fadeIn(client);
            }
        };

        request.onerror = function () {
            // TODO:: connection error
        };

        request.send();

        (document.querySelector('title')).innerHTML = 'Client loaded';
    };
    //------------------- Функции клиента ----------------//

    //------------------- Функции управлением экраном загрузки ----------------//
    var launcherSpin = function (prc, animate, callback) {
        var spin = document.querySelector('section#loader > .splash_screen > .loader > .loader-status > .spin');
        if (animate) {
            var from = spin.style.width;
            from = (from == '') ? 0 : (parseFloat(from) / 100);
            if (from != prc) {
                launcherSpinAnimate(spin, 'width', from, prc, 500, callback);
            }
        } else {
            spin.style.width = prc + '%';
            if (callback) callback();
        }
    };

    var setStatus = function (text) {
        var status = document.querySelector('#loader .status');
        status.innerHTML = (text) ? text : '';
    };

    this.ProgressShow = function () {
        launcherSpin(0, true);
    };

    this.ProgressChange = function (e) {
        if (Object === typeof e) {
            setStatus('Updating (' + e.loaded + '/' + e.total + ')...');
            launcherSpin(Math.round(e.loaded / e.total * 100), true);
        } else {
            setStatus('Update resources done. Loading...');
            launcherSpin(e, true);
        }

    };

    this.ProgressHide = function () {
        var Launcher = this;
        launcherSpin(100, true, function () {
            var launcher = document.querySelector('section#loader');
            setTimeout(function () {
                launcher.style.display = 'none';
                Launcher.loadMainClientScreen();
            }, 1200);
        });
    };

    this.CacheManager = function () {
        var launcher = this;
        // Проверяем подключение
        if (navigator.onLine) {
            var loader = document.querySelector('section#loader > .splash_screen > .loader');
            console.log('Connecting to update server establishment.');
            loader.style.display = 'block';
            setStatus('Client is online.');
        }
        else {
            console.log('It is impossible to establish connection to the server.');
            launcher.cacheEnabled = false;
            setStatus('Client is offline.');
        }

        // Чиним зависание загрузчика при проверке манифеста в самом начале загрузки
        if (launcher.cacheEnabled && 2 === launcher.cache.status) {
            setStatus('Client reload resources...');
            setTimeout(function () {
                location.reload();
            }, 1000);
        }

        if (launcher.cache && launcher.cacheEnabled) {
            // Ресурсы уже кэшированнны.
            launcher.cache.addEventListener('cached', function () {
                setStatus('Loading done.');
                launcher.ProgressChange(100);
                launcher.ProgressHide();
            }, false);
            // Начало скачивания ресурсов. progress_max - количество ресурсов.
            launcher.cache.addEventListener('downloading', function () {
                setStatus('Start updating.');
                launcher.ProgressShow();
            }, false);
            // Процесс скачивания ресурсов. Индикатор прогресса изменяется
            launcher.cache.addEventListener('progress', function (e) {
                launcher.ProgressChange(e);
            }, false);
            // Скачивание ресурсов завершено. Обновляем кэш. Перезагружаем страницу.
            launcher.cache.addEventListener('updateready', function () {
                setStatus('Updating done. Reloading...');
                launcher.ProgressHide();
                window.applicationCache.swapCache();
                location.reload();
            }, false);
            launcher.cache.addEventListener('noupdate', function () {
                setStatus('No update. Loading...');
                launcher.ProgressChange(100);
                launcher.ProgressHide();
            }, false)
        } else if (launcher.cache && !launcher.cacheEnabled) {
            setStatus('Loading done.');
            if (1 == launcher.cache.status || 3 < launcher.cache.status) {
                window.applicationCache.swapCache();
            }
            launcher.ProgressChange(100);
            launcher.ProgressHide();
        }
    };
    //-------------------------------------------------------------------------//
    __construct(this);
}

/**
 * Application Cache Loader
 */
if (!window.applicationCache) {
    window.applicationCache = undefined;
} else if (!window.launcher) {
    window.launcher = new BootLauncher();
    window.launcher.CacheManager();
}
