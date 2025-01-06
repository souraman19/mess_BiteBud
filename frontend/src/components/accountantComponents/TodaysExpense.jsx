import React from "react";
import HoverRating from "../commonComponents/HoverRating";
import { useState, useEffect } from "react";
import "./../../styles/DailyExpense.css";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useStateProvider } from "../../context/StateContext";
import {
  GET_GROCERY_ITEMS,
  GET_VENDORS,
  ADD_EXPENSE,
  GET_EXPENSES,
  DELETE_EXPENSE,
} from "./../../utils/ApiRoutes.js";

const currentFullDate = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDay()}`;

const getFullDate = (date) => {
  return `${new Date(date).getFullYear()}-${
  new Date().getMonth(date) + 1
}-${new Date().getDay(date)}`
}

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

function Dailyexpense() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const identity = userInfo.userType;
  const hostel = userInfo.hostel;

  const [selectedIndex, setSelectedIndex] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [totalItemCost, setTotalItemCost] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [value, setValue] = useState(2.5); //for rating pass to the child component
  const [allWantToAddItems, setAllWantToAddItems] = useState([]);

  const [allItems, setAllItems] = useState([]);
  const [allVendors, setAllVendors] = useState([]);

  const [todaysExpenses, setTodaysExpenses] = useState([]);

  const handleSelectionChange = async(e) => {
    const index = e.target.value;
    setSelectedIndex(index);

    if(index !== ""){
      setItemName(allItems[index].name);
      setItemCategory(allItems[index].category);
    } else {
      setItemName("");
      setItemCategory("");
    }
  }

  const fetchItems = async () => {
    try {
      const response = await axios.get(GET_GROCERY_ITEMS, {
        params: { hostel: hostel },
        withCredentials: true,
      });
      setAllItems(response.data.items);
      // console.log("res => ", allItems);
    } catch (err) {
      console.error("Error in fetching grocery items", err);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(GET_VENDORS, {
        params: { hostel },
        withCredentials: true,
      });
      setAllVendors(response.data.allVendors);
      // console.log("vndors ", allVendors);
    } catch (err) {
      console.error("Error in fetching the vendors", err);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchVendors();
  }, []);
  
  
  async function fetchTodaysExpenses() {
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
            // setTodaysExpenses([...todaysExpenses, {
            //   itemName: itemName,
            //   quantity: quantity,
            //   totalCost: totalCost,
            //   vendor: vendor
            // }])                   //cant do it directly as setTodaysExpenses asynchronous type 
            if(getFullDate(singleItemExpense.buyDate) === getFullDate(new Date()))
            updatedExpenses.push({
              itemName: itemName,
              quantity: quantity,
              totalCost: totalCost,
              vendor: vendor,
              bucketId: bucketId,
              billId: billId,
              itemId: itemId,
              buyTime: formatBuyTime(buyDate)
            });
          })
        })
      })

      setTodaysExpenses(updatedExpenses);
    }catch(err){
      console.error("Error in fetching the expenses", err);
    }
  }



    useEffect(() => {
      fetchTodaysExpenses();
    }, []);

    // useEffect(() => {
    //   console.log(todaysExpenses);
    // }, [todaysExpenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    setAllWantToAddItems([
      ...allWantToAddItems,
      {
        itemName: itemName,
        itemCategory: itemCategory,
        itemQuantity: {
          amount: itemQuantity,
          itemUnit: itemUnit,
        },
        totalItemCost: totalItemCost,
        buyDate: new Date(),
        rating: value,
      },
    ]);
    setSelectedIndex("");
    setItemName("");
    setItemCategory("");
    setItemQuantity("");
    setTotalItemCost("");
    setItemUnit("");
    setValue(2.5);
  };

  async function handleExpenseSubmit(e) {
    e.preventDefault();
    try {
      // console.log("Sending", allWantToAddItems);
      await axios.post(
        ADD_EXPENSE,
        {
          allItemExpenses: allWantToAddItems,
          hostel: hostel,
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1,
          day: new Date().getDay(),
          hostel: hostel,
          vendorName: vendorName,
        },
        { withCredentials: true }
      );
      console.log("Expense added succesfully");
      setAllWantToAddItems([]);
      fetchTodaysExpenses();
    } catch (err) {
      console.error("Error in adding expense", err);
    }
  }

  const handleItemDelete = async(bucketId, billId, itemId) => {
    try{
      await axios.delete(`${DELETE_EXPENSE}/${bucketId}/${billId}/${itemId}`, {withCredentials: true});
      console.log("Expense deleted successfully");
      fetchTodaysExpenses();
    }catch(err){
      console.log("Error in deleteing expense item", err);
    }
  }

  // console.log(currentFullDate, "kb");
  return (
    <div className="daily_expense_outermost_div">
      <div className="todays_expense_section">
        <h2>Todays expense</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Total Cost(₹)</th>
              <th>Vendor</th>
              <th>BuyTime</th>
              {identity === "Student" && <th className="daily_expense_delete_edit_expense_block">Action</th>}
            </tr>
          </thead>
          <tbody>
            {todaysExpenses.length > 0 && (
              todaysExpenses.map((singleItemExpense, index) =>
                <tr>
                  <td>{singleItemExpense.itemName}</td>
                  <td>{singleItemExpense.quantity.amount} {singleItemExpense.quantity.itemUnit}</td>
                  <td>{singleItemExpense.totalCost}</td>
                  <td>{singleItemExpense.vendor}</td>
                  <td>{singleItemExpense.buyTime}</td>
                  <td className="daily_expense_delete_edit_expense_block">
                      <DeleteIcon 
                        style={{cursor: "pointer"}} 
                        onClick = {() => handleItemDelete(singleItemExpense.bucketId, singleItemExpense.billId, singleItemExpense.itemId)}
                      />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="all_months_this_year_section"></div>
    </div>
  );
}

export default Dailyexpense;
