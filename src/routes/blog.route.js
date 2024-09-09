import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} from "../controllers/blog.controller.js";
const router = express.Router();

import comentariesRouter from "./comentaries.route.js";
router.use("/:blogId/comments", comentariesRouter);

// import reviewsRouter from "./reviews.route.js";
// router.use("/:blogId/reviews", reviewsRouter);

router
  .route("/")
  .post(trimRequest.all, authMiddleware, createBlog)
  .get(trimRequest.all, authMiddleware, getBlogs);
router.route("/all-blogs").get(trimRequest.all, getAllBlogs);

router
  .route("/:blogId")
  .get(trimRequest.all, getBlog)
  .delete(trimRequest.all, authMiddleware, deleteBlog)
  .put(trimRequest.all, authMiddleware, updateBlog);
export default router;
