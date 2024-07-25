import React from "react";
import Navbar from "../../components/Navbar";
import Imagebunch from "../../components/ImageBunch";
import {Link} from "react-router-dom";
import "./../../styles/patelgallery.css";

function Patelgallery(){
    return(
        <div className="Patelgallery-outermost-div">
            <Navbar />
            <Link to = "/myallimages" style={{color:"inherit", textDecoration:"none"}}>
                <h1 className="my-imges-link">
                   My Images
                </h1>
            </Link>
            <h1>
                All Images
            </h1>
            <Imagebunch />
        </div>
    );
}
export default Patelgallery;