// Import Statements
const dogNames = require('dog-names');
const getDogImage = require('./dog-api.js');

// Twilio 
const twilioNumber = process.env.MY_TWILIO_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// This sends the single confirmation message upon signup
const sendDogMessage = async (newNumber) => {

    // await url response from getDogImage() 
    const image = await getDogImage();
    const imageArray = [image];
    console.log(imageArray);

    // Generate random doggo name message
    const text = 'Here is ' + dogNames.allRandom() + ', a nice doggo just for you! Note: Text STOP to Stop receiving messages and START to resume.'
    console.log(text);

    // Create message utilizing twilio
    client.messages
        .create({
            body: text,
            from: twilioNumber,
            mediaUrl: imageArray,
            to: newNumber
        })
        .then(message => console.log(message.sid));
};


module.exports = sendDogMessage