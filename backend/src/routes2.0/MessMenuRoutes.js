import express from "express";
import {getAllMessMenu, addMessMenu, deleteMessMenu, editMessMenu} from "./../controllers/MessMenuController.js";

const router = express.Router();

router.get("/get-mess-menu", getAllMessMenu);
router.post("/add-mess-menu", addMessMenu);
router.delete("/delete-mess-menu", deleteMessMenu);
router.post("/edit-mess-menu", editMessMenu);

export default router;