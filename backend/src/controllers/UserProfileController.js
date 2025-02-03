import {User} from "./../models2.0/person/User.js";

const changeProfilePicture = async (req, res) => {
  try {
    //   console.log("here2");
      const userId = req.params.id;
      const profilePicture = req.file.path;
      // console.log(req.params);
      
      
      if (!req.file) {
          console.log("No file uploaded");
          return res.status(400).json({ error: "No file uploaded or file too large" });
        }

    const user = await User.findOneAndUpdate(
      {userId: userId},
      {profilePicture: profilePicture },
      { new: true }
    );
    // console.log(user);
    if (!user) {
        // console.log("not found");
      return res.status(404).json({ error: "User not found" });
    }
    await user.save();

    res.status(200).json({ filename: req.file.filename });
    // console.log(req.file.filename);
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { changeProfilePicture };
