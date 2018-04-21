import chai from "chai";
import request from "supertest";
import { createUsers } from "../helper.js";

const expect = chai.expect;

describe("Route /users ", () => {
  describe("GET /users", async () => {
    it("should contain all the field in the header", async () => {
      await createUsers();
      const res = await request(server).get("/users");
      console.log(res.body);
      const header = res.header;
      expect(res.statusCode).to.equal(200);
      const keys = ["content-type", "date"]
      expect(header).to.include.all.keys(keys);
    
    });
  });
});
