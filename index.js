const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://redux-server:Ro4D9ftvpi6Kg6rX@cluster0.plwq55e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
      await client.connect();
      const videosCollection = client.db("allvideos").collection("videos");
      const tagsCollection = client.db("allvideos").collection("tags");
      app.get("/videos", async (req, res) => {
        const videos = await videosCollection.find().toArray();
        res.send(videos);
      });
      app.get("/tags", async (req, res) => {
        const tags = await tagsCollection.find().toArray();
        res.send(tags);
      });
    } finally {
    }
  }
  run().catch(console.dir);
  app.get("/", (req, res) => {
    res.send("server is running");
  });
  app.listen(port, () => {
    console.log(" server is ", port);
  });
  