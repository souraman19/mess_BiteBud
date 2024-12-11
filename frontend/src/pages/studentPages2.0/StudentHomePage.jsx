import React from "react";
import Navbar from "../../components/commonComponents/Navbar.jsx";
import Gallary from "../../components/commonComponents/Gallery.jsx";
import CurrentMessMenu from "../../components/commonComponents/CurrentMessMenu.jsx";
// import Review from "../../components/commonComponents/Review.jsx";
import CommentSegment from "../../components/commonComponents/CommentSegment.jsx";
import Patelintro from "../../components/studentComponents/Patelintro.jsx";
import Complaint from "../../components/commonComponents/Complaint.jsx";
// import Randomcomplaint from "../../components/commonComponents/RandomComplaint.jsx";
import ExpenseSegment from '../../components/commonComponents/ExpenseSegment.jsx';

//style for whole patel main or first page
import "./../../styles/PatelStudentHomePage.css";


function Patelstudent(){

    return(
        <div>
        <Navbar />
         <Patelintro />
        {/* <ExpenseSegment /> */}

        {/* <CurrentMessMenu />   */}


        <Gallary />

        
        <CommentSegment />


        <Complaint /> 
    </div>
    );
}
export default Patelstudent;