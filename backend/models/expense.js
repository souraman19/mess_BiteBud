const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const expenseschema = new mongoose.Schema({
    _id: String,
    itemName: String,
    expenseArray:[
        {
            _id: String,
            quantity: Number,
            itemUnit: String,
            costPerPiece: Number, 
            totalCost: Number,
            date: String,
            year: Number,
            month: Number,
            monthDay: Number,
            time: String,
        },
    ],
});

const Expense = mongoose.model('Expense', expenseschema);

module.exports = Expense;