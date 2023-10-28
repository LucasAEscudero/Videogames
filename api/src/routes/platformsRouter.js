const { Router } = require('express');
const platformsRouter = Router();

const getPlatforms = require('../handlers/getPlatforms');

//routes
platformsRouter.get('/', getPlatforms);

module.exports = platformsRouter;