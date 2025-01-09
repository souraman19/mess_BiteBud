import React, { useState, useEffect } from "react";
import PieChartSlide from "./../commonComponents/PieChartSlide.jsx";
import { useStateProvider } from "../../context/StateContext";
import { GET_EXPENSES } from "./../../utils/ApiRoutes.js";
import { eachYearOfInterval } from "date-fns";
import axios, { all } from "axios";
import "./../../styles/EveryMonthsExpenses.css";
import "./../commonComponents/Histogram.jsx";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import Histogram from "./../commonComponents/Histogram.jsx";


const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const sampledata = {
  labels: ["Category 1", "Category 2", "Category 3", "Category 4"], // X-axis labels
  values: [12, 19, 3, 5], // Y-axis values (frequency counts)
};

function EveryMonthsExpenses() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const hostel = userInfo.hostel;

  // const [yearList, setYearList] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [formatedExpensesByYearMonthMain, setFormattedExpensesByYearMonthMain] =
    useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const currentMonthIndex = new Date().getMonth();
  const [allTotalExpensesInMonth, setAllTotalExpensesInMonth] = useState([]);

  async function fetchAllExpenses() {
    let tempAllTotalExpenses = [];
    for (let i = 11; i >= 0; i--) {
      let getMonthIndex_Expense = currentMonthIndex - i;
      let everyMonthExpense_yearIndex = 0;  //if current year then let it be 0
      if (getMonthIndex_Expense < 0) {
        getMonthIndex_Expense += 12;
        everyMonthExpense_yearIndex = -1;  //if prev year then mark it to add it to year current
      }
      let everyMonthExpense_month_string = (getMonthIndex_Expense + 1).toString();
      if(everyMonthExpense_month_string.length < 2){
        everyMonthExpense_month_string = '0' + everyMonthExpense_month_string; 
      }
      const everyMonthExpense_year = new Date().getFullYear() + everyMonthExpense_yearIndex;
      const everyMonthExpense_year_string = everyMonthExpense_year.toString();
      tempAllTotalExpenses.push({
        yearMonth: everyMonthExpense_year_string +'-'+ everyMonthExpense_month_string,
        month: months[getMonthIndex_Expense],
        expense: 0,
      });
    }
    try {
      const response = await axios.get(GET_EXPENSES, {
        params: { hostel },
        withCredentials: true,
      });
      // console.log("rep", response.data);
      const allGotExpenses = response.data.expenses;
      setAllExpenses(allGotExpenses);
      // const years = [];
      const formatedExpensesByYear_Month = [];
      allGotExpenses.forEach((singleExpenseBucket) => {
        const yearMonth = singleExpenseBucket.yearMonth;
        const year = yearMonth.split("-")[0];
        const month = months[yearMonth.split("-")[1] - 1];
        let yearExisting = formatedExpensesByYear_Month.find(
          (el) => el.year === year
        );
        if (!yearExisting) {
          yearExisting = {
            year: year,
            allMonthExpenses: [],
          };
          // years.push(year);
          formatedExpensesByYear_Month.push(yearExisting);
        }

        // console.log("year", yearExisting);
        let monthExisting = yearExisting.allMonthExpenses.find(
          (el) => el.month === month
        );
        if (!monthExisting) {
          monthExisting = {
            month: month,
            expensesByCategory: [],
          };
          yearExisting.allMonthExpenses.push(monthExisting);
        }

        singleExpenseBucket.expenses.forEach((singleExpenseList) => {
          singleExpenseList.allItems.forEach((singleItemExpense) => {
            const itemCategory = singleItemExpense.itemCategory;

            let categoryExisting = monthExisting.expensesByCategory.find(
              (item) => item.category === itemCategory
            );

            if (!categoryExisting) {
              categoryExisting = {
                name: itemCategory,
                value: 0,
              };
              monthExisting.expensesByCategory.push(categoryExisting);
            }

            const refInAllMonthExpensesArray = tempAllTotalExpenses.find(
              (item) => item.yearMonth === yearMonth
            );
            if(refInAllMonthExpensesArray) {
              refInAllMonthExpensesArray.expense +=
              singleItemExpense.totalItemCost;
            }

            categoryExisting.value += singleItemExpense.totalItemCost;
          });
        });
      });
      // console.log("yearlsit", years);
      formatedExpensesByYear_Month.forEach((singleYearExpenses) => {
        singleYearExpenses.allMonthExpenses.sort((a, b) => {
          const indexA = months.indexOf(a.month);
          const indexB = months.indexOf(b.month);
          // console.log(a.month," ", indexA," ", b.month," ", indexB);
          return indexB - indexA;
        });
      });
      // years.sort((a, b) => a - b);
      formatedExpensesByYear_Month.sort((a, b) => b.year - a.year);
      // console.log("formaetd expenses", formatedExpensesByYear_Month);
      // console.log("years", formatedExpensesByYear_Month);

      setSelectedYear(formatedExpensesByYear_Month[0].year);
      setSelectedIndex(0);
      // setYearList(years);
      setFormattedExpensesByYearMonthMain(formatedExpensesByYear_Month);

      setAllTotalExpensesInMonth(tempAllTotalExpenses);
      console.log("temp values", tempAllTotalExpenses);
    } catch (err) {
      console.error("Error in fetching the expenses", err);
    }
  }

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  useEffect(() => {
    console.log(allTotalExpensesInMonth);
  }, [allTotalExpensesInMonth]);

  // useEffect(() => {
  //   console.log("main", formatedExpensesByYearMonthMain[selectedIndex]);
  //   console.log("index", selectedIndex);

  // }, [formatedExpensesByYearMonthMain])

  useEffect(() => {
    // console.log("index", selectedIndex);
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    const ind = formatedExpensesByYearMonthMain.findIndex(
      (item) => item.year === event.target.value
    );
    setSelectedIndex(ind);
  };

  return (
    <>
      <div>
        <div>
          {formatedExpensesByYearMonthMain.length > 0 && (
            <div>
              <h1>All Expenses</h1>
              <label htmlFor="year-select">
                See Yearwise Expenses of all months:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {formatedExpensesByYearMonthMain.map((singleYearExpenses) => (
                  <option
                    key={singleYearExpenses.year}
                    value={singleYearExpenses.year}
                  >
                    {singleYearExpenses.year}
                  </option>
                ))}
              </select>
              <Swiper
                slidesPerView={2}
                spaceBetween={0}
                freeMode={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: true,
                }}
                className="mySwiper"
              >
                {formatedExpensesByYearMonthMain[
                  selectedIndex
                ].allMonthExpenses.map((singleMonthExpenses) => {
                  // console.log("se", selectedIndex);
                  return (
                    <SwiperSlide
                      key={singleMonthExpenses.month}
                      className="swiper-slide-everymonthexpenses"
                    >
                      <PieChartSlide
                        data={singleMonthExpenses.expensesByCategory}
                        heading={singleMonthExpenses.month}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>

        <div>
          {allTotalExpensesInMonth.length > 0 && (
            <div>
              <h2>Expenses by Month</h2>
              <div className="bar-graph-container">
                {allTotalExpensesInMonth.map((monthData) => {
                  const maxExpense = Math.max(
                    ...allTotalExpensesInMonth.map((item) => item.expense)
                  );
                  const barHeight = (monthData.expense / maxExpense) * 100;
                  // console.log(monthData.month, " ", `${100-barHeight}%`);
                  return (
                    <div key={monthData.month} className="bar-container">
                      <div className="bar">
                        <div
                          className="bar-empty-part"
                          style={{ height: `${100-barHeight}%` }}
                        >
                          
                        </div>
                        <div
                          className="bar-fill-part"
                          style={{ height: `${barHeight}%` }}
                        >
                          
                        </div>
                      </div>
                      <span className="month-label">{monthData.month}' {monthData.yearMonth.substring(2, 4)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EveryMonthsExpenses;
