const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
// router.get('/', storeController.homePage);
router.get('/', (req, res) => {
    // const wes = {name: 'Wes', age: 100, cool: true}
    // res.send(req.query)
    res.render('hello', {name : req.query.name})
});
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore)


module.exports = router;
