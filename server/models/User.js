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
  pfp: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
