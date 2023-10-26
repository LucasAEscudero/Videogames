const axios = require('axios');
const { Videogame } = require('../../db');
const { Op } = require('sequelize');

const obtainVideogameByName = async (name, maxPage) => {
    let videogames = [];
    let apiVideogames = [];

    let videogame = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

    videogame.forEach(game => {
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
    });

    if(!maxPage) return videogames

    for(let i = 0; i < maxPage; i++){
        apiVideogames = await obtainApiVideogamesByName(name, i + 1)
        
        apiVideogames.forEach(game => {
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
                    if(tag.language === 'eng') return tag.name;
                })
                // description: game.description no existe
            });
        });
    }

    videogames.forEach(game => {
        game.tags = game.tags.filter(tag => tag);
    });
    
    return videogames;
}

const obtainApiVideogamesByName = async (name, page) => {
    const { data } = await axios(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}&page=${page}`
    );
    
    return data.results;
}

module.exports = obtainVideogameByName;