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

		const invalidFirstName =
			body?.firstName === undefined || body?.firstName.trim() === "";
		const invalidLastName =
			body?.lastName === undefined || body?.lastName.trim() === "";
		const invalidUsername =
			body?.username === undefined || body?.username.trim() === "";
		const invalidPassword =
			body?.password === undefined || body?.password.trim() === "";

		const multipleErrors = [];
		if (invalidFirstName) {
			multipleErrors.push("First Name");
		}
		if (invalidLastName) {
			multipleErrors.push("Last Name");
		}
		if (invalidUsername) {
			multipleErrors.push("Username");
		}
		if (invalidPassword) {
			multipleErrors.push("Password");
		}

		if (multipleErrors.length > 0) {
			if (multipleErrors.length === 1) {
				return res.status(400).json({
					err: `No ${multipleErrors[0]}`,
					message: `please enter a valid ${multipleErrors[0]}`
				});
			}
			const lastError = multipleErrors.pop();
			const notLastError = multipleErrors.pop();
			const endMsg = `${lastError} or ${notLastError}`;
			multipleErrors.push(endMsg);
			return res.status(400).json({
				err: `No ${multipleErrors.join(", ")}`,
				message: `please enter a valid ${multipleErrors
					.join(", ")
					.replace("or", "and")}`
			});
		}

		const { firstName, lastName, username, password } = body;

		const user = await this.dbResource.findUnique({
			where: {
				username
			}
		});

		if (user !== null) {
			return res.status(400).json({
				err: "User Exists",
				message:
					"user with this username already exists. Please try a new username"
			});
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
				data: {
					id: newUser.id,
					firstName,
					lastName,
					username
				}
			});
		} catch (err) {
			return res.status(500).json({
				err: "Unexpected error",
				message: "failed to add new user to database"
			});
		}
	}

	async login(req, res) {
		const { body } = req;
		const invalidUsername =
			body?.username === undefined || body?.username.trim() === "";
		const invalidPassword =
			body?.password === undefined || body?.password.trim() === "";
		if (invalidUsername && invalidPassword) {
			return res.status(400).json({
				err: "No Username or Password",
				message: "please enter a valid username and password"
			});
		}

		if (invalidUsername) {
			return res.status(400).json({
				err: "No Username",
				message: "please enter a valid username"
			});
		}

		if (invalidPassword) {
			return res.status(400).json({
				err: "No Password",
				message: "please enter a valid password"
			});
		}

		const { username, password } = body;

		try {
			const user = await this.dbResource.findUnique({
				where: {
					username
				}
			});

			if (user === null) {
				return res.status(401).json({
					err: "User Not Found",
					message:
						"could not find user with this username. Please ensure username is entered correctly and try again"
				});
			}

			const isValid = verify(user.password, password);

			if (isValid) {
				const { id, firstName, lastName } = user;
				req.session.loggedin = true;
				req.session.username = username;
				req.session.userID = id;
				req.session.firstName = firstName;
				req.session.lastName = lastName;
				return res.status(200).json({
					message: "user has been authenticated",
					data: {
						id,
						firstName,
						lastName,
						username
					}
				});
			}
			return res.status(401).json({
				err: "Invalid Password",
				message:
					"unable to authenticate user. Please ensure password is entered correctly and try again."
			});
		} catch (err) {
			return res.status(500).json({
				err: "Unexpected error",
				message: "failed to add new user to database"
			});
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
