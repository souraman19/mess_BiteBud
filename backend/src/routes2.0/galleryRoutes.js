import express from "express"; 
import {getAllImages, uploadImage, upload, deleteImage} from "./../controllers/GalleryController.js";

const router = express.Router();


router.get('/get-all-images', getAllImages);
router.post('/upload-image', upload.single("image"), uploadImage);
router.delete('/delete-image/:itemId', deleteImage);

export default router;