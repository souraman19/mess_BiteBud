import express from "express";
import {getAllMessMenu, addMessMenu, deleteMessMenu, editMessMenu, addMenuItem, getMenuItem,} from "./../controllers/MessMenuController.js";

const router = express.Router();

router.get("/get-mess-menu", getAllMessMenu);
router.post("/add-mess-menu", addMessMenu);
router.delete("/delete-mess-menu", deleteMessMenu);
router.post("/edit-mess-menu", editMessMenu);
router.post("/add-menu-item", addMenuItem);
router.get("/get-menu-item", getMenuItem);

export default router;