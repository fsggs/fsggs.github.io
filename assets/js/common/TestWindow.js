define([
    'jquery',
    'common/AbstractWindow',
    'jquery.draggable'
], function ($, AbstractWindow) {
    "use strict";

    function TestWindow() {
        this.data = {
            id: undefined,
            template: 'assets/layouts/common/w_test.html',
            title: '# Test',
            content: 'TEST ! WINDOW',
            width: 200,
            height: 50,
            pos_x: 0,
            pos_y: 0
        };
    }

    TestWindow.prototype = new AbstractWindow;

    return TestWindow;
});
