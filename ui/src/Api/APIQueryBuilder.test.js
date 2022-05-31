import APIQueryBuilder from "./APIQueryBuilder";

const endpoint = "posts";
const baseURL = "http://localhost:8081/api/v1/posts";
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

describe("API Query Builder Test", () => {
	let api;

	beforeEach(() => {
		api = api = new APIQueryBuilder(endpoint, validQueryParameters);
	});

	it("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(`.title("Morris")`, () => {
		api.addQueryParameter({ name: "title", value: "Morris" });
		expect(api.toURL()).toBe(`${baseURL}?title=Morris`);
	});

	test(`.userID(1)`, () => {
		api.addQueryParameter({ name: "userID", value: 1 });
		expect(api.toURL()).toBe(`${baseURL}?userID=1`);
	});
});
