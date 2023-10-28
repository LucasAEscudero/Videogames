const axios = require('axios');
const { Genres } = require('../../db');

const genresBD = async () => {
    let genres = [];
    const response = await axios(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    
    response.data.results.forEach(genre => genres.push(genre.name));

    response.data.results.forEach(genre => Genres.create({ name: genre.name }));

    return genres;
}

module.exports = genresBD;