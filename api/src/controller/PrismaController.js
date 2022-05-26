/* eslint-disable indent */
const { PrismaClient } = require("@prisma/client");

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

const defaultErrorMessages = {
	create: "An error occurred while attempting to create this resource.",
	list: "An error occurred while attempting to list the resources.",
	get: "An error occurred while attempting to get this resource",
	update: "An error occurred while attempting to update this resource.",
	delete: "An error occurred while attempting to delete this resource.",
	notFound: "Resource not found."
};

const queryParser = query => {
	const entries = Object.entries(query);

	const parsed = {
		AND: [
			...entries.map(([key, value]) => {
				const transformation = Object.fromEntries([[key, value]]);

				try {
					const parsedValue = JSON.parse(value);
					transformation[key] = parsedValue;
				} catch (error) {
					transformation[key] = value;
				}

				if (typeof transformation[key] === "string" && key !== "id") {
					transformation[key] = {
						contains: value,
						mode: "insensitive"
					};
				}

				return transformation;
			})
		].filter(key => key !== null)
	};

	return parsed;
};

class PrismaController {
	constructor(
		resourceName,
		{
			creationCheck = {},
			creationHide = [],
			errorMessages = {},
			queryOpt = {}
		}
	) {
		this.resourceName = resourceName;
		this.dbResource = db[resourceName];
		this.queryLimit = 20;
		this.creationCheck = creationCheck;
		this.creationHide = creationHide;
		this.create = this.create.bind(this);
		this.list = this.list.bind(this);
		this.get = this.get.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);

		this.queryOpt = {
			read: queryOpt.read ? queryOpt.read : {},
			get: queryOpt.get ? queryOpt.get : {},
			list: queryOpt.list ? queryOpt.list : {},
			update: queryOpt.update ? queryOpt.update : {},
			delete: queryOpt.delete ? queryOpt.delete : {}
		};

		this.errorMessages = {
			create: errorMessages.create
				? errorMessages.create
				: defaultErrorMessages.create,
			list: errorMessages.list
				? errorMessages.list
				: defaultErrorMessages.list,
			get: errorMessages.get
				? errorMessages.get
				: defaultErrorMessages.get,
			update: errorMessages.update
				? errorMessages.update
				: defaultErrorMessages.update,
			delete: errorMessages.delete
				? errorMessages.delete
				: defaultErrorMessages.delete
		};
	}

	async create(req, res) {
		const { body } = req;

		try {
			const checkFirst =
				Object.keys(this.creationCheck) > 1
					? await this.dbResource.findFirst({
							where: this.creationCheck
					  })
					: null;
			if (checkFirst === null) {
				try {
					const data = await this.dbResource.create({ data: body });
					if (data) {
						this.creationHide.forEach(hide => {
							delete data[hide];
						});
						return res.status(201).send({ data });
					}
					return res
						.status(500)
						.send({ message: this.errorMessages.create });
				} catch (err) {
					return res.status(400).send({ message: err });
				}
			} else {
				return res
					.status(400)
					.send({ message: "This resource already exists" });
			}
		} catch (error) {
			return res.status(400).send({ message: error });
		}
	}

	async list(req, res) {
		let { limit, page, ...query } = req.query;

		query = queryParser(query);
		limit = Number(limit || this.queryLimit);
		page = Number(page || 1);

		const data = await this.dbResource.findMany({
			where: query,
			take: limit,
			skip: (page - 1) * limit,
			...this.queryOpt.read,
			...this.queryOpt.list
		});

		return res.status(200).send({
			pagination: {
				page,
				limit,
				total: data.length
			},
			data
		});
	}

	async get(req, res) {
		const { id: idStr } = req.params;

		try {
			const id = parseInt(idStr);
			try {
				const data = await this.dbResource.findUnique({
					where: { id },
					...this.queryOpt.read,
					...this.queryOpt.get
				});
				return data
					? res.status(200).send({ data })
					: res.status(404).send({ message: this.errorMessages.get });
			} catch (err) {
				return res
					.status(500)
					.send({ message: this.errorMessages.delete });
			}
		} catch (err) {
			return res.status(400).send({ message: "Unable parse ID" });
		}
	}

	async update(req, res) {
		const { id: idStr } = req.params;
		const { body } = req;

		try {
			const id = parseInt(idStr);
			try {
				const data = await this.dbResource.update({
					where: { id },
					data: body,
					...this.queryOptions.update
				});

				return data
					? res.status(202).send({ data })
					: res
							.status(500)
							.send({ message: this.errorMessages.update });
			} catch (err) {
				return res
					.status(500)
					.send({ message: this.errorMessages.delete });
			}
		} catch (err) {
			return res.status(400).send({ message: "Unable parse ID" });
		}
	}

	async delete(req, res) {
		const { id: idStr } = req.params;

		try {
			const id = parseInt(idStr);
			try {
				await this.dbResource.delete({
					where: { id },
					...this.queryOptions.delete
				});

				return res.status(204).send();
			} catch (err) {
				return res
					.status(500)
					.send({ message: this.errorMessages.delete });
			}
		} catch (err) {
			return res.status(400).send({ message: "Unable parse ID" });
		}
	}
}

module.exports = PrismaController;
