import {User, Student, ChiefWarden, Caretaker, Accountant, Warden, StoreKeeper, MessInCharge} from "./../models2.0/person/User.js";
import OTPService from "./../services/otpService.js";
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import {Strategy} from "passport-local";


//saltroud for brcypt
const saltRounds = 5;



//login using passport local
const loginUser = (req, res, next)=>{
    // console.log("sldsnls", req.body);
    passport.authenticate("local", (err, user, info)=>{
        if (err) {
            return res.status(500).json({ message: "An error occurred during authentication." });
        }
        if (!user) {
            // Authentication failed
            return res.status(401).json({ message: "Invalid email or password." });
        }
        //logIn user
        req.logIn(user, (loginErr) => {
            if(loginErr){
                return res.status(500).json({ message: "Login failed." });
            }
            const foundUser = user;
            foundUser.password = ""; //making the password(got from database) null before send the data to client side
            console.log("found User", foundUser);
            return res.status(200).json({ message: "Login successful", user: user});
        });
    })(req, res, next);
};



//login user manuallly
// const loginUser = async (req, res) => {
//   const password = req.body.password;
//   const email = req.body.email;
//     try{
//         const result = await User.findOne({collegeMail: email});
//         console.log("Found user data ",result);
//         const savedHashPassword = result.password;
//         bcrypt.compare(password, savedHashPassword, (err, data) => {
//             if(err){
//                 return res.status(400).json({message: "Error in comparing"});
//             } 
//             if(data){
//                 return res.status(200).json({message: "Login Success"});
//             } else {
//                 return res.status(401).json({message: "Wrong password"});
//             }
//         })
//     }catch(err){
//         console.error(err);
//     }
// };



//for sending otp
const otpSendingService = async (req, res) => {
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
        console.error("Session save error:", err);
        return res.status(500).send("Error setting session");
      }
      console.log("Session set");
    });
    console.log("OTP sent successfully");
    return res.status(200).json({ redirect: "/otpverification" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//for verifyotp
const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  // console.log(req);
  console.log(otp, "sd", req.session);
  try {
    if (otp === req.session.otp) {
      console.log("matched");
      return res.status(200).json({ message: "OTP matched" });
      next();
    } else {
      console.log("try again");
      return res.status(500).json({ message: "OTP doesnt match" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


//register new user
const registerUser = async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  try {
    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("Error in generating error ", err);
      } else {
        console.log("myhash", hash);
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
          password: hash,
        };

        const commonData2 = {
          joiningDate: req.body.joiningDate,
          leavingDate: req.body.leavingDate,
          workingSlot: {},
          previousWorkingHistory: req.body.previousWorkingHistory,
          currentAddress: req.body.currentAddress,
        };

        console.log("check 2");
        if (req.body.position === "Student") {
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
            railWayStationNearestToPermanantAddress:
              req.body.nearestRailwayStation,
            disciplinaryActionsTakenAgainst:
              req.body.disciplinaryActionsTakenAgainst,
            catagory: req.body.category,
            bankAccountDetails: req.body.bankDetails,
            specialPosition: req.body.specialPosition,
            allHostelHistory: req.body.hostelHistory,
            allVacationHistory: req.body.allVacationHistory,
            allMessHistory: req.body.messHistory,
          });
        } else if (req.body.position === "Warden") {
          newPerson = new Warden({
            ...commonData,
            ...commonData2,
          });
        } else if (req.body.position === "ChiefWarden") {
          newPerson = new ChiefWarden({
            ...commonData,
            ...commonData2,
          });
        } else if (req.body.position === "Accountant") {
          newPerson = new Accountant({
            ...commonData,
            ...commonData2,
          });
        } else if (req.body.position === "Caretaker") {
          newPerson = new Caretaker({
            ...commonData,
            ...commonData2,
          });
        } else if (req.body.position === "StoreKeeper") {
          newPerson = new StoreKeeper({
            ...commonData,
            ...commonData2,
          });
        } else if (req.body.position === "MessInCharge") {
          newPerson = new MessInCharge({
            ...commonData,
            ...commonData2,
          });
        } else {
          return res.status(400).json({ message: "Invalid Position" });
        }   
        // console.log(newPerson);
        console.log("ksd", req.body);
        await newPerson.save();
        return res.status(200).json({ message: "Registration of user successful", user: newPerson });
      }
    });
  } catch (err) {
    console.log(err);
  }
};


passport.use('local', new Strategy(async function(email, password, cb){
    try{
        const result = await User.findOne({collegeMail: email});
        if(!result) {
            return cb("User not found");
        }
        console.log("got you");
        const savedHashPassword = result.password;
        bcrypt.compare(password, savedHashPassword, (error, isMatch) => {
            if(error){
                return cb(error);
            } else{
                if(isMatch){
                    return cb(null, result); //result means user which we have found
                } else {
                    console.log("Wrong password");
                    return cb(null, false);
                }
            }
        })
    }catch(err){
        return cb(err);
    }
}))


export { loginUser, registerUser, otpSendingService, verifyOtp };
