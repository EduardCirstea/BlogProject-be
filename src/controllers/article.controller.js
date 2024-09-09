import createHttpError from "http-errors";
import { ArticleModel, UserModel } from "../models/index.js";

export const createArticle = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Perform validation on the incoming request body
    if (!req.body.title || !req.body.content) {
      throw createHttpError(400, "Title and content are required");
    }
    const newArticle = await ArticleModel.create({
      user: user,
      title: req.body.title,
      content: req.body.content,
      location: req.body.location,
      lat: req.body.lat,
      lng: req.body.lng,
      activity: req.body.activity,
      season: req.body.season,
      country: req.body.country,
      date: req.body.date,
      files: req.body.files || [],
    });
    res.status(201).json(newArticle);
    console.log(newArticle);
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const articles = await ArticleModel.find({ user: user });
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};
export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res, next) => {
  try {
    // const user = req.user.userId;

    // if (!user) {
    //   res.status(401);
    //   throw new Error("User not found");
    // }

    const article = await ArticleModel.findById(req.params.articleId);
    if (!article) {
      res.status(404);
      throw new Error("article was not found");
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};
export const updateArticle = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const article = await ArticleModel.findById(req.params.articleId);
    if (!article) {
      res.status(404);
      throw new Error("article was not found");
    }
    if (article.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.articleId,
      req.body
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const article = await ArticleModel.findById(req.params.articleId);
    if (!article) {
      res.status(404);
      throw new Error("article was not found");
    }
    if (article.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    await ArticleModel.findByIdAndDelete(req.params.articleId);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
