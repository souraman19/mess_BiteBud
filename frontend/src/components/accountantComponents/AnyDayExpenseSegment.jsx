import React from "react";
import { useState, useEffect } from "react";
import { GET_EXPENSES } from "./../../utils/ApiRoutes.js";
import axios, { all } from "axios";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/AnyDayExpenseSegment.css";
// import Lottie from "react-lottie";
// import emptyAnimation from "./../../animations/emptyCart.json"; 

const getFullDate = (date) => {
    const myDate = `${new Date(date).getFullYear()}-${
        String(new Date(date).getMonth() + 1).padStart(2, "0")
      }-${
        String(new Date(date).getDate()).padStart(2, "0")
      }`;
      return myDate;
  }

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
  }

  // Lottie animation options
  // const lottieOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: emptyAnimation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  const formatBuyTime = (buyDate) => {
    const date = new Date(buyDate);
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Enable AM/PM format
    };
    
    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate;
  }

function AnyDayExpenseSegment(){
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
      try{
        const response = await axios.get(GET_EXPENSES, {params:{hostel}, withCredentials: true});
        const allExpenses = response.data.expenses;
        const updatedExpenses = []; 
        allExpenses.forEach((single_VendorItemMonth)=> {
          single_VendorItemMonth.expenses.forEach((single_Expense_list) => {
            single_Expense_list.allItems.forEach((singleItemExpense)=> {
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
              // setTodaysExpenses([...todaysExpenses, {
              //   itemName: itemName,
              //   quantity: quantity,
              //   totalCost: totalCost,
              //   vendor: vendor
              // }])                   //cant do it directly as setTodaysExpenses asynchronous type 
              // alert("next");
              if(singleItemExpense.buyDate === mySelectedDate){
                // alert(singleItemExpense.buyDate);
                // alert(mySelectedDate);
                updatedExpenses.push({
                  itemName: itemName,
                  quantity: quantity,
                  totalCost: totalCost,
                  vendor: vendor,
                  bucketId: bucketId,
                  billId: billId,
                  itemId: itemId,
                  buyDate: buyDate,
                  buyTime: buyTime,
                  entryDateTime: entryDateTime,
                });
              }
            })
          })
        })
        // alert(updatedExpenses.length);
        setSelectedDayExpenses(updatedExpenses);
      }catch(err){
        console.error("Error in fetching the expenses", err);
      }
    }

useEffect(()=> {
//  alert(selectedDayExpenses.length);
}, [selectedDayExpenses])


    return (
        <div>
          <div className="anydayExpense_heading">Daily Expense Tracker</div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        {selectedDate && selectedDayExpenses.length > 0 &&  <div>
          <div className="todays_expense_section" >
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Cost(₹)</th>
                <th>Vendor</th>
                <th>Buy Date - Time</th>
                <th>Entry Date - Time</th>
                {/* {identity === "Student" && <th className="daily_expense_delete_edit_expense_block">Action</th>} */}
              </tr>
            </thead>
            <tbody>
              {selectedDayExpenses.map((singleItemExpense, index) =>
                  <tr>
                    <td>{singleItemExpense.itemName}</td>
                    <td>{singleItemExpense.quantity.amount} {singleItemExpense.quantity.itemUnit}</td>
                    <td>{singleItemExpense.totalCost}</td>
                    <td>{singleItemExpense.vendor}</td>
                    <td>{singleItemExpense.buyDate} - {singleItemExpense.buyTime}</td>
                    <td>{getFullDate(singleItemExpense.entryDateTime)} - {formatDateToTime(singleItemExpense.entryDateTime)}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        
        </div>}
        {/* {selectedDate && selectedDayExpenses.length === 0 && (
        <div className="empty-expense-section">
          <Lottie options={lottieOptions} height={300} width={300} />
          <p className="no-expense-message">
            No expenses found for the selected date. Start tracking today!
          </p>
        </div>
      )} */}
      </div>
    );
}

export default AnyDayExpenseSegment;