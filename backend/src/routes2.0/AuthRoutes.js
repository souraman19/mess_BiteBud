import express from "express"; 
// import {loginUser} from "./../controllers/AuthController.js";
import {checkUser, validateUserData} from "./../middlewares/AuthMiddleWire.js";
import {loginUser, registerUser, otpSendingService, verifyOtp} from "./../controllers/AuthController.js";

const router = express.Router();

router.post('/login', checkUser, loginUser);
router.post('/get-otp', validateUserData, otpSendingService);
router.post('/verify-otp', verifyOtp);
router.post('/register-user', validateUserData, registerUser);


export default router;