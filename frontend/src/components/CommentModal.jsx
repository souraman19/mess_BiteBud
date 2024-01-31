// CommentModal.js
import React, { useState } from "react";
import "./../styles/CommentModal.css"; // Import your modal styles here

function CommentModal({ comments, onAddComment, onClose }) {
  const [commentText, setCommentText] = useState("");

  const handlePostComment = () => {
    if (commentText.trim() !== "") {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="comment-modal-overlay">
      <div className="comment-modal">
    
    <bbutton type="button" class="btn custom-btn-light btn-lg" onClick={onClose}>
          <span > &times;</span>
        </bbutton>
        <div className="existing-comments">
          <h2></h2>
          <ul>
            <div className="outer-owncomments89376273">
              {comments.map((comment, index) => (
                <div className="owncomments89376273">
                  <li key={index}>{comment}</li>
                </div>
              ))}
    
// <<<<<<< frontendworks
//         <bbutton type="button" class="btn custom-btn-light btn-lg" onClick={onClose}>
//           <span > &times;</span>
//         </bbutton>
//         <div className="existing-comments">
//           <h2></h2>
//           <ul>
//             <div className="outer-owncomments89376273">
//               {comments.map((comment, index) => (
//                 <div className="owncomments89376273">
//                   <li key={index}>{comment}</li>
//                 </div>
//               ))}
// =======
//       <button className="close-button" onClick={onClose}>
//           &times; {/* Close icon (you can customize this) */}
//         </button>
//         <div className="existing-comments">
//           <h2>Existing Comments</h2>
//           <ul>
//             <div className="outer-owncomments89376273">
//             {comments.map((comment, index) => (
//             <div className="owncomments89376273">
//               <li key={index}>{comment}</li>
//             </div>
//             ))}
// >>>>>>> main
            </div>
          </ul>
        </div>
        <textarea
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handlePostComment}>Post</button>
      </div>
    </div>
  );
}

export default CommentModal;
