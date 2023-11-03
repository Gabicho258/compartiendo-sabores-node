import { Comment } from "../models/index.js";

export const createComment = async (req, res) => {
  const newComment = new Comment({ ...req.body });
  try {
    const comment = await newComment.save();
    comment && res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
