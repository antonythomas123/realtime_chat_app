import express from "express";
import encryptPassword from "../middlewares/encryption.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/register", encryptPassword, async (req, res) => {
  try {
    const { username, password, fname, lname } = req.body;

    if (username) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
    } else {
      return res.status(400).json({ message: "Username is required" });
    }

    if (password) {
      const newUser = new User({ username, password, fname, lname });

      await newUser.save();

      return res.status(200).json({ message: "User created successfully!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error });
  }
});

router.post("/login", (req, res) => {});

export default router;
