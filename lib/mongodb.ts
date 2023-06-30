import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Set as global varibale so that value is preserved accross module reloads caued by Hot Module Replacement
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Better not to use a global variable in production env.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

//Export a module-scoped promise so that it can be used by other functions
export default clientPromise;
