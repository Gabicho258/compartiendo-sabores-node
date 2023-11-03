import mongoose from "mongoose";

const commentSchema = {
  user_id: String,
  recipe_id: String,
  rating: { type: Number, default: 0 },
  comment: String,
};

const Comment = mongoose.model("Comment", commentSchema, "comment");

export default Comment;
