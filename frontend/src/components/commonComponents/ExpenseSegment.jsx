import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../../styles/ExpenseSegment.css";
import { GET_EXPENSES_PREV_CURR_MONTH } from "./../../utils/ApiRoutes.js";
import { useStateProvider } from "../../context/StateContext";
import PieChartSlide from "./PieChartSlide.jsx";

function ExpenseSegment() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const hostel = userInfo.hostel;

  const myDefaultData = [
    { name: "NULL", value: 100 },
    { name: "NULL", value: 100 },
    { name: "NULL", value: 100 },
    { name: "NULL", value: 100 },
    { name: "NULL", value: 100 },
  ];
  const [currentMonthExpensesByCategory, setCurrentMonthExpensesByCategory] =
    useState(myDefaultData);
  const [currentMonthExpensesByVendor, setCurrentMonthExpensesByVendor] =
    useState(myDefaultData);

  const fetchExpensesCurrMonth = async (req, res) => {
    try {
      const response = await axios.get(GET_EXPENSES_PREV_CURR_MONTH, {
        params: { hostel: hostel },
      });
      // console.log("response date", response.data);
      const receivedData = response.data;
      const formatedDataByCategory = [];
      const formatedDataByVendor = [];


      //format data by category
      receivedData.forEach((singleBucket) => {
        singleBucket.expenses.forEach((singleExpenseList) => {
          singleExpenseList.allItems.forEach((singleItemExpense) => {
            const existing = formatedDataByCategory.find(
              (item) => item.name === singleItemExpense.itemCategory
            );
            if (existing) {
              existing.value += singleItemExpense.totalItemCost;
            } else {
              formatedDataByCategory.push({
                name: singleItemExpense.itemCategory,
                value: singleItemExpense.totalItemCost,
              });
            }
          });
        });
      });

      //format data by vendor name
      receivedData.forEach((singleBucket) => {
        singleBucket.expenses.forEach((singleExpenseList) => {
          singleExpenseList.allItems.forEach((singleItemExpense) => {
            const existing = formatedDataByVendor.find(
              (item) => item.name === singleBucket.vendorName
            );
            if (existing) {
              existing.value += singleItemExpense.totalItemCost;
            } else {
              formatedDataByVendor.push({
                name: singleBucket.vendorName,
                value: singleItemExpense.totalItemCost,
              });
            }
          });
        });
      });

      setCurrentMonthExpensesByCategory(formatedDataByCategory);
      setCurrentMonthExpensesByVendor(formatedDataByVendor);
    } catch (err) {
      console.log("Error in fetchng prev and current month expenses", err);
    }
  };

  useEffect(() => {
    fetchExpensesCurrMonth();
  }, []);

  return (
    <div className="expense-segment-container">
      <div className="upper-section-expense-segment">
        <h1 className="heading">Expenses</h1>
        <p>See current month expenses of our mess</p>
        <Link to="/expense-page">
          <a class="btn btn-outline-secondary" href="#" role="button">
            Go to expense Page
          </a>
        </Link>
      </div>
      <div className="expense-charts-container">
        <PieChartSlide 
            data = {currentMonthExpensesByCategory}
            heading = "By Category"
        />
        <PieChartSlide 
            data = {currentMonthExpensesByVendor}
            heading = "By Vendors"
        />
      </div>
    </div>
  );
}

export default ExpenseSegment;
