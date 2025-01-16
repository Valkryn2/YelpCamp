const express = require("express");
const app = express();
const path = require("path");
const CampGround = require("./models/campground");
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");

const db = mongoose.connection;
// db.on wait for response and once the selected response , 'error' occurs the the 2nd parameter occurs.
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database connected");
});

// allows the use of EJS in JavaScripts
app.set("view engine", "ejs");
// ensure that the views folder is used no matter where the app is called from.
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => {
  console.log("you are connected");
});

app.get("/", (req, resp) => {
  resp.render("home");
});

app.get("/makecamp", async (req, resp) => {
  const camp = new CampGround({ name: "backyard", description: "free" });
  await camp.save();
  resp.send(camp);
});
