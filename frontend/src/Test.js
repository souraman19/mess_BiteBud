import React from "react";
import axios from "axios";

function test(){ 
    
async function f(){
    try{
        const data = {
            name: "Sourajit",
            age: 18
        }
        console.log("fkd");
        await axios.post("http://localhost:7000/api/add-user", data);
    }catch(err){
        console.log(err);
    }
}

    return (
        <>
        <div>hello</div>
        <button onClick={() => f()}>
            Submit
        </button>
    </>
    )
}

export default test;