define([
    'jquery',
    'underscore'
], function ($, _) {
    "use strict";

    function AbstractWindow() {
        this.data = {
            id: undefined,
            template: null,
            title: '# Window',
            content: '',
            width: 400,
            height: 50,
            pos_x: 0,
            pos_y: 0,
            pos_z: 499
        };

        this.setTitle = function (title) {

        };
        this.setContent = function (content) {

        };
        this.setSize = function (width, height) {

        };
        this.setZIndex = function (zindex) {

        };

        this.setPosition = function (x, y) {

        };
        this.toCenter = function () {

        };

        this.activate = function () {

        };

        var guid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        var generateID = function () {
            var id = guid();
            if ($('#' + id).length) {
                return generateID();
            }
            return id;
        };

        this.render = function (callback) {
            var _w = this;
            var network = window.application.network;
            network.loadHtml(_w.data.template,
                function (data) {
                    var template = _.template(data);
                    _w.data.id = generateID();
                    $('body').prepend(template(_w.data));
                    if (callback) callback();
                    $('#' + _w.data.id).show();
                }
            );
        };
    }

    return AbstractWindow;
});
