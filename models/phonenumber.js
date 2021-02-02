const mongoose = require('mongoose')

const phonenumberSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Phonenumber', phonenumberSchema)