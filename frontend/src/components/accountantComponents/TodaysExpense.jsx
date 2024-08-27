import React from "react";
import {useState, useEffect} from "react";
import "./../../styles/DailyExpense.css";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from '../../UserContext.js';


function Dailyexpense() {
  const[itemName, setItemName] = useState("");
  const[itemQuantity, setItemQuantity] = useState("");
  const[totalItemCost, setTotalItemCost] = useState("");
  const[itemUnit, setItemUnit] = useState("");
  const [todaysExpenses, setTodaysExpenses] = useState([]);
  const { user } = useUser();
  const { identity } = user;
  
  useEffect(() => {
    fetchTodaysExpenses();
  }, []);

  useEffect(() => {
    console.log("Updated Todays Expenses:", todaysExpenses);
  }, [todaysExpenses]);

  async function fetchTodaysExpenses() {
    try {
      console.log("helloe");
      const response = await axios.get("http://localhost:5000/api/fetchtodaysexpenses");
      setTodaysExpenses(response.data);
    } catch (error) {
      console.error("Error fetching today's expenses:", error);
    }
  }

  async function handleExpenseSubmit(e){
    try{
      e.preventDefault();
    await axios.post("http://localhost:5000/api/addnewexpense", 
    { itemName: itemName.toLocaleLowerCase(), itemQuantity: itemQuantity.toLocaleLowerCase(), totalItemCost: totalItemCost.toLocaleLowerCase(), itemUnit: itemUnit.toLocaleLowerCase()});
    setItemName("");
    setItemQuantity("");
    setItemUnit("");
    setTotalItemCost("");
    fetchTodaysExpenses();
    } catch(error){
      console.log("error while adding");
    }

  }

  async function handleTodayExpenseDelete(itemName, expenseId){
    try{
      await axios.delete(`http://localhost:5000/api/deletedailyexpense?itemName=${itemName}&expenseId=${expenseId}`);
      console.log("Deletion success");
      fetchTodaysExpenses();
    } catch(error){
      console.log("Error in deleting daily expense item");
    }
  }

  const currentFullDate =  `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()}`;


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
              {
                identity === "accountant" && (
                  <th>Action</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {todaysExpenses.map((expenseItem) => (
              expenseItem.expenseArray.map((singleExpense) => (
                ((currentFullDate === singleExpense.date) && (<tr key={singleExpense._id}>
                  <td>{expenseItem.itemName}</td>
                  <td>{singleExpense.quantity} {singleExpense.itemUnit}</td>
                  <td>{singleExpense.totalCost} </td>
                  
                  {identity === "accountant" && (
                      <td className="singleExpense_action_buttons">
                      <button onClick={() => handleTodayExpenseDelete(expenseItem.itemName, singleExpense._id)}>
                        <DeleteIcon style={{color:"black"}}/>
                      </button>
                      <button>
                        <EditIcon style={{color:"black"}} />
                      </button>
                    </td>

                  )}
                </tr>))
              ))
            ))}
          </tbody>
        </table>
      </div>

      <div className="all_months_this_year_section">

      </div>

      {
        identity === "accountant" && (
          <div className="add_new_expense_section">
            <h2>Add new expense</h2>
            <form onSubmit={handleExpenseSubmit}>
              <div className="form-group">
                <label htmlFor="item_name">Item Name:</label>
                <input type="text" id="item_name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="item_quantity">Quantity:</label>
                <input type="text" id="item_quantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="total_item_cost">Total Cost:</label>
                <input type="text" id="total_item_cost" value={totalItemCost} onChange={(e) => setTotalItemCost(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="item_unit">Item Unit:</label>
                <input type="text" id="item_unit" value={itemUnit} onChange={(e) => setItemUnit(e.target.value)} required />
              </div>
              <button type="submit">Add Expense</button>
            </form>
          </div>
        )
      }
   </div>
  );
}

export default Dailyexpense;
