import {
  ArticleModel,
  BlogModel,
  CommentsModel,
  UserModel,
} from "../models/index.js";

export const getComments = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId);

    const comentarii = await CommentsModel.find({ blog: req.params.blogId });
    res.status(200).json(comentarii);
  } catch (error) {
    next(error);
  }
};

export const addComments = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const blog = await BlogModel.findById(req.params.blogId);
    const userObj = await UserModel.findById(req.user.userId);
    if (blog.user.toString() !== req.user.userId) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const comentarii = await CommentsModel.create({
      text: req.body.text,
      user: userObj,
      blog: req.params.blogId,
    });
    res.status(200).json(comentarii);
  } catch (error) {
    next(error);
  }
};
