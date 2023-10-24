const { Router } = require('express');
const genresRouter = Router();

const genresBDLoad = require('../handlers/getGenres');

//routes
genresRouter.get('/', genresBDLoad);

module.exports = genresRouter;