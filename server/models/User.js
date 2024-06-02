import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  caption: {
    type: String,
    default: "",
  },
  interests: {
    type: [String],
    default: [],
  },
  pfp: {
    type: String,
    default: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
