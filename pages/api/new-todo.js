//  /api/new-todo

import { MongoClient } from "mongodb";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = req.body;

      console.log("data", data);

      const client = await MongoClient.connect(
        "mongodb+srv://Athipython:twmE5fn6eWqn6gYx@cluster0.jnw4ana.mongodb.net/todoLists?retryWrites=true&w=majority"
      );

      const db = client.db();

      const todoCollections = db.collection("todoLists");
      const result = await todoCollections.insertOne(data);

      client.close();

      res.status(201).json({ message: "New Todo Inserted " });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
