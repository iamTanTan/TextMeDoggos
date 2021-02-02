const express = require('express')
const router = express.Router()
const sendDogMessage = require('../twilio-api.js')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', (req, res) => {
    sendDogMessage()
    res.render('success')
})

module.exports = router