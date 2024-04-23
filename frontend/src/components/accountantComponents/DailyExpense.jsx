import React from "react";
import {useState, useEffect} from "react";
import "./../../styles/DailyExpense.css";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Dailyexpense() {
  const[itemName, setItemName] = useState("");
  const[itemQuantity, setItemQuantity] = useState("");
  const[totalItemCost, setTotalItemCost] = useState("");
  const[itemUnit, setItemUnit] = useState("");
  const [todaysExpenses, setTodaysExpenses] = useState([]);
  
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
    const response = await axios.post("http://localhost:5000/api/addnewexpense", 
    { itemName: itemName, itemQuantity: itemQuantity, totalItemCost: totalItemCost, itemUnit: itemUnit});
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
      const response = await axios.delete(`http://localhost:5000/api/deletedailyexpense?itemName=${itemName}&expenseId=${expenseId}`);
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todaysExpenses.map((expenseItem) => (
              expenseItem.expenseArray.map((singleExpense) => (
                ((currentFullDate === singleExpense.date) && (<tr key={singleExpense._id}>
                  <td>{expenseItem.itemName}</td>
                  <td>{singleExpense.quantity} {singleExpense.itemUnit}</td>
                  <td>{singleExpense.totalCost} </td>
                  <td className="singleExpense_action_buttons">
                    <button onClick={() => handleTodayExpenseDelete(expenseItem.itemName, singleExpense._id)}>
                      <DeleteIcon />
                    </button>
                    <button>
                      <EditIcon />
                    </button>
                  </td>
                </tr>))
              ))
            ))}
          </tbody>
        </table>
      </div>
      <form className="add_new_expense_section" onSubmit={handleExpenseSubmit}>
        <h2>Add expense</h2>
        <div>
          <label htmlFor="itemName">Item name </label>
          <input value= {itemName} type="text" id="itemName" name="itemName" placeholder="Enter item name" onChange={(e) => setItemName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="quantity">Quantity </label>
          <input value= {itemQuantity} type="text" id="quantity" name="quantity" placeholder="Enter item quantity" onChange={(e) => setItemQuantity(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="totalCost">Total Cost </label>
          <input value={totalItemCost} type="text" id="totalCost" name="totalCost" placeholder="Enter total cost" onChange={(e) => setTotalItemCost(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="itemUnit">Item Unit</label>
          <input value={itemUnit} type="text" id="itemUnit" name="itemUnit" placeholder="Enter item unit" onChange={(e) => setItemUnit(e.target.value)}/>
        </div>
        <button type="submit">
          Submit
        </button>

      </form>
   </div>
  );
}

export default Dailyexpense;
