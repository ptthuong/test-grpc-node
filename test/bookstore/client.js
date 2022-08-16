const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto', {});
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookstore;

const client = new bookStorePackage.Book('127.0.0.1:50051', grpc.credentials.createInsecure());

// client.readBooks(null, (err, response) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(`From server`, JSON.stringify(response));
// 	}
// });

client.createBook({}, (err, response) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`From server`, JSON.stringify(response));
	}
});

// client.readBook({ 'id': 1 }, (err, response) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(`From server`, JSON.stringify(response));
// 	}
// });