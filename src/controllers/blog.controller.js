import createHttpError from "http-errors";
import { BlogModel, UserModel } from "../models/index.js";

export const createBlog = async (req, res, next) => {
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
    const newBlog = await BlogModel.create({
      title: req.body.title,
      content: req.body.content,
      user: user,
    });
    res.status(201).json(newBlog);
    console.log(newBlog);
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const blogs = await BlogModel.find({ user: user });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getBlog = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
    }
    if (blog.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
    }
    if (blog.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const user = req.user.userId;
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
    }
    if (blog.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    await blog.remove();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
