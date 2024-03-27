const express = require("express");
const app = express();

const task_routes = require("./routes/tasks");
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.static("../public"));

// routes
app.use("/api/v1/tasks", task_routes);
app.use(notFound);

const port = 5000;
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
