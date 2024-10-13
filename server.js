const connectDb = require("./db/connect");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
const errorHandller = require("./middleware/error-handller");

const tasks = require("./routes/tasks");
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/tasks", tasks);

app.use(errorHandller);

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    app.listen(3500, () => {
      console.log("app listen");
    });
  } catch (err) {
    console.error(err);
  }
};
start();
