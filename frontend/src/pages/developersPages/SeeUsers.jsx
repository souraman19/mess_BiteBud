import React, { useState, useEffect } from "react";
import axios from "axios";
import './../../styles/SeeUsers.css'; // Include your styles here
import AdminNavbar from "./../../components/developersComponents/AdminNavbar.jsx";

function SeeUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    regNo: "",
    hostel: "",
    roomNo: "",
    username: "",
    email: "",
    dob: "",
    name: "",
    year: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        params: filters,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-container">
        <h1>See Users</h1>
        <div className="filter-container">
          <h2>Filter Users</h2>
          <form className="filter-form">
            <div className="form-group">
              <label htmlFor="regNo">Registration Number:</label>
              <input
                type="text"
                id="regNo"
                name="regNo"
                value={filters.regNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hostel">Hostel:</label>
              <select
                id="hostel"
                name="hostel"
                value={filters.hostel}
                onChange={handleChange}
              >
                <option value="">All</option>
                <option value="hostel">Hostel</option>
                <option value="patel">Patel</option>
                <option value="tilak">Tilak</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="roomNo">Room Number:</label>
              <input
                type="text"
                id="roomNo"
                name="roomNo"
                value={filters.roomNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={filters.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={filters.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={filters.dob}
                onChange={handleChange}
                placeholder="DDMMYYYY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                value={filters.year}
                onChange={handleChange}
              />
            </div>
            <button type="button" onClick={fetchUsers}>
              Apply Filters
            </button>
          </form>
        </div>

        <div className="users-list">
          <h2>Users</h2>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <p><strong>Registration No:</strong> {user.regNo}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Hostel:</strong> {user.hostel}</p>
                <p><strong>Room No:</strong> {user.roomNo}</p>
                <p><strong>Year:</strong> {user.year}</p>
                <p><strong>DOB:</strong> {user.dob}</p>
                <p><strong>Username:</strong> {user.username}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SeeUsers;
