import React, { useState } from "react";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/Constants";
import { useEffect } from "react";
import { USER_REGISTER_ROUTE } from "./../../utils/ApiRoutes.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ExtraDetailsForm() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    course: "",
    branch: "",
    yearOfJoining: "",
    year: "",
    regNo: "",
    emergencyContact: { countryCode: "", contactNo: "" },
    parent: { name: "", address: "" },
    localGuardian: { name: "", contactNo: "", address: "" },
    roomNo: "",
    nearestRailwayStation: "",
    category: "",
    disciplinaryActionsTakenAgainst: [],
    bankDetails: { bankName: "", accountNo: "", IFSC: "" },
    specialPosition: "",
    hostelHistory: [],
    vacationHistory: [],
    messHistory: [],
    joiningDate: "",
    leavingDate: "",
    previousWorkingHistory: [],
    currentAddress: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested properties
    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (name === "confirmPassword" && value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else if (
        name === "password" &&
        formData.confirmPassword &&
        formData.confirmPassword !== value
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch({
      type: reducerCases.SET_USER_INFO, // Action to set user information in the state.
      userInfo: {
        username: formData.username,
        course: formData.course,
        branch: formData.branch,
        yearOfJoining: formData.yearOfJoining,
        year: formData.year,
        regNo: formData.regNo,
        emergencyContact: formData.emergencyContact,
        parent: formData.parent,
        localGuardian: formData.localGuardian,
        roomNo: formData.roomNo,
        nearestRailwayStation: formData.nearestRailwayStation,
        disciplinaryActionsTakenAgainst:
          formData.disciplinaryActionsTakenAgainst,
        category: formData.category,
        bankDetails: formData.bankDetails,
        specialPosition: formData.specialPosition,
        hostelHistory: formData.hostelHistory,
        messHistory: formData.messHistory,
        joiningDate: formData.joiningDate,
        leavingDate: formData.leavingDate,
        currentAddress: formData.currentAddress,
        previousWorkingHistory: formData.previousWorkingHistory,
        password: formData.password,
    },
    });
    console.log("sldubs", userInfo);
    try {
      const response = await axios.post(
        USER_REGISTER_ROUTE, userInfo, { withCredentials: true });
      if(response.status === 200){
            navigate('/test');
      } else {
        navigate('/register-form');
      }
        console.log("res", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
        <form
      className="extra-details-form"
      style={styles.form}
      onSubmit={handleSubmit}
    >   
    
      {userInfo?.position === "Student" && (
        <div className="student-details" style={styles.section}>
          <div style={styles.inputContainer}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Course</option>
              <option value="BTech">BTech</option>
            </select>
          </div>
          <div style={styles.inputContainer}>
            <label>Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
          <div style={styles.inputContainer}>
            <label>Year of Joining Institute</label>
            <input
              type="number"
              name="yearOfJoining"
              value={formData.yearOfJoining}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Registration No</label>
            <input
              type="number"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="prefinal">Prefinal</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div style={styles.inputContainer}>
            <span>Emergency Contact No</span>
            <input
              type="text"
              name="emergencyContact.countryCode"
              placeholder="Country Code"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="emergencyContact.contactNo"
              placeholder="Contact No"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Parent Name</label>
            <input
              type="text"
              name="parent.name"
              onChange={handleChange}
              style={styles.input}
            />
            <label>Parent Address</label>
            <input
              type="text"
              name="parent.address"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Local Guardian Info</label>
            <input
              type="text"
              name="localGuardian.name"
              placeholder="Name"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="localGuardian.contactNo"
              placeholder="Contact No"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="localGuardian.address"
              placeholder="Address"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Room No</label>
            <input
              type="text"
              name="roomNo"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Nearest Railway Station from your Permanent Address</label>
            <input
              type="text"
              name="nearestRailwayStation"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Category</label>
            <select
              name="category"
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
            </select>
          </div>
          <div style={styles.inputContainer}>
            <label>Bank Account Details</label>
            <input
              type="text"
              name="bankDetails.bankName"
              placeholder="Bank Name"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="bankDetails.accountNo"
              placeholder="Account No"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="bankDetails.IFSC"
              placeholder="IFSC"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Special Position</label>
            <input
              type="text"
              name="specialPosition"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
      )}
      {(userInfo?.position == "Warden" ||
        userInfo?.position === "ChiefWarden" ||
        userInfo?.position === "Caretaker" ||
        userInfo?.position === "StoreKeeper" ||
        userInfo?.position === "MessInCharge" ||
        userInfo?.position === "Accountant") && (
        <div className="staff-details" style={styles.section}>
          <div style={styles.inputContainer}>
            <label>Hostel History</label>
            <input
              type="text"
              name="hostelHistory"
              placeholder="Enter hostel history"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Mess History</label>
            <input
              type="text"
              name="messHistory"
              placeholder="Enter mess history"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div className="vacation-history" style={styles.section}>
            <div style={styles.inputContainer}>
              <label>Previous Working History</label>
              <input
                type="text"
                name="previousWorkingHistory"
                placeholder="Enter previous working history"
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.inputContainer}>
            <label>Current Address</label>
            <input
              type="text"
              name="currentAddress"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
      )}

      <div style={styles.inputContainer}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          style={styles.input}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          style={styles.input}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </div>
      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
    </div>
  );
}

export default ExtraDetailsForm;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  section: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
