import React from "react";
import Navbar from "../../components/Navbar";
import CommentList from "../../components/CommentList";
import "./../../styles/PatelComment.css";
import {Link} from "react-router-dom";

function Patelcomment(){
    return(
        <div className="patelCommentPage_outermost_box">
            <Navbar />
            <div className="myComments_div">
               <Link to="/myallcomments" style={{ color: "inherit", textDecoration: "none" }}>
                    My Comments
               </Link>
            </div>
            <CommentList />
        </div>
    );
}

export default Patelcomment;