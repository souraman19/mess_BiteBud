import Complaint from "./../models2.0/complaint/Complaint.js";

const getAllComplaints = async(req, res) => {
    try{
        const hostel = req.query.hostel;
        const complaints = await Complaint.find({"complaintBy.hostel": hostel});
        // console.log(complaints);
        res.json(complaints);
      } catch(error) {
        console.log("Error in fetching comments", error);
        res.status(500).json({error: "Internal Server Error"});
      }
}

const addComplaint = async(req, res) => {
  const newComplaint = req.body;
  try{
    const newMyComplaint = new Complaint(newComplaint);
    // console.log("new => ",newMyComplaint);
    await newMyComplaint.save();

  res.status(201).json({message: "complaint added successfully"});

  }catch(error){
    console.log("Error in saving comment", error);
    res.status(500).json({error: "Internal server error"});
  }
}

const upvoteComplaint = async(req, res) => {
  const complaintId = req.params.complaintId;
  const userId = req.body.userId;
  const username = req.body.username;
  // console.log(userId);
  // console.log(username);

  try{
    const findcomplaint = await Complaint.findOne({complaintId: complaintId});
    // console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isUpVoted = findcomplaint.upVotes.some(vote => vote.votedBy.userId.toString() === userId.toString());
    // console.log("upvoted ", isUpVoted);
    if(!isUpVoted){
      findcomplaint.upVotes.push({votedBy: {
          username: username,
          userId: userId,
      }});
      findcomplaint.upVoteCount++;
      await findcomplaint.save();
      res.json(findcomplaint);  //send back the updated complaint if needed
    } else {
      return res.status(400).json({error: "User already upvoted this complaint"});
    }
  }catch(error){
    console.error("Errorr in upvoting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const downvoteComplaint = async(req, res) => {
  const complaintId = req.params.complaintId;
  const userId = req.body.userId;
  const username = req.body.username;
  console.log(userId);
  // console.log(username);

  try{
    const findcomplaint = await Complaint.findOne({complaintId: complaintId});
    //  console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isDownVoted = findcomplaint.downVotes.some(vote => vote.votedBy.userId.toString() === userId.toString());
    // console.log("dowvoted ", isDownVoted);
    if(!isDownVoted){
      findcomplaint.downVotes.push({votedBy: {
          username: username,
          userId: userId,
      }});
      findcomplaint.downVoteCount++;
      await findcomplaint.save();
      res.json(findcomplaint);  //send back the updated complaint if needed
    } else {
      return res.status(400).json({error: "User already downvoted this complaint"});
    }
  }catch(error){
    console.error("Errorr in downvoting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const editComplaint = async(req, res) => {
  try{
    const complaintId = req.params.complaintId;
    const {complaint} = req.body;
    // console.log(complaint);
    // console.log(complaintId);
    const updatedComplaint = await Complaint.findOneAndUpdate({complaintId: complaintId}, {complaintText: complaint});
    if(!updatedComplaint){
      res.status(404).json({error: "complaint not found"});
    }
    res.json(updatedComplaint);
  }catch(error){
    console.log("Error in updating complaint");
    res.status(500).json({ error:"Internal server error" });
  }
}

const deleteComplaint = async(req, res) => {
  try{
    const complaintId = req.params.complaintId;
    await Complaint.findOneAndDelete({complaintId: complaintId});
    res.json({message: "complaint delete complete"});
  }catch(error){
    console.log("Error in deleting complaint", error);
    res.status(500).json({error: "Internal server error"});
  }
}

export {getAllComplaints, addComplaint, upvoteComplaint, downvoteComplaint, editComplaint, deleteComplaint};