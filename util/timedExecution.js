// Imports 
const sendDailyDogMessage = require('../api/twilio-multisend-api.js')

// This function controls the time of day at which the daily message is sent out
const timeSendingDailyDogMessage = async () => {

     const now = new Date();
     let millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0) - now;

     if (millisTill10 < 0) {
          millisTill10 += 86400000; // it's after 8am, try 8am tomorrow.
     }

     setTimeout(async () => {
          console.log('Time execution in progress...');
          await sendDailyDogMessage()
     }, millisTill10);
}

module.exports = timeSendingDailyDogMessage

//  Note: it is recommended to use some scheduler like cors if you are using your own server