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
    const store = await (new Store(req.body)).save();
     // saves data to mongoDB - doesnt happen immediately
    // await means we wont move on to next line until the save has executed
    req.flash('success', `Sucessfully Created ${store.name}`) // access to flash middleware is init in app.js
    res.redirect(`/store/${store.slug}`)
};
// middleware is what happens between req and res

exports.getStores = async (req, res) => {
    const stores = await Store.find(); // returns promise
    
    res.render('stores', {title : 'Stores', stores: stores})
}

exports.editStore = async (req, res) => {
    // Find store given ID
    const store = await Store.findOne({_id: req.params.id})
    // Confirm they are the owner of the store
    //TODO
    // 3. Render out the edit form
    res.render('editStore', {title: `Edit ${store.name}`, store: store})
}

exports.updateStore = async (req, res) => {
    // find and update the store
    const store = await Store.findOneAndUpdate({ _id:req.params.id },
         req.body,
          { 
            new: true, // the default is to return old store - changing that
            runValidators: true // want to make sure you cant remove store name or similar action
        }).exec();
    req.flash('success', `Successfully updated ${store.name}.
    <a href="/stores/${store.slug}">View Store </a>`)
    res.redirect(`/stores`)
    // redirect to store with success message
}