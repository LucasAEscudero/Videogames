const axios = require('axios');
const { Videogame } = require('../../db');

const obtVideogameDetails = async (id) => {
    if(Number(id)){
        const { data } = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)

        const videogame = {
            id: data.id,
            name: data.name,
            image: data.background_image,
            rating: data.rating,
            released: data.released,
            description: data.description,
            platforms: data.platforms?.map(platform => platform.platform.name),
            genres: data.genres?.map(genre => genre.name),
            tags: data.tags?.map(tag => tag.name),
            origin: 'API'
        }

        return videogame;
    }
    else{
        const data = await Videogame.findByPk(id);

        const videogame = {
            id: data.id,
            name: data.name,
            image: data.image,
            rating: data.rating,
            released: data.launch_date,
            description: data.description,
            platforms: [...data.platforms],
            genres: [...data.genresName],
            tags: [...data.tags],
            origin: 'API'
        }

        return videogame;
    }
    
}

module.exports = obtVideogameDetails;