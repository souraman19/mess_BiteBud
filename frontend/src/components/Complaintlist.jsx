import React, { useState, useEffect } from "react";
import "./../styles/ComplaintList.css";
import ComplaintSlide from "./ComplaintSlide";
import {useUser} from "./../UserContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function Complaintlist() {
  const {user, updateUser} = useUser();
  const name = user.name;
  const username = user.username;
  const hostel = user.hostel;
  const regNo = user.regNo;
  const year = user.year;
  const profilePic = user.profilePic;

  const [singleComplaint, setSingleComplaint] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get("http://localhost:5000/api/patelcomplaints");
        // console.log(response.data);
        const myHostelComplaints = response.data;
        if(hostel !== "hostel"){
          const myHostelComplaints = response.data.filter((x) => x.hostel === hostel);
          setAllComplaints(myHostelComplaints);
        } else {
          setAllComplaints(myHostelComplaints);
        }
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);


  const handleComplaintChange = (event) => {
    setSingleComplaint(event.target.value);
  };

  const handleComplaintSubmit = async() => {
    if (singleComplaint.trim() !== "") {
      const _id = uuidv4();
      const newComplaint = {
        _id : _id,
        name: name,
        username: username,
        regNo: regNo, 
        year: year,
        complaint: singleComplaint,
        hostel: hostel,
        commentsOnComplaint: [],
        upVoteCount: 0,
        downVoteCount: 0,
        upVotedMembers: [],
        downVotedMembers: [],
        isResolved: false,
      };
      // console.log("hostel in complaint", hostel);

      try{
        const response = await axios.post("http://localhost:5000/api/addpatelcomplaints", newComplaint);
        setAllComplaints([...allComplaints, newComplaint]);
        setSingleComplaint("");
        console.log("Comment added successfully");
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
          <div className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8">
            <ComplaintSlide complaint="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." 
            />
          </div>
        
          {allComplaints.map((singleCommentMap, index) => (
            <div
              key={index}
              className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
            >
              <ComplaintSlide 
              _id = {singleCommentMap._id}
              name = {singleCommentMap.name}
              username = {singleCommentMap. username}
              regNo = {singleCommentMap. regNo}
              year = {singleCommentMap.year}
              complaint={singleCommentMap.complaint}
              commentsOnComplaint = {singleCommentMap.commentsOnComplaint}
              upVoteCount = {singleCommentMap.upVoteCount}
              downVoteCount = {singleCommentMap.downVoteCount}
              upVotedMembers = {singleCommentMap.upVotedMembers}
              downVotedMembers = {singleCommentMap.downVotedMembers}
              isResolved = {singleCommentMap.isResolved}
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
