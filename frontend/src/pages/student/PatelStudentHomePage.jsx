import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Gallary from "../../components/Gallery.jsx";
import CurrentMessMenu from "../../components/CurrentMessMenu.jsx";
import Review from "../../components/Review.jsx";
import CommentSegment from "../../components/CommentSegment.jsx";
import Patelintro from "../../components/patelStudentComponents/Patelintro.jsx";
import Complaint from "../../components/Complaint.jsx";
import Randomcomplaint from "../../components/RandomComplaint.jsx";
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