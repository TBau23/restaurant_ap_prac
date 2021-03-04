const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // setting the mongoose Promise property to be equivalent to the native Promise object (ES6 promises)
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // do data normalization as close to the model as possible
        required: 'Please enter a store name!',
    },
    slug: String, // auto generated
    description: {
        type: String,
        trim: true,
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if(!this.isModified('name')) { // isModified() comes from mongoose, returns a boolean
        next(); //skip it
        return;
    }
    this.slug = slug(this.name) // set slug property to be equal to whatever the output of the slug is 
    // cant use arrow functions with this keyword, hence the function declaration
    next();
    // TODO: make slugs more resilient so that they are unique 

});

module.exports = mongoose.model('Store', storeSchema)

