import React from "react";
import Navbar from "./../../components/commonComponents/Navbar";
import AllExpenses from "../../components/accountantComponents/AllExpenses";
import { Link } from "react-router-dom";

function EditExpensePage() {
  return (
    <div>
      <Navbar />
      <AllExpenses />
      <div style={{textAlign: "center", marginTop: "20px"}}>
      <Link to="/grocery">
        <a
          style={{borderTop: "1px solid #010", padding: "10px",  fontSize: "18px"}}
          className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          role="button"
        >
          Go to Grocery Item Page
        </a>
      </Link>
      <Link to="/add-new-expense">
        <a
          style={{borderTop: "1px solid #010", padding: "10px",  fontSize: "18px"}}
          className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          role="button"
        >
          Add New Expense
        </a>
      </Link>
      </div>
    </div>
  );
}
export default EditExpensePage;
