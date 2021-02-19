// Imports 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const sendDailyDogMessage = require('./api/twilio-multisend-api.js')

// Establish connection to MongoDB Atlas
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// This code sends messages to all current users
async function sendAll() {
    await sendDailyDogMessage()
}

sendAll()
.then(
    console.log('Messaging successful.')
    )