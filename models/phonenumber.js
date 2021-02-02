const mongoose = require('mongoose')

const phonenumberSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Phonenumber', phonenumberSchema)