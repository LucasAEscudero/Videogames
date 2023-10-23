const obtVidDetails = require('../../controllers/videogames/obtainVidDet');

const getVidDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await obtVidDetails(id);

        return res.status(200).json(data);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getVidDetails;