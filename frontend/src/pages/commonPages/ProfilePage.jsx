import React from 'react';
import { useStateProvider } from "../../context/StateContext";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import axios from 'axios';
import './../../styles/ProfilePage.css';

export default function ProfilePage() {
   const [{ userInfo }] = useStateProvider();
   const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const name = userInfo.firstName + userInfo.lastName;
  const regNo = userInfo.regNo;
  const year = userInfo.year;
  const profilePic = userInfo.profilePicture;

//   const handleProfilePicChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("profilePicture", file);

//       try {
//         const response = await axios.post(`http://localhost:5000/api/upload-profile-picture/${user._id}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         updateUser({ profilePic: `/uploads/${response.data.filename}` });
//       } catch (error) {
//         console.error("Error uploading profile picture:", error);
//       }
//     }
//   };


  return (
    <>
    <Navbar/>
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-pic">
          <img src={profilePic || "/default-avatar.png"} alt="Profile" />
          <label htmlFor="profilePicInput">Change Picture</label>
          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            // onChange={handleProfilePicChange}
          />
        </div>
        <h1>{name}</h1>
        <p><strong>Registration Number:</strong> {regNo}</p>
        <p><strong>Hostel:</strong> {hostel}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Year:</strong> {year}</p>
      </div>
      <div style={{cursor: "pointer"}} /*onClick={() => updateUser({isSignedIn: false})} */>
        Log Out
      </div>
    </div>
    </>
  );
}
