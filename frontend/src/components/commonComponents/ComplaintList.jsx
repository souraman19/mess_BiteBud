import React, { useState, useEffect } from "react";
import "./../../styles/ComplaintList.css";
import ComplaintSlide from "./ComplaintSlide";
import { v4 as uuidv4 } from 'uuid';
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import axios from "axios";
import {GET_ALL_COMPLAINTS_ROUTE, ADD_COMPLAINT_ROUTE} from "./../../utils/ApiRoutes.js";

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
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get(GET_ALL_COMPLAINTS_ROUTE, {params: {hostel}, withCredentials: true});
        // console.log("all", response);
        const myHostelComplaints = response.data;
        setAllComplaints(myHostelComplaints);
        // console.log("hostel ccom", myHostelComplaints);
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, [allComplaints]);


  const handleComplaintChange = (event) => {
    setSingleComplaint(event.target.value);
  };

  const handleComplaintSubmit = async() => {
    if (singleComplaint.trim() !== "") {
      const newComplaint = {
        username: username,
        complaintText: singleComplaint,
        complaintBy:{
          firstName: firstName,
          lastName: lastName,
          username: username,
          profilePicture: profilePicture, 
          userId: userId,
          regNo: regNo,
          hostel: hostel,
        },
      };
      // console.log("hostel in complaint", hostel);

      try{
        const response = await axios.post(ADD_COMPLAINT_ROUTE, newComplaint);
        setAllComplaints([...allComplaints, newComplaint]);
        setSingleComplaint("");
        console.log("Complaint added successfully");
      }catch(error){
        console.log("Error in adding new comment", error);
      }
    }
  };

  return (
    <div className="commentlist-outer">
      <div className="commentlist-second-outer container">
        <h1>All Complaint List</h1>
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-lg-8 mb-8" style={{ height: 'auto !importnt'}}> 
            <ComplaintSlide complaint="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad."
              title= "My Random Complaint" 
            />
          </div>
        
          {allComplaints.map((singleCommentMap, index) => (
            <div
              key={index}
              className="col-12 col-sm-8 col-md-8 col-lg-8 mb-8" style={{ height: 'auto' }}
            >
              <ComplaintSlide 
              title="My Random Complaint"
              complaintId = {singleCommentMap.complaintId}
              name = {singleCommentMap.complaintBy.firstName + ' ' + singleCommentMap.complaintBy.lastName}
              username = {singleCommentMap.complaintBy.username}
              time={singleCommentMap.complaintTime}
              regNo = {singleCommentMap.complaintBy.regNo}
              complaint={singleCommentMap.complaintText}
              upVoteCount = {singleCommentMap.upVoteCount}
              downVoteCount = {singleCommentMap.downVoteCount}
              upVotedMembers = {singleCommentMap.upVotes}
              downVotedMembers = {singleCommentMap.downVotes}
              isResolved = {singleCommentMap.resolvedInfo?.status}
              resolvedTime = {singleCommentMap.resolvedInfo?.resolveTime}
              resolvedMessage = {singleCommentMap.resolvedInfo?.message}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="add-comment-section">
        <h1 className="add-new-comment-heading">Register Your Complaint here</h1>
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
  );
}

export default Complaintlist;
