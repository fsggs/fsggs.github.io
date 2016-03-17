define([
    'jquery',
    'common/AbstractWindow'
], function ($, AbstractWindow) {
    "use strict";

    function LicenseWindow() {
        this.data = {
            id: 'license',
            template: 'assets/layouts/client/w_license.html',
            title: 'License',
            toCenter: true,
            width: 450,
            height: 350,
            onOpen: function () {
                $('#license .scrollable').mCustomScrollbar({
                    axis: 'y'
                });
            }
        };
    }

    LicenseWindow.prototype = new AbstractWindow;

    return LicenseWindow;
});
