const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const Complaint = require("./../models/complaint");
const Image = require("./../models/image");
const Expense = require("./../models/expense");
const OTPService = require("./../otpService");
const MessMenu = require("./../models/messMenu");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { AsyncResource } = require("async_hooks");
const { v4: uuidv4 } = require('uuid');



//<--------------------Expense Routes-------------------------------->
router.get("/fetchallmonthsexpenses", async (req, res) => {
  try {
    // Fetch all expenses from the database
    const allExpenses = await Expense.find();
    
    // Group expenses by month
    const groupedExpenses = groupExpensesByMonth(allExpenses);
    // console.log(groupedExpenses);
    res.status(200).json(groupedExpenses);
  } catch (error) {
    console.error("Error fetching all months' expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function groupExpensesByMonth(allExpenses){
  const groupData = [];
  allExpenses.forEach((expense) => {
    const {itemName, expenseArray} = expense;
    expenseArray.forEach((expenseItem) => {
      const {quantity, itemUnit, totalCost, date} = expenseItem;
      const monthYear = new Date(date).toLocaleString("en-US", { month: "long", year: "numeric" });
      const existingMonth = groupData.find((group) => group.month === monthYear);
      if(existingMonth){
        existingMonth.expenses.push({itemName, itemUnit, quantity, totalCost, date});
      } else {
        groupData.push({
          month: monthYear,
          expenses:[{itemName, itemUnit, quantity, totalCost, date}],
        }); 
      }
    });
  });
  return groupData;
}

router.get("/fetchallmonthsexpenses_piechart", async(req, res) => {
  try{
    const allExpenses = await Expense.find();
    const groupData = [];
    for(let i = 0; i < 12; i++){
      const currentMonthData = [];
      allExpenses.forEach((expense) => {
        const {itemName, expenseArray} = expense;
        const name = itemName;
        let totalCost  = 0;
        expenseArray.forEach((x) => {
          if(x.month === i){
            totalCost += x.totalCost;
          }
        })
        
        if(totalCost > 0) currentMonthData.push({
          "name": name,
          "value": totalCost,
        })
      });
      groupData.push(currentMonthData);
    }
    res.status(200).json(groupData);

  } catch(error){
    console.error("Error in fetching all month expenses for pie chart", error);
    res.status(500).json({ error: "Internal server error" });
  }
})


router.delete("/deletedailyexpense", async(req, res) => {
  try{
    const {itemName, expenseId} = req.query;
    const foundItem = await Expense.findOne({itemName: itemName});
    if(!foundItem) {
      return res.status(404).json({error: "Item not found"});
    }

    await Expense.updateOne(
      {_id: foundItem._id},
      {$pull: {expenseArray: {_id: expenseId}}}
    );
    res.status(200).json({ message: 'Expense deleted successfully' });
  }catch(error){
    console.error('Error in deleting daily expense item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/fetchtodaysexpenses", async(req, res) => {
  try{
    const allExpenses = await Expense.find();
    // console.log(allExpenses);
    res.status(200).json(allExpenses);
  }catch(error){
    console.error("Error fetching mess menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/addnewexpense", async(req, res) => {
  try{

    const itemName = req.body.itemName;
    const quantity = req.body.itemQuantity;
    const totalCost = req.body.totalItemCost;
    const itemUnit = req.body.itemUnit;

    const foundItem = await Expense.findOne({itemName: itemName});
    
    if(!foundItem){
      const _id = uuidv4();
      const newExpenseItem = new Expense({
        _id: _id,
        itemName: itemName,
        expenseArray:[
          {
            _id: (_id + _id),
            quantity: quantity,
            itemUnit: itemUnit,
            costPerPiece: totalCost/quantity, 
            totalCost: totalCost,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()}`,
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            monthDay: new Date().getDay(),
            time: new Date().toLocaleTimeString(),
          },
        ],
      });
      await newExpenseItem.save();
    } else {
      const _id = uuidv4();
      foundItem.expenseArray.push({
            _id: (_id + _id),
            quantity: quantity,
            itemUnit: itemUnit,
            costPerPiece: totalCost/quantity, 
            totalCost: totalCost,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()}`,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            monthDay: new Date().getDay(),
            time: new Date().toLocaleTimeString(),
      });
      await foundItem.save();
    }
    res.status(200).json({ message: "Expense added successfully" });
  }catch(error){
    console.error("Error in adding expense item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






//<--------------------Mess Menu Routes-------------------------------->


router.post("/editmealname", async(req, res) => {
  try{
    const day = req.body.day;
    const mealName = req.body.mealName;
    const mealTime = req.body.mealTime;
    const newMealName = req.body.newMealName;
    const respon = await MessMenu.updateOne(
      {day: day, "allFoodItems.time": mealTime, "allFoodItems.name": mealName},
      {
        $set: {
          "allFoodItems.$.name": newMealName
        }
      }
    );
    // console.log(respon);
    const newMessMenu = await MessMenu.find();
    res.status(200).json({ message: "Meal updated successfully" , updatedMenus: newMessMenu});
  } catch(error){
    console.error("Error in editing mealName", error);
    res.status(500).json({error: "Internal server error"});
  }
})

router.delete("/deletemessmenu", async(req, res) => {
  try{
    const {day, mealName, mealTime} = req.query;
    // console.log("req query ----", req.query);
    const result = await MessMenu.updateOne(
      {day: day},
      {$pull: {allFoodItems: {name: mealName, time: mealTime}}}
    );

    const updatedMenu = await MessMenu.find();
    res.status(200).json(updatedMenu);

  } catch(error){
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.get("/getmessmenu", async(req, res) => {
  try{
    const messmenu = await MessMenu.find();
    res.status(200).json(messmenu);
  }catch(error){
    console.error("Error fetching mess menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/addnewmeal", async(req, res) => {
  try{
  
    // console.log("req.body", req.body);
    const day = req.body.day;
    const name = req.body.name;
    const time = req.body.mealTime;
    // console.log("day", day);
    // console.log("name", name);
    // console.log("time", time);
  
    const foundedMeal = await MessMenu.find({day: day}); //getting an array

    // console.log("foundedMeal", foundedMeal[0]);
    if(!foundedMeal[0]){
      return res.status(400).json({error: "Meal not found"});
    }
    
    foundedMeal[0].allFoodItems.push({name: name, time: time});
    await foundedMeal[0].save();
  
    res.json({message:"new meal Item added", item: {name, time}});
  }catch(error){
    console.error("Error in adding meal items:", error);
    res.status(500).json({ error: "Internal server error" });
  }

});






//<--------------------Gallery routes-------------------------------->


router.delete("/deletemyimage/:id", async(req, res) => {
  try{
    const imageId = req.params.id;
    const deltedImg = await Image.findByIdAndDelete(imageId);

    //Delete the file from uploads folder
    const filePath = path.join(__dirname, "./../../frontend/src/uploads/", deltedImg.img);
    console.log("The path of file is ", filePath);
    console.log("delted", deltedImg);
    fs.unlink(filePath, (err) => {
      if(err){
        console.error("Error deleting image file from folder", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("Image file deleted successfully from the folder");
    })

    res.json(deltedImg);
  }catch(error){
    console.error("Error in deleting images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getmyimages", async(req, res) => {
  try{
    const images = await Image.find();
    // console.log(images);
    res.status(200).json(images);
  }catch(error){
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





//<-------------------------for image upload and fetch [START]------------------------->
// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the absolute path for storing uploaded images
    cb(null, path.join(__dirname, "./../../frontend/src/uploads/"));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });


// Route for uploading an image
router.post("/upload-image", upload.single("image"), async(req, res) => {
  try {
    // Check if file exists in the request
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

     // Access other fields from the form data (newImage object)
     const _id = req.body._id;
     const name = req.body.name;
     const username = req.body.username;
     const regNo = req.body.regNo;
     const year = req.body.year;
     const description = req.body.description;
     const time = req.body.time;
     const hostel = req.body.hostel;
    
     const img = req.file.filename;
     console.log("filename => ",img);

     const newImage = new Image({
      _id,
      name, 
      username,
      regNo,
      hostel,
      year,
      img,
      description,
      time,
     });
     await newImage.save();

    res.json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      imageData: { _id, name, username, regNo, year, description, time },
    });

  } catch (error) {
    console.log("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching all uploaded images
router.get("/get-images", (req, res) => {
  try {
    // Read the directory containing uploaded images
    fs.readdir(path.join(__dirname, "./../../frontend/src/uploads/"), (err, files) => {
      if (err) {
        console.log("Error reading directory:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      // Filter only images from directory
      const imageFiles = files.filter((file) =>
        /\.(webp|jpg|jpeg|png|gif)$/i.test(file)
      );

      // Prepare response data with image filenames
      const imageData = imageFiles.map((file) => ({
        image: file,
      }));

      // Send the array of imageData as response
      res.json({ data: imageData });
    });
  } catch (error) {
    console.log("Error retrieving images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//<-------------------------for image upload and fetch [END]------------------------->





//<--------------------Comment and complaint routes-------------------------------->


router.get("/patelcomments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/patelcomplaints", async(req, res) => {
  try{
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch(error) {
    console.log("Error in fetching comments", error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

router.post("/addpatelcomments", async(req, res)=>{
  try{
    // Assuming req.body contains the new comment data
    const {_id, name, username, regNo, year, comment, hostel, profilePic} = req.body;

    // Create a new Comment document
    const newComment = new Comment({
      _id,
      name,
      username, 
      regNo,
      year,
      comment,
      hostel,
      profilePic,
      time: new Date(),
    });

    // Save the new comment to the database
    await newComment.save();
    const comments = await Comment.find();

    res.status(201).json({comments: comments, message: "comment added successfully"});
  }catch(error){
    console.log("Error in saving comment", error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post("/addpatelcomplaints", async(req, res) => {
  try{
    const {_id, name, username, regNo, year, complaint, hostel, commentsOnComplaint, upVoteCount, downVoteCount, isResolved} = req.body;
    const newComplaint = new Complaint({
      _id,
      name,
      username, 
      regNo, 
      year,
      complaint,
      hostel,
      commentsOnComplaint,
      upVoteCount,
      downVoteCount,
      isResolved,
    });
    await newComplaint.save();
    res.status(201).json({message: "complaint added successfully"});
  }catch(error){
    console.log("Error in saving comment", error);
    res.status(500).json({error: "Internal server error"});
  }
})

router.delete("/deletecomment/:id", async(req, res) => {
  try{
    const commentId = req.params.id;
    // console.log("hello", commentId);
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  }catch(error){
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletecomplaint/:id", async(req, res) => {
  try{
    const complaintId = req.params.id;
    await Complaint.findByIdAndDelete(complaintId);
    res.json({message: "complaint delete complete"});
  }catch(error){
    console.log("Error in deleting complaint", error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.put("/updatecomment/:id", async(req, res) => {
  try{
    const commentId = req.params.id;
    const {comment} = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, {comment}, {new: true});

    if(!updatedComment){
      res.status(404).json({error: "comment not found"});
    }
    res.json(updatedComment);
  }catch(error){
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put("/updatecomplaint/:id", async(req, res) => {
  try{
    const complaintId = req.params.id;
    const {complaint} = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {complaint}, {new: true});
    if(!updatedComplaint){
      res.status(404).json({error: "complaint not found"});
    }
    res.json(updatedComplaint);
  }catch(error){
    console.log("Error in updating complaint");
    res.status(500).json({ error:"Internal server error" });
  }
})

router.put("/upvote/:id", async(req, res)=> {
  const id = req.params.id;
  const myRegNo = req.body.myRegNo;
  // console.log(myRegNo);

  try{
    const findcomplaint = await Complaint.findById(id);
    // console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isUpVoted = findcomplaint.upVotedMembers.includes(myRegNo);
    // console.log("upvoted ", isUpVoted);
    if(!isUpVoted){
      findcomplaint.upVotedMembers.push(myRegNo);
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
});


router.put("/downvote/:id", async(req, res)=> {
  const id = req.params.id;
  const myRegNo = req.body.myRegNo;
  // console.log(myRegNo);

  try{
    const findcomplaint = await Complaint.findById(id);
    // console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isDownVoted = findcomplaint.downVotedMembers.includes(myRegNo);
    // console.log("upvoted ", isDownVoted);
    if(!isDownVoted){
      findcomplaint.downVotedMembers.push(myRegNo);
      findcomplaint.downVoteCount++;
      await findcomplaint.save();
      res.json(findcomplaint);  //send back the updated complaint if needed
    } else {
      return res.status(400).json({error: "User already upvoted this complaint"});
    }
  }catch(error){
    console.error("Errorr in upvoting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/commentsofcomplaint/:complaintId", async(req, res) => {
  const complaintId = req.params.complaintId;
  try{
    const findComplaint = await Complaint.findById(complaintId);
    if(!findComplaint) {
      return res.status(404).json({error: "Complaint not found"});
    }
    res.json(findComplaint);
  }catch(error){
    console.log("Error in getting comments on complaint", error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post("/deletecommentofcomplaint", async(req, res) => {
  const commentId = req.body.commentId;
  const complaintId = req.body.complaintId;
  console.log(commentId);
  console.log(complaintId);
  try{
    const findComplaint = await Complaint.findById(complaintId);
    if(!findComplaint) {
      return res.status(404).json({error: "Complaint not found"});
    }

    const updatedComplaint = findComplaint.commentsOnComplaint.filter(comment => {
      if(comment._id !== commentId)
      return comment;
    });
    findComplaint.commentsOnComplaint = updatedComplaint;
    updatedComplaint = await findComplaint.save();
    console.log("Comment of complaint deleted successfullly");
    res.status(200).json({ message: "Comment replaced successfully", comment: replacedComment });
  }catch(error){
    console.log("Error in deleting comments of complaint", error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post("/addcommentsofcomplaint/:complaintId", async(req, res) => {
  const complaintId = req.params.complaintId;
  const newComment = req.body;
  try{
    const findComplaint = await Complaint.findById(complaintId);
    if(!findComplaint) {
      return res.status(404).json({error: "Complaint not found"});
    }
    findComplaint.commentsOnComplaint.unshift(newComment);
    await findComplaint.save();
    res.json(findComplaint);
  } catch(error){
    console.log("Error in getting comments on complaint", error);
    res.status(500).json({error: "Internal server error"});
  }

})

router.post("/createPassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Update the user's password
      user.password = password;
      // Set registered to 'yes'
      user.registered = "yes";

      await user.save();

      res.json({ success: true, message: "Password created successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
});

router.post("/verifyOTP", async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });

    if (user) {
      console.log("Entered OTP:", otp);
      console.log("Stored OTP:", user.otp);
      // Clear the OTP after successful verification
      user.otp = null;
      await user.save();

      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/validateUser", async (req, res) => {
  const { email, dob } = req.body;

  try {
    const user = await User.findOne({ email, dob });

    if (user) {
      res.json({ success: true, isRegistered: user.registered === "yes" });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false });
  }
});

router.post("/sendOTP", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const otp = OTPService.generateOTP();
      user.otp = otp;
      await user.save();

      OTPService.sendOTP(email, otp);

      res.json({ success: true });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Check credentials against the User collection in MongoDB
    const user = await User.findOne({ email, password });

    if (user) {
      // User found, send success along with user's identity
      res.json({ success: true, alldata: user });
    } else {
      // User not found, send failure
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


///<-----------------Admin------------------>



// Add new user route
router.post("/add-user", async (req, res) => {
  try {
    const { email, identity, dob, registered, regNo, roomNo, name, year, hostel } = req.body;

    const newUser = new User({
      email,
      identity,
      dob,
      otp: null,
      password: "",
      username: "",
      registered,
      regNo,
      roomNo,
      name,
      year,
      hostel,
    });

    

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update profile picture route
router.post("/upload-profile-picture/:id", upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePic = req.file.path;

    const user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ filename: req.file.filename });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/users', async (req, res) => {
  try {
    const { regNo, hostel, roomNo, email, dob, name, year } = req.query;
    
    // Build the query object based on the filters
    const query = {};
    
    if (regNo) query.regNo = regNo;
    if (hostel) query.hostel = hostel;
    if (roomNo) query.roomNo = roomNo;
    if (email) query.email = email;
    if (dob) query.dob = dob;
    if (name) query.name = new RegExp(name, 'i'); // Case-insensitive regex search
    if (year) query.year = year;

    // Find users based on the query
    const users = await User.find(query);
    
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.delete('/users/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/users/update/:regno', async (req, res) => {
  try {
    // console.log(req.body);
    const user = await User.updateOne({ regno: req.params.regno }, { $set: req.body });
    // console.log(user);
    
    if (!user) {
      // console.log("my foot");
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});



module.exports = router;
