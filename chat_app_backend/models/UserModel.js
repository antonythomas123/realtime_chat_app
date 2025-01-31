import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  fname: {
    type: String,
    required: [true, "Please provide a first name"],
    unique: false,
  },
  lname: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  profileImg: {
    type: String,
  },
  friends: [
    {
      friendId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },
    },
  ],
});

const User = mongoose.model.Users || mongoose.model("Users", UserSchema);

export default User;
