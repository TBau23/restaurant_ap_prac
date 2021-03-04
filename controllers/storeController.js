const mongoose = require('mongoose');
const Store = mongoose.model("Store"); // look at bottom of store.js to understand where this comes from 

exports.homePage = (req, res) => {
    res.render('index')
}

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add store' }) // same template for editing and adding store
}

exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save(); // this is asynchronous
    // await means we wont move on to next line until line 14 has saved
    console.log('successful save');
};
// middleware is what happens between req and res