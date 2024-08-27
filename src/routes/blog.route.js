import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router
  .route("/")
  .post(trimRequest.all, authMiddleware, createBlog)
  .get(trimRequest.all, authMiddleware, getBlogs);

router
  .route("/:id")
  .get(trimRequest.all, authMiddleware, getBlog)
  .delete(trimRequest.all, authMiddleware, deleteBlog)
  .put(trimRequest.all, authMiddleware, updateBlog);
export default router;
