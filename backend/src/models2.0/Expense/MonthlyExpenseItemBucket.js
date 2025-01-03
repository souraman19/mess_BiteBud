import mongoose from "mongoose";
import GroceryItem from "./GroceryItem.js";

const singleItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    itemName:{
        type: String,
        required: true,
        ref: 'GroceryItem',
    },
    itemQuantity:{
        type: {
            amount: {
                type: String,
                required: true,
            },
            itemUnit: {
                type: String,
                required: true,
            }
        },
        required: true,
    },
    totalItemCost:{
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
})

const singleBillSchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    allItems:{
        type: [singleItemSchema],
        required: true
    },
    billImage: {  
        type: String,
        required: false,  // Optional, as not all expenses may have a bill image
    },
}, {timestamps: true})


//rice from A and B vendor treated as diff product here
const monthlyExpenseItemBucketSchema = new mongoose.Schema({
    bucketId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    yearMonth:{
        type: String, //// Format should be YYYY-MM
        required: true,
        validate:{
            validator: function(v){
                return /^\d{4}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not in proper fromat, please use this YYYY-MM`
        },
    },
    hostel: {
        type: String,
        required: true,
    },
    vendorName:{  ///assuming vendor name wil be Unique
        type: String,
        required: true,
    },
    expenses:{
        type:[singleBillSchema],
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