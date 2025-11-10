const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is Running Fine');
});

const uri = 'mongodb+srv://voyago-db:IkoSmhK1PWsMFmZi@quantumvault.xg6nrc4.mongodb.net/?appName=QuantumVault';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // Voyago Vehicles Collection
    const db = client.db('voyago-db');
    const voyagoCollection = db.collection('vehicles');

    // GET API
    app.get('/vehicles', async (req, res) => {
      const result = await voyagoCollection.find().toArray();
      res.send(result);
    });

    app.get('/vehicles/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await voyagoCollection.findOne({ _id: objectId });
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log('Pinrd your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
