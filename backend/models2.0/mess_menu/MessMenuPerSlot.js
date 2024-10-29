import mongoose from "mongoose";
import MenuItem from "./../mess_menu/MenuItem.js";

const messMenuPerSlotSchema = new mongoose.Schema({
    menuId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
        required: true,
    },
    slot:{
        type: String,
        enum: ["Breakfast", "Lunch", "Snacks", "Dinner"],
        required: true,
    },
    menuItems:{
        type:[{
            title: {type: String, required: true},
            menuItemId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'MenuItem'}
        }],
        default: []
    }
}, {timestamps: true})

const MessMenuPerSlot = new mongoose.model('MessMenuPerSlot', messMenuPerSlotSchema);
export default MessMenuPerSlot;