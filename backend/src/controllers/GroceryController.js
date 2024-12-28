import GroceryItem from "./../models2.0/Expense/GroceryItem.js";

const addGroceryItem = async (req, res) => {
    try{
        const name = req.body.itemName;
        const category = req.body.category;
        const newGroceryItem = new GroceryItem({
            name: name,
            category: category,
        })
        // console.log("newGroceryItem", newGroceryItem);
        await newGroceryItem.save();
        res.status(200).json({message: "Grocery item added successfully"});
    } catch(err){
        console.error("Error in adding grocery item", err);
        res.status(500).json({error: "Internal server error"});
    }
}

export {addGroceryItem};