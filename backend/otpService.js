const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

class OTPService {
  static generateOTP() {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
  }

  

  static async sendOTP(email, otp) {
    // console.log(process.env.myemail);
    // console.log(process.env.password);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.myemail, // replace with your Gmail email address
        pass: process.env.password, 
      },
    });

    const mailOptions = {
      from: process.env.myemail,
      to: email,
      subject: 'SignUp OTP',
      text: `Your OTP for login is: ${otp}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

module.exports = OTPService;
