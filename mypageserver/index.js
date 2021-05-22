const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");

const User = require("./models/User");

const tabRoutes = require("./routes/tab");
const userRoutes = require("./routes/user");
const wellnessRoutes = require("./routes/wellness");

const app = express();

app.use(bodyParse.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoutes);
app.use("/wellness", wellnessRoutes);
app.use("/tab", tabRoutes);

app.use((req, res, next) => {
  res.status(400).json({ status: 400, message: "Page does not exist" });
});

app.use((error, req, res, next) => {
  let message = "Server Error, Please try again later";
  let status = 500;
  if (error.message) {
    message = error.message;
  }
  if (error.status) {
    status = error.status;
  }
  res.status(200).json({ status: status, message: message });
});

mongoose
  .connect(
    "mongodb+srv://myPageUser:FXafZaM1pra6x5G3@cluster0.nkdsk.mongodb.net/myPage",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(8080, () => {
      console.log("running");
    });
  });
