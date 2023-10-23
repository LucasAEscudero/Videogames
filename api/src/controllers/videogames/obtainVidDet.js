const axios = require('axios');

const obtVidDetails = async (id) => {
    const response = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)

    return response.data;
}

module.exports = obtVidDetails;