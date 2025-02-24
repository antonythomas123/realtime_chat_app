import express from "express";
import User from "../models/UserModel.js";
import FriendRequest from "../models/FriendRequestModel.js";

const router = express.Router();

router.get("/get-non-friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await User.findById(userId).select("friends");

    if (!currentUser) {
      throw new Error("User not found");
    }

    const nonFriends = await User.find({
      _id: { $nin: [...currentUser.friends, userId] },
    }).select("-password");

    return res.status(200).json({ nonFriends });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/send-friend-request", async (req, res) => {
  try {
    const { from, to, status } = req.body;

    console.log(req.body, "body");

    const request = new FriendRequest({ from, to, status: "pending" });

    await request.save();

    return res.status(200).json({ message: "Request sent" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", e });
  }
});

router.get("/get-all-friend-requests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const receivedRequests = await FriendRequest.find({
      to: userId,
      status: "pending",
    }).populate("from", "username fname lname profileImg");

    return res.status(200).json({ receivedRequests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

export default router;
