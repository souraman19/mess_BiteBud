import React from "react";
import Navbar from "../../components/commonComponents/Navbar.jsx";
import AccountantIntro from "../../components/accountantComponents/AccountantIntro.jsx";
// import { Link } from "react-router-dom";
import Gallary from "../../components/commonComponents/Gallery.jsx";
import Feedback from "../../components/commonComponents/CommentSegment.jsx";
import Complaint from "../../components/commonComponents/Complaint.jsx";
import Currentmenu from "../../components/commonComponents/CurrentMessMenu.jsx";
import ExpenseSegment from "./../../components/commonComponents/ExpenseSegment.jsx";
function Accountant(){
    return(
        <div>
            <Navbar />
            <AccountantIntro />
            <ExpenseSegment />
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