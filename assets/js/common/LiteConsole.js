define([], function () {
    "use strict";

    function LiteConsole() {
        var messages = [];

        var clearHistory = function () {
            messages.remove(messages[0]);
        };

        this.addMessage = function (message, sender) {
            if (undefined === sender) sender = 'Console';
            message = '[' + sender + ']: ' + message;
            if (messages.length >= 100) clearHistory();
            messages.add(message);
            return message
        };

        this.flushMessages = function () {
            messages = [];
        };

        this.getAllMessages = function () {
            return messages;
        };

        this.log = function (message, sender) {
            message = this.addMessage(message, sender);
            console.info(message);
        };
    }

    return LiteConsole;
});
