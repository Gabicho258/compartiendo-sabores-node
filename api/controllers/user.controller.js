import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOneUser = async (req, res) => {
  const { id: user_id } = req.params;

  try {
    const user = await User.findById(user_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req, res) => {
  // Encriptamos la contraseña
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 15);

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });
    // Creamos un nuevo usuario con la contraseña encriptada
    const newUser = new User({ ...req.body, password: passwordHash });
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
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  // Verificamos la petición
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ error: "Bad request" });

  // Comprobamos que exista un usuario con el correo ingresado
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  // Validamos la contraseña encriptada
  bcrypt.compare(password, user.password, (error, isValid) => {
    if (isValid) {
      jwt.sign(
        { email: user.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({ token, user });
          } else res.status(401).json({ error: "Invalid credentials" });
        }
      );
    } else {
      res.status(401).send();
    }
  });
};
