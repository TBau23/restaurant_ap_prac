const mongoose = require('mongoose');
const Store = mongoose.model("Store"); // look at bottom of store.js to understand where this comes from 



exports.homePage = (req, res) => {
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add store' }) // same template for editing and adding store
}


// to error handle were going to wrap this function in an error handler
// rather than use try catch
exports.createStore = async (req, res) => {
    // typical way to catch error with async await is try and catch
    const store = new Store(req.body);
    await store.save(); // saves data to mongoDB - doesnt happen immediately
    // await means we wont move on to next line until the save has executed
    res.redirect('/')
};
// middleware is what happens between req and res