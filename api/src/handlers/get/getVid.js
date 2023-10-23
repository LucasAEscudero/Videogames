const obtainVideogames = require('../../controllers/videogames/obtainVid');

const getVideogames = async (req, res) => {
    try{
        const data = await obtainVideogames();

        return res.status(200).json(data.results);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }

    
}

module.exports = getVideogames;