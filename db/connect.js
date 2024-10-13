const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.connect(url).then(() => console.log("connect to db"));
};

module.exports = connectDb;
