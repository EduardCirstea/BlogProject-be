import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const articleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Titul este obligatoriu."],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Contentul este obligatoriu."],
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
    data: {
      type: Date,
      required: true,
      default: Date.now,
    },
    reported: {
      type: Boolean,
      required: true,
      default: false,
    },
    location: {
      type: String,
      required: [true, "Locatia este obligatorie."],
      trim: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: [true, "Activitatea este obligatorie."],
      trim: true,
      enum: ["drumetie", "sport", "cultural", "educational", "relaxare"],
    },
    season: {
      type: String,
      required: [true, "Anotimpul este obligatoriu."],
      enum: ["Primavara", "Vara", "Toamna", "Iarna"],
      trim: true,
    },
    country: {
      type: String,
      enum: [
        "United States of America",
        "Canada",
        "Mexico",
        "Brazil",
        "Argentina",
        "United Kingdom",
        "France",
        "Germany",
        "Italy",
        "Spain",
        "Russia",
        "Romania",
        "China",
        "India",
        "Japan",
        "South Korea",
        "Australia",
        "South Africa",
        "Nigeria",
        "Egypt",
        "Saudi Arabia",
        "Turkey",
        "Indonesia",
        "Philippines",
        "Vietnam",
        "Thailand",
        "Pakistan",
        "Bangladesh",
        "Iran",
        "Israel",
        "United Arab Emirates",
        "New Zealand",
        "Singapore",
      ],
      required: true,
    },

    files: [],
  },
  {
    collection: "article",
    timestamps: true,
  }
);

const ArticleModel =
  mongoose.models.ArticleModel || mongoose.model("ArticleModel", articleSchema);

export default ArticleModel;
