const obtainVideogames = require('../controllers/videogames/obtainVideogames');
const obtainVideogameByName = require('../controllers/videogames/obtainVidByName');
const obtainVideogameDetails = require('../controllers/videogames/obtainVidDet');

const getVideogames = async (req, res) => {
    const { maxPage } = req.query

    try{
        const videogames = await obtainVideogames(maxPage);

        return res.status(200).json(videogames);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const getVideogameByName = async (req, res) => {
    try{
        const { name, maxPage } = req.query;

        const videogames = await obtainVideogameByName(name, maxPage);
        
        if(!videogames.length) return  res.status(200).send('The desired game does not exist');

        return res.status(200).json(videogames);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const getVideogameDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await obtainVideogameDetails(id);

        return res.status(200).json(data); //this return a object, done
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getVideogames,
    getVideogameByName,
    getVideogameDetails
};