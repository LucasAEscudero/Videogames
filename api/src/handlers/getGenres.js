const obtainGenres = require('../controllers/genres/obtainGenres');

const genresBDLoad = async (req, res) => {
    try{
        const genres = await obtainGenres(); //obtengo la info de la api

        return res.status(200).send(genres);
    }
    catch(error){
        return res.status(404).json({ error: error.message });
    }
}

module.exports = genresBDLoad;