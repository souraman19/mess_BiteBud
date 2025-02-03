import React from "react";
import { useStateProvider } from "../../context/StateContext";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import axios from "axios";
import "./../../styles/ProfilePage.css";
import { CHANGE_PROFILE_PICTURE, LOG_OUT_ROUTE } from "./../../utils/ApiRoutes.js";
import { reducerCases } from "../../context/Constants.js";

export default function ProfilePage() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const name = userInfo.firstName + userInfo.lastName;
  const regNo = userInfo.regNo;
  const year = userInfo.year;
  const profilePic = userInfo.profilePicture;

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await axios.post(
          `${CHANGE_PROFILE_PICTURE}/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        // updateUser({ profilePic: `/uploads/${response.data.filename}` });
        dispatch({
          type: reducerCases.SET_NEW_PROFILE_PICTURE, // Action to set user information in the state.
          profilePicture: `/uploads/${response.data.filename}`,
        });
        const storedUser = JSON.parse(localStorage.getItem("user")); // Get existing user
        if (storedUser) {
          storedUser.profilePicture = `/uploads/${response.data.filename}`; // Update profile picture
          localStorage.setItem("user", JSON.stringify(storedUser)); // Save back to localStorage
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      // 1. Remove user from localStorage
      localStorage.removeItem("user");
  
      // 2. Clear user session/cookies (optional, handled by backend)
      await axios.post(`${LOG_OUT_ROUTE}`, {}, { withCredentials: true });
  
      // 3. Reset user state in context/redux
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {},
      });
  
      // 4. Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-details">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" />
            <label htmlFor="profilePicInput">Change Picture</label>
            <input
              type="file"
              accept="image/*"
              id="profilePicInput"
              onChange={handleProfilePicChange}
            />
          </div>
          <h1>{name}</h1>
          <p>
            <strong>Registration Number:</strong> {regNo}
          </p>
          <p>
            <strong>Hostel:</strong> {hostel}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Year:</strong> {year}
          </p>
        </div>
        <div
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            borderRadius: "5px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
        >
          Log Out
        </div>
      </div>
    </>
  );
}
