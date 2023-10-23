const obtainGenres = require('../../controllers/genres/obtainGenres');
const {Genres} = require('../../db');

const genresBDLoad = async (req, res) => {
    try{
        const data = await obtainGenres(); //obtengo la info de la api
        
        data.results.forEach(genres => Genres.create({ name: genres.name }));

        return res.status(200).send('Genres base data loaded');
    }
    catch(error){
        return res.status(404).json({ error: error.message });
    }
}

module.exports = genresBDLoad;