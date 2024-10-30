import {User} from "./../models2.0/person/User.js";
import OTPService from "./../services/otpService.js";

const loginUser = async (req, res) => {
    console.log("Hello");
}

//for sending otp
const otpSendingService = async(req, res) => {
    const { collegeMail } = req.body;
    try {
        const otp = OTPService.generateOTP();
        await OTPService.sendOTP(collegeMail, otp);
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
        return res.status(200).json({redirect:"otpverification"});
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}


  


//for verifyotp 
const verifyOtp = async(req, res, next) => {
    const { otp } = req.body;
  
    console.log(otp, "sd",req.session);
    try {
      if(otp === req.session.otp){
        console.log("matched");
        next();
      } else {
        console.log("try again");
        return res.status(200).json({redirect: "/register-form"});
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const registerUser = async(req, res) => {
    console.log(req.body);
}

export {loginUser, registerUser, otpSendingService, verifyOtp};