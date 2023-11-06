const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//videogame route
mainRouter.use('/videogames', videogamesRouter);

//genres route
mainRouter.use('/genres', genresRouter);

//info platforms route
mainRouter.use('/platforms', platformsRouter);

module.exports = mainRouter;
