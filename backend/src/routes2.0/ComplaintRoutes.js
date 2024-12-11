import express from "express"; 
import {getAllComplaints, addComplaint, upvoteComplaint, downvoteComplaint} from "./../controllers/ComplaintController.js";

const router = express.Router();

router.get('/get-all-complaints', getAllComplaints);
router.post('/add-complaint', addComplaint);
router.put('/upvote-complaint/:complaintId', upvoteComplaint);
router.put('/downvote-complaint/:complaintId', downvoteComplaint);


export default router;