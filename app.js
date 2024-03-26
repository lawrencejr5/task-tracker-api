const express = require("express");
const app = express();

const task_routes = require("./routes/tasks");

const port = 5000;

// routes
app.get("/", (req, res) => {
  res.send("Testing Task Tracker Applcation");
});

app.use("/api/v1/tasks", task_routes);
app.use(express.json());

app.listen(port, console.log(`App listening on port ${port}...`));
