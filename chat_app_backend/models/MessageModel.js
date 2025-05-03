import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    // conversationId: {
    //   type: String,
    //   required: true,
    // },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model.Messages || mongoose.model("Messages", MessageSchema);

export default Message;
