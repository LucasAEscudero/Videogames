const axios = require('axios');

const obtainVideogamesByName = async (name) => {
    // let i = 0; si tenemos que poner los de la DB como ultimos
    const videogames = [];
    const { data } = await axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`);
    
    data.results.forEach((game, i) => {
        if(i < 15){
            videogames.push({
                id: game.id,
                name: game.name,
                platforms: game.platforms?.map(platform => {
                    return platform.platform?.name;
                }),
                genres: game.genres?.map(gender => {
                    return gender.name;
                }),
                tags: game.tags?.map(tag => {
                    if(tag.language === 'eng') return tag;
                }),
                metacritic: game.metracritic, //puntaje del juego
                image: game.background_image,
                released: game.released //cuando fue lanzado
            });

            // i++;
        } 
    });

    videogames.forEach(game => {
        game.tags = game.tags.filter(tag => {
            return tag;
        });
    });

    return videogames;
}

module.exports = obtainVideogamesByName;