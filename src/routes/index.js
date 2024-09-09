import express from "express";
import authRoutes from "./auth.route.js";
import blogRoutes from "./blog.route.js";
import articleRoutes from "./articole.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/article", articleRoutes);

export default router;
