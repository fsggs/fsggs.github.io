define([
    'jquery',
    'underscore'
], function ($, _) {
    "use strict";

    function AbstractWindow() {
        var correctionStep = 20;

        this.data = {
            id: undefined,
            template: null,
            title: '# Window',
            content: '',
            classes: [],
            width: 400,
            height: 50,
            pos_x: 0,
            pos_y: 0,
            beforeRender: false,
            onOpen: false,
            onClose: false,
            onHide: false
        };

        this.setTitle = function (title) {
            this.data.title = title;
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id + ' .title').text(this.data.title);
            }
        };
        this.setContent = function (content) {
            this.data.content = content;
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id + ' .content').text(this.data.content);
            }
        };
        this.setSize = function (width, height) {
            this.data.width = width;
            this.data.height = height;
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id).width(width).height(height);
            }
        };

        this.setPosition = function (x, y) {
            this.data.pos_x = x;
            this.data.pos_y = y;

            fixPosition(this);
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id).offset({left: this.data.pos_x, top: this.data.pos_y});
            }
        };
        this.toCenter = function () {
            this.data.pos_x = $(window).width() / 2 - this.data.width / 2;
            this.data.pos_y = $(window).height() / 2 - this.data.height / 2;

            fixPosition(this);
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id).offset({left: this.data.pos_x, top: this.data.pos_y});
            }
        };

        this.activate = function () {
            if (undefined != this.id && $('#' + this.data.id).length) {
                $('#' + this.data.id).detach().appendTo('body');
            }
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

        var fixPosition = function (_w) {
            var x = _w.data.pos_x,
                y = _w.data.pos_y;

            var correction = false;

            $('.window:visible').each(function () {
                var position = $(this).position();
                var new_x = position.left;
                var new_y = position.top;
                if ((x + correctionStep > new_x && x - correctionStep < new_x) &&
                    (y + correctionStep > new_y && y - correctionStep < new_y)) {
                    x = _w.data.pos_x += correctionStep;
                    y = _w.data.pos_y += correctionStep;

                    correction = true;
                    return false;
                }
            });

            var max_x = $(window).width() - _w.data.width,
                max_y = $(window).height() - _w.data.height;
            if (x + correctionStep > max_x) {
                x = _w.data.pos_x += max_x - x - correctionStep - 5;
                correction = false;
            }

            if (y + correctionStep > max_y) {
                y = _w.data.pos_y += max_y - y - correctionStep - 5;
                correction = false;
            }

            if (correction) {
                fixPosition(_w);
            }
        };

        var windowShow = function (_w) {
            $('#' + _w.data.id).
                offset({left: _w.data.pos_x, top: _w.data.pos_y}).
                width(_w.data.width).height(_w.data.height).show();
        };

        this.render = function (callback, toCenter) {
            var _w = this;
            var network = window.application.network;

            if (_w.data.id && $('#' + _w.data.id).length) {
                var position = $('#' + _w.data.id).position();
                _w.data.pos_x = position.left;
                _w.data.pos_y = position.top;

                this.activate();
                windowShow(_w);
                if (_w.data.onOpen && 'function' === typeof _w.data.onOpen) {
                    _w.data.onOpen();
                }
            } else if (_w.data.template) {
                network.loadHtml(_w.data.template,
                    function (data) {
                        var template = _.template(data);
                        if (undefined == _w.data.id) {
                            _w.data.id = generateID();
                        }
                        $('body').append(template(_w.data));
                        if (toCenter) _w.toCenter();
                        if (undefined !== _w.data.classes && _w.data.classes.length) {
                            $.each(_w.data.classes, function (index, className) {
                                $('#' + _w.data.id).addClass(className);
                            });
                        }
                        if (callback) callback();
                        fixPosition(_w);
                        if (_w.data.beforeRender && 'function' === typeof _w.data.beforeRender) {
                            _w.data.beforeRender(_w);
                        }
                        windowShow(_w);
                        if (_w.data.onOpen && 'function' === typeof _w.data.onOpen) {
                            _w.data.onOpen();
                        }
                    }
                );
            }
        };
    }

    return AbstractWindow;
});
