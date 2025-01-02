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
} from "./../../utils/ApiRoutes.js";

const currentFullDate = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}-${new Date().getDay()}`;

const getFullDate = (date) => {
  return `${new Date(date).getFullYear()}-${
  new Date().getMonth(date) + 1
}-${new Date().getDay(date)}`
}

function Dailyexpense() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const identity = userInfo.userType;
  const hostel = userInfo.hostel;

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [totalItemCost, setTotalItemCost] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [value, setValue] = useState(2.5); //for rating pass to the child component
  const [allWantToAddItems, setAllWantToAddItems] = useState([]);

  const [allItems, setAllItems] = useState([]);
  const [allVendors, setAllVendors] = useState([]);

  const [todaysExpenses, setTodaysExpenses] = useState([]);

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
            // setTodaysExpenses([...todaysExpenses, {
            //   itemName: itemName,
            //   quantity: quantity,
            //   totalCost: totalCost,
            //   vendor: vendor
            // }])                   //cant do it directly as setTodaysExpenses asynchronous type 

            updatedExpenses.push({
              itemName: itemName,
              quantity: quantity,
              totalCost: totalCost,
              vendor: vendor,
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

    useEffect(() => {
      console.log(todaysExpenses);
    }, [todaysExpenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    setAllWantToAddItems([
      ...allWantToAddItems,
      {
        itemName: itemName,
        itemQuantity: {
          amount: itemQuantity,
          itemUnit: itemUnit,
        },
        totalItemCost: totalItemCost,
        buyDate: new Date(),
        rating: value,
      },
    ]);
    setItemName("");
    setItemQuantity("");
    setTotalItemCost("");
    setItemUnit("");
    setValue("");
  };

  async function handleExpenseSubmit(e) {
    e.preventDefault();
    try {
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
    } catch (err) {
      console.error("Error in adding expense", err);
    }
  }

  async function handleTodayExpenseDelete(itemName, expenseId) {
    // try {
    //   await axios.delete(
    //     `http://localhost:5000/api/deletedailyexpense?itemName=${itemName}&expenseId=${expenseId}`
    //   );
    //   console.log("Deletion success");
    //   fetchTodaysExpenses();
    // } catch (error) {
    //   console.log("Error in deleting daily expense item");
    // }
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
              <th>Total Cost</th>
              {identity === "Student" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {todaysExpenses.length > 0 && (
              <div>sdj</div>
            )}
          </tbody>
        </table>
      </div>

      <div className="all_months_this_year_section"></div>

      {identity === "Student" && (
        <div className="add_new_expense_section">
          <h2>Add new expense</h2>
          {allWantToAddItems.length > 0 && (
            <form onSubmit={handleExpenseSubmit}>
              <div className="todays_expense_allWantToAddItems">
              <div className="todays_expense_single_item_expense">
                    <div>Item name</div>
                    <div>Quantity</div>
                    <div>Total Cost</div>
                    <div>Vendor Name</div>
              </div>
                {allWantToAddItems.map((singleItemExpense, index) => (
                  <div className="todays_expense_single_item_expense">
                    <div>{singleItemExpense.itemName}</div>
                    <div>{singleItemExpense.itemQuantity.amount} {singleItemExpense.itemQuantity.itemUnit}</div>
                    <div>{singleItemExpense.totalItemCost}</div>
                    <div>{vendorName}</div>
                  </div>
                ))}
              </div>
              <button type="submit">Add Expense</button>
            </form>
          )}
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <label htmlFor="item_name">Item Name:</label>
              <select
                id="item_name"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              >
                <option value="">Select item</option>
                {allItems.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="item_quantity">Quantity: </label>
              <input
                type="text"
                id="item_quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="item_unit">Item Unit: </label>
              <select
                id="item_unit"
                value={itemUnit}
                onChange={(e) => setItemUnit(e.target.value)}
                required
              >
                <option value="">Select a unit</option>
                <option value="unit">Unit</option>
                <option value="litre">Litre</option>
                <option value="ml">Millilitre</option>
                <option value="gram">Gram</option>
                <option value="kg">Kilogram</option>
                <option value="dozen">Dozen</option>
                <option value="packet">Packet</option>
                <option value="bottle">Bottle</option>
                <option value="can">Can</option>
                <option value="box">Box</option>
                <option value="piece">Piece</option>
                <option value="roll">Roll</option>
                <option value="barrel">Barrel</option>
                <option value="carton">Carton</option>
                <option value="bag">Bag</option>
                <option value="sachet">Sachet</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="total_item_cost">Total Cost (₹):</label>
              <input
                type="text"
                id="total_item_cost"
                value={totalItemCost}
                onChange={(e) => setTotalItemCost(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vendorName">Vendor:</label>
              <select
                id="vendorName"
                required
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              >
                <option value="">Select Vendor</option>
                {allWantToAddItems.length === 0 && (
                  allVendors.map((singleVendor, index) => (
                    <option key={index} value={singleVendor.name}>
                      {singleVendor.name}
                    </option>
                  ))
                )}
                {allWantToAddItems.length > 0 && (
                  <option value={vendorName}>{vendorName}</option>
                )

                }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="total_item_cost">Rating:</label>
              <HoverRating value={value} setValue={setValue} />
            </div>
            <button type="submit">Add Item to Expense List</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dailyexpense;
