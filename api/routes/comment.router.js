import express from "express";
import { CommentController } from "../controllers/index.js";
import { getCommentsByRecipeId } from "../controllers/comment.controller.js";

const { createComment, deleteComment, getAllComment, updateComment } =
  CommentController;

const router = express.Router();

const COMMENT_ROUTES = {
  GET_ALL: "/comment",
  CREATE: "/comment/create",
  UPDATE: "/comment/update/:id",
  DELETE: "/comment/delete/:id",
  GET_BY_RECIPE_ID: "/comment/:id",
};

router.get(COMMENT_ROUTES.GET_ALL, getAllComment);
router.get(COMMENT_ROUTES.GET_BY_RECIPE_ID, getCommentsByRecipeId);
router.post(COMMENT_ROUTES.CREATE, createComment);
router.put(COMMENT_ROUTES.UPDATE, updateComment);
router.delete(COMMENT_ROUTES.DELETE, deleteComment);

export default router;
