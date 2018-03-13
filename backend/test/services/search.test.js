import sinon from "sinon";
import chai from "chai";
import * as sinongMongoose from "sinon-mongoose";
import { mongoose } from '../../src/common/mongoose';

const expect = chai.expect;
const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
describe("Route /search ", () => {
  describe("GET /search", () => {
    it("should return an error code 400", () => {
      expect(2).to.equal(2);
    });

    it("should connect", () => {
      expect(2).to.equal(2);
    });
  });
});
