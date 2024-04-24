import React from "react";
import Navbar from "./../components/Navbar";
import AccountantIntro from "../components/accountantComponents/AccountantIntro";
import { Link } from "react-router-dom";
import Gallary from "../components/Gallery.jsx";
import Feedback from "../components/CommentSegment.jsx";
import Complaint from "./../../src/components/Complaint.jsx";
import Currentmenu from "../components/CurrentMessMenu.jsx";
function Accountant(){
    return(
        <div>
            <Navbar />
            <AccountantIntro />
            <h1 style={{textAlign:"center"}}>
                <Link to="/editexpensepage"> Go to expense edit page </Link>
            </h1>
            <Feedback />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        {/* <Complaint /> */}
        <Complaint />
        </div>
    );
}
export default Accountant;