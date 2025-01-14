import React from "react";
import { useState, useEffect } from "react";
import { GET_EXPENSES } from "./../../utils/ApiRoutes.js";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/AnyDayExpenseSegment.css";

const getFullDate = (date) => {
  const myDate = `${new Date(date).getFullYear()}-${String(
    new Date(date).getMonth() + 1
  ).padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`;
  return myDate;
};

const formatDateToTime = (buyDate) => {
  const date = new Date(buyDate);
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Enable AM/PM format
  };

  const formattedDate = date.toLocaleString("en-IN", options);
  return formattedDate;
};

function AnyDayExpenseSegment() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const identity = userInfo.userType;
  const hostel = userInfo.hostel;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayExpenses, setSelectedDayExpenses] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    fetchSelectedExpenses(event.target.value);
  };

  async function fetchSelectedExpenses(mySelectedDate) {
    try {
      const response = await axios.get(GET_EXPENSES, {
        params: { hostel },
        withCredentials: true,
      });
      const allExpenses = response.data.expenses;
      const updatedExpenses = [];
      allExpenses.forEach((single_VendorItemMonth) => {
        single_VendorItemMonth.expenses.forEach((single_Expense_list) => {
          single_Expense_list.allItems.forEach((singleItemExpense) => {
            const itemName = singleItemExpense.itemName;
            const quantity = singleItemExpense.itemQuantity;
            const totalCost = singleItemExpense.totalItemCost;
            const vendor = single_VendorItemMonth.vendorName;
            const bucketId = single_VendorItemMonth.bucketId;
            const billId = single_Expense_list.billId;
            const itemId = singleItemExpense.itemId;
            const buyDate = singleItemExpense.buyDate;
            const buyTime = singleItemExpense.buyTime;
            const entryDateTime = singleItemExpense.entryDateTime;
            if (singleItemExpense.buyDate === mySelectedDate) {
              updatedExpenses.push({
                itemName,
                quantity,
                totalCost,
                vendor,
                bucketId,
                billId,
                itemId,
                buyDate,
                buyTime,
                entryDateTime,
              });
            }
          });
        });
      });
      setSelectedDayExpenses(updatedExpenses);
    } catch (err) {
      console.error("Error in fetching the expenses", err);
    }
  }

  useEffect(() => {
    // Fetch expenses when selectedDate changes
  }, [selectedDayExpenses]);

  return (
    <div>
      <div className="anydayExpense_heading">Daily Expense Tracker</div>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      {selectedDate && selectedDayExpenses.length > 0 && (
        <div className="todays_expense_section">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Cost(₹)</th>
                <th>Vendor</th>
                <th>Buy Date - Time</th>
                <th>Entry Date - Time</th>
              </tr>
            </thead>
            <tbody>
              {selectedDayExpenses.map((singleItemExpense, index) => (
                <tr key={index}>
                  <td>{singleItemExpense.itemName}</td>
                  <td>
                    {singleItemExpense.quantity.amount}{" "}
                    {singleItemExpense.quantity.itemUnit}
                  </td>
                  <td>{singleItemExpense.totalCost}</td>
                  <td>{singleItemExpense.vendor}</td>
                  <td>
                    {singleItemExpense.buyDate} - {singleItemExpense.buyTime}
                  </td>
                  <td>
                    {getFullDate(singleItemExpense.entryDateTime)} -{" "}
                    {formatDateToTime(singleItemExpense.entryDateTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedDate && selectedDayExpenses.length === 0 && (
        <div className="empty-expense-section">
          <dotlottie-player
            src="https://lottie.host/97a9b4e6-6ab2-4b73-ae71-1b044a633b01/TRe6Jrifl1.lottie"
            background="transparent"
            speed="1"
            style={{ width:"300px", height: "300px"}}
            loop
            autoplay
          ></dotlottie-player>
          <p className="no-expense-message">
            No expenses found for the selected date. Start tracking today!
          </p>
        </div>
      )}
    </div>
  );
}

export default AnyDayExpenseSegment;
