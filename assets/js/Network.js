define([
    'jquery'
], function ($) {
    /**
     * Network
     *
     * @param $
     * @constructor
     */
    function Network($) {
        var lc = application.console;

        this.gateAPI = 'getVersion.json';
        this.gateUrl = undefined;

        this.Init = function () {
            lc.log('Connected to master server at: ' + this.gateUrl, 'Client');
        };

        this.loadHtml = function (url, callback) {
            this.request(url, {}, callback, 'html');
        };

        this.request = function (url, data, callback, dataType) {
            dataType = dataType || 'json';
            $.ajax({
                url: url,
                data: data,
                dataType: dataType,
                success: function (data) {
                    callback(data);
                },
                error: function () {
                    callback(undefined);
                }
            });
        };
    }

    if (undefined == window.application.network) {
        window.application.network = new Network($)
    }

    return Network;
});
