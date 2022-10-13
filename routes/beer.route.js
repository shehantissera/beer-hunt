'use strict'

const express = require('express');
const beerController = require('../controllers/beer.controller');
const router = express.Router();

router.get('/search', beerController.searchBeerByName);
router.post('/rate', beerController.rateBeer);

module.exports = router;