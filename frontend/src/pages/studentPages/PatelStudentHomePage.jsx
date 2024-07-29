import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Gallary from "../../components/Gallery.jsx";
import CurrentMessMenu from "../../components/commonComponents/CurrentMessMenu.jsx";
import Review from "../../components/commonComponents/Review.jsx";
import CommentSegment from "../../components/CommentSegment.jsx";
import Patelintro from "../../components/studentComponents/Patelintro.jsx";
import Complaint from "../../components/commonComponents/Complaint.jsx";
import Randomcomplaint from "../../components/commonComponents/RandomComplaint.jsx";
import {useUser} from "../../UserContext.js";

//style for whole patel main or first page
import "./../../styles/PatelStudentHomePage.css";


function Patelstudent(){
    const {user} = useUser();
    if (!user) {
        return <div>Loading...</div>; // or handle no user scenario
    }

    return(
        <div>
        <Navbar />
        {/* <Patelintro /> */}

        <CurrentMessMenu />  


        <Gallary />

        
        <CommentSegment />


        <Complaint />
    </div>
    );
}
export default Patelstudent;