const { PrismaClient } = require("@prisma/client");
const http = require("http");
const { createTerminus } = require("@godaddy/terminus");
const app = require("./server");
const { logger } = require("./config");

const port = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || "development";
const server = http.createServer(app);
const prisma = new PrismaClient();

const onListening = () => {
	logger.info({
		status: NODE_ENV,
		msg: `Server started  🚀`,
		url: `http://localhost:${port}`
	});
};

const onSignal = async () => {
	logger.info("Server is starting cleanup");

	prisma
		.$disconnect()
		.then(() => logger.info("database disconnected"))
		.catch(err => logger.error({ err, msg: "error during disconnection" }));
};

const onShutdown = async () => {
	logger.info("cleanup finished, server is shutting down");
};

const onError = err => {
	logger.error(err);
	process.exit(1);
};

const main = async () => {
	process.on("unhandledRejection", (err, promise) => {
		logger.error({ err, msg: `Unhandled Rejection at: ${promise}` });
		// send error to your error tracking software here
		process.exit(1);
	});

	process.on("uncaughtException", (err, origin) => {
		logger.error({
			err,
			msg: `Uncaught Exception: ${err.message} at: ${origin}`
		});
		// send error to your error tracking software here
		process.exit(1);
	});

	await prisma.$connect();

	createTerminus(server, {
		onSignal,
		onShutdown,
		logger: (msg, err) => logger.error({ msg, err }),
		healthChecks: {
			__unsafeExposeStackTraces: NODE_ENV !== "production"
		}
	});

	server.listen(port, onListening);
};

main().catch(onError);
