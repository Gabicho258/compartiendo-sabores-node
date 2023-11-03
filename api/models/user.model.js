import mongoose from "mongoose";

const userSchema = {
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone_number: String,
  description: String,
  photo_url: String,
};

const User = mongoose.model("User", userSchema, "user");

export default User;
