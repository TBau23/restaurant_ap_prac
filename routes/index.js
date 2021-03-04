const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const  { catchErrors } = require('../handlers/errorHandlers');

// Do work here
// are routes are isolated from the models that actually do work with db
// store controller file dictates what gets rendered and sent at these endpoints
router.get('/', catchErrors(storeController.getStores)); 
router.get('/stores', catchErrors(storeController.getStores)); 
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore))
router.post('/add/:id', catchErrors(storeController.updateStore))
router.get('/stores/:id/edit', catchErrors(storeController.editStore))


module.exports = router;
