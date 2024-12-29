import express from "express";
import {addGroceryItem, getGroceryItems} from "./../controllers/GroceryController.js";

const router = express.Router();

router.post('/add-grocery-item', addGroceryItem);
router.get('/get-grocery-items', getGroceryItems);

export default router;