const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    _id: {type: String},
    name: {type: String},
    username: {type: String},
    regNo: {type: String},
    year: {type: String},
    img: {type: String},
    description: {type: String},
    time: {type: String},
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;