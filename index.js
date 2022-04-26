const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const query = require('express/lib/middleware/query');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config();

//middleware
app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csp4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
      await client.connect();
      const helpCollection = client.db("volunteer-network").collection('landingPage');
      app.get('/help',async(req,res)=>{
        const query = {};
        const cursor = helpCollection.find(query);
        const result = await cursor.toArray()
        res.send(result)
      })


    } finally {
    //   await client.close();
    }
}
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('volunteer is running')
})
app.listen(port, () => {
    console.log('listen port', port);
})