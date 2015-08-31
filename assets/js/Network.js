define([
	'jquery',
	'common/LiteConsole'
], function ($, LiteConsole) {
	/**
	 * Network
	 *
	 * @constructor
	 */
	function Network() {
		var socket;
		var lc = this.lc = new LiteConsole();

		var gate = {
			gateUrl: undefined,
			gateAPI: 'getVersion.json',

			gateProtocol: 'ws',
			gateAddress: '127.0.0.1',
			gatePort: 8000,
			gatePath: ''
		};

		var servers = [];

		this.getServer = function () {
			return gate.gateProtocol + '://' + gate.gateAddress + ':' + gate.gatePort + gate.gatePath;
		};
		this.setServer = function (address) {

		};

		this.getApiServer = function (url) {
			if (undefined !== url) return url + gate.gateAPI;
			return gate.gateUrl + gate.gateAPI;
		};
		this.setApiServer = function (url) {
			gate.gateUrl = url;
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

		this.connect = function (gameServer) {
			this.setServer(gameServer);
			var network = this;
			if (undefined === socket) {
				try {
					socket = new WebSocket(network.getServer());

					socket.onopen = function () {
						$(window).trigger('socket.connect');
						lc.log('Connected to ' + network.getServer(), 'socket');
					};

					socket.onmessage = function (event) {
						$(window).trigger('socket.message');
						lc.log('Message: ' + event.data, 'socket');
					};

					socket.onclose = function () {
						$(window).trigger('socket.disconnect');
						lc.log('Disconnected.', 'socket');
						socket = undefined;
					};
				} catch (e) {
					lc.log('Not found server ' + network.getServer(), 'socket');
				}
			} else {
				lc.log('Already connected to ' + network.getServer(), 'socket');
			}
		};

		this.send = function (message) {
			if (socket) {
				return socket.send(message);
			}
			return false;
		};

		this.disconnect = function () {
			if (socket) {
				socket.close();
				socket = undefined;
			}
		};

		this.getServerList = function () {
			return servers;
		};

		this.Init = function (response) {
			servers = response.servers;
			lc.log('Connected to master server at: ' + gate.gateUrl, 'Client');
		};
	}

	return Network;
});
