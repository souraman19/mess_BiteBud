import express from "express";
import {addGroceryItem} from "./../controllers/GroceryController.js";

const router = express.Router();

router.post('/add-grocery-item', addGroceryItem);

export default router;