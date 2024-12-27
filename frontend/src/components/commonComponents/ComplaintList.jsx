import React, { useState, useEffect } from "react";
import "./../../styles/ComplaintList.css";
import ComplaintSlide from "./ComplaintSlide";
import { v4 as uuidv4 } from 'uuid';
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import axios from "axios";
import { GET_ALL_COMPLAINTS_ROUTE, ADD_COMPLAINT_ROUTE } from "./../../utils/ApiRoutes.js";

function Complaintlist() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const userId = userInfo.userId;
  const username = userInfo.username;
  const regNo = userInfo.regNo;
  const hostel = userInfo.hostel;
  const firstName = userInfo.firstName;
  const lastName = userInfo.lastName;
  const year = userInfo.year;
  const profilePicture = userInfo.profilePicture;

  const [singleComplaint, setSingleComplaint] = useState("");
  const [heading, setHeading] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  
  const fetchData = async () => {
    const response = await axios.get(GET_ALL_COMPLAINTS_ROUTE, { params: { hostel }, withCredentials: true });
    const myHostelComplaints = response.data.reverse();
    setAllComplaints(myHostelComplaints);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error in fetching comments", error);
    }
  }, [allComplaints]);

  const handleComplaintChange = (event) => {
    setSingleComplaint(event.target.value);
  };

  const handleComplaintSubmit = async () => {
    if (singleComplaint.trim() !== "") {
      const newComplaint = {
        complaintText: singleComplaint,
        complaintHeading: heading,
        complaintBy: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          profilePicture: profilePicture,
          userId: userId,
          regNo: regNo,
          hostel: hostel,
        },
      };

      try {
        const response = await axios.post(ADD_COMPLAINT_ROUTE, newComplaint);
        try {
          fetchData();
        } catch (error) {
          console.error("Error in fetching comments", error);
        }
        setSingleComplaint("");
        setHeading("");
        console.log("Complaint added successfully");
      } catch (error) {
        console.log("Error in adding new comment", error);
      }
    }
  };

  return (
    <div className="complaintList-outer">
      <div className="complaintList-container container">
          {/* Left: List of complaints */}
          <div className="col-md-6 complaint-list-section">
            <h1>All Complaint List</h1>
            {allComplaints.map((singleCommentMap, index) => (
              <div key={index} className="complaint-card">
                <ComplaintSlide
                  complaintId={singleCommentMap.complaintId}
                  name={`${singleCommentMap.complaintBy.firstName} ${singleCommentMap.complaintBy.lastName}`}
                  username={singleCommentMap.complaintBy.username}
                  time={singleCommentMap.complaintTime}
                  regNo={singleCommentMap.complaintBy.regNo}
                  complaint={singleCommentMap.complaintText}
                  complaintHeading = {singleCommentMap.complaintHeading}
                  upVoteCount={singleCommentMap.upVoteCount}
                  downVoteCount={singleCommentMap.downVoteCount}
                  upVotedMembers={singleCommentMap.upVotes}
                  downVotedMembers={singleCommentMap.downVotes}
                  isResolved={singleCommentMap.resolvedInfo?.status}
                  resolvedTime={singleCommentMap.resolvedInfo?.resolveTime}
                  resolvedMessage={singleCommentMap.resolvedInfo?.message}
                />
              </div>
            ))}
          </div>

          {/* Right: Form to add a complaint */}
          <div className="col-md-6 add-comment-section">
            <h1 className="add-new-comment-heading">Register Your Complaint Here</h1>
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea2"
                rows="2"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter the heading of the complaint"
              ></textarea>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="10"
                value={singleComplaint}
                onChange={handleComplaintChange}
                placeholder="Enter the complaint here"
              ></textarea>
            </div>
            <div className="submit-section">
              <button className="btn btn-primary" onClick={handleComplaintSubmit}>
                Submit
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Complaintlist;
