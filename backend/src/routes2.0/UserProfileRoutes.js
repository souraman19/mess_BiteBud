import express from "express";
import {changeProfilePicture, logOut} from "./../controllers/UserProfileController.js";
import { upload } from "../controllers/GalleryController.js";

const router = express.Router();

router.post("/change-profile-picture/:id", upload.single('profilePicture'), changeProfilePicture)
router.post("/log-out", logOut);

export default router;