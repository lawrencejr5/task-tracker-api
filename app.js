const express = require("express");
const app = express();

const task_routes = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();

const port = 5000;

// middleware
app.use(express.json());
app.use("/api/v1/tasks", task_routes);

// routes
app.get("/", (req, res) => {
  res.send("Testing Task Tracker Applcation");
});

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Connected to db and listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
