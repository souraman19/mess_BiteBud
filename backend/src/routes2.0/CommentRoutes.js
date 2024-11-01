import express from "express"; 
import { getAllComments, addComment } from "../controllers/CommentController.js";


const router = express.Router();

router.get('/get-all-comments', getAllComments);
router.post('/add-comment', addComment);

export default router;