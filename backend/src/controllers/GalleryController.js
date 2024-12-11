import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AsyncResource } from "async_hooks";
import GalleryItem from "../models2.0/gallery_item/GalleryItem.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.resolve(__dirname, "../../../frontend/public/uploads/");
//console.log(uploadsDir);


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the absolute path for storing uploaded images
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded image
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

  
  const upload = multer({ storage: storage });
  


const getAllImages = async(req, res) => {
    try {
        // Read the directory containing uploaded images
        // fs.readdir(uploadsDir, (err, files) => {
        //   if (err) {
        //     console.log("Error reading directory:", err);
        //     return res.status(500).json({ error: "Internal server error" });
        //   }
        //   // Filter only images from directory
        //   const imageFiles = files.filter((file) =>
        //     /\.(webp|jpg|jpeg|png|gif)$/i.test(file)
        //   );
          
        //   // Prepare response data with image filenames
        //   const imageData = imageFiles.map((file) => ({
        //     image: file,
        //   }));
          //console.log("imageData => ", imageData);
          
          const imageData = await GalleryItem.find({});

          // Send the array of imageData as response
          res.json({ data: imageData });
        // });
    } catch (error) {
        console.log("Error retrieving images:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const uploadImage = async(req, res) => {
  try {
    // Check if file exists in the request
    // console.log(req.file);
    // console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
     // Access other fields from the form data (newImage object)
     const userId = req.body.userId;
     const name = req.body.name;
     const username = req.body.username;
     const description = req.body.description;
     const hostel = req.body.hostel;
     const img = req.file.filename;

    //  console.log("23 filename => ",img);

     const newImage = new GalleryItem({
      uploadedBy: {
        name: name,
        userId: userId,
        username: username,
      },
      image: img,
      description: description,
      hostel: hostel,
     });
     await newImage.save();

    res.json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      imageData: { 
        uploadedBy: {
          name: name,
          userId: userId,
          username: username,
        },
      img,
      description, 
      hostel, 
      },
    });

  } catch (error) {
    console.log("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export {getAllImages, uploadImage, upload}; 