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
    location: {
      type: String,
      required: [true, "Locatie este obligatorie."],
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
    },
    season: {
      type: String,
      required: [true, "Anotimp este obligatoriu."],
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
    },
    price: {
      type: Number,
      required: [true, "Pretul este obligatoriu."],
      min: 0,
    },
    term: {
      type: Number,
      required: [true, "Durata este obligatorie."],
      min: 1,
    },
    transport: {
      type: String,
      required: [true, "Transport este obligatoriu."],
      enum: ["Masina", "Avion", "Autobuz", "Tren"],
      trim: true,
    },
    files: [],
  },
  {
    collection: "blog",
    timestamps: true,
  }
);

const BlogModel =
  mongoose.models.BlogModel || mongoose.model("BlogModel", blogSchema);

export default BlogModel;
