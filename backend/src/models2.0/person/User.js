import mongoose from "mongoose";
import workingSlotSchema from "../others/WorkingSlot.js";
import Hostel from "../hostel/Hostel.js";

const options = {discriminatorKey: 'userType'};

const userSchema = new mongoose.Schema({
    userId:{
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
        pin: {type: Number, require: true},
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
    collegeMail:{
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    extraMail: {
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    bloodGroup:{
        type: String, 
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "N/A", "Other"]
    },
}, options)

const User = mongoose.model('User', userSchema);

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    course:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true
    },
    yearOfJoiningInstitue: {
        type: Number,
        required: true,
    },
    roomNo: {type: Number, default: -1},
    emergencyContactNo: {
        countryCode: {type: String, required: true, match: /^\+\d{1,3}$/},
        phoneNo: {type: String, required: true, match: /^\d{10}$/}
    },
    parentInfo:{
        name: {required: true, type: String},
        address: {type: String}
    },
    localGuardian:{
        name:{type: String},
        phone: {
            countryCode: {type: String, required: true, match: /^\+\d{1,3}$/},
            phoneNo: {type: String, required: true, match: /^\d{10}$/}
        },  
        address: {
            type: String
        }
    },
    railWayStationNearestToPermanantAddress:{
        type: String,
    },
    catagory: {
        type: String,
        required: true,
    },
    //displinary action
    disciplinaryActionsTakenAgainst:{
        type:[{
            description:{type: String, required: true},
            date: {type: Date, required: true},
            authority: {type: String},
            punishment:{type: String},
            fine:{type: String},
            year:{type: String}
        }],
        default:[]
    },
    bankAccountDetails:{
        type:{
            accountNo: {type: String, required: true},
            IFSC: {type: String, required: true},
            bankName:{type: String, required: true}
        },
        required: true,
    },
    allHostelHistory:{
        type:[{
            hostel: {type: String, required: true},
            roomNo: {type: Number, required: true},
            hostelJoiningDate: {type: Date, required: true},
            hostelLeavingDate: {type: Date, required: true},
        }],
        default:[]
    },
    allVacationHistory:{
        type:[{
            hostel: {type: String, required: true},
            startDate: {type: Date, required: true},
            endDate: {type: Date, required: true},
        }],
        default:[]
    },
    allMessHistory:{
        type:[{
            hostelMess: {type: String, required: true},
            startDate:{type: Date, required: true},
            endDate: {type: Date, required: true},
        }],
        default:[]
    },
    specialPosition:{
        type: String,
        required: true,
        enum:["Mess Manager", "Mess Secretary", "Mess Committee General Member", "N/A", "Other"]
    }
})

const commonSchema  = {
    joiningDate:{
        type: Date,
        required: true,
    },
    leavingDate:{
        type: Date,
    },
    currentAddress: {
        type: String,
        required: true
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
    previousWorkingHistory:{
        type:[{
            description: String,
            startDate: Date,
            endDate: Date
        }],
        default:[],
    }
}

const wardenSchema = new mongoose.Schema(commonSchema)
const chiefWardenSchema = new mongoose.Schema(commonSchema)
const accountantSchema = new mongoose.Schema(commonSchema)
const storeKeeperSchema = new mongoose.Schema(commonSchema)
const caretakerSchema = new mongoose.Schema(commonSchema)
const messInCharge = new mongoose.Schema(commonSchema)

//pre save middlewire for inc student count
studentSchema.pre('save', async function(next){
    if(this.isNew){ //if a new student
        try{
            await Hostel.findOneAndUpdate(
                {name: this.hostel}, 
                { $inc: {currentStudentCount: 1} }
            )
            next();
        }catch(err){
            return next(err);
        }
    }
})


//pre remove middlewire for dec student count
studentSchema.pre('remove', async function(next){
    try{
        await Hostel.findOneAndUpdate(
            {name: this.hostel},
            {$inc: {currentStudentCount: -1}}
        )
        next();
    }catch(err){
        return next(err);
    }
})



const Student = User.discriminator('Student', studentSchema);
const Warden = User.discriminator('Warden', wardenSchema);
const ChiefWarden = User.discriminator('ChiefWarden', chiefWardenSchema);
const Caretaker = User.discriminator('Caretaker', caretakerSchema);
const Accountant = User.discriminator('Accountant', accountantSchema);
const StoreKeeper = User.discriminator('StoreKeeper', storeKeeperSchema);
const MessInCharge = User.discriminator('MessInCharge', storeKeeperSchema);

export {User, Student, ChiefWarden, Caretaker, Accountant, Warden, StoreKeeper, MessInCharge}; //named export
//you have to import like import {User} from ""