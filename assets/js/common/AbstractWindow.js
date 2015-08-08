define([
    'jquery',
    'underscore'
], function ($) {
    "use strict";

    function AbstractWindow() {
        this.data = {
            title: '',
            content: '',
            width: 400,
            height: 50,
            pos_x: 0,
            pos_y: 0,
            pos_z: 999
        };

        this._w = undefined;

        this.constructor = function () {

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

        this.render = function () {
        };
    }

    return AbstractWindow;
});
