import React, { useState } from "react";
import "./../styles/otpverification.css";
import "./otpverificationjs";
import { useNavigate, useLocation } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = location.state?.userId; // Retrieve the user ID from the location state

  const handleOtpVerification = async () => {
    try {
      setIsLoading(true);
  
      const formattedOtp = otp.join("");
  
      const response = await fetch("http://localhost:5000/api/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: formattedOtp, userId }),
      });
  
      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json();
  
        if (data.success) {
          alert("OTP verification successful!");
          navigate("/passwordcreate", { state: { userId } });
        } else {
          alert("OTP verification failed. Please try again.");
        }
      } else {
        // Handle non-OK response status (e.g., 404)
        console.error("Server error:", response.status, response.statusText);
        alert("Server error. Please try again later.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="container height-100 d-flex justify-content-center align-items-center">
          <div className="position-relative">
            <div className="card p-2 text-center">
              <h6>
                Please enter the one-time password <br />
                to verify your account
              </h6>{" "}
              <div>
                <span>A code has been sent to</span>
                <small>*******9897</small>
              </div>
              <div
                id="otp"
                className="inputs d-flex flex-row justify-content-center mt-2"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    className="m-2 text-center form-control rounded"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-danger px-4 validate"
                  onClick={handleOtpVerification}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Validate"}
                </button>
              </div>
            </div>
            <div className="card-2">
              <div className="content d-flex justify-content-center align-items-center">
                <span>Didn't get the code</span>
                <a href="#" className="text-decoration-none ms-3">
                  Resend(1/3)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
