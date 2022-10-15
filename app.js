const express = require("express");
const mongoose = require("mongoose");

const propertyRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
require("dotenv").config();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // await mongoose.connect("mongodb+srv://Raktim:Raktim2057@fooddelivery.edp17hl.mongodb.net/?retryWrites=true&w=majority");
    console.log("connected to the database");
  } catch (e) {
    console.log(e.message);
    console.log("couldnot connect to the database");
  }
};

connectDB();
app.use("/api/v1/", propertyRoute);
app.use("/api/v1/", authRoute);
app.use("/api/v1/", orderRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running on port " + 8000);
});