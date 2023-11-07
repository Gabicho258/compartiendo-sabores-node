import express from "express";
import { CommentController } from "../controllers/index.js";

const { createComment, deleteComment, getAllComment, updateComment } =
  CommentController;

const router = express.Router();

const COMMENT_ROUTES = {
  GET_ALL: "/comment",
  CREATE: "/comment/create",
  UPDATE: "/comment/update/:id",
  DELETE: "/comment/delete/:id",
};

router.get(COMMENT_ROUTES.GET_ALL, getAllComment);
router.post(COMMENT_ROUTES.CREATE, createComment);
router.put(COMMENT_ROUTES.UPDATE, updateComment);
router.delete(COMMENT_ROUTES.DELETE, deleteComment);

export default router;
