const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is Running Fine');
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quantumvault.xg6nrc4.mongodb.net/?appName=QuantumVault`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    // Voyago Vehicles Collection
    const db = client.db('voyago-db');
    const vehiclesCollection = db.collection('vehicles');
    // Voyago Booking Collectin
    const bookingsCollection = db.collection('bookings');
    // user collection
    const usersCollection = db.collection('users');

    // Api for users collection
    // post api
    app.post('/signup', async (req, res) => {
      try {
        const { email } = req.body;

        const existing = await usersCollection.findOne({ email });

        if (existing) {
          return res.status(200).json({
            message: 'User already exists',
            user: existing,
          });
        }

        const body = {
          ...req.body,
          createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(body);

        res.status(201).json({
          message: 'User created',
          result,
        });
      } catch (error) {
        res.status(500).json({ message: 'Signup failed' });
      }
    });

    // GET API
    app.get('/users', async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).json({ message: 'email query is required' });
        }

        const result = await usersCollection.findOne({ email });

        if (!result) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.send(result);
      } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
          message: 'Failed to get user',
          error: error.message,
        });
      }
    });

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

    app.get('/my-vehicles', async (req, res) => {
      const email = req.query.email;
      const filter = { userEmail: email };
      const result = await vehiclesCollection.find(filter).toArray();
      res.send(result);
    });

    app.get('/latest-vehicles', async (req, res) => {
      const result = await vehiclesCollection.find().sort({ createdAt: -1 }).limit(6).toArray();
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
      const email = req.query.email;
      const filter = { userEmail: email };
      const result = await bookingsCollection.find(filter).sort({ tripStartDate: 1 }).toArray();
      res.send(result);
    });

    app.get('/bookings/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await bookingsCollection.findOne({ _id: objectId });
      res.send(result);
    });

    // POST API
    app.post('/bookings', async (req, res) => {
      const data = req.body;
      const result = await bookingsCollection.insertOne(data);
      res.send(result);
    });

    // UPDATE API
    app.put('/bookings/:id', async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);
      const query = { _id: objectId };
      const update = {
        $set: data,
      };
      const result = await bookingsCollection.updateOne(query, update);
      res.send(result);
    });

    // DELETE API
    app.delete('/bookings/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const result = await bookingsCollection.deleteOne({ _id: objectId });
      res.send(result);
    });

    // await client.db('admin').command({ ping: 1 });
    console.log('Ping your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
module.exports = app;
