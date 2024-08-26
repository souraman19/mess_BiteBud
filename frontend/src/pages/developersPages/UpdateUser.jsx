import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../styles/UpdateUser.css'; // Import the CSS file
import AdminNavbar from './../../components/developersComponents/AdminNavbar';

function UpdateUser() {
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
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

  const handleSelectUser = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setUpdatedData(user);
  };

  const updateUser = async () => {
    if (selectedUser) {
      try {
        console.log(selectedUser.regno);
        const response = await axios.post(`http://localhost:5000/api/users/update/${selectedUser.regno}`, updatedData);
        setMessage(response.data.message);
        setUsers(users.map(user => user._id === selectedUser._id ? { ...user, ...updatedData } : user));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setUpdatedData(selectedUser);
    }
  }, [selectedUser]);

  return (<>
    <AdminNavbar />
    <div className="update-user-container">
      <h1>Update User</h1>
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

      {users.length > 0 && (
        <div className="users-list">
          {users.map(user => (
            <div key={user._id} className="user-card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Hostel:</strong> {user.hostel}</p>
              <p><strong>Registration Number:</strong> {user.regNo}</p>
              <p><strong>Room Number:</strong> {user.roomNo}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <button onClick={() => handleSelectUser(user._id)}>Select for Update</button>
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="update-form">
          <h2>Update User Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={updatedData.name || ''} onChange={handleUserChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" value={updatedData.email || ''} onChange={handleUserChange} />
            </div>
            <div className="form-group">
              <label htmlFor="hostel">Hostel:</label>
              <input type="text" name="hostel" value={updatedData.hostel || ''} onChange={handleUserChange} />
            </div>
            <div className="form-group">
              <label htmlFor="roomNo">Room Number:</label>
              <input type="text" name="roomNo" value={updatedData.roomNo || ''} onChange={handleUserChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="text" name="dob" value={updatedData.dob || ''} onChange={handleUserChange} placeholder="DDMMYYYY" />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input type="text" name="year" value={updatedData.year || ''} onChange={handleUserChange} />
            </div>
            <button type="button" onClick={updateUser}>Update User</button>
          </form>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
    </>
  );
}

export default UpdateUser;
