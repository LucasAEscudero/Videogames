const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./vidRouter');
const genresRouter = require('./genresRouter');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//videogame route
mainRouter.use('/videogames', videogamesRouter);

//genres route
mainRouter.use('/genres', genresRouter);



module.exports = mainRouter;
