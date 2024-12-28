import React from "react";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import { useState } from "react";
import { ADD_GROCERY_ITEM, GET_GROCERY_ITEMS } from "./../../utils/ApiRoutes.js";
import axios from "axios";

function Grocery() {
    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");

    const handleGroceryItemSubmit = async(e) => {
        e.preventDefault();
        try{
            //post request to add grocery item
            await axios.post(ADD_GROCERY_ITEM, {itemName: itemName, category: category});
            console.log("Grocery item added successfully");
            setItemName("");
        }catch(err){
            console.error("Error adding grocery item:", err);
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <form onSubmit={handleGroceryItemSubmit}>
                    <div>
                        <label htmlFor="item-name">Item name</label>
                        <input 
                            type="text" 
                            placeholder="Enter Item Name" 
                            value={itemName}
                            required 
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="category-selection">Select Category</label>
                        <select 
                            name="category" 
                            id="category-selection"
                            value={category}
                            onChange = {(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="x" disabled selected hidden>Category</option>
                            <option value="y">y</option>
                            <option value="z">z</option>
                            <option value="c">c</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Grocery;