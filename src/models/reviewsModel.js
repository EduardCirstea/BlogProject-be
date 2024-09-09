import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Article",
    },

    nota: {
      type: String,
      required: [true, "Please add some text"],
      enum: ["1", "2", "3", "4", "5"],
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

const ReviewsModel =
  mongoose.models.ReviewsModel || mongoose.model("ReviewsModel", reviewsSchema);

export default ReviewsModel;
