define([
    'jquery',
    'common/AbstractWindow'
], function ($, AbstractWindow) {
    "use strict";

    function TestWindow() {
        AbstractWindow.call(this);

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

    TestWindow.prototype = Object.create(AbstractWindow.prototype);
    TestWindow.prototype.constructor = TestWindow;

    return TestWindow;
});
