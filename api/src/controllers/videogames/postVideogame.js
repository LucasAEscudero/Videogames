const { Videogame, Genres } = require('../../db');
const { Op } = require("sequelize");

const postVideogame = async (name, description, platforms, image, released, rating, genresName, tags) => {

    const [videogame, created] = await Videogame.findOrCreate({
        where: {
            name: name
        },
        defaults: {
            description: description,
            rating: rating,
            released: released,
            image: image,
            platforms: platforms,
            genresName: genresName,
            tags: tags
        }
    })

    if(!created) return true;

    const vidGenres = await searchGenderId(genresName); //array
    
    videogame.addGenres(vidGenres);

    return false;

    // const videogame = await Videogame.create({
    //     name: name,
    //     description: description,
    //     rating: rating,
    //     released: released,
    //     image: image,
    //     platforms: platforms,
    //     genresName: genresName
    // });

    // const vidGenres = await searchGenderId(genresName);
    
    // videogame.addGenres(vidGenres);
}

const searchGenderId = async (genres) => {
    const genresId = await Genres.findAll({ where: { 
            name: {
                [Op.or]: [...genres]
            }
        }, attributes: ['id']
    })

    return genresId;
} 

module.exports = postVideogame;