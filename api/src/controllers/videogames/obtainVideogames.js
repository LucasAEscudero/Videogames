const axios = require('axios');

const obtainVideogames = async (page) => {
    const results = await axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`);
    const videogames = [];

    results.data.results.forEach(videogame => {
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
    
    return videogames;
}

module.exports = obtainVideogames;