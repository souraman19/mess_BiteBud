import React, { useState, useEffect } from "react";
import "./../../styles/MyAllComplaintsPage.css";
import ComplaintSlideWithEditDelete from "../../components/commonComponents/ComplaintSlideWithEditDelete";
import { useStateProvider } from "../../context/StateContext.jsx";
import axios from "axios";
import NavBar from "../../components/commonComponents/Navbar";
import { Link } from "react-router-dom";
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
  const [heading, setHeading] = useState("");
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
        complaintHeading: heading,
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
        setSingleComplaint("");
        setHeading("");
        fetchData();
        console.log("Comment added successfully");
      } catch (error) {
        console.log("Error in adding new comment", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", padding: "20px 0" }}>
  <Link
    to="/complaint-page"
    style={{
      color: "inherit",
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      fontSize: "1.2rem",
      fontWeight: "bold",
      backgroundColor: "#007bff",
      color: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#0056b3";
      e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
    }}
    
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "#007bff";
      e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    }}
  >
    <h2 className="my_complaints-myallcomplaintspage">All Complaints</h2>
  </Link>
  <Link
    to="/myallcomplaints-page"
    style={{
      color: "inherit",
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      fontSize: "1.2rem",
      fontWeight: "bold",
      backgroundColor: "#6c757d",
      color: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#5a6268";
      e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "#6c757d";
      e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    }}
  >
    <h2 className="my_complaints-myallcomplaintspage">My Complaints</h2>
  </Link>
</div>

      <div className="commentlist-outer-myallcomplaintspage">
        <div className="commentlist-second-outer-myallcomplaintspage container-myallcomplaintspage">
          <h1>My Complaints</h1>
          <div className="row-myallcomplaintspage">
            {allComplaints.map((singleComplaint, index) => (
              <div
                key={index}
                className="comment-card-myallcomplaintspage col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
              >
                <ComplaintSlideWithEditDelete
                  complaintId={singleComplaint.complaintId}
                  name={singleComplaint.complaintBy.firstName}
                  username={singleComplaint.complaintBy?.username || "unknown"}
                  regNo={singleComplaint.complaintBy.regNo}
                  complaint={singleComplaint.complaintText}
                  complaintHeading={singleComplaint.complaintHeading}
                  upVoteCount={singleComplaint.upVoteCount}
                  downVoteCount={singleComplaint.downVoteCount}
                  isResolved={singleComplaint.resolvedInfo.status}
                  allComplaints={allComplaints}
                  updateAllComplaints={updateAllComplaints}
                  fetchData={fetchData}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="add-comment-section-myallcomplaintspage">
          <h1 className="add-new-comment-heading-myallcomplaintspage">
            Register Your Complaint here
          </h1>
          <div className="form-group-myallcomplaintspage">
          <textarea
              className="form-control-myallcomplaintspage"
              id="exampleFormControlTextarea1"
              rows="2"
              value={heading}
              placeholder="Enter Heading"
              onChange={(e) => setHeading(e.target.value)}
            ></textarea>
            <textarea
              className="form-control-myallcomplaintspage"
              id="exampleFormControlTextarea1"
              rows="10"
              placeholder="Enter your complaint here"
              value={singleComplaint}
              onChange={handleComplaintChange}
            ></textarea>
          </div>
          <div className="submit-section-myallcomplaintspage">
            <button
              className="btn-myallcomplaintspage btn-primary"
              onClick={handleComplaintSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaintlist;
