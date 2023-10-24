const axios = require('axios');
const { Videogame } = require('../../db');

const obtVideogameDetails = async (id) => {

    if(Number.isInteger(id)){
        const response = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)

        return response.data;
    }
    else{
        const videogame = await Videogame.findByPk(id);

        return videogame;
    }
    
}

module.exports = obtVideogameDetails;