import { Comment } from "../models/index.js";

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createComment = async (req, res) => {
  const newComment = new Comment({ ...req.body });
  try {
    const comment = await newComment.save();
    comment && res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateComment = async (req, res) => {
  const { id: comment_id } = req.params;
  const commentToUpdate = req.body;

  try {
    const commentUpdated = await Comment.findByIdAndUpdate(
      comment_id,
      commentToUpdate,
      {
        new: true,
      }
    );
    if (commentUpdated) {
      res.status(200).json(commentUpdated);
    } else {
      res.status(204).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id: comment_id } = req.params;
  try {
    const commentDeleted = await Comment.findByIdAndDelete(comment_id);
    if (commentDeleted) {
      res.status(200).json(commentDeleted);
    } else {
      res.status(204).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
