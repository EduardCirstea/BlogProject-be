import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// dotEnv config
dotenv.config();

//Create express app
const app = express();

//Morgan-middleware as an HTTP request logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Parse json request url - to parse json from body and url
app.use(express.json());

//Parse json request body
app.use(express.urlencoded({ extended: true }));

//Sanitize request data - middleware which sanitizes user-supplied data to prevent MongoDB operator injection
app.use(mongoSanitize());

//Enable cookie - parser-middleware to parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

//Cors - middleware to protect and restrict access to the server
app.use(cors());

//API v1 routes
app.use("/api/v1", routes);

export default app;
