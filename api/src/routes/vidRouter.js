//express
const { Router } = require('express');
const videogamesRouter = Router();

//get
const getVideogames = require('../handlers/get/getVid');
const getVideogamesByName = require('../handlers/get/getVidByName');
const getVidDetails = require('../handlers/get/getVidDetails');

//post
const postVid = require('../handlers/post/postVid');

//routes - get
// videogamesRouter.get('/', (req, res) => {
//     const { name } = req.query;

//     // if(name) return getVideogamesBy(name, res); //get by name

//     return getVideogames(req, res); //get common
// });

videogamesRouter.get('/', getVideogames);

videogamesRouter.get('/name', getVideogamesByName);

videogamesRouter.get('/:id', getVidDetails);

//routes - post
videogamesRouter.post('/', postVid);

module.exports = videogamesRouter;