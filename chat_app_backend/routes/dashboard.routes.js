import express from "express";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 0, fname: 1, lname: 1, username: 1, profileImg: 1 }
    );

    return res.status(200).json({ users });
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

router.post("/sent-friend-request", async (req, res) => {
  try {
    const { userId, friendId, status } = req.body;

    if (userId === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot add yourself as a friend" });
    }
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendId, status: status },
    });

    return res.status(200).json({ message: "Request sent", user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

router.get("/non-friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract all friend relationships
    const friendsMap = new Map();
    currentUser.friends.forEach((friend) => {
      friendsMap.set(friend.friendId.toString(), friend.status);
    });

    // Fetch users who are NOT the current user
    const allUsers = await User.find({
      _id: { $ne: userId }, // Exclude current user
    }).select("username fname lname profileImg");

    // Map users with their friendship status
    const result = allUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      profileImg: user.profileImg,
      status: friendsMap.get(user._id.toString()) || "not_friends", // Default to "not_friends"
    }));

    return res.status(200).json({ users: result });
  } catch (error) {
    console.error("Error fetching non-friends:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
