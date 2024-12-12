import express from "express";
import {getAllMessMenu} from "./../controllers/MessMenuController.js";

const router = express.Router();

router.get("/get-mess-menu", getAllMessMenu);

export default router;