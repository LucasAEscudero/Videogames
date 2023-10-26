const axios = require('axios');
const { Videogame } = require('../../db');
 
const obtainVideogames = async (maxPage) => {
    let videogames = [];
    let auxAPIVideogames = [];

    const auxDBVideogames = await Videogame.findAll();

    auxDBVideogames.forEach(game => {
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
        })
    });

    if(!maxPage) return videogames;

    for(let i = 0; i < maxPage; i++){
       auxAPIVideogames = await obtainApiVideogames(i + 1); //fn que llama a cada pag de la api

       auxAPIVideogames.forEach(videogame => {
            videogames.push({
                id: videogame.id,
                name: videogame.name,

                rating: videogame.rating,
                metacritic: videogame.metracritic, //puntaje del juego
                released: videogame.released, //cuando fue lanzado
                image: videogame.background_image,

                platforms: videogame.platforms?.map(platform => {
                    return platform.platform?.name;
                }),
                genres: videogame.genres?.map(gender => {
                    return gender.name;
                }),
                tags: videogame.tags?.map(tag => {
                    if(tag.language === 'eng') return tag.name;
                })
            });
        });
    }

    // videogames.forEach(game => {
    //     console.log(game)
    //     game.tags = [...game.tags].filter(tag => {
    //         return tag != null;
    //     });
    // });
    
    return videogames;
}

const obtainApiVideogames = async (page) => {
    const { data } = await axios(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`
    );
    
    return data.results;
}

module.exports = obtainVideogames;