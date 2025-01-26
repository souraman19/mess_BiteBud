import mongoose from "mongoose";
import workingSlotSchema from "../others/WorkingSlot.js";

const messWorkerSchema = new mongoose.Schema({
    workerId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    firstName: {type: String, required: true},
    lastName: {type: String},
    phone: {
        countryCode: {type: String, required: true, match: /^\+\d{1,3}$/},
        phoneNo: {type: String, required: true, match: /^\d{10}$/}
    },
    permanentAddress: {
        country: {type: String, required: true},
        state: {type: String, required: true},
        pin: {type: Number, required: true},
        nearestCity: {type: String, required: true},
        streetAddress: {type: String},
    },
    currentAddress: {
        country: {type: String, required: true},
        state: {type: String, required: true},
        pin: {type: Number, required: true},
        nearestCity: {type: String, required: true},
        streetAddress: {type: String},
    },
    nationality:{
        type: String,
        required: true
    },
    hostel: {
        type: String, ref: 'Hostel'
    },
    profilePicture:{
        type: String, default: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
    },
    gender: {
        type: String, enum: ["Male", "Female", "Non-binary", "Other", "Prefer not to say"], required: true
    },
    dateOfBirth: {
        type: Date, required: true
    },
    bloodGroup:{
        type: String, 
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "N/A", "others"]
    },
    email: {
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    salary: {
        type: Number,
        default: 0,
    },
    joiningDate:{
        type: Date,
        required: true,
    },
    leavingDate:{
        type: Date,
    },
    previousWorkingHistory:{
        type:[{
            description: String,
            startDate: Date,
            endDate: Date
        }],
        default:[],
    },
    workingSlots: {
        monday: {type: [workingSlotSchema], default: []},
        tuesday: {type: [workingSlotSchema], default: []},
        wednesday: {type: [workingSlotSchema], default: []},
        thursday: {type: [workingSlotSchema], default: []},
        friday: {type: [workingSlotSchema], default: []},
        saturday: {type: [workingSlotSchema], default: []}, 
        sunday: {type: [workingSlotSchema], default: []},
    },
    workDetails: {
        type: String,
        required: true,
    },
    activeStatus:{
        type: Boolean,
        default: true,
    },
    allVacationHistory:{
        type:[{
            hostel: {type: String, required: true},
            startDate: {type: Date, required: true},
            endDate: {type: Date, required: true},
        }],
        default:[]
    }
});

const MessWorker = new mongoose.model('Messworker', messWorkerSchema);
const CookSchema = new mongoose.Schema({
    startDateAsCook: {type: Date},
    activeStatusAsCook: {type: Boolean, required: true},
    cookPosition: {
        type: String,
        enum: ["General", "HeadCook"]
    }
})
const Cook = MessWorker.discriminator('Cook', CookSchema);
export {MessWorker, Cook};