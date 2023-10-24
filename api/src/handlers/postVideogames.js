const { Videogame, Genres } = require('../db');
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
    try{
        const {
            name, description, platforms, image, launchDate, rating, genresName, tags, metacritic 
        } = req.body;

        if(
            !name || !description || 
            !platforms.length || !image || 
            !launchDate || !rating || 
            !genresName.length || !tags.length ||
            !metacritic
        ){
            return res.status(404).send('Default info');
        }

        const videogame = await Videogame.create({
            name: name,
            description: description,
            rating: rating,
            metacritic: metacritic,
            launch_date: launchDate,
            image: image,
            platforms: platforms,
            tags: tags,
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