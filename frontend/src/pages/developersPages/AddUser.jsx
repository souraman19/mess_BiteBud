import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './../../styles/AddUsers.css'; // You can add styling for the form here
import AdminNavbar from "./../../components/developersComponents/AdminNavbar.jsx";

function AddUser() {
  const [formData, setFormData] = useState({
    email: "",
    identity: "accountant",
    dob: "",
    registered: "no",
    regNo: "",
    roomNo: "",
    name: "",
    year: "",
    hostel: "hostel"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add-user', formData);
      alert("User added successfully!");
      setFormData({
        email: "",
        identity: "accountant",
        dob: "",
        registered: "no",
        regNo: "",
        roomNo: "",
        name: "",
        year: "",
        hostel: "hostel"
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
        <AdminNavbar />
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>Add New User</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="identity">Identity:</label>
          <select
            id="identity"
            name="identity"
            value={formData.identity}
            onChange={handleChange}
            required
          >
            <option value="accountant">Accountant</option>
            <option value="chiefwarden">Chief Warden</option>
            <option value="patelstudent">Patel Student</option>
            <option value="tilakstudent">Tilak Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="DDMMYYYY"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registered">Registered:</label>
          <input
            type="text"
            id="registered"
            name="registered"
            value={formData.registered}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="regNo">Registration Number:</label>
          <input
            type="number"
            id="regNo"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            pattern="\d{6}"
            placeholder="6 digits"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomNo">Room Number:</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hostel">Hostel:</label>
          <select
            id="hostel"
            name="hostel"
            value={formData.hostel}
            onChange={handleChange}
            required
          >
            <option value="hostel">Hostel</option>
            <option value="patel">Patel</option>
            <option value="tilak">Tilak</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
    </>
  );
}

export default AddUser;
