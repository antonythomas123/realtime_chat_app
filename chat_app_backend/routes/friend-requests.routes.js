import express from "express";
import User from "../models/UserModel.js";
import FriendRequest from "../models/FriendRequestModel.js";

const router = express.Router();

router.get("/get-all-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await User.findById(userId).select("friends");

    if (!currentUser) {
      throw new Error("User not found");
    }

    const nonFriends = await User.find({
      _id: { $nin: [...currentUser.friends, userId] },
    }).select("-password");

    const friendRequests = await FriendRequest.find({
      to: userId,
      from: { $in: nonFriends.map((user) => user._id) },
    });

    const requestMap = {};
    friendRequests.forEach((req) => {
      requestMap[req.from.toString()] = {
        status: req.status,
        friendRequestId: req._id,
      };
    });

    const updatedNonFriends = nonFriends.map((user) => {
      const requestInfo = requestMap[user._id.toString()] || {};
      return {
        ...user.toObject(),
        friendRequestStatus: requestInfo.status || null,
        friendRequestId: requestInfo.friendRequestId || null,
      };
    });

    return res.status(200).json({ users: updatedNonFriends });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/send-friend-request", async (req, res) => {
  try {
    const { from, to, status } = req.body;

    const isExistingRequest = await FriendRequest.find({ from, to });

    if (isExistingRequest && isExistingRequest.some(request => request.status === "pending")) {
      return res.status(400).json({ error: "Request already exist" });
    }

    const request = new FriendRequest({ from, to, status: "pending" });

    await request.save();

    return res.status(200).json({ message: "Request sent" });
  } catch (e) {
    console.log(e);
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

router.put("/accept-or-reject-request", async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Friend request already processed" });
    }

    if (status === "accepted") {
      friendRequest.status = "accepted";
      await friendRequest.save();

      await User.findByIdAndUpdate(friendRequest.from, {
        $push: { friends: friendRequest.to },
      });

      await User.findByIdAndUpdate(friendRequest.to, {
        $push: { friends: friendRequest.from },
      });

      res
        .status(200)
        .json({ message: "Friend request accepted successfully!" });
    } else if (status === "rejected") {
      await FriendRequest.findByIdAndDelete(requestId);

      res
        .status(200)
        .json({ message: "Friend request rejected and removed successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
