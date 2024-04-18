import React from "react";
import Navbar from "./../components/Navbar";
import AccountantIntro from "../components/accountantComponents/AccountantIntro";
import { Link } from "react-router-dom";

function Accountant(){
    return(
        <div>
            <Navbar />
            <AccountantIntro />
            <h1>
                <Link to="/editexpensepage"> Go to expense edit page </Link>
            </h1>
        </div>
    );
}
export default Accountant;