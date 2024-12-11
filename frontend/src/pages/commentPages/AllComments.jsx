import React from "react";
import Navbar from "../../components/commonComponents/Navbar";
import CommentList from "../../components/commonComponents/CommentList";
import "./../../styles/PatelComment.css";
import {Link} from "react-router-dom";

function Patelcomment(){
    return(
        <div className="patelCommentPage_outermost_box">
            <Navbar />
            <div className="myComments_div">
            <Link to="/myallcomments-page" style={{ color: "inherit", textDecoration: "none" }}>
                    My Comments
               </Link>
               <Link to="/comment-page" style={{ color: "inherit", textDecoration: "none" }}>
                    All Comments
               </Link>
            </div>
            <CommentList />
        </div>
    );
}

export default Patelcomment;