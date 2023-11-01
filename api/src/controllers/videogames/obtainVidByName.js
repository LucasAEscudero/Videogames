const axios = require('axios');
const { Videogame } = require('../../db');
const { Op } = require('sequelize');

const obtainVideogameByName = async (name) => {
    let videogames = [];
    let apiVideogames = [];

    //all videogames by name
    // let bdVideogame = await Videogame.findAll({
    //     where: {
    //         name: {
    //             [Op.iLike]: `%${name}%`
    //         }
    //     }
    // });

    // bdVideogame.forEach(game => {
    //     videogames.push({
    //         id: game.id,
    //         name: game.name,

    //         rating: game.rating,
    //         released: game.released,
    //         image: game.image,

    //         platforms: game.platforms?.map(platform => platform),
    //         genres: game.genresName?.map(genre => genre),
    //         origin: game.origin
    //     });      
    // });

    // if(!maxPage) return videogames;

    // for(let i = 0; i < maxPage; i++){
    //     apiVideogames = await obtainApiVideogamesByName(name, i + 1)
        
    //     apiVideogames.forEach(game => {
    //         videogames.push({
    //             id: game.id,
    //             name: game.name,

    //             rating: game.rating,
    //             released: game.released, //cuando fue lanzado
    //             image: game.background_image,

    //             platforms: game.platforms?.map(platform => platform.platform?.name),
    //             genres: game.genres?.map(gender => gender.name),
    //             tags: game.tags?.map(tag => {
    //                 if(tag.language === 'eng') return tag.name;
    //             }),
    //             origin: 'API'
    //         });
    //     });
    // }

    //get only 15 videogames
    let bdVideogame = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

    bdVideogame.forEach(game => {
        if(videogames.length < 15){
            videogames.push({
                id: game.id,
                name: game.name,
    
                rating: game.rating,
                released: game.released,
                image: game.image,
    
                platforms: game.platforms?.map(platform => platform),
                genres: game.genresName?.map(genre => genre),
                origin: game.origin
            });      
        }

        if(videogames.length === 15) return videogames;
    });

    apiVideogames = await obtainApiVideogamesByName(name, 1)
    
    apiVideogames.forEach(game => {
        if(videogames.length < 15){
            videogames.push({
                id: game.id,
                name: game.name,
    
                rating: game.rating,
                released: game.released, //cuando fue lanzado
                image: game.background_image,
    
                platforms: game.platforms?.map(platform => platform.platform?.name),
                genres: game.genres?.map(gender => gender.name),
                tags: game.tags?.map(tag => {
                    if(tag.language === 'eng') return tag.name;
                }),
                origin: 'API'
            });
        }

        if(videogames.length === 15) return videogames;
    });

    //filter null tags
    videogames.forEach((videogame, i) => {
        videogames[i].tags = videogame.tags?.filter(tag => tag != null);
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