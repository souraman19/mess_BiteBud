import React from "react";
import Randomdaymessmenu from "./../../components/Randomdaymessmenu";
import Navbar from "./../../components/Navbar";


function Patelfullmenu(){
    return (
        <div>
            <Navbar />
            <div>
            <Randomdaymessmenu day="Monday munchies madness"/>
            <Randomdaymessmenu day="tasty Tuesday treats"/>
            <Randomdaymessmenu day="whacky Wednesday bites"/>
            <Randomdaymessmenu day = "thrilling Thursday tastings"/>
            <Randomdaymessmenu day = "fantastic foodie Fridays"/>
            <Randomdaymessmenu day = "sizzling Saturday flavors"/>
            <Randomdaymessmenu day = "Sunday feast frenzy"/>
            </div>
        </div>
    );
}
export default Patelfullmenu;