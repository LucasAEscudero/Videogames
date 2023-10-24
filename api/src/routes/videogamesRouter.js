//express
const { Router } = require('express');
const videogamesRouter = Router();

//get
const { getVideogames } = require('../handlers/getVideogames');
const { getVideogameByName } = require('../handlers/getVideogames');
const { getVideogameDetails } = require('../handlers/getVideogames');

//post
const postVideogame = require('../handlers/postVideogames');

videogamesRouter.get('/', getVideogames);

videogamesRouter.get('/name', getVideogameByName);

videogamesRouter.get('/:id', getVideogameDetails);

//routes - post
videogamesRouter.post('/', postVideogame);

module.exports = videogamesRouter;