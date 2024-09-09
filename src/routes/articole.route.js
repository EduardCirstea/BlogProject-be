import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
} from "../controllers/article.controller.js";
const router = express.Router();

// import comentariesRouter from "./comentaries.route.js";
// router.use("/:articleId/comments", comentariesRouter);

import reviewsRouter from "./reviews.route.js";
router.use("/:articleId/reviews", reviewsRouter);

router
  .route("/")
  .post(trimRequest.all, authMiddleware, createArticle)
  .get(trimRequest.all, authMiddleware, getArticles);
router.route("/all-articles").get(trimRequest.all, getAllArticles);

router
  .route("/:articleId")
  .get(trimRequest.all, getArticle)
  .delete(trimRequest.all, authMiddleware, deleteArticle)
  .put(trimRequest.all, authMiddleware, updateArticle);
export default router;
