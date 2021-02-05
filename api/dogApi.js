//  Import Statements
const axios = require('axios');

var config = {
    method: 'get',
    url: process.env.DOG_API_URL,
    headers: {
        'x-api-key': process.env.DOG_API_KEY
    }
};

const getDogImage = async () => {
    return axios(config)
        .then(function (response) {
            return ((response.data[0].url));
        })
        .catch(function (error) {
            console.log(error);
        });
}


module.exports = getDogImage