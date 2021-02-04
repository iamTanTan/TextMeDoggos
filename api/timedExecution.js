// Import Statements
const sendDailyDogMessage = require('./twilio-multisend-api.js')
const Phonenumber = require('../models/phonenumber')

const phoneArray = [];



// This function controls the time of day at which the daily message is sent out
const timeSendingDailyDogMessage = (arrayPhoneNumbers) => {
     
     const now = new Date();
     const millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 46, 30, 0) - now;

     if (millisTill10 < 0) {
          millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
     }

     const array = arrayPhoneNumbers

     setTimeout(() => {
          sendDailyDogMessage(arrayPhoneNumbers)
     }, millisTill10, array);
}

module.exports = timeSendingDailyDogMessage