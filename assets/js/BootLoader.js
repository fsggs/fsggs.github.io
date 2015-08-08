/**
 * BootLoader
 *
 * @constructor __construct
 */
function BootLoader() {
    this.cache = undefined;
    this.cacheEnabled = true;

    var __construct = function (i) {
        if (window.applicationCache) {
            i.cache = window.applicationCache;
        }
    };

    var loaderSpinAnimate = function (object, property, start_value, end_value, time, callback) {
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
    // TODO:: This is hack!
    this.loadMainClientScreen = function () {
        var client = document.querySelector('section.client');
        var request = new XMLHttpRequest();
        request.open('GET', 'assets/layouts/client/client.html', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                client.innerHTML = request.responseText;
                client.style.display = 'block';
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
    var loaderSpin = function (prc, animate, callback) {
        var spin = document.querySelector('section#loader > .splash_screen > .loader > .loader-status > .spin');
        if (animate) {
            var from = spin.style.width;
            from = (from == '') ? 0 : (parseFloat(from) / 100);
            if (from != prc) {
                loaderSpinAnimate(spin, 'width', from, prc, 500, callback);
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
        loaderSpin(0, true);
    };

    this.ProgressChange = function (e) {
        if (Object === typeof e) {
            setStatus('Updating (' + e.loaded + '/' + e.total + ')...');
            loaderSpin(Math.round(e.loaded / e.total * 100), true);
        } else {
            setStatus('Update resources done. Loading...');
            loaderSpin(e, true);
        }

    };

    this.ProgressHide = function () {
        var loader = this;
        loaderSpin(100, true, function () {
            var $loader = document.querySelector('section#loader');
            setTimeout(function () {
                $loader.style.display = 'none';
                loader.loadMainClientScreen();
            }, 1200);
        });
    };

    this.CacheManager = function () {
        var loader = this;
        // Проверяем подключение
        if (navigator.onLine) {
            var $loader = document.querySelector('section#loader > .splash_screen > .loader');
            console.log('Connecting to update server establishment.');
            $loader.style.display = 'block';
            setStatus('Client is online.');
        }
        else {
            console.log('It is impossible to establish connection to the server.');
            loader.cacheEnabled = false;
            setStatus('Client is offline.');
        }

        // Чиним зависание загрузчика при проверке манифеста в самом начале загрузки
        if (loader.cacheEnabled && 2 === loader.cache.status) {
            setStatus('Client reload resources...');
            setTimeout(function () {
                location.reload();
            }, 1000);
        }

        if (loader.cache && loader.cacheEnabled) {
            // Ресурсы уже кэшированнны.
            loader.cache.addEventListener('cached', function () {
                setStatus('Loading done.');
                loader.ProgressChange(100);
                loader.ProgressHide();
            }, false);
            // Начало скачивания ресурсов. progress_max - количество ресурсов.
            loader.cache.addEventListener('downloading', function () {
                setStatus('Start updating.');
                loader.ProgressShow();
            }, false);
            // Процесс скачивания ресурсов. Индикатор прогресса изменяется
            loader.cache.addEventListener('progress', function (e) {
                loader.ProgressChange(e);
            }, false);
            // Скачивание ресурсов завершено. Обновляем кэш. Перезагружаем страницу.
            loader.cache.addEventListener('updateready', function () {
                setStatus('Updating done. Reloading...');
                loader.ProgressHide();
                window.applicationCache.swapCache();
                location.reload();
            }, false);
            loader.cache.addEventListener('noupdate', function () {
                setStatus('No update. Loading...');
                loader.ProgressChange(100);
                loader.ProgressHide();
            }, false)
        } else if (loader.cache && !loader.cacheEnabled) {
            setStatus('Loading done.');
            if (1 == loader.cache.status || 3 < loader.cache.status) {
                window.applicationCache.swapCache();
            }
            loader.ProgressChange(100);
            loader.ProgressHide();
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
}

window.loader = new BootLoader();
window.loader.CacheManager();

Array.prototype.contains = function (object) {
    var i = this.length;
    while (i--) {
        if (this[i] === object) {
            return true;
        }
    }
    return false;
};


Array.prototype.add = function (key, value) {
    if (this.contains(key))
        this[key] = value;
    else {
        this.push(key);
        this[key] = value;
    }
};


Array.prototype.remove = function (key) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i] == key) {
            this.splice(i, 1);
            return;
        }
    }
};
