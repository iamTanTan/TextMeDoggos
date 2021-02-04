// Import Statements
const express = require('express')
const router = express.Router()
const Phonenumber = require('../models/phonenumber')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const _ = require('lodash')
const sendDogMessage = require('../api/twilio-api.js')
const getDogImage = require('../api/dog-api.js')


router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', urlencodedParser, async (req, res) => {

    try {
        // Retrieve and clean data from user
        const rawInputNumber = req.body.p;
        const cleanedNumber = "+1" + _.camelCase(rawInputNumber)

        //  For debugging only
        const image = await getDogImage()
        console.log(image)

        // Determine if Phone Number already exists in system
        await Phonenumber.findOne({
                number: cleanedNumber
            }, async (err, foundNum) => {
                if (!err) {
                    if (!foundNum) {

                        //  Create new number for model
                        const phoneNumber = new Phonenumber({
                            number: cleanedNumber
                        })

                        // Add number to database if not found
                        phoneNumber.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Saved " + phoneNumber.number + " to Database.")
                                res.render('success')
                                sendDogMessage(phoneNumber.number)
                                .then(console.log("sent"))
                                .catch((err) => console.log(err));

                            }
                        })


                    } else {
                        // Inform User of already being signed up
                        console.log("Number: " + foundNum.number + " already in database");
                        res.render('failure')
                    }

                } else {
                    // Catches unforeseen errors
                    res.send("Sorry, we are doing maintenance")
                }
            }

        )
    } catch (error) {
        console.error(error);
    }
})

module.exports = router