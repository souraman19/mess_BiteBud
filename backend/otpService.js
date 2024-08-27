const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

class OTPService {
  static generateOTP() {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
  }

  static async sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email, // replace with your Gmail email address
        pass: process.env.password, 
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`,
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
