import React from "react";
import Navbar from "./../../components/Navbar";
import EditExpenseTable from "./EditExpenseTable";

function EditExpensePage(){
    return(
        <div>
            <Navbar />
            <EditExpenseTable />
        </div>
    );
}
export default EditExpensePage;