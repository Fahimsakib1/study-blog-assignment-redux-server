const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//set up middle wares
app.use(express.json());
app.use(cors({ origin: true }));

//require dotenv
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.c2bp6su.mongodb.net/?retryWrites=true&w=majority`;
console.log("Mongo set up Redux Assignment 1 : ", uri);





// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const blogsCollection = client.db('Moon_Tech_Redux_Thunk').collection('blogs');

        
        //////////////////////////// Redux Thunk Assignment 1 Codes Starts ///////////////////////////////
        
        app.get('/blogs', async (req, res) => {
            const query = {}
            const result = await blogsCollection.find(query).toArray()
            res.send(result);
        })

        app.get('/blog/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id) }
            const result = await blogsCollection.findOne(query);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(error => console.log(error))

app.get("/", (req, res) => {
    res.send("Study Abroad Blog With Redux Thunk Server!");
});

app.listen(port, () => {
    console.log(`Study Abroad Blog With Redux Thunk Running on port ${port}`);
});
