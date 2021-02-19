var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.thedogapi.com/v1/images/search?limit=1&size=full',
  headers: { 
    'x-api-key': "c20175c1-3aea-42c0-be21-841fbaf473b2" // only working when hard coded for now...
  }
};

const getDogImage = async () => {
    return axios(config)
        .then(function (response) {
            console.log('inside: ' + response.data[0].url);
            return ((response.data[0].url));
        })
        .catch(function (error) {
            console.log(error);
        })
}



module.exports = getDogImage