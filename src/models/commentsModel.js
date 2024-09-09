import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
      ref: "User",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Article",
    },

    text: {
      type: String,
      required: [true, "Please add some text"],
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

const CommentsModel =
  mongoose.models.CommentsModel ||
  mongoose.model("CommentsModel", commentsSchema);

export default CommentsModel;
