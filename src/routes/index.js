import express from "express";
import authRoutes from "./auth.route.js";
import blogRoutes from "./blog.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);

export default router;
