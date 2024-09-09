import { ArticleModel, BlogModel, ReviewsModel } from "../models/index.js";

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.find({ article: req.params.articleId });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const addReviews = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const article = await ArticleModel.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.user.toString() !== req.user.userId) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const existingReview = await ReviewsModel.findOne({
      user: req.user.userId,
      article: req.params.articleId,
    });
    if (existingReview) {
      // If the review already exists and the value is the same, don't update it
      if (existingReview.nota === req.body.nota) {
        return res
          .status(200)
          .json({ message: "Review already exists with the same value" });
      }

      // Update the existing review with the new value
      existingReview.nota = req.body.nota;
      await existingReview.save();

      return res.status(200).json(existingReview);
    }

    // If no review exists, create a new one
    const newReview = await ReviewsModel.create({
      nota: req.body.nota,
      user: req.user.userId,
      article: req.params.articleId,
    });

    return res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    next(error);
  }
};
