const express = require('express')
const router = express.Router()
const Phonenumber = require('../models/phonenumber')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', (req, res) => {
    res.render('index')
})

router.post('/',urlencodedParser, function(req, res) {

    const inputNumber = req.body.p;
    console.log(inputNumber);

    Phonenumber.findOne({
            number: inputNumber
        }, (err, foundNum) => {
            if (!err) {
                if (!foundNum) {
                    console.log(foundNum);
                    const phoneNumber = new Phonenumber({
                        number: inputNumber
                    })

                    phoneNumber.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('success')
                        }
                    })
                    
                } else {
                    res.render('failure')
                }

            } else {
                res.send("Sorry, we are doing maintenance")
            }
        }

    )
})

module.exports = router