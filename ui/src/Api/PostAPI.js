import APIQueryBuilder from "./APIQueryBuilder";
const apiError = (fnName, expected, received) => {
	throw new Error(
		`[PostAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};
const endpoint = "posts";
const validQueryParameters = {
	userID: { type: "number" },
	title: { type: "string" },
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	}
};

class PostAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	userID = value => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "userID", value });
			return this;
		} else {
			return apiError("userID", "number", value);
		}
	};

	title = value => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "title", value });
			return this;
		} else {
			return apiError("title", "string", value);
		}
	};

	createdAt = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "createdAt", value });
			return this;
		} else {
			return apiError("createdAt", "string", value);
		}
	};

	updatedAt = value => {
		if (value instanceof Date && !isNaN(value)) {
			this.addQueryParameter({ name: "updatedAt", value });
			return this;
		} else {
			return apiError("updatedAt", "string", value);
		}
	};
}

export default PostAPI;
