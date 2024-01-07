import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/signup.css";



export default function Signup(props) {

    
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend for validation
      const response = await fetch("http://localhost:5000/api/validateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, dob }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isRegistered) {
          alert("User is already registered!");
        } else {
          // User is not registered, proceed to send OTP
          const otpResponse = await fetch("http://localhost:5000/api/sendOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          const otpData = await otpResponse.json();

          if (otpData.success) {
            // OTP sent successfully, navigate to the next page or display a success message
            alert("OTP sent successfully!");
            // Pass the user ID to the OTPVerification component
            navigate("/otpverification", { state: { userId: data.userId } });
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        }
      } else {
        alert("Validation failed. Please check your email and DOB.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Date of birth</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter DOB (DDMMYYYY)"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Get OTP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
