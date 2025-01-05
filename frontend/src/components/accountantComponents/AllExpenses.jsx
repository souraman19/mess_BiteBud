import React from "react";
// import Navbar from "../../components/commonComponents/Navbar.jsx";
import Todaysexpense from "./TodaysExpense.jsx";
import EveryMonthsExpenses from "./EveryMonthsExpenses.jsx";


function AllExpenses() {
  return (
    <div>
    <Todaysexpense />
     <EveryMonthsExpenses />
    </div>
  );
}
export default AllExpenses;
