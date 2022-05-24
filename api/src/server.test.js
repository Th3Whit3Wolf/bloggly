const request = require("supertest");
const app = require("./server");
const response = request(app);

describe("Backend Tests", () => {
	describe("Express Actuator Endpoints", () => {
		test("GET /info", async () => {
			const res = await response.get("/info");
			expect(res.statusCode).toBe(200);
			expect(res.body.build.name).toBe("api");
		});

		test("GET /metrics", async () => {
			const res = await response.get("/metrics");
			expect(res.statusCode).toBe(200);
		});

		test("GET /health", async () => {
			const res = await response.get("/health");
			expect(res.statusCode).toBe(200);
		});
	});
})