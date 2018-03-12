const sinon = require('sinon');
const chai = require("chai");
const mongoose = require('mongoose');
const sinonMongoose= require('sinon-mongoose');

const expect = chai.expect;

describe("Route /search", () => {
  describe("Given_ValidApiCallWithOnlyQParam", () => {
    it("The test should fail", () => {
      expect(2).to.equal(2);
    });
  });
});
