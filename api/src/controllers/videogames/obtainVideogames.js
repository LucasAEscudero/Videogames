const axios = require('axios');
const { Videogame } = require('../../db');
 
const obtainVideogames = async (maxPage) => {
    let videogames = [];
    let apiVideogames = [];

    const dbVideogames = await Videogame.findAll();

    dbVideogames.forEach(game => {
        videogames.push({
            id: game.id,
            name: game.name,

            rating: game.rating,
            released: game.released,
            image: game.image,

            platforms: game.platforms?.map(platform => platform),
            genres: game.genresName?.map(genre => genre),
            tags: game.tags?.map(tag => tag),
            origin: game.origin
        })
    });

    if(!maxPage) return videogames;

    for(let i = 0; i < maxPage; i++){
       apiVideogames = await obtainApiVideogames(i + 1); //fn que llama a cada pag de la api

       apiVideogames.forEach(game => {
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
        });
    }
    
    return videogames;
}

const obtainApiVideogames = async (page) => {
    const { data } = await axios(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`
    );
    
    return data.results;
}

module.exports = obtainVideogames;