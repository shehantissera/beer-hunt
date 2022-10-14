'use strict'

const express = require('express');
const beerController = require('../controllers/beer.controller');
const router = express.Router();

router.get('/search', beerController.searchBeerByName);
router.post('/rate/:id', beerController.rateBeer);

module.exports = router;