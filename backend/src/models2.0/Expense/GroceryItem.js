import mongoose from "mongoose";
import Vendor from "../person/Vendor";

const itemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    billImage: {
        type: String,
        default: "https://cdn.prod.website-files.com/603cffd3503d7077716b1d65/6344665df2c24f15d7182ac5_groceries.png"
    },
    category:{
        type: String,
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Vendor'
    },
    buyCount:{ //how many times purchased it
        type: Number,
        default: 0
    },
    averageRating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

})

const GroceryItem = new mongoose.model('GroceryItem', itemSchema);

export default Item;