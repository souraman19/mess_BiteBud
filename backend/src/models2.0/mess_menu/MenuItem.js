import mongoose from "mongoose";
import {MessWorker, Cook} from "../person/MessWorker";

const menuItemSchema = new mongoose.Schema({
    menuItemId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true ,//no to menu Items can have same name
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
    cookedBy: {
        type:[{
            cookName: {type: String, required: true},
            cookId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Cook'
            }
        }],
        default:[]
    },
    averageRating:{  //update it as you need
        type: Number,
        default: 0
    }

}, { timestamps: true })

const MenuItem = new mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;