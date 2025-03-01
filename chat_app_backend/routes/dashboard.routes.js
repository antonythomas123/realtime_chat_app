import express from "express";
import User from "../models/UserModel.js";

const router = express.Router();

router.get("/get-all-friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(userId).select("friends");

    if (!currentUser) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const friends = await User.find({
      _id: { $in: currentUser.friends, $ne: userId },
    }).select("-password -friends");

    return res.status(200).json({ friends });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

router.get("/get-user-by-username/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
});

export default router;
