// 
require('dotenv').config();
const sendDailyDogMessage = require('./twilio-multisend-api.js')
const mongoose = require('mongoose')
const numbers = require('./models/phonenumber.js')
const getPhoneNumbers = numbers.getPhoneNumbers

// Can remove later
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


// This function controls the time of day at which the daily message is sent out
const timeSendingDailyDogMessage = async (arrayPhoneNumbers) => {

     const now = new Date();
     let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 42, 30, 0) - now;

     if (millisTill10 < 0) {
          millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
     }

     const array = await arrayPhoneNumbers
     console.log(array);

     setTimeout(() => {
          sendDailyDogMessage(arrayPhoneNumbers)
     }, millisTill10, array);
}

getPhoneNumbers()

timeSendingDailyDogMessage(getPhoneNumbers())

module.exports = timeSendingDailyDogMessage