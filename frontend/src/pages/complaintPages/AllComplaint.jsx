import React from "react";
import Navbar from "../../components/commonComponents/Navbar";
import ComplaintList from "../../components/commonComponents/ComplaintList";
import "./../../styles/PatelAllComplaint.css";
import { Link } from "react-router-dom";

function AllComplaint() {
  return (
    <div id="PatelAllComplaint_outermost_div" className="">
      <Navbar />
      <div style={{display:"flex", justifyContent:"center"}}>
        <Link
          to="/complaint-page"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <h2 className="my_complaints">All Complaints</h2>
        </Link>
        <Link
          to="/myallcomplaints-page"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <h2 className="my_complaints">My Complaints</h2>
        </Link>
      </div>
      <ComplaintList />
    </div>
  );
}

export default AllComplaint;
