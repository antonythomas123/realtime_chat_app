import express from "express";
import User from "../models/UserModel.js";

const router = express.Router();

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find({});

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

export default router;
