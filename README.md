# test-grpc-node
This is an example of gPRC testing project using mocha.

## The online service under test:
- Target endpoint: http://grpcb.in:9000/ 
- Service: Hello
- Methods: SayHello, LotsOfReplies, LotsOfGreetings, BidiHello

## Steps to run test:

- Install dependencies:
```
cd test-grpc-node
npm i
```

- Run the test:
```
npm run test
```