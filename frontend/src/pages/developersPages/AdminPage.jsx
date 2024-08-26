import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./../../components/developersComponents/AdminNavbar";
import './../../styles/AdminPage.css'; // Import your custom CSS file

function AdminPage() {
  return (
    <>
      <AdminNavbar />
    <div className="admin-page-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome Admin</h1>
      </div>
      <div className="links-container">
        <Link to="/add-user" className="admin-link">
          <div className="link-box">
            <h2>Add User</h2>
          </div>
        </Link>
        <Link to="/update-user" className="admin-link">
          <div className="link-box">
            <h2>Update User</h2>
          </div>
        </Link>
        <Link to="/delete-user" className="admin-link">
          <div className="link-box">
            <h2>Delete User</h2>
          </div>
        </Link>
        <Link to="/see-users" className="admin-link">
          <div className="link-box">
            <h2>See Users</h2>
          </div>
        </Link>
        <Link to="/patelstudent" className="admin-link">
          <div className="link-box">
            <h2>Go to Mess Portal</h2>
          </div>
        </Link>
      </div>
    </div>
    </>
  );
}

export default AdminPage;
