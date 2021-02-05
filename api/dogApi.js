//  Import Statements
const axios = require('axios');

// TheDogAPI
const dogApiKey = process.env.DOG_API_KEY
const dogApiUrl = process.env.DOG_API_URL

// // GET request from TheDogAPI
// const getDogImage = async () => {
//     axios.defaults.headers.common['x-api-key'] = dogApiKey; // Replace this with your API Key

//     const res = await axios.get(dogApiUrl, {
//         params: {
//             // mime_types:"jpg,png",
//             limit: 1,
//             size: "full"
//         } // Ask for 1 Image, at full resolution
//     });
//     // the response is an Array, so just use the first item as the Image
//     const imageUrl = res.data[0].url;
//     return imageUrl;
// }

// console.log(getDogImage());

// module.exports = getDogImage


var config = {
    method: 'get',
    url: 'https://api.thedogapi.com/v1/images/search?limit=1&size=full',
    headers: {
        'x-api-key': '"c20175c1-3aea-42c0-be21-841fbaf473b2"'
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