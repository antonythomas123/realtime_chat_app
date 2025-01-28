import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const isExistingUser = await User.findOne({ username });

    if (!isExistingUser)
      return res.status(400).json({ message: "User not found!" });

    const matchingPassword = await bcrypt.compare(
      password,
      isExistingUser?.password
    );

    if (!matchingPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again!" });
    }

    const token = jwt.sign(
      {
        userId: isExistingUser?._id,
        username: isExistingUser?.username,
      },
      "RANDOM_KEY",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successfull",
      userId: isExistingUser?._id,
      username,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
