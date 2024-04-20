import React from "react";
import Navbar from "../../components/Navbar";
import ComplaintList from "../../components/ComplaintList";
import "./../../styles/PatelAllComplaint.css";

function PatelAllComplaint(){

        return (
            <div id="PatelAllComplaint_outermost_div" className="">
                <Navbar />
                <ComplaintList 
                />
            </div>
        );
}

export default PatelAllComplaint;