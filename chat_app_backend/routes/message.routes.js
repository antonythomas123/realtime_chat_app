import express from "express";
import Message from "../models/MessageModel.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const router = express.Router();

router.post("/send-message/:id", async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const { userid: senderId } = req.headers;

    let imageUrl;

    if (imageUrl) {
      //upload to bucket
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-messages/:id", async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { userid: senderId } = req.headers;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatId },
        { sender: userToChatId, receiver: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
