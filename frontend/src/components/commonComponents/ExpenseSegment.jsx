import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpensePieChart from "./ExpensePieChart";
import axios from "axios";
import "./../../styles/ExpenseSegment.css";

const data = [
    { name: 'Rent', value: 800 },
    { name: 'Groceries', value: 300 },
    { name: 'Utilities', value: 150 },
    { name: 'Entertainment', value: 100 },
    { name: 'Transportation', value: 120 },
  ];






function ExpenseSegment() {
    const myDefaultData = [
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        // { name: 'NULL', value: 100 },
      ];
    const [currentMonthExpenses, setCurrentMonthExpenses] = useState([myDefaultData]);
    const [previousMonthExpenses, setPreviousMonthExpenses] = useState([myDefaultData]);
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    console.log("current month index", currentMonthIndex);

    useEffect(() => {
        const getExpenses = async() => {
            try{
                const response = await axios.get("http://localhost:5000/api/fetchallmonthsexpenses_piechart");
                console.log("hui expnssss",response.data);
                setTimeout(()=>{
                if(response.data[currentMonthIndex].length === 0){
                    setCurrentMonthExpenses(myDefaultData);
                } else {
                    setCurrentMonthExpenses(response.data[currentMonthIndex]);
                }

                if(response.data[currentMonthIndex-1].length === 0){
                    setPreviousMonthExpenses(myDefaultData);
                } else {
                    setPreviousMonthExpenses(response.data[currentMonthIndex-1]);
                }

                }, 1);
            }catch(err){
                console.log("Error in getting expenses", err);
            }
        }
        getExpenses();
    }, [])

    return (
        <div>
            {/* <h1>Expense</h1> */}
            <h1 style={{textAlign:"center"}}>
                <Link to="/editexpensepage"> See more expenses </Link>
            </h1>
            <div id="current_plus_previous_month_expenses">
                <ExpensePieChart data = {currentMonthExpenses} />
                <ExpensePieChart data = {previousMonthExpenses} />
            </div>

        </div>
    );
}

export default ExpenseSegment;