const mongoose = require('mongoose'); // allows us to interface with mongoDB
mongoose.Promise = global.Promise; // setting the mongoose Promise property to be equivalent to the native Promise object (ES6 promises)
const slug = require('slugs');


// this schema aligns with the fields being created on the _storeForm.pug file
// by default we our using strict schema - only picks up fields that have been defined

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // do data normalization as close to the model as possible - this takes out whitespace
        required: 'Please enter a store name!', // acts like passing true and gives presentable error message
    },
    slug: String, // auto generated
    description: {
        type: String,
        trim: true,
    },
    tags: [String], // lines up with name on each chechbox
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        // storing data as a point - lat and long
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [{
            type: Number,
            required: "You must give coordinates"
        }],
        address: {
            type: String,
            required: "You must supply an address!"
        }
    }
});

storeSchema.pre('save', function(next) {
    if(!this.isModified('name')) { // isModified() comes from mongoose, returns a boolean
        next(); //skip it
        return;
    }
    this.slug = slug(this.name) // set slug property to be equal to whatever the output of the slug is 
    // cant use arrow functions with 'this' keyword, hence the function declaration
    next();
    // TODO: make slugs more resilient so that they are unique 
    // the slug is like the url specification - e.g. dangThatsDelish.com/storeName
    // when you make a new store we want to generate a slug that will link to that store automatically

});

module.exports = mongoose.model('Store', storeSchema)

