const PrismaController = require("./PrismaController");

const PostController = new PrismaController("Post", {
	queryOpt: {
		read: {
			select: {
				id: true,
				title: true,
				content: true,
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						username: true
					}
				},
				createdAt: true,
				updatedAt: true
			}
		}
	},
	errorMessages: {
		create: "Task could not be created"
	}
});

module.exports = PostController;
