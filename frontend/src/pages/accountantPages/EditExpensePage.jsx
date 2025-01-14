import React from "react";
import Navbar from "./../../components/commonComponents/Navbar";
import AllExpenses from "../../components/accountantComponents/AllExpenses";
import { Link } from "react-router-dom";
import grocery from "./emptycart.jpg";
import bill from "./addnewbill.avif";

function EditExpensePage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
      <Navbar />

      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h1 className="anydayExpense_heading" style={{  marginBottom: "10px" }}>
          Manage Your Expenses
        </h1>
        <p style={{ fontSize: "1.6rem", color: "#4a5568", marginBottom: "40px" }}>
          Explore the sections below to manage your expenses effectively.
        </p>

        {/* Grocery and Add Expense Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {/* Grocery Section */}
          <div
            style={{
              maxWidth: "600px",  // Reduced width
              borderRadius: "12px",
              overflow: "hidden",
              paddingTop: "1rem",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              background: "white",
              transition: "transform 0.3s, box-shadow 0.3s",
              flex: "1",
              minWidth: "250px",  // Reduced minimum width
            }}
            className="hover:transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={grocery}
              alt="Grocery"
              style={{ width: "100%", height: "300px", objectFit: "contain" }}  // Reduced height
            />
            <div style={{ padding: "20px" }}>  {/* Reduced padding */}
              <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "#2d3748" }}>Grocery Items</h2> {/* Reduced font size */}
              <p style={{ fontSize: "1.4rem", color: "#718096", marginBottom: "15px" }}>  {/* Reduced font size */}
                Manage your grocery items and keep track of essentials effortlessly.
              </p>
              <Link
                to="/grocery"
                className="btn btn-primary"
                style={{
                  display: "inline-block",
                  backgroundColor: "#3182ce",
                  color: "#fff",
                  padding: "10px 18px",  // Reduced padding
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#3182ce")}
              >
                Go to Grocery
              </Link>
            </div>
          </div>

          {/* Add Expense Section */}
          <div
            style={{
              maxWidth: "600px",  // Reduced width
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              background: "#ffffff",
              paddingTop: "1rem",
              transition: "transform 0.3s, box-shadow 0.3s",
              flex: "1",
              minWidth: "250px",  // Reduced minimum width
            }}
            className="hover:transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={bill}
              alt="Add Expense"
              style={{ width: "100%", height: "300px", objectFit: "contain" }}  // Reduced height
            />
            <div style={{ padding: "20px" }}>  {/* Reduced padding */}
              <h2 style={{ fontSize: "1.8rem", marginBottom: "12px", color: "#2d3748" }}>Add New Expense</h2> {/* Reduced font size */}
              <p style={{ fontSize: "1.4rem", color: "#718096", marginBottom: "15px" }}>  {/* Reduced font size */}
                Add new expenses and maintain your financial records effortlessly.
              </p>
              <Link
                to="/add-new-expense"
                className="btn btn-primary"
                style={{
                  display: "inline-block",
                  backgroundColor: "#48bb78",
                  color: "#fff",
                  padding: "10px 18px",  // Reduced padding
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                }}
                
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#38a169")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#48bb78")}
              >
                Add Expense
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All Expenses Section */}
      <div
        style={{
          background: "#edf2f7",
          padding: "30px",
          borderRadius: "12px",
          margin: "40px auto",
          maxWidth: "90%",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* <h2  className="anydayExpense_heading" >
          All Expenses
        </h2> */}
        <AllExpenses />
      </div>
    </div>
  );
}

export default EditExpensePage;
