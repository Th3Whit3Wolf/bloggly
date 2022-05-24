const pino = require('pino')

module.exports = pino({
	level: "info",
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true
		}
	}
});