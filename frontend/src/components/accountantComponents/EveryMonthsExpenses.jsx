import React, { useState, useEffect } from "react";
import PieChartSlide from "./../commonComponents/PieChartSlide.jsx";
import { useStateProvider } from "../../context/StateContext";
import { GET_EXPENSES } from "./../../utils/ApiRoutes.js";
import { eachYearOfInterval } from "date-fns";
import axios, { all } from "axios";
import "./../../styles/EveryMonthsExpenses.css";

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

const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function EveryMonthsExpenses() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const hostel = userInfo.hostel;

  // const [yearList, setYearList] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [formatedExpensesByYearMonthMain, setFormattedExpensesByYearMonthMain] =
    useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  async function fetchAllExpenses() {
    try {
      const response = await axios.get(GET_EXPENSES, {
        params: { hostel },
        withCredentials: true,
      });
      console.log("rep", response.data);
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
        })
      })
      // years.sort((a, b) => a - b);
      formatedExpensesByYear_Month.sort((a, b) => b.year - a.year);
      console.log("formaetd expenses", formatedExpensesByYear_Month);
      // console.log("years", formatedExpensesByYear_Month);

      setSelectedYear(formatedExpensesByYear_Month[0].year);
      setSelectedIndex(0);
      // setYearList(years);
      setFormattedExpensesByYearMonthMain(formatedExpensesByYear_Month);
    } catch (err) {
      console.error("Error in fetching the expenses", err);
    }
  }

  useEffect(() => {
    fetchAllExpenses();
  }, []);


  // useEffect(() => {
  //   console.log("main", formatedExpensesByYearMonthMain[selectedIndex]);
  //   console.log("index", selectedIndex);

  // }, [formatedExpensesByYearMonthMain])

  useEffect(() => {
    console.log("index", selectedIndex);
  }, [])

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    const ind = formatedExpensesByYearMonthMain.findIndex(item => item.year === event.target.value);
    setSelectedIndex(ind);
  };

  return (
    <>
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
            {formatedExpensesByYearMonthMain.map((singleYearExpenses) => 
              <option key = {singleYearExpenses.year} value={singleYearExpenses.year}>
                {singleYearExpenses.year}
              </option>
            )}
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
            {
            
            formatedExpensesByYearMonthMain[selectedIndex].allMonthExpenses.map((singleMonthExpenses) => {
              // console.log("se", selectedIndex);
              return (
                <SwiperSlide 
                key={singleMonthExpenses.month}
                className="swiper-slide-everymonthexpenses" 
              >
                <PieChartSlide 
                  data = {singleMonthExpenses.expensesByCategory}
                  heading={singleMonthExpenses.month}
                />
              </SwiperSlide>
              );
            }
            )}


          </Swiper>
          
        </div>
      )}
    </>
  );
}

export default EveryMonthsExpenses;
