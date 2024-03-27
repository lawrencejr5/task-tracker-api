const express = require("express");
const router = express.Router();

const {
  getTask,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.get("/", getTasks);
router.post("/", addTask);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
