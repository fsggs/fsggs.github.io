/**
 * Network
 *
 * @param $
 * @constructor
 */
function Network($) {
    this.gateUrl = undefined;

    this.loadHtml = function (url, callback) {
        $.ajax({
            url: url,
            dataType: 'html',
            success: function (data) {
                callback(data);
            },
            error: function () {
                callback(undefined);
            }
        });
    };

    this.request = function (url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function () {
                callback(undefined);
            }
        });
    };
}

/**
 * ADM
 */
define([
    'jquery'
], function ($) {
    if (!window.application.network) {
        window.application.network = new Network($)
    }
});
