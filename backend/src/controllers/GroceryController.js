import GroceryItem from "./../models2.0/Expense/GroceryItem.js";
import Vendor from "./../models2.0/person/Vendor.js"

const addGroceryItem = async (req, res) => {
    try{
        const name = req.body.itemName;
        const category = req.body.category;
        const hostel =req.body.hostel;
        const newGroceryItem = new GroceryItem({
            name: name,
            category: category,
            hostel:hostel,
        })
        // console.log("newGroceryItem", newGroceryItem);
        await newGroceryItem.save();
        res.status(200).json({message: "Grocery item added successfully"});
    } catch(err){
        console.error("Error in adding grocery item", err);
        res.status(500).json({error: "Internal server error"});
    }
}


const getGroceryItems = async(req, res) => {
    // console.log("hello");
    try{
        const hostel = req.query.hostel;
        // console.log(hostel);
        const items = await GroceryItem.find({hostel: hostel});
        return res.status(200).json({items});
    }catch(err){
        console.error("Error in fetching grocery items", err);
        res.status(500).json({error: "Internal server error"});
    }
}

const addVendor = async(req, res) => {
    try{
        // console.log(req.body);
        const newVendor = new Vendor(req.body);
        console.log(newVendor);
        await newVendor.save();
        res.status(200).json({message: "New vendor added"});
    }catch(err){
        console.error("Error in adding vendor", err);
        res.status(500).json({error: "Internal server error"});
    }
}

const getVendors = async(req, res) => {
    try{
        const hostel = req.query.hostel;
        const allVendors = await Vendor.find({hostel: hostel});
        return res.status(200).json({allVendors});
    }catch(err){
        console.error("Error in fetching vendors", err);
        res.status(500).json({error: "Internal server error"});
    }
}

export {addGroceryItem, getGroceryItems, addVendor, getVendors};