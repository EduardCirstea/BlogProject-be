import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content  is required."],
      trim: true,
    },
    picture: {
      type: String,
      //   required: true,
    },
    reviewed: {
      type: Boolean,
      required: true,
      default: false,
    },
    reported: {
      type: Boolean,
      required: true,
      default: false,
    },
    locatii: {
      type: Array,
      //   required: true,
    },

    files: [],
    // users: [
    //   {
    //     type: ObjectId,
    //     ref: "UserModel",
    //   },
    // ],
    // latestMessage: {
    //   type: ObjectId,
    //   ref: "MessageModel",
    // },
    // admin: {
    //   type: ObjectId,
    //   ref: "UserModel",
    // },
  },
  {
    collection: "blog",
    timestamps: true,
  }
);

const BlogModel =
  mongoose.models.BlogModel || mongoose.model("BlogModel", blogSchema);

export default BlogModel;
