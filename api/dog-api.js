//  Import Statements
const axios = require('axios');

// TheDogAPI
const dogApiKey = process.env.DOG_API_KEY
const dogApiUrl = process.env.DOG_API_URL

// GET request from TheDogAPI
const getDogImage = async () => {
    axios.defaults.headers.common['x-api-key'] = dogApiKey; // Replace this with your API Key

    const res = await axios.get(dogApiUrl, {
        params: {
            limit: 1,
            size: "full"
        } // Ask for 1 Image, at full resolution
    });
    // the response is an Array, so just use the first item as the Image
    const imageUrl = res.data[0].url;
    return imageUrl;
}

module.exports = getDogImage
