import express from "express";
import { UserController } from "../controllers/index.js";

const { createUser, getAllUsers, updateUser, getOneUser, login } =
  UserController;

const router = express.Router();

const USER_ROUTES = {
  GET_ALL: "/user",
  GET_ONE: "/user/:id",
  CREATE: "/user/create",
  UPDATE: "/user/update/:id",
  LOGIN: "/auth/login",
};

router.get(USER_ROUTES.GET_ALL, getAllUsers);
router.get(USER_ROUTES.GET_ONE, getOneUser);
router.put(USER_ROUTES.UPDATE, updateUser);
router.post(USER_ROUTES.CREATE, createUser);
router.post(USER_ROUTES.LOGIN, login);

export default router;
