import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpensePieChart from "./ExpensePieChart";
import axios from "axios";
import "./../../styles/ExpenseSegment.css";

function ExpenseSegment() {
    const myDefaultData = [
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
        { name: 'NULL', value: 100 },
    ];
    const [currentMonthExpenses, setCurrentMonthExpenses] = useState(myDefaultData);
    const [previousMonthExpenses, setPreviousMonthExpenses] = useState(myDefaultData);
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    console.log("Current month index", currentMonthIndex);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/fetchallmonthsexpenses_piechart");
                console.log("Expenses data", response.data);
                setTimeout(() => {
                    if (response.data[currentMonthIndex].length === 0) {
                        setCurrentMonthExpenses(myDefaultData);
                    } else {
                        setCurrentMonthExpenses(response.data[currentMonthIndex + 1]);
                    }

                    if (response.data[currentMonthIndex].length === 0) {
                        setPreviousMonthExpenses(myDefaultData);
                    } else {
                        setPreviousMonthExpenses(response.data[currentMonthIndex]);
                    }
                }, 20);
            } catch (err) {
                console.log("Error in getting expenses", err);
            }
        }
        getExpenses();
    }, []);

    return (
        <div className="expense-segment-container">
            <h1 className="expense-title">
                <Link to="/editexpensepage" className="expense-link">
                    See more expenses
                </Link>
            </h1>
            <div className="expense-charts-container">
                <div className="chart-wrapper">
                    <h2 className="chart-title">Current Month</h2>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <ExpensePieChart data={currentMonthExpenses} />
                    </div>
                </div>
                <div className="chart-wrapper">
                    <h2 className="chart-title">Previous Month</h2>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <ExpensePieChart data={previousMonthExpenses} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseSegment;
