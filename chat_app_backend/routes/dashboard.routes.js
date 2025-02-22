import express from "express";
import User from "../models/UserModel.js";

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


export default router;
