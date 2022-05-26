const { PrismaClient } = require("@prisma/client");
const { argon2id, argon2Verify } = require("hash-wasm");
const crypto = require("crypto");

const salt = process.env.SALT_SECRET || crypto.randomBytes(64);

const DATABASE_URL =
	process.env.DATABASE_URL ||
	"postgresql://postgres:docker@database:5432/bloggly?schema=public";

const db = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
});

const hash = async password =>
	argon2id({
		password,
		salt, // salt is a buffer containing random bytes
		parallelism: 1,
		iterations: 256,
		memorySize: 512, // use 512KB memory
		hashLength: 32, // output size = 32 bytes
		outputType: "encoded" // return standard encoded string containing parameters needed to verify the key
	});

const verify = async (dbPassword, userPassword) =>
	argon2Verify({
		password: userPassword,
		hash: dbPassword
	});

class AuthController {
	constructor(resourceName) {
		this.resourceName = resourceName;
		this.dbResource = db[resourceName];
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.signup = this.signup.bind(this);
	}

	async signup(req, res) {
		const { body } = req;

		if (
			body?.firstName === undefined ||
			body?.lastName === undefined ||
			body?.username === undefined ||
			body?.password === undefined
		) {
			return res
				.status(400)
				.json({ message: "body does not contain necessary fields" });
		}

		const { firstName, lastName, username, password } = body;

		const user = await this.dbResource.findUnique({
			where: {
				username
			}
		});

		console.log({ user });

		if (user !== null) {
			return res
				.status(400)
				.json({ message: "user with this username already exists" });
		}

		try {
			const passwd = await hash(password);
			const newUser = await this.dbResource.create({
				data: { firstName, lastName, username, password: passwd }
			});

			delete newUser.password;

			req.session.loggedin = true;
			req.session.username = username;
			req.session.userID = newUser.id;
			req.session.firstName = newUser.firstName;
			req.session.lastName = newUser.lastName;

			return res.status(201).send({
				message: "successfully created a new user",
				newUser
			});
		} catch (err) {
			return res
				.status(500)
				.json({ message: "failed to add new user to database", err });
		}
	}

	async login(req, res) {
		const { body } = req;
		if (body?.username === undefined || body?.password === undefined) {
			return res
				.status(400)
				.json({ message: "body does not contain necessary fields" });
		}

		const { username, password } = body;

		try {
			const user = await this.dbResource.findUnique({
				where: {
					username
				}
			});

			if (user === null) {
				return res.status(400).json({
					message: "user with this username does not exists"
				});
			}

			const isValid = verify(user.password, password);

			if (isValid) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.userID = user.id;
				req.session.firstName = user.firstName;
				req.session.lastName = user.lastName;
				return res
					.status(200)
					.json({ message: "user has been authenticated" });
			}
			return res
				.status(400)
				.json({ message: "unable to authenticate user" });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "failed to add new user to database", err });
		}
	}

	// eslint-disable-next-line class-methods-use-this
	async logout(req, res) {
		req.session = null;
		return res.status(200).json({ message: "user log out successful" });
	}
}

const authCtrl = new AuthController("User");

module.exports = authCtrl;
