require('dotenv').config();
const dogNames = require('dog-names');
const getDogImage = require('./dog-api.js');
/*************************************************************************************/
// Twilio 
const twilioNumber = process.env.MY_TWILIO_NUMBER;
const testPhoneNumber = process.env.MY_CELLPHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendDogMessage = async () => {

    // await url response from getDogImage() 
    const image = await getDogImage();
    const imageArray = [image];
    console.log(imageArray);

    // Generate random doggo name message
    const text = 'Here is ' + dogNames.allRandom() + ', a nice doggo just for you!'
    console.log(text);
    // Create message utilizing twilio!
    client.messages
        .create({
            body: text,
            from: twilioNumber,
            mediaUrl: imageArray,
            to: testPhoneNumber
        })
        .then(message => console.log(message.sid));
};

// sendDogMessage()

module.exports = sendDogMessage

//14808125308