const Manager = require("../middleware/Manager");
const HR = require("../middleware/HR");
const ManagerOrHR = require("../middleware/ManagerOrHR");
const Auth = require("../middleware/Auth");
const _ = require("lodash");
const {
  Task,
  validate,
  validateEvaluation,
  validateStatus
} = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", [Auth], async (req, res) => {
  res.send(await Task.find({}));
});

router.get("/:id", [Auth, ManagerOrHR], async (req, res) => {
  const employeeId = req.params.id;
  if (!employeeId) return res.send("No valid id supplied").status(400);

  const tasks = await Task.find({ employeeId });
  if (!tasks) return res.send("No tasks for this employee");

  res.send(tasks);
});

router.post("/", [Auth, Manager], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task(_.pick(req.body, ["task", "employeeId", "managerId"]));

  await task.save();
  res.send(task);
});

router.put("/evaluate/:id", [Auth, HR], async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) res.send("No valid id supplied").status(400);

  const { error } = validateEvaluation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    {
      $set: { evaluation: req.body.evaluation }
    },
    {
      new: true
    }
  );
  if (!task) return res.send("No task by this taskId").status(400);

  res.send(task);
});

router.put("/status/:id", [Auth, Manager], async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) res.send("No valid id supplied").status(400);

  const { error } = validateStatus(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    {
      $set: { status: req.body.status }
    },
    {
      new: true
    }
  );
  if (!task) return res.send("No task by this taskId").status(400);

  res.send(task);
});

module.exports = router;
