import mongoose from "mongoose";
import {User, Student, ChiefWarden, Caretaker, Accountant, Warden, StoreKeeper} from "../person/User.js";

const hostelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ESTD: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    maxStudentCapacity: {
        type: Number,
        required: true
    },
    currentStudentCount:{
        type: Number,
        default: 0
    },
    picture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAIK8vMtGcFg41fpEHnQ1ndzth2JpjTM4z9iYpvFfbZ4F-NAb6SkNludIrfR3B1a65I8&usqp=CAU",
    },
    warden:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warden'
        }
    },
    caretaker:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Caretaker'
        }
    },
    accountant:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Accountant'
        }
    },
    storekeeper: {
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Storekeeper'
        }
    },
    messManager:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    },
    messSecretary:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    },
    messCommitteeGeneralMembers:{
        name:{type: String},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    }
})

const Hostel = new mongoose.model('Hostel', hostelSchema);
export default Hostel;