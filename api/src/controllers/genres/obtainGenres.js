const axios = require('axios');

const genresBD = async () => {
    const results = await axios(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    
    return results.data;
}

module.exports = genresBD;