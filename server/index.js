const PORT = 8000
const uri = 'mongodb+srv://toumibusiness0:mypassword@cluster0.twesmhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())


const client = new MongoClient(uri)

client.connect()
  .then(() => {
    console.log('Connected to MongoDB server')


    app.get('/', (req, res) => {
      res.json('hello to my app')
    })

    app.post('/signup', async (req, res) => {
      const client = new MongoClient(uri)
      const { email, password } = req.body
      const generatedUserID = uuidv4()
      const hashedPassword = await bcrypt.hash(password, 10)

      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
          return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
          user_id: generatedUserID,
          email: sanitizedEmail,
          hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
          expiresIn: 60 * 24
        })
        res.status(201).json({ token, user_id: generatedUserID })
      } catch (err) {
        console.error(err)
      } finally {
        await client.close()
      }
    })

    // Route for user login
    app.post('/login', async (req, res) => {
      const client = new MongoClient(uri)
      const { email, password } = req.body

      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
          const token = jwt.sign(user, email, {
            expiresIn: 60 * 24
          })
          res.status(201).json({ token, userId: user.user_id })
        }

        res.status(400).json('Invalid Credentials')
      } catch (err) {
        console.error(err)
      } finally {
        await client.close()
      }
    })

    app.get('/user', async (req, res) => {
      const client = new MongoClient(uri)
      const user_id = req.query.user_id

      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { user_id: user_id }

        const user = await users.findOne(query)
        res.send(user)
      } finally {
        await client.close()
      }
    })

    // Update User with a match
    app.get('/addnatch', async (req, res) => {
      const client = new MongoClient(uri)
      const { user_id, matchedUser_id } = req.body
      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { user_id: user_id }
        const updateDocument = {
          $push: { matches: { user_id: matchedUser_id } }
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
      } finally {
        await client.close()
      }
    })

    app.get('/users', async (req, res) => {
      const client = new MongoClient(uri)
      const userIds = JSON.parse(req.query.userIds)
      console.log('reached')
      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const pipeline =
          [
            {
              '$match': {
                'user_id': {
                  '$in': userIds
                }
              }
            }
          ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        res.json(foundUsers)
      } finally {
        await client.close()
      }
    })

    // Getting all Gendered Users in the Database
    app.get('/gendered-users', async (req, res) => {
      const client = new MongoClient(uri)
      const sex = req.query.sex
      try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {sex: {$eq: sex}}
        const foundUsers = await users.find(query).toArray()
        res.json(foundUsers)
      } finally {
        await client.close()
      }
    })

    app.put('/user', async (req, res) => {
      const client = new MongoClient(uri)
      const formData = req.body.formData
      try {
        await client.connect()
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
          },
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
      } finally {
        await client.close()
      }
    })

    // Get Messages from_userId and to to_userId
    app.get('/messages', async (req, res) => {
      const {user_id, correspondingUser_id} = req.query
      const client = new MongoClient(uri)
      try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const query = {
          from_userId: user_id, to_userId: correspondingUser_id
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
      }finally {
        await client.close()
      }
    })

    // Add Messages to Database
    app.post('/message', async (req,res) => {
      const client = new MongoClient(uri)
      const message = req.body.message
      try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await  messages.insertOne(message)
        res.send(insertedMessage)
      } finally {
        await client.close()
      }
    })

    app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })

