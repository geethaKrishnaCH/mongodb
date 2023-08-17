const { MongoClient } = require("mongodb");

const uri =
  "mongodb://beehyv:beehyv123@docdb-2023-08-11-06-42-43.cluster-cuwmnv6e8nbw.us-east-1.docdb.amazonaws.com:27017/?ssl=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
const client = new MongoClient(uri);
let isConnected = false;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to mongo");
    isConnected = true;
  } catch (err) {
    console.error("Failed to connect to mongo: ", err);
  }
}

async function closeConnection() {
  await client.close();
  console.log("Connection to mongo is closed");
}

async function addNewDocument(doc) {
  const collection = client.db("restaurant").collection("pizzaMenu");
  const addedDoc = await collection.insertOne(doc);
  console.log(addedDoc);
}
async function main() {
  await connectToMongoDB();
  if (isConnected) {
    const doc = { name: "Neapolitan pizza", shape: "round" };
    await addNewDocument(doc);
    closeConnection();
  }
}

main();
