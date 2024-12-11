import express from "express"; 
import {getAllImages, uploadImage, upload} from "./../controllers/GalleryController.js";

const router = express.Router();


router.get('/get-all-images', getAllImages);
router.post('/upload-image', upload.single("image"), uploadImage);

export default router;