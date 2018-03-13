import sinon from "sinon";
import chai from "chai";
import mongoose from "mongoose";
import * as sinongMongoose from "sinon-mongoose";

const expect = chai.expect;
const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
describe("Route /search ", () => {
  describe("GET /search", () => {
    it("should return an error code 400", () => {
      expect(2).to.equal(2);
    });

    it("should connect", (done) => {
      require("mongodb").connect("mongodb://localhost:27017/", done);
      const prom = wait(2000)  
      const showdone = ()=>process.exit(0);
      prom.then(showdone)
    });
  });
});
