const axios = require('axios');
const { Videogame } = require('../../db');
const { Op } = require('sequelize');

const obtainVideogameByName = async (name, search) => {
    // let i = 0; si tenemos que poner los de la DB como ultimos
    const videogames = [];

    if(search === 'API'){
        var { data } = await axios(
            `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`
        );    
        
        data.results.forEach((game, i) => {
            if(i < 15){
                videogames.push({
                    id: game.id,
                    name: game.name,

                    rating: game.rating,
                    metacritic: game.metracritic, //puntaje del juego
                    released: game.released, //cuando fue lanzado
                    image: game.background_image,

                    platforms: game.platforms?.map(platform => {
                        return platform.platform?.name;
                    }),
                    genres: game.genres?.map(gender => {
                        return gender.name;
                    }),
                    tags: game.tags?.map(tag => {
                        if(tag.language === 'eng') return tag;
                    })
                    // description: game.description no existe
                });
            } 
        });

        videogames.forEach(game => {
            game.tags = game.tags.filter(tag => {
                return tag;
            });
        });

        return videogames;
    }
    else {
        var videogame = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        videogame.forEach((game, i) => {
            if(i < 15){
                videogames.push({
                    id: game.id,
                    name: game.name,

                    rating: game.rating,
                    metacritic: game.metracritic, //puntaje del juego
                    released: game.released, //cuando fue lanzado
                    image: game.background_image,

                    platforms: game.platforms?.map(platform => platform),
                    genres: game.genres?.map(genre => genre),
                    tags: game.tags?.map(tag => tag)
                });
            } 
        });
    }
    return videogames;
}

module.exports = obtainVideogameByName;