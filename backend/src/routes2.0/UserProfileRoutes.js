import express from "express";
import {changeProfilePicture} from "./../controllers/UserProfileController.js";
import { upload } from "../controllers/GalleryController.js";

const router = express.Router();

router.post("/change-profile-picture/:id", upload.single('profilePicture'), changeProfilePicture)

export default router;