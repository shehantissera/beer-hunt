'use strict'

import express from 'express'
import beerController from '../controllers/beer.controller.js'

const router = express.Router()

router.get('/search', beerController.searchBeerByName)
router.post('/rate/:id', beerController.rateBeer)
router.get('/ratings/:id', beerController.getRatingsForBeer)

export default router
