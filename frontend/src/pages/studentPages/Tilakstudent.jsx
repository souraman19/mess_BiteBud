import React from "react";
import Navbar from "../../components/commonComponents/Navbar.jsx";
import Gallary from "../../components/Gallery.jsx";
import Comment from "../../components/commonComponents/CurrentMessMenu.jsx"
import Currentmenu from "../../components/commonComponents/CurrentMessMenu.jsx"
import Review from "../../components/commonComponents/Review.jsx";
import CommmentSegment from "../../components/commonComponents/CommentSegment.jsx";
import Tilakintro from "../../components/studentComponents/Tilakintro.jsx";
import Complaint from "../../components/commonComponents/Complaint.jsx";

function Patelstudent(){
    return(
        <div>
        <Navbar />
        <Tilakintro />
        {/* <Review /> */}
        <CommmentSegment />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        <Complaint />
    </div>
    );
}
export default Patelstudent;