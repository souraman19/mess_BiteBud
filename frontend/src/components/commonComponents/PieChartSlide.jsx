import React from "react";
import "./../../styles/PieChartSlide.css";
import ExpensePieChart from "./ExpensePieChart";

function PieChartSlide({data, heading}){
    return (<>
        <div className="chart-wrapper">
          <h2 className="chart-title">{heading}</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExpensePieChart data={data} />
          </div>
        </div>
    </>)
}

export default PieChartSlide;