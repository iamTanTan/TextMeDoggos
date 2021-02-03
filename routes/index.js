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

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', urlencodedParser, function (req, res) {

    // Retrieve and clean data from user
    const rawInputNumber = req.body.p;
    const cleanedNumber = "+1" + _.camelCase(rawInputNumber)

    // Determine if Phone Number already exists in system
    Phonenumber.findOne({
            number: cleanedNumber
        }, (err, foundNum) => {
            if (!err) {
                if (!foundNum) {

                    const phoneNumber = new Phonenumber({
                        number: cleanedNumber
                    })

                    // Add number to database if not found
                    phoneNumber.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(phoneNumber.number)
                            sendDogMessage(phoneNumber.number).then(() => {
                                Promise.resolve("Should have sent!")
                                res.render('success')
                            })
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
})

module.exports = router