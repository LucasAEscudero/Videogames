const obtainVideogamesByName = require('../../controllers/videogames/obtainVidByName');

const getVideogameByName = async (req, res) => {
    // res.status(200).send('okay')
    try{
        const { name } = req.query;

        const videogames = await obtainVideogamesBy(name);
        
        if(!videogames.length) return  res.status(200).send('The desired game does not exist');

        return res.status(200).json(videogames);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getVideogameByName;