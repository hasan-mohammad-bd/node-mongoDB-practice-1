const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mz24q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("mongo connected");

    const run = async () => {
        try{
            await client.connect();
            const serviceCollection = client.db('gniusCar').collection('service');


            app.get('/service', async(req,res) =>{
               const query = {};
               const cursor = serviceCollection.find(query);
               const services = await cursor.toArray();
               res.send(services)
                
            })
        }
        finally{

        }
    }

run().catch(console.dir);



app.get('/', (req, res)=> {
    res.send("running the node crud")
});

app.listen(port, () =>{
    console.log("cord server is running");
});