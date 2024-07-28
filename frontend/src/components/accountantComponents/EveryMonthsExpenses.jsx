import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../styles/EveryMonthsExpenses.css";

function EveryMonthsExpenses() {
  const [allMonthsExpenses, setAllMonthsExpenses] = useState([]);

  useEffect(() => {
    fetchAllMonthsExpenses();
  }, []);
//   useEffect(() => {
//     fetchAllMonthsExpenses();
//   }, [allMonthsExpenses]);

  async function fetchAllMonthsExpenses() {
    try {
      const response = await axios.get("http://localhost:5000/api/fetchallmonthsexpenses");
    //   console.log(response.data);
      setAllMonthsExpenses(response.data);
    } catch (error) {
      console.error("Error fetching all months' expenses:", error);
    }
  }

  return (
    <div className="every_months_expenses_container">
      <h2>All Months Expenses This Year</h2>
      {allMonthsExpenses.map((monthExpenses, index) => (
        <div key={index} className="month_expenses">
          <h3>{monthExpenses.month}</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {monthExpenses.expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.itemName}</td>
                  <td>{expense.quantity} {expense.itemUnit}</td>
                  <td>{expense.totalCost}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default EveryMonthsExpenses;
