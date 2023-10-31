const { Videogame, Genres } = require('../db');
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
    try{
        const {
            name, description, platforms, image, released, rating, genresName
        } = req.body;

        if(
            !name || !description || 
            !released || !rating || !image || 
            !platforms.length || 
            !genresName.length
        ){
            return res.status(404).send('Default info');
        }

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

        return res.status(200).send('Data loaded');
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
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

module.exports = postVideogames;