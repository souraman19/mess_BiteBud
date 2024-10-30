import mongoose from "mongoose";
import GroceryItem from "./GroceryItem.js";

const singleExpenseSchema = new mongoose.Schema({
    buyAmount:{
        type: Number,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    buyDate:{
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
    },
    billImage: {  
        type: String,
        required: false,  // Optional, as not all expenses may have a bill image
    },
}, {timestamps: true})


//rice from A and B vendor treated as diff product here
const monthlyExpenseItemBucketSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GroceryItem',
    },
    monthYear:{
        type: String, //// Format should be YYYY-MM
        required: true,
        validate:{
            validator: function(v){
                return /^\d{4}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not in proper fromat, please use this YYYY-MM`
        },
    },
    vendor:{
        type: String,
        required: true,
    },
    expenses:{
        type:[singleExpenseSchema],
        default:[],
    },
    totalExpense:{
        type: Number,
        default: 0.0,
    },
    totalBuyAmount:{
        type: Number,
        default: 0.0,
    },

}, {timestamps: true})

const MonthlyExpenseItemBucket = new mongoose.model('MonthlyExpenseItemBucket', monthlyExpenseItemBucketSchema);
export default MonthlyExpenseItemBucket;