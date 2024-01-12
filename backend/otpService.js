const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

class OTPService {
  static generateOTP() {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
  }

  static async sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cybersourajit@gmail.com', // replace with your Gmail email address
        pass: '**** **** **** ****', // replace with your Gmail app password
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
