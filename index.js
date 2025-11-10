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
    const vehiclesCollection = db.collection('vehicles');
    // Voyago Booking Collectin
    const bookingsCollection = db.collection('bookings');

    // API For Vehicles Collection
    // GET API
    app.get('/vehicles', async (req, res) => {
      const result = await vehiclesCollection.find().toArray();
      res.send(result);
    });

    app.get('/vehicles/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await vehiclesCollection.findOne({ _id: objectId });
      res.send(result);
    });

    // POST API
    app.post('/vehicles', async (req, res) => {
      const data = req.body;
      const result = await vehiclesCollection.insertOne(data);
      res.send(result);
    });

    // UPDATE API
    app.put('/vehicles/:id', async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);
      const query = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await vehiclesCollection.updateOne(query, update);
      res.send(result);
    });

    // DELETE API
    app.delete('/vehicles/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await vehiclesCollection.deleteOne({ _id: objectId });
      res.send(result);
    });

    //API For Bookings Collection
    // GET API
    app.get('/bookings', async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    app.get('/bookings/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await bookingsCollection.findOne({ _id: objectId });
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
