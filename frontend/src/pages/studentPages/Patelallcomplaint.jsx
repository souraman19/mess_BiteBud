import React from "react";
import Navbar from "../../components/Navbar";
import ComplaintList from "../../components/ComplaintList";
import "./../../styles/PatelAllComplaint.css";
import {Link} from "react-router-dom";

function PatelAllComplaint(){

        return (
            <div id="PatelAllComplaint_outermost_div" className="">
                <Navbar />
                <Link to="/myallcomplaints" style={{color:"inherit", textDecoration:"none"}}>
                    <h2 className="my_complaints">My Complaints</h2>
                </Link>
                <ComplaintList 
                />
            </div>
        );
}

export default PatelAllComplaint;