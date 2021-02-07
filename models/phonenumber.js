const mongoose = require('mongoose')

// Defines the schema for entered phone numbers
const phonenumberSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    }
})

const Phonenumber = mongoose.model('Phonenumber', phonenumberSchema)

// returns all phonenumbers within the collection
const getPhoneNumbers = async () => {
     return await Phonenumber.find().distinct('number', (err, result) => {
          if (err) {
               return console.log(err)
          }
          // console.log(result); for testing
          return result
     })
}

module.exports = {getPhoneNumbers, Phonenumber}
