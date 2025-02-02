import React from "react";
import { useStateProvider } from "../../context/StateContext";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import axios from "axios";
import "./../../styles/ProfilePage.css";
import { CHANGE_PROFILE_PICTURE } from "./../../utils/ApiRoutes.js";
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
          profilePicture: `/uploads/${response.data.filename}` ,
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
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
          style={{
            cursor: "pointer",
          }} /*onClick={() => updateUser({isSignedIn: false})} */
        >
          Log Out
        </div>
      </div>
    </>
  );
}
