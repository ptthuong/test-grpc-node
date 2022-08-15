const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./addsvc/proto/addsvc.proto', {});
const addPackage = grpc.loadPackageDefinition(packageDefinition).addsvc;

const client = new addPackage.Add('grpcb.in:9000', grpc.credentials.createInsecure());

var assert = require('assert');

describe('Test Add service', function () {
    describe('Test Add API', function () {
        it('Should return successful code with correct sum result', function (done) {
        client.Sum({
            "a": 6,
            "b": 4
        }, (err, response) => {
            assert.equal(response["v"], "11", "Incorrect sum")
            done()
        });
    });

    it('Should return 14 UNAVAILABLE', function (done) {
        const client1 = new addPackage.Add('grpcb.in', grpc.credentials.createInsecure());
        client1.Sum({
          "a": "1",
          "b": "2"
      }, (err, response) => {
          assert.equal(err.code, 14);
          done()
      });
    });
  });

  describe('Test Concat API', function () {
    it('Should return successful code with correct Concat result', function (done) {
        client.Concat({
            "a": "ab",
            "b": "cd"
        }, (err, response) => {
            assert.equal(response["v"], "abcd", "Should concat successfully");
            done()
        });
    });

    it('Should return error message', function (done) {
        client.Concat({
            "a": "fooBar",
            "b": "fooBar"
        }, (err, response) => {
            assert.equal(response["err"], "result exceeds maximum size", "Should return error of exceeding max size")
            done()
        });
    });
    });
});