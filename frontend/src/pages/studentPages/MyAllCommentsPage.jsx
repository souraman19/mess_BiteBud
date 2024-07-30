import React, { useState, useEffect } from "react";
import Navbar from "../../components/commonComponents/Navbar";
import CommentSegmentSlideWithButtons from "../../components/commonComponents/CommentSegmentSlideWithButtons";
import "./../../styles/CommentList.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {useUser} from "../../UserContext";

function Commentlist() { 

  const {user, updateUser} = useUser();
  const name = user.name;
  const username = user.username;
  const regNo = user.regNo;
  const year = user.year;
  const profilePic = user.profilePic;

  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/api/patelcomments");
        console.log(response.data);
        const filteredComments = response.data.filter((comment) => {
          // console.log(comment.regNo);
          // console.log(regNo);
          return comment.regNo === regNo;
        });
        
        setAllComments(filteredComments);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);
  

  const updateAllComments = (updatedComments) =>{
    setAllComments(updatedComments);
  };


  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (singleComment.trim() !== "") {
      // Add the new comment to the list
      const _id = uuidv4();

      const newComment = {
        _id : _id,
        name: name, 
        username: username, 
        regNo: regNo, year: year, 
        comment:singleComment,
        profilePic: profilePic,
      };
  
      try{
        const response = await axios.post("http://localhost:5000/api/addpatelcomments", newComment);
        console.log("Comment added successflly", response.data);

        setAllComments([...allComments, newComment]);
        setSingleComment("");
      } catch(error){
        console.log("Error in adding comment", error);
      }
    }
  };

  return (
      <div>
        <Navbar />
    <div className="commentlist-outer">
      <div className="commentlist-second-outer container">
        <h1>My All Comments</h1>
        <div className="row">
          <div className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8">
            <CommentSegmentSlideWithButtons 
            comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." 
            name = "Sourajit Mandal"
            year = "4th"
            profilePic = {profilePic}
            />
          </div>

          {allComments.map((singleCommentMap, index) => (
            <div
              key={index}
              className="col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
            >
                {/* {console.log(singleCommentMap._id)} */}
              <CommentSegmentSlideWithButtons 
              _id = {singleCommentMap._id}
              name = {singleCommentMap.name} 
              username = {singleCommentMap.username}
              regNo = {singleCommentMap.regNo}
              year = {singleCommentMap.year}
              comment={singleCommentMap.comment}
              updateAllComments = {updateAllComments}
              allComments = {allComments}
              setAllComment = {setAllComments}
              singleComment = {singleComment}
              setSingleComment = {setSingleComment}
              profilePic = {profilePic}
               />
            </div>
          ))}

        </div>
      </div>

      <div className="add-comment-section">
        <h1 className="add-new-comment-heading">Add your Comment here</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={singleComment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <div className="submit-section">
          <button className="btn btn-primary" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
      </div>
  );
}

export default Commentlist;
