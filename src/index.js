import app from "./app.js";
import connectDB from "./db/db.js";
const PORT = process.env.PORT || 5000;

//Connect to db
connectDB();

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
