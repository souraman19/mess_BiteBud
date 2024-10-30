import express from "express"; 
// import {loginUser} from "./../controllers/AuthController.js";
import {checkUser, validateUserData} from "./../middlewares/AuthMiddleWire.js";
import {loginUser, registerUser, otpSendingService, verifyOtp} from "./../controllers/AuthController.js";

const router = express.Router();

router.post('/login', checkUser, loginUser);
router.post('/register', validateUserData, otpSendingService);
router.post('/verifyOtp', verifyOtp);
// router.post('/sendOtp', otpSendingService);

export default router;