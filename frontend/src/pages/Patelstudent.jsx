import React from "react";
import Navbar from "./../components/Navbar.jsx";
import Gallary from "../components/Gallery.jsx";
import Currentmenu from "./../components/Currentmessmenu.jsx"
import Review from "../components/Review.jsx";
import Comment from "../components/Comment.jsx";
import Patelintro from "./../components/Patelintro.jsx";
import Complaint from "../components/Complaint.jsx";
import Randomcomplaint from "./../components/Randomcomplaint.jsx";

function Patelstudent(){
    return(
        <div>
        <Navbar />
        <Patelintro />
        {/* <Randomcomplaint /> */}
        {/* <Review /> */}
        <Comment />
        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        <Complaint />
    </div>
    );
}
export default Patelstudent;