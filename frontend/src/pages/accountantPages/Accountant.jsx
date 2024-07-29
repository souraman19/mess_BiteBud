import React from "react";
import Navbar from "../../components/Navbar.jsx";
import AccountantIntro from "../../components/accountantComponents/AccountantIntro.jsx";
import { Link } from "react-router-dom";
import Gallary from "../../components/Gallery.jsx";
import Feedback from "../../components/CommentSegment.jsx";
import Complaint from "../../components/commonComponents/Complaint.jsx";
import Currentmenu from "../../components/commonComponents/CurrentMessMenu.jsx";
function Accountant(){
    return(
        <div>
            <Navbar />
            <AccountantIntro />
            <h1 style={{textAlign:"center"}}>
                <Link to="/editexpensepage"> Go to expense edit page </Link>
            </h1>
            <Feedback />

        <Currentmenu />
        {/* <Comment /> */}
        <Gallary />
        {/* <Complaint /> */}
        <Complaint />
        </div>
    );
}
export default Accountant;