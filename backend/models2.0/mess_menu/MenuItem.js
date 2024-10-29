import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, 
        default: "https://cdn-icons-png.flaticon.com/512/5235/5235253.png",
    },
    calorie:{
        amount:{type: Number, required: true},
        unit:{type: String, required: true},
    },
    avgCookingTime:{
        amount:{type: Number, required: true},
        unit:{type: String, required: true},
    },

})

const MenuItem = new mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;