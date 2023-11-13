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

const User = mongoose.model(
  "User",
  new mongoose.Schema(userSchema, { timestamps: true }),
  "user"
);

export default User;
