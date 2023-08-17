const { MongoClient } = require("mongodb");

const uri = "mongodb://easylearnz:eaylearnz@localhost:27017";
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
