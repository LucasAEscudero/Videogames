const obtainPlatforms = require('../controllers/platforms/obtainPlatforms');

const getPlatforms = async (req, res) => {
    try{
        const platforms = await obtainPlatforms();
        
        res.status(200).json(platforms);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = getPlatforms;