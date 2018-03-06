const expect = require('chai').expect;

const SampleService = require('../../src/services/home');

describe('sample-service', function() {
  describe('getSample', function() {
    it('should return "This is a sample"', function() {
      expect('This is a sample').to.equal(SampleService.getSample());
    });
  });
});
