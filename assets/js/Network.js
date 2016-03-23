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
			gatePort: 32500,
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
					lc.log('Trying connect to server ' + network.getServer(), 'Client');
					socket = new WebSocket(network.getServer());
					network.listenServer(network);
				} catch (e) {
					lc.log('Not found server ' + network.getServer(), 'Client');
				}
			} else {
				lc.log('Already connected to ' + network.getServer(), 'Client');
			}
		};

		this.listenServer = function (network) {
			if (socket) {
				socket.onopen = function () {
					$(window).trigger('socket.connect');
					lc.log('Connected to ' + network.getServer(), 'Client');
				};

				socket.onmessage = function (event) {
					$(window).trigger('socket.message');
					lc.log('Message: ' + event.data, 'Client');
				};

				socket.onclose = function (event) {
					$(window).trigger('socket.disconnect');
					if (event.wasClean) {
						lc.log('Disconnected.', 'Client');
					} else {
						var info = 'Code: ' + event.code + ((event.reason !== "") ? ', Reason: ' + event.reason : '');
						lc.log('Disconnected. ' + info, 'Client');
					}
					socket = undefined;
				};
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
