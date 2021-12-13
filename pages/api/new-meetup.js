import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://kang:astronomy1@cluster0-shard-00-00.7qv61.mongodb.net:27017,cluster0-shard-00-01.7qv61.mongodb.net:27017,cluster0-shard-00-02.7qv61.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-54c00r-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
//"mongodb+srv://kang:astronomy1@cluster0.7qv61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
