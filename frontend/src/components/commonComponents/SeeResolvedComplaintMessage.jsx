import React from "react";
import "./../../styles/SeeResolvedComplaintMessage.css";
// import { useState } from "react";
// import axios from "axios";
// import {useUser} from "./../../UserContext";

function ResolveMessage({onClose, resolvedMessage}) {
    console.log("resolvedMessage", resolvedMessage);
    

  return <div className="resolve-message-overlay_see_unresolved_complaint_message">
    <div className="resolve-message-modal_see_unresolved_complaint_message">
        <button className="btn custom-btn-light btn-lg" onClick={onClose}>
            <span>&times;</span>
        </button>
    <h1 className="see_unresolved_complaint_message_heading">Resolved Message</h1>
    <p>{resolvedMessage}</p>
    </div>
  </div>;
}

export default ResolveMessage;
