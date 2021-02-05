// Import Statements
const dogNames = require('dog-names');
const getDogImage = require('./dogApi.js');

// Twilio 
const twilioNumber = process.env.MY_TWILIO_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// This asyncronous function sends the daily doggo message to all phone numbers
const sendDailyDogMessage = async (arrayPhoneNumbers) => {

    // await url response from getDogImage() 
    const image = await getDogImage();
    const imageArray = [image];
    console.log(imageArray);

    // Generate random doggo name message
    const text = 'Here is ' + dogNames.allRandom() + ', a nice doggo just for you!'
    console.log(text);

    // declare array of phone numbers based off of theinput array 
    const numbersToMessage = arrayPhoneNumbers
    console.log(arrayPhoneNumbers);

    // Create same message for each phone number and deliver it
    numbersToMessage.forEach(function (number) {
        var message = client.messages.create({
                body: text,
                from: twilioNumber,
                mediaUrl: imageArray,
                to: number
            })
            .then(message => console.log(message.status))
            .done();
    });
}

module.exports = sendDailyDogMessage