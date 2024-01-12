import React from "react";
import Navbar from "./../components/Navbar.jsx";
import Gallary from "../components/Gallery.jsx";
import Currentmessmenu from "./../components/Currentmessmenu.jsx";
import Review from "../components/Review.jsx";
import CommentSegment from "../components/CommentSegment.jsx";
import Patelintro from "./../components/Patelintro.jsx";
import Complaint from "../components/Complaint.jsx";
import Randomcomplaint from "./../components/Randomcomplaint.jsx";

//style for whole patel main or first page
import "./../styles/patelmainpagestyle.css";

function Patelstudent(){
    return(
        <div>
        <Navbar />
        <Patelintro />

         {/* //working on ui*/}
        <Currentmessmenu />  


        <Gallary />

        
        <CommentSegment />

        
        {/* <Randomcomplaint /> */}
        {/* <Review /> */}
        {/* <Comment /> */}
        {/* <Complaint /> */}
    </div>
    );
}
export default Patelstudent;