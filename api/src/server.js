const express = require('express')
const helmet = require('helmet');
const session = require('express-session');
const actuator = require('express-actuator')
const cookieParser = require('cookie-parser')

const expressPino = require('express-pino-logger');
const cors = require('cors');
const { logger } =  require("./config");


const secret = process.env.SESSION_SECRET || "weak sauce secret";
const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();
const log = expressPino({
	logger
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-origin" } }));
app.use(cookieParser());
app.use(
	actuator({
		infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
		infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
		infoDateFormat: "MMMM Do YYYY, h:mm:ss a", // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
		customEndpoints: [] // array of custom endpoints
	})
);
app.use(
	session({
		secret,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 /* one day */,
			secure: NODE_ENV === "production"
		},
		proxy: true,
		resave: false
	})
);
app.use(log);

if (NODE_ENV === "production") {
	app.use(
		cors({
			origin: "https://bsdi1-voyager-frontend.herokuapp.com",
			allowedHeaders:
				"Origin, X-Requested-With, Content-Type, Accept, Authorization",
			methods: ["GET", "PUT", "POST", "DELETE"]
		})
	);
} else {
	app.use((req, res, next) => {
		res.header({
			"Access-Control-Allow-Origin": "http://localhost:3000"
		});
		res.header({
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		});
		res.header({
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
		});
		res.header({
			"Cross-Origin-Resource-Policy": "same-site"
		});
		next();
	});
}
app.use(express.json());

/*
## Endpoints provided by Express Actuator
| ID      | Description                                            |
| ------- | ------------------------------------------------------ |
| info    | Displays application information.                      |
| metrics | Shows metrics information for the current application. |
| health  | Shows application health information.                  |
*/

/// This route shouldn't be used
app.get("/", (req, res) => {
	res.send(
		'Did you mean to go to "https://bsdi1-voyager-frontend.herokuapp.com/"'
	);
});

module.exports = app;