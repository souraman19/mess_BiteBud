import React from "react";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import Gallary from "../../components/commonComponents/Gallery.jsx";
// import Comment from "../../components/commonComponents/CurrentMessMenu.jsx"
import Currentmenu from "../../components/commonComponents/CurrentMessMenu.jsx"
// import Review from "../../components/commonComponents/Review.jsx";
import Feedback from "../../components/commonComponents/CommentSegment.jsx";
import Cheifwardenintro from "../../components/chiefWardenComponents/CheifwardenIntro.jsx";
import Complaint from "./../../components/commonComponents/Complaint.jsx";

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
        <Complaint />

    </div>
    );
}
export default Cheifwarden;