const express = require("express");
const router = express.Router();
const Tasks = require("../../models/Tasks");
const { check, validationResult } = require("express-validator");

module.exports = router;

router.get("/getAllTasks", async (req, res) => {
  try {
    let tasks = await Tasks.find();
    return res.json(tasks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
router.get("/getTask", async (req, res) => {
  const { id } = req.body;
  const task = await Tasks.findById(id);
  res.send(task);
});

router.post(
  "/addTask",
  [
    // validations
    check("taskDetails", "Empty Task Provided").notEmpty(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Show error if validations failed
        return res.status(400).json({ errors: errors.array() });
      }
      const { taskDetails } = req.body;
      var currentdate = new Date();
      var taskAddedOn =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      let task = new Tasks({
        taskDetails,
        taskAddedOn,
      });

      await task.save();

      return res.json({ message: "Success" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/updateTask",
  [
    // validations
    check("taskDetails", "ERROR: Empty Task Provided").notEmpty(),
    check("id", "ERROR: Empty ID Provided").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Show error if validations failed
        return res.status(400).json({ errors: errors.array() });
      }
      const { id, taskDetails } = req.body;
      var currentdate = new Date();
      var taskAddedOn =
        "Last Sync: " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      let updatedTask = await Tasks.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            taskDetails,
            taskAddedOn,
          },
        },
        { new: true }
      );

      return res.json({ updatedTask: updatedTask });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.delete(
  "/deleteTask",
  [
    // validations
    check("id", "ERROR: Empty ID Provided").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Show error if validations failed
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.body;

      let deletedTask = await Tasks.findOneAndDelete({
        _id: id,
      });

      return res.json({ deletedTask: deletedTask });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);
