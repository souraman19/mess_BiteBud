import React, { useState, useEffect } from "react";
import "./../../styles/ComplaintList.css";
import ComplaintSlideWithEditDelete from "../../components/commonComponents/ComplaintSlideWithEditDelete";
import { useStateProvider } from "../../context/StateContext.jsx";
import axios from "axios";
import NavBar from "../../components/commonComponents/Navbar";
import {
  ADD_COMPLAINT_ROUTE,
  GET_ALL_COMPLAINTS_ROUTE,
} from "./../../utils/ApiRoutes.js";

function Complaintlist() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const myUserId = userInfo.userId;
  const myUsername = userInfo.username;
  const myRegNo = userInfo.regNo;
  const hostel = userInfo.hostel;
  const myName = userInfo.firstName;
  const myLastName = userInfo.lastName;
  const myYear = userInfo.year;
  const myProfilePicture = userInfo.profilePicture;

  const [singleComplaint, setSingleComplaint] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(GET_ALL_COMPLAINTS_ROUTE, {
      params: { hostel },
      withCredentials: true,
    });
    console.log("fetched data", response);
    const allReceivedComplaints = response.data;
    const myAllComplaints = allReceivedComplaints.filter((c) => {
      return c.complaintBy.userId === myUserId;
    });
    setAllComplaints(myAllComplaints);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error in fetching comments", error);
    }
  }, []);

  const handleComplaintChange = (event) => {
    setSingleComplaint(event.target.value);
  };

  const updateAllComplaints = (updatedComplaints) => {
    setAllComplaints(updatedComplaints);
  };

  const handleComplaintSubmit = async () => {
    if (singleComplaint.trim() !== "") {
      const newComplaint = {
        complaintText: singleComplaint,
        complaintBy: {
          firstName: myName,
          lastName: myLastName,
          username: myUsername,
          profilePicture: myProfilePicture,
          userId: myUserId,
          regNo: myRegNo,
          hostel: hostel,
        },
      };

      try {
        await axios.post(ADD_COMPLAINT_ROUTE, newComplaint);
        fetchData();
        setSingleComplaint("");
        console.log("Comment added successfully");
      } catch (error) {
        console.log("Error in adding new comment", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="commentlist-outer">
        <div className="commentlist-second-outer container">
          <h1>My Complaints</h1>
          <div className="row">
            {allComplaints.map((singleComplaint, index) => (
              <div
                key={index}
                className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
              >
                <ComplaintSlideWithEditDelete
                  complaintId={singleComplaint.complaintId}
                  name={singleComplaint.complaintBy.firstName}
                  username={singleComplaint.complaintBy?.username || "unknown"}
                  regNo={singleComplaint.complaintBy.regNo}
                  complaint={singleComplaint.complaintText}
                  upVoteCount={singleComplaint.upVoteCount}
                  downVoteCount={singleComplaint.downVoteCount}
                  isResolved={singleComplaint.resolvedInfo.status}
                  allComplaints={allComplaints}
                  updateAllComplaints={updateAllComplaints}
                  fetchData = {fetchData}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="add-comment-section">
          <h1 className="add-new-comment-heading">
            Register Your Complaint here
          </h1>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              value={singleComplaint}
              onChange={handleComplaintChange}
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
