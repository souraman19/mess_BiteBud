import {User} from "./../models2.0/person/User.js";

const changeProfilePicture = async (req, res) => {
  try {
    // console.log("here");
    const userId = req.params.id;
    const profilePicture = req.file.path;
    // console.log(req.params);

    const user = await User.findOneAndUpdate(
      {userId: userId},
      {profilePicture: profilePicture },
      { new: true }
    );
    if (!user) {
        // console.log("not found");
      return res.status(404).json({ error: "User not found" });
    }
    await user.save();
    // console.log(user);

    res.status(200).json({ filename: req.file.filename });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { changeProfilePicture };
