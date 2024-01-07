import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/signup.css";

function Passwordcreate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        // Sending a request to the backend for password creation
        const response = await fetch("http://localhost:5000/api/createPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Password created successfully!");
          // Add navigation logic or display a success message
          navigate("/login"); // Navigate to the login page or your desired route
        } else {
          alert("Failed to create password. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Password</h3>
          <div className="form-group mt-3">
            <label>Confirm your Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Set your Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Create Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Passwordcreate;
