const cities = require("./cities");
const mongoose = require("mongoose");
const { descriptors, places } = require("./seedHelpers");
const CampGround = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");

const Schema = mongoose.Schema;

const CampGroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await CampGround.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomNumber = Math.floor(Math.random() * 1000); // creates random number < 1000
    const newCamp = new CampGround({
      location: `${cities[randomNumber].city} , ${cities[randomNumber].state}`, //chooses a random city from cities.js
      title: `${sample(descriptors)} , ${sample(places)}`,
    });
    await newCamp.save();
  }
};

// sees the database then closes it
seedDB().then(() => {
  mongoose.connection.close();
});
