import express from "express";
import {addGroceryItem, getGroceryItems, addVendor, getVendors} from "./../controllers/GroceryController.js";

const router = express.Router();

router.post('/add-grocery-item', addGroceryItem);
router.get('/get-grocery-items', getGroceryItems);
router.post('/add-new-vendor', addVendor);
router.get('/get-vendors', getVendors);

export default router;