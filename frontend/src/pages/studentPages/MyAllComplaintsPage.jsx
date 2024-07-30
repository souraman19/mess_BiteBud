import React, { useState, useEffect } from "react";
import "./../../styles/ComplaintList.css";
import ComplaintSlideWithEditDelete from "../../components/commonComponents/ComplaintSlideWithEditDelete";
import {useUser} from "../../UserContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import NavBar from "../../components/commonComponents/Navbar";

function Complaintlist() {
  const {user, updateUser} = useUser();
  const myName = user.name;
  const myUsername = user.username;
  const myRegNo = user.regNo;
  const myYear = user.year;
  const myProfilePic = user.profilePic;

  const [singleComplaint, setSingleComplaint] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get("http://localhost:5000/api/patelcomplaints");
        console.log(response.data);
        const allReceivedComplaints = response.data;
        const myAllComplaints = allReceivedComplaints.filter((c) => {
            return c.regNo == myRegNo; 
        })
        setAllComplaints(myAllComplaints);
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);


  const handleComplaintChange = (event) => {
    setSingleComplaint(event.target.value);
  };

  const updateAllComplaints = (updatedComplaints) => {
    setAllComplaints(updatedComplaints);
  }

  const handleComplaintSubmit = async() => {
    if (singleComplaint.trim() !== "") {
      const _id = uuidv4();
      const newComplaint = {
        _id : _id,
        name: myName,
        username: myUsername,
        regNo: myRegNo, 
        year: myYear,
        complaint: singleComplaint,
        commentsOnComplaint: [],
        upVoteCount: 0,
        downVoteCount: 0,
        upVotedMembers: [],
        downVotedMembers: [],
        isResolved: false,
      };

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
       <div>
         <NavBar />
    <div className="commentlist-outer">
      <div className="commentlist-second-outer container">
        <h1>My Complaints</h1>
        <div className="row">
          <div className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8">
            <ComplaintSlideWithEditDelete complaint="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." 
            />
          </div>
        
          {allComplaints.map((singleCommentMap, index) => (
            <div
              key={index}
              className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
            >
              <ComplaintSlideWithEditDelete 
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
              allComplaints = {allComplaints}
              updateAllComplaints = {updateAllComplaints}
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
       </div>
  );
}

export default Complaintlist;
