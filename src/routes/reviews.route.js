import express from "express";
import trimRequest from "trim-request";

import authMiddleware from "../middleware/authMiddleware.js";
import { getReviews, addReviews } from "../controllers/reviews.controller.js";
const router = express.Router({ mergeParams: true });

router.route("/").get(getReviews).post(authMiddleware, addReviews);

export default router;
