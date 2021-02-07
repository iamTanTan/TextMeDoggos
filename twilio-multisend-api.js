// Import Statements
require('dotenv').config()
const dogNames = require('dog-names');
const getDogImage = require('./api/dogApi.js');

//Model querying
const numbers = require('./models/phonenumber.js')
const getPhoneNumbers = numbers.getPhoneNumbers

// Twilio 
const twilioNumber = process.env.MY_TWILIO_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const mongoose = require('mongoose')

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





// This asyncronous function sends the daily doggo message to all phone numbers
const sendDailyDogMessage = async () => {

    // await url response from getDogImage() 
    const image = await getDogImage();
    const imageArray = [image];
    console.log(imageArray);

    // Generate random doggo name message
    const text = 'Here is ' + dogNames.allRandom() + ', a nice doggo just for you!'
    console.log(text);

    // declare array of phone numbers based off of theinput array 
    var nums = await getPhoneNumbers();
    console.log('inside sendDailyDogMessage');
    console.log(nums);

    // Create same message for each phone number and deliver it
    nums.forEach((number) => {
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

sendDailyDogMessage()

module.exports = sendDailyDogMessage