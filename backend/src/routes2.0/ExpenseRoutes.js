import express from "express";
import {addExpense, getExpenses, deleteExpense, getCurrMonthExpenses} from "./../controllers/ExpenseController.js";

const router = express.Router();

router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.get("/get-expenses-prev-curr-month", getCurrMonthExpenses);
router.delete("/delete-expense/:bucketId/:billId/:itemId", deleteExpense);


export default router;