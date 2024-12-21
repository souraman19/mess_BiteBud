import express from "express"; 
import {getAllComplaints, addComplaint, upvoteComplaint, downvoteComplaint, editComplaint, deleteComplaint} from "./../controllers/ComplaintController.js";

const router = express.Router();

router.get('/get-all-complaints', getAllComplaints);
router.post('/add-complaint', addComplaint);
router.put('/upvote-complaint/:complaintId', upvoteComplaint);
router.put('/downvote-complaint/:complaintId', downvoteComplaint);
router.put('/edit-complaint/:complaintId', editComplaint);
router.put('/delete-complaint/:complaintId', deleteComplaint);


export default router;