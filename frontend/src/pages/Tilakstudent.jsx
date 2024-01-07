import React from "react";
import Navbar from "./../components/Navbar.jsx";
import Gallary from "../components/Gallery.jsx";
import Comment from "../components/Currentmessmenu.jsx"
import Currentmenu from "./../components/Currentmessmenu.jsx"
import Review from "../components/Review.jsx";
import Feedback from "../components/Comment.jsx";
import Tilakintro from "./../components/Tilakintro.jsx";
import Complaint from "../components/Complaint.jsx";

function Patelstudent(){
    return(
        <div>
        <Navbar />
        <Tilakintro />
        {/* <Review /> */}
        <Feedback />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        <Complaint />
    </div>
    );
}
export default Patelstudent;