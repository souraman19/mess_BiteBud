const mongoose = require("mongoose");

const messMenuSchema = new mongoose.Schema({
    _id:{type: String},
    day:{type: String},
    allFoodItems:{type: Array}, 
});

const Messmenu = mongoose.model('Messmenu', messMenuSchema);

module.exports = Messmenu;