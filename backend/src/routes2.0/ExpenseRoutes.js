import express from "express";
import {addExpense, getExpenses, deleteExpense} from "./../controllers/ExpenseController.js";

const router = express.Router();

router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.delete("/delete-expense/:bucketId/:billId/:itemId", deleteExpense);


export default router;