const axios = require('axios');

const obtainVideogames = async () => {
    const results = await axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
    
    return results.data;
}

module.exports = obtainVideogames;