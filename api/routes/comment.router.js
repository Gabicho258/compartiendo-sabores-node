import express from "express";
import { CommentController } from "../controllers/index.js";

const { createComment } = CommentController;

const router = express.Router();

const COMMENT_ROUTES = {
  CREATE: "/comment/create",
};

router.post(COMMENT_ROUTES.CREATE, createComment);

export default router;
