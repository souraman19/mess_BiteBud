import React from "react";
// import Navbar from "../../components/commonComponents/Navbar.jsx";
import Todaysexpense from "./TodaysExpense.jsx";
import EveryMonthsExpenses from "./EveryMonthsExpenses.jsx";
import AnyDayExpenseSegment from "./AnyDayExpenseSegment.jsx";

function AllExpenses() {
  return (
    <div>
    <Todaysexpense />
     <EveryMonthsExpenses />
     <AnyDayExpenseSegment />
    </div>
  );
}
export default AllExpenses;
