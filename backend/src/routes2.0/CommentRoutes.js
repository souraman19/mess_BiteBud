import express from "express"; 
import { getAllComments, addComment, editComment,deleteComment, addCommentUnderComment, getCommentsUnderComment, deleteCommentUnderComment } from "../controllers/CommentController.js";


const router = express.Router();

router.get('/get-all-comments', getAllComments);
router.post('/add-comment', addComment);
router.put('/edit-comment/:commentId', editComment);
router.delete('/delete-comment/:commentId', deleteComment);
router.post('/add-comment-under-comment/:commentId', addCommentUnderComment);
router.get('/get-comments-under-comment/:commentId', getCommentsUnderComment);
router.post('/delete-comment-under-comment', deleteCommentUnderComment);

export default router;