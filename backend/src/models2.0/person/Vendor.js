import mongoose, { trusted } from "mongoose";
import Item from "../Expense/GroceryItem.js";

const vendorSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    name: {
        type: String, required: true,
    },
    phone: {
        countryCode: {type: String, required: true, match: /^\+\d{1,3}$/},
        phoneNo: {type: String, required: true, match: /^\d{10}$/}
    },
    hostel: {
        type: String, 
        required: true
    },  
    address: {
        country: {type: String, required: true},
        state: {type: String, required: true},
        pin: {type: Number, require: true},
        nearestCity: {type: String, required: true},
        streetAddress: {type: String}
    },
    averageRating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    vendorImage: {
        type: String, 
        default: "https://png.pngtree.com/png-vector/20191128/ourmid/pngtree-market-stall-with-red-and-white-awning-icon-circle-png-image_2044273.jpg"
    },
    buyCount: {
        type: Number,
        default: 0,
        min: 0,
        max: 0,
    },
})

const Vendor = new mongoose.model('Vendor', vendorSchema);

export default Vendor;