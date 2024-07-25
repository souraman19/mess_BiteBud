import React from "react";
import Navbar from "../../components/Navbar.jsx";
import Gallary from "../../components/Gallery.jsx";
import CurrentMessMenu from "../../components/CurrentMessMenu.jsx";
import Review from "../../components/Review.jsx";
import CommentSegment from "../../components/CommentSegment.jsx";
import Patelintro from "../../components/patelStudentComponents/Patelintro.jsx";
import Complaint from "../../components/Complaint.jsx";
import Randomcomplaint from "../../components/RandomComplaint.jsx";
import {useUser} from "./../../UserContext";

//style for whole patel main or first page
import "./../../styles/patelstudenthomepage.css";


function Patelstudent(){
    const {user, updateUser} = useUser();
    console.log("User in PatelStudentHomePage: ", user);
    console.log("User in PatelStudentHomePage: ", updateUser);

    return(
        <div>
        <Navbar />
        <Patelintro />

         {/* //working on ui*/}
        <CurrentMessMenu />  


        <Gallary />

        
        <CommentSegment />

        
        {/* <Randomcomplaint /> */}
        {/* <Review /> */}
        {/* <Comment /> */}
        <Complaint />
    </div>
    );
}
export default Patelstudent;