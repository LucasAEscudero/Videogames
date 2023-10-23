const { Videogame, Genres } = require('../../db');

const postVid = async (req, res) => {
    try{
        const { name, description, plataforms, image, launchDate, rating, genres } = req.body;

        if(!name || !description || !plataforms.length || !image || !launchDate || !rating || !genres ){
            return res.status(404).send('Default info');
        }

        const videogame = await Videogame.create({
            name: name,
            description: description,
            plataforms: plataforms,
            image: image,
            launch_date: launchDate,
            rating: rating,
        });

        //association

        // genres.forEach(gender => {
        //     let data = Genres.findOne({ where: { name: gender }});
        //     console.log(data)
        //     // console.log(videogame);
        //     // console.log(gender);
        //     data.addVideogame(videogame);
        // });

        return res.status(200).send('Data loaded');
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postVid;