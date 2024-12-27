import React from "react";
import Navbar from "../../components/commonComponents/Navbar";
import CommentList from "../../components/commonComponents/CommentList";
import "./../../styles/PatelComment.css";
import { Link } from "react-router-dom";

function Patelcomment() {
  return (
    <div className="patelCommentPage_outermost_box">
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          padding: "20px 0",
        }}
      >
        <Link
          to="/myallcomments-page"
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
          <h2 className="my_complaints-myallcomplaintspage">My Comments</h2>
        </Link>
        <Link
          to="/comment-page"
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
          <h2 className="my_complaints-myallcomplaintspage">All Comments</h2>
        </Link>
      </div>
      <CommentList />
    </div>
  );
}

export default Patelcomment;
