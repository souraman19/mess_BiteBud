import React from "react";
import "./../../styles/ResolveMessage.css";
import { useState } from "react";
import axios from "axios";
import {useUser} from "./../../UserContext";

function ResolveMessage({onClose, complaintId}) {
    const {user, updateUser} = useUser();
    const [isResolvingWithMessage, setIsResolvingWithMessage] = useState(false);
    const [message, setMessage] = useState("");
    const identity = user.identity;
    const myName = user.name;
    const myUsername = user.username;
    const myRegNo = user.regNo;
    const myYear = user.year;
    const myProfilePic = user.profilePic;
    const handleResolveComplaintWithMessage = async () => {
        try{
            const updatedPortionWithData = {
                isResolved: true,
                resolvedBy: identity,
                resolvedTime: new Date(),
                resolvedMessage: message,
            }
            const response = await  (`http://localhost:5000/api/complaintRoutes/resolvecomplaint/${complaintId}`, updatedPortionWithData, {withCredentials: true});
            console.log("Updated data after resolving complaint", response.data);
            onClose();
        }catch(err){
            console.error("Error in resolving complaint with message", err);
        }
    }

    const handleResolveComplaintWithoutMessage = async () => {
        try{
            const updatedPortionWithData = {
                isResolved: true,
                resolvedBy: identity,
                resolvedTime: new Date(),
                resolvedMessage: "No Message",
            }
            const response = await axios.patch(`http://localhost:5000/api/complaintRoutes/resolvecomplaint/${complaintId}`, updatedPortionWithData, {withCredentials: true});
            console.log("Updated data after resolving complaint", response.data);
            onClose();
        }catch(err){
            console.error("Error in resolving complaint with message", err);
        }
    }

  return <div className="resolve-message-overlay">
    <div className="resolve-message-modal">
        <button className="btn custom-btn-light btn-lg" onClick={onClose}>
            <span>&times;</span>
        </button>
    <h1>Resolve Message</h1>
    {
        !isResolvingWithMessage &&
        <div className="resolve_without_message_resolve_button_div_resolve_message">
            <button onClick={handleResolveComplaintWithoutMessage} >Without Message</button>
            <button onClick={() => setIsResolvingWithMessage(true)}>With Message</button>
        </div>
    }
    {   isResolvingWithMessage && 
        <div className="resolve_message_with_message_box">
            <textarea id="auto-resize-textarea" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <div className="resolve_without_message_resolve_button_div_resolve_message">
                <button onClick={handleResolveComplaintWithMessage}>Resolve</button>
                <button onClick={() => setIsResolvingWithMessage(false)} >Cancel</button>
            </div>
        </div>
    }
    </div>
  </div>;
}

export default ResolveMessage;
