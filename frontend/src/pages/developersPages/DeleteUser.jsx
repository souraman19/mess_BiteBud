import React, { useState } from 'react';
import axios from 'axios';
import './../../styles/DeleteUser.css'; 
import AdminNavbar from './../../components/developersComponents/AdminNavbar';
// Include your styles here

function DeleteUsers() {
  const [filters, setFilters] = useState({
    regNo: '',
    hostel: '',
    roomNo: '',
    email: '',
    dob: '',
    name: '',
    year: ''
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: filters
      });
      setUsers(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
      setMessage(response.data.message);
      setUsers(users.filter(user => user._id !== userId)); // Remove deleted user from the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
    <AdminNavbar />

<div className="delete-users-container">
      <h1>Delete Users</h1>
      <form className="filter-form">
        {/* Input fields for each filter (regNo, hostel, etc.) */}
        <div className="form-group">
          <label htmlFor="regNo">Registration Number:</label>
          <input type="text" name="regNo" value={filters.regNo} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hostel">Hostel:</label>
          <input type="text" name="hostel" value={filters.hostel} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="roomNo">Room Number:</label>
          <input type="text" name="roomNo" value={filters.roomNo} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={filters.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="text" name="dob" value={filters.dob} onChange={handleInputChange} placeholder="DDMMYYYY" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={filters.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input type="text" name="year" value={filters.year} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={fetchUsers}>Apply Filter</button>
      </form>

      <div className="users-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Hostel:</strong> {user.hostel}</p>
              <p><strong>Registration Number:</strong> {user.regNo}</p>
              <p><strong>Room Number:</strong> {user.roomNo}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
    </>
  );
}

export default DeleteUsers;
