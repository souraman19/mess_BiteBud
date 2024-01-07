import React, { useState, useEffect } from "react";
import "./../styles/complaintlist.css";
import Randomcomplaintchiefwarden from "./Randomcomplaintchiefwarden";

function Complaintlist() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load comments from local storage when the component mounts
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    // Save comments to local storage whenever the comments state changes
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      // Add the new comment to the list
      setComments([...comments, commentText]);

      // Clear the input field
      setCommentText("");
    }
  };

  return (
    <div className="commentlist-outer">
      <div className="commentlist-second-outer container">
        <h1>Complaint List</h1>
        <div className="row">
          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Randomcomplaintchiefwarden comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4"
            >
              <Randomcomplaintchiefwarden comment={comment} />
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
            value={commentText}
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
  );
}

export default Complaintlist;
