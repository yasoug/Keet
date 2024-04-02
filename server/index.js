const PORT = 8000
const uri = "mongodb://127.0.0.1:27017/kittens"
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB server");

   
    app.get('/', (req, res) => {
      res.json('hello to my app');
    });

    app.post('/signup', async (req, res) => {
      const { email, password } = req.body;
      const generatedUserID = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

        if (existingUser) {
          return res.status(409).send('User already exists. Please login');
        }

        const sanitizedEmail = email.toLowerCase();

        const data = {
          user_id: generatedUserID,
          email: sanitizedEmail,
          hashed_password: hashedPassword
        };

        const insertedUser = await users.insertOne(data);

        const token = jwt.sign(insertedUser, sanitizedEmail, {
          expiresIn: 68 * 24,
        });

        res.status(201).json({ token, user_id: generatedUserID });
      } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
      }
    });

    // Route for user login
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const database = client.db('app-data');
        const users = database.collection('users');

        const user = await users.findOne({ email });

        if (!user) {
          return res.status(400).json('Invalid Credentials');
        }

        const correctPassword = await bcrypt.compare(password, user.hashed_password);

        if (!correctPassword) {
          // Incorrect password
          return res.status(400).json('Invalid Credentials');
        }

        const token = jwt.sign({ user_id: user.user_id }, email, {
          expiresIn: 60 * 24
        });

        res.status(201).json({ token, user_id: user.user_id });
      } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
      }
    });

    app.get('/user', async (req, res) => {
        const user_id = req.query.user_id;
  
        try {
          const database = client.db('app-data');
          const users = database.collection('users');
          const query = { user_id: user_id };
  
          const user = await users.findOne(query);
          res.send({
            name: user.name,
            age: user.age,
            show_sex: user.show_sex,
            sex: user.sex,
            sex_interest: user.sex_interest,
            url: user.url,
            likes: user.likes,
            matches: user.matches
          });
        } catch (err) {
          console.error(err);
          res.status(500).json('Internal Server Error');
        }
    });

    app.get('/users', async (req, res) => {
      console.log('reached')
       
           const database = client.db('app-data')
           const users = database.collection('users')
           const returnedusers = await users.find().toArray()
           console.log("returned user", returnedusers);
           res.send(returnedusers)
     })

    app.put('/user', async (req, res) => {
      const formData = req.body.formData    
          const database = client.db('app-data')
          const users = database.collection('users')
  
          const query = { user_id: formData.user_id }
          const updateDocument = {
              $set: {
                  name: formData.name,
                  age: formData.age,
                  show_sex: formData.show_sex,
                  sex: formData.sex,
                  sex_interest: formData.sex_interest,
                  url: formData.url,
                  likes: formData.likes,
                  matches: formData.matches
              }
          }
          const insertedUser = await users.updateOne(query, updateDocument)
          res.send(insertedUser)
    })

    app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
