import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  fname: {
    type: String,
    required: [true, "Please provide a first name"],
    unique: false
  },
  lname: {
    type: String,
    required: [true, "Please provide a last name"]
  }
});

const User = mongoose.model.Users || mongoose.model("Users", UserSchema);

export default User;
