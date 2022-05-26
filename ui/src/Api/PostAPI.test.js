import PostAPI from "./PostAPI";

describe("PostAPI", () => {
	let api;
	const baseURL = "http://localhost:8081/api/v1/posts";

	beforeEach(() => {
		api = new PostAPI();
	});

	test(".toURL()", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".baseURL()", () => {
		expect(api.baseURL()).toBe(baseURL);
	});

	test(".userID(1)", () => {
		api.userID(1);
		expect(api.toURL()).toBe(`${baseURL}?userID=1`);
	});

	test(`.title("Ferris")`, () => {
		api.title("Ferris");
		expect(api.toURL()).toBe(`${baseURL}?title=Ferris`);
	});

	test(`.createdAt(new Date())`, () => {
		const date = new Date();
		api.createdAt(date);
		expect(api.toURL()).toBe(`${baseURL}?createdAt=${JSON.stringify(date)}`);
	});

	test(`.updatedAt(new Date())`, () => {
		const date = new Date();
		api.updatedAt(date);
		expect(api.toURL()).toBe(`${baseURL}?updatedAt=${JSON.stringify(date)}`);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test(".limit(20)", () => {
		api.limit(20);
		expect(api.toURL()).toBe(`${baseURL}?limit=20`);
	});

	test(".page(1)", () => {
		api.page(1);
		expect(api.toURL()).toBe(`${baseURL}?page=1`);
	});
});
