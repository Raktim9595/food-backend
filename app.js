const express = require("express");
const mongoose = require("mongoose");

const propertyRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");

const app = express();
require("dotenv").config();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connected to the database");
  } catch (e) {
    console.log(e.message);
    console.log("couldnot connect to the database");
  }
};

connectDB();
app.use("/api/v1/", propertyRoute);
app.use("/api/v1/", authRoute);
app.use("/api/v1/", cartRoute);

app.listen(8000, () => {
  console.log("server is running on port " + 8000);
});