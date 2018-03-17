import chai from "chai";
import request from "supertest";
import { createUsers } from "../helper.js";

const expect = chai.expect;

describe("Route /search ", () => {
  describe("GET /search", () => {
    it("should return an error code 400 if no query are provided", async () => {
      await createUsers();
      const res = await request(app).get("/search");
      expect(res.statusCode).to.equal(400);
    });
  });
});
