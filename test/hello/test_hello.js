const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(`${__dirname}/proto/hello.proto`, {});
const helloPackage = grpc.loadPackageDefinition(packageDefinition).hello;
const client = new helloPackage.HelloService('grpcb.in:9000', grpc.credentials.createInsecure());

var assert = require('assert');

describe('Test Hello service', function () {
    it('Unary: SayHello should return successfully', function (done) {
        client.SayHello({
            "greeting": "Thuong"
        }, (err, response) => {
            assert.equal(response["reply"], "hello Thuong")
            done()
        });
    });

    it('Client Streaming: LotsOfGreetings should return 1 greeting for multiple names', function (done) {
        // assert response
        const call = client.LotsOfGreetings((err, response) => {
            assert.deepEqual(response, { reply: "hello Thuong, Ho, Ly" })
            done()
        });

        // write request message to the stream
        const nameList = ["Thuong", "Ho", "Ly"];
        nameList.forEach(function (name) {
            call.write({ greeting: name });
        });

        call.end(); // a signal to end the client stream
    });

    it('Server Streaming: LotsOfReplies should return multiple greetings for 1 name', function (done) {
        const call = client.LotsOfReplies({
            "greeting": "Thuong"
        });

        let arr = [];

        call.on('data', function (response) {
            arr.push(response);
        });

        call.on('end', function () {
            // assert all responses at the end
            arr.forEach(item => {
                assert.deepEqual({ reply: "hello Thuong" }, item)
            })
            done();
        });
    });

    it('Bio-directional Streaming: BidiHello should return multiple greetings for multiple names', function (done) {
        const call = client.BidiHello();

        const nameList = ["Thuong", "Ho", "Ly"];
        nameList.forEach(function (name) {
            call.write({ greeting: name });
        });
        call.end();

        let arr = [];
        call.on('data', function (response) {
            arr.push(response);
        });

        call.on('end', function () {
            console.log('All ');
            for (let i = 0; i < nameList.length; i++) {
                assert.deepEqual(arr[i], { reply: `hello ${nameList[i]}` })
            }
            done();
        });
    });
});