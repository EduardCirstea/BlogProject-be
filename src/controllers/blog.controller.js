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
      user: user,
      title: req.body.title,
      content: req.body.content,
      locatie: req.body.locatie,
      lat: req.body.lat,
      lng: req.body.lng,
      activity: req.body.activity,
      anotimp: req.body.anotimp,
      tara: req.body.tara,
      pret: req.body.pret,
      durata: req.body.durata,
      transport: req.body.transport,
      files: req.body.files || [],
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
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
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
    const blog = await BlogModel.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
    }
    if (blog.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.blogId,
      req.body
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
    const blog = await BlogModel.findById(req.params.blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog was not found");
    }
    if (blog.user.toString() !== user) {
      res.status(401);
      throw new Error("Not Authorized");
    }
    await BlogModel.findByIdAndDelete(req.params.blogId);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
