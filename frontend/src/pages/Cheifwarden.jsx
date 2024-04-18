import React from "react";
import Navbar from "./../components/Navbar.jsx";
import Gallary from "../components/Gallery.jsx";
import Comment from "../components/CurrentMessMenu.jsx"
import Currentmenu from "../components/CurrentMessMenu.jsx"
import Review from "../components/Review.jsx";
import Feedback from "../components/CommentSegment.jsx";
import Cheifwardenintro from "../components/CheifwardenIntro.jsx";
import Complaintchiefwarden from "../components/ComplaintChiefWarden.jsx";

function Cheifwarden(){
    return(
        <div>
        <Navbar />
        <Cheifwardenintro />
        {/* <Review /> */}
        <Feedback />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        {/* <Complaint /> */}
        <Complaintchiefwarden />

    </div>
    );
}
export default Cheifwarden;