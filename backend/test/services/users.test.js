import chai from "chai";
import request from "supertest";
import { createUsers } from "../helper.js";

const expect = chai.expect;

describe("Route /users ", () => {
  describe("GET /users", async () => {
    it("should contain all the field in the header", async () => {
      await createUsers();
      const res = await request(app).get("/users");
      const header = res.header;
      expect(res.statusCode).to.equal(200);
      const keys = ["content-type", "date", "THIS_KEY_DONT_EXIST"];
      expect(header).to.include.all.keys(keys);
    });
  });
});
