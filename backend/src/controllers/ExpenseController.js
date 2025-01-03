import MonthlyExpenseItemBucket from "./../models2.0/Expense/MonthlyExpenseItemBucket.js";
import Vendor from "./../models2.0/person/Vendor.js";
import GroceryItem from "../models2.0/Expense/GroceryItem.js";

const addExpense = async (req, res) => {
  try {
    const {
        allItemExpenses,
        hostel,
        year,
        month,
        day,
        vendorName
    } = req.body;
    let monthInString = month.toString();
    let yearInString = year.toString();

    
    if(monthInString.length < 2){ //if get like '1' then covert to '01'
      monthInString =  '0' + monthInString;
    }
    const yearMonth = yearInString + '-' +monthInString;
    // console.log(req.body);
    const foundVendor = await Vendor.findOne({
      hostel: hostel,
      name: vendorName,
    });
   
    //check if vendor exists
    if (!foundVendor) {
      console.log("vendor not found");
      return res.status(404).json({ error: "Vendor not found" });
    }
 

    //check if all items exists
    allItemExpenses.forEach(singleItem => {
      const foundItem = GroceryItem.findOne({
            hostel: hostel,
            name: singleItem.itemName,
          });
          if (!foundItem) {
            console.log("item not found");
            return res.status(404).json({ error: "Item not found" });
          }
    });

    //check if the bucket is alaready exists if not create a new 
    const foundExpenseBucket = await MonthlyExpenseItemBucket.findOne({
      hostel: hostel,
      yearMonth: yearMonth,
      vendorName: vendorName,
    });
   
    if (!foundExpenseBucket) {
      const data = {
        yearMonth: yearMonth,
        hostel: hostel,
        vendorName: vendorName,
      };
      const newBucket = new MonthlyExpenseItemBucket(data);
      await newBucket.save();
    }
    

    const bucket = await MonthlyExpenseItemBucket.findOne({
      hostel: hostel,
      yearMonth: yearMonth,
      vendorName: vendorName,
    });
  
    const data = {
      allItems: [],
      billImage: "",
    }
    allItemExpenses.forEach((singleItem, index)=> {
      data.allItems.push(singleItem);
    });
    bucket.expenses.push(data);
    await bucket.save();
    res.status(200).json({message: "expense added successfully"});
  } catch (err) {
    console.log("Error in adding expense", err);
    res.status(500).json({error: "Internal server error"});
  }
};

const getExpenses = async (req, res) => {
  
  try{
    const hostel = req.query.hostel;
    const allexpenses = await MonthlyExpenseItemBucket.find({hostel: hostel});
    // console.log(allexpenses);
    res.status(200).json({expenses: allexpenses});
  return
  }catch(error){
    console.error("Error n fetching", error);
    res.status(500).json({message: "Internal server error"});
  }

};

const deleteExpense = async(req, res) => {
  try{
    console.log(req.params);
    const bucketId = req.params.bucketId;
    const billId = req.params.billId;
    const itemId = req.params.itemId;
    const result = await MonthlyExpenseItemBucket.updateOne(
      {
        bucketId: bucketId,
        "expenses.billId": billId,
      },
      {
        $pull: {"expenses.$.allItems" : {itemId: itemId}}
      }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Bucket, Bill, or Item not found" });
    }
  }catch(err){
    console.log("Error in deleteing expense", err);
    res.status(500).json({message: "Internal server Error"});
  }
}

export { getExpenses, addExpense, deleteExpense };
