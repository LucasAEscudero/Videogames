const postVideogame = require('../controllers/videogames/postVideogame');

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

        const created = await postVideogame(name, description, platforms, image, released, rating, genresName);

        if(created) return res.status(200).send('This game already exists (the name has already been used)');

        return res.status(200).send('The game has been created');
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postVideogames;