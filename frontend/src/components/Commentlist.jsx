import React, { useState, useEffect } from "react";
import Review from "./Review";
import "./../styles/commentlist.css";
import axios from 'axios';

function Commentlist() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/patelcomment")
      .then(response => {
        console.log(response.data);
        const commentArray = response.data.map(commentObj => commentObj.comment);
        setComments(commentArray);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

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
        <h1>Comment List</h1>
        <div className="row">
          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          <div className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
            <Review comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." />
          </div>

          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment-card col-12 col-sm-6 col-md-6 col-lg-4 mb-4"
            >
              <Review comment={comment} />
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

export default Commentlist;
