/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { argon2id } = require("hash-wasm");
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

const main = async () => {
	const users = [
		{
			firstName: "Raph",
			lastName: "Levien",
			username: "raphlinus"
		},
		{
			firstName: "rust",
			lastName: "teams",
			username: "rust_teams"
		}
	];
	for (const user of users) {
		const { firstName, lastName, username } = user;
		let userID;

		try {
			const userExist = await db.User.findUnique({
				where: {
					username
				}
			});
			if (userExist === null) {
				const password = await hash(username);
				try {
					const newUser = await db.User.create({
						data: { firstName, lastName, username, password }
					});
					userID = newUser.id;
				} catch (err) {
					throw new Error(
						`Error occured while adding User(${username}) to the database: ${err}`
					);
				}
			} else {
				userID = userExist.id;
			}
			const postsPath = path.join(__dirname, "posts", username);

			fs.readdir(postsPath, async (err, files) => {
				// handling error
				if (err) {
					return console.log(`Unable to scan directory: ${err}`);
				}
				for (const file of files) {
					let createdAt;
					createdAt = new Date(`${file.slice(0, 10)}`);
					let title;
					title = file
						.slice(11, file.length - 3)
						.split("-")
						.map(word => word[0].toUpperCase() + word.substring(1))
						.join(" ");
					const filePath = path.join(postsPath, file);
					await fs.readFile(filePath, "utf8", async (error, data) => {
						if (error) {
							return console.log(
								`Unable to read ${filePath}: ${error}`
							);
						}
						const frontmatter = {};
						const lines = data.split("\n");
						if (lines[0].startsWith("---")) {
							lines.shift();
							for (let inc = 0; inc < 100; ) {
								if (lines[inc].startsWith("---")) {
									lines.shift();
									inc = 100;
								} else {
									const frontmatterSplit =
										lines[inc].split(":");
									if (frontmatterSplit.length === 2) {
										frontmatter[
											frontmatterSplit[0].trim()
										] = frontmatterSplit[1]
											.trim()
											.replaceAll('"', "");
									}
									lines.shift();
								}
							}
						}

						const content = lines
							.join("\n")
							.replace(/(<([^>]+)>)/gi, "");
						if (frontmatter.title !== undefined) {
							title = frontmatter.title;
						}
						if (frontmatter.date !== undefined) {
							createdAt = new Date(frontmatter.date);
						}

						try {
							const findPost = await db.Post.findFirst({
								where: {
									userID,
									title
								}
							});
							if (findPost === null) {
								try {
									await db.Post.create({
										data: {
											userID,
											title,
											content,
											createdAt
										}
									});
								} catch (dbError) {
									throw new Error(
										`Error occured while adding Post(${username} - ${title}) to the database: ${dbError}`
									);
								}
							}
						} catch (dbErr) {
							throw new Error(
								`Error occured while seeding Post(${username} - ${title}): ${dbErr}`
							);
						}
					});
				}
			});
		} catch (err) {
			throw new Error(
				`Error occured while seeding User(${username}): ${err}`
			);
		}
	}
};

main()
	.catch(err => {
		console.error(`There was an error while seeding: ${err}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database. Closing connection.");
		await db.$disconnect();
	});
