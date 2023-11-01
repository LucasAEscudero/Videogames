const { Videogame, Genres } = require('../../db');
const { Op } = require("sequelize");

const postVideogame = async (name, description, platforms, image, released, rating, genresName) => {

    const videogame = await Videogame.create({
        name: name,
        description: description,
        rating: rating,
        released: released,
        image: image,
        platforms: platforms,
        genresName: genresName
    });

    const vidGenres = await searchGenderId(genresName);
    
    videogame.addGenres(vidGenres);
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