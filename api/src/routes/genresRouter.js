const { Router } = require('express');
const genresRouter = Router();

const genresBDLoad = require('../handlers/get/getGenres');

//routes
genresRouter.get('/', genresBDLoad);

module.exports = genresRouter;