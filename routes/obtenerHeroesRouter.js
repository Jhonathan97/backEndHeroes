const express = require('express');
const bodyParser = require('body-parser');
const obtenerHeroesController = require('../controllers/obtenerHeroesController');
const cors = require('./cors');

const obtenerHeroesRouter = express.Router();

obtenerHeroesRouter.use(bodyParser.json());

obtenerHeroesRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, obtenerHeroesController.getHeroes);


module.exports = obtenerHeroesRouter;