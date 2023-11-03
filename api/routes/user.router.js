import express from "express";
import { UserController } from "../controllers/index.js";

const { createUser, getAllUsers, updateUser } = UserController;

const router = express.Router();

const USER_ROUTES = {
  GET_ALL: "/user",
  CREATE: "/user/create",
  UPDATE: "/user/update/:id",
};

router.get(USER_ROUTES.GET_ALL, getAllUsers);
router.put(USER_ROUTES.UPDATE, updateUser);
router.post(USER_ROUTES.CREATE, createUser);

export default router;
