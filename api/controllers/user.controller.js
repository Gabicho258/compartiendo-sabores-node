import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req, res) => {
  const newUser = new User({ ...req.body });
  try {
    const user = await newUser.save();
    user && res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id: user_id } = req.params;
  const userToUpdate = req.body;

  try {
    const userUpdated = await User.findByIdAndUpdate(user_id, userToUpdate, {
      new: true,
    });
    if (userUpdated) {
      res.status(200).json(userUpdated);
    } else {
      res.status(204).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "qweqwe" });
  }
};
