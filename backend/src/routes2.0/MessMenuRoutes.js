import express from "express";
import {getAllMessMenu, addMessMenu} from "./../controllers/MessMenuController.js";

const router = express.Router();

router.get("/get-mess-menu", getAllMessMenu);
router.post("/add-mess-menu", addMessMenu);


export default router;