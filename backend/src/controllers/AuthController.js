import {User} from "./../models2.0/person/User.js";
import OTPService from "./../services/otpService.js";
import {Student, ChiefWarden, Caretaker, Accountant, Warden, StoreKeeper, MessInCharge} from "./../models2.0/person/User.js";

const loginUser = async (req, res) => {
    console.log("Hello");
}

//for sending otp
const otpSendingService = async(req, res) => {
    const { collegeMail } = req.body;
    try {
        const otp = OTPService.generateOTP();
        await OTPService.sendOTP(collegeMail, otp);
        req.session.userInfo = req.body;
        req.session.otp = otp;
        req.session.otpExpirationTime = Date.now() + 5 * 60 * 1000; //valid for 5 minutes
        console.log("msdbhs >>>", req.session);
        await req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Error setting session');
            }
            console.log('Session set');
        });
        console.log("OTP sent successfully");
        return res.status(200).json({redirect:"/otpverification"});
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}


  


//for verifyotp 
const verifyOtp = async(req, res, next) => {
    const { otp } = req.body;
    // console.log(req);
    console.log(otp, "sd",req.session);
    try {
      if(otp === req.session.otp){
        console.log("matched");
        return res.status(200).json({message: "OTP matched"});
        next();
      } else {
        console.log("try again");
        return res.status(500).json({message: "OTP doesnt match"});
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const registerUser = async(req, res) => {
    console.log(req.body);
    try{
        let newPerson;
        const commonData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            permanentAddress: req.body.permanentAddress,
            nationality: req.body.nationality,
            hostel: req.body.hostel,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            collegeMail: req.body.collegeMail,
            extraMail: req.body.extraMail,
            bloodGroup: req.body.bloodGroup,
        }

        const commonData2 = {
            joiningDate: req.body.joiningDate,
            leavingDate: req.body.leavingDate,
            workingSlot: {},
            previousWorkingHistory: req.body.previousWorkingHistory,
            currentAddress: req.body.currentAddress,
        }

        console.log("check 2");
        if(req.body.position === "Student"){
            newPerson = new Student({
                ...commonData, 
                username: req.body.username,
                course: req.body.course,
                branch: req.body.branch,
                yearOfJoiningInstitue: req.body.yearOfJoining,
                year: req.body.year,
                regNo: req.body.regNo,
                emergencyContactNo: req.body.emergencyContact,
                parentInfo: req.body.parent,
                localGuardian: req.body.localGuardian,
                roomNo: req.body.roomNo,
                railWayStationNearestToPermanantAddress: req.body.nearestRailwayStation,
                disciplinaryActionsTakenAgainst: req.body.disciplinaryActionsTakenAgainst,
                catagory: req.body.category,
                bankAccountDetails: req.body.bankDetails,
                specialPosition:req.body.specialPosition,
                allHostelHistory: req.body.hostelHistory,
                allVacationHistory: req.body.allVacationHistory,
                allMessHistory: req.body.messHistory,
            })
        } else if(req.body.position === "Warden"){
            newPerson = new Warden({
                ...commonData,
                ...commonData2
            })
        } else if(req.body.position === "ChiefWarden"){
            newPerson = new ChiefWarden({
                ...commonData,
                ...commonData2
            })
        } else if(req.body.position === "Accountant"){
            newPerson = new Accountant({
                ...commonData,
                ...commonData2
            })
        } else if(req.body.position === "Caretaker"){
            newPerson = new Caretaker({
                ...commonData,
                ...commonData2
            })
        } else if(req.body.position === "StoreKeeper"){
            newPerson = new StoreKeeper({
                ...commonData,
                ...commonData2
            })
        } else if(req.body.position === "MessInCharge"){
            newPerson = new MessInCharge({
                ...commonData,
                ...commonData2
            })
        } else {
            return res.status(400).json({message: "Invalid Position"});
        }
        // console.log(newPerson);
        console.log("ksd", req.body)
        await newPerson.save();
        return res.status(200).json({ message: "Done", user: newPerson });
    }catch(err){
        console.log(err);
    }

    return res.status(200).json({message: "Done"});
}

export {loginUser, registerUser, otpSendingService, verifyOtp};