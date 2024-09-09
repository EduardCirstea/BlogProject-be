import express from "express";
import trimRequest from "trim-request";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  getComments,
  addComments,
} from "../controllers/comentarii.controller.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(trimRequest.all, getComments)
  .post(trimRequest.all, authMiddleware, addComments);

export default router;
