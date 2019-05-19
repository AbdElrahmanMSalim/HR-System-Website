const HR = require("../middleware/HR");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { Report, validate } = require("../models/reports");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const reports = await Report.find({ hrId: req.user._id });
  if (!reports.length) return res.status(400).send("No reports found");

  res.send(reports);
});

router.post("/", [auth, HR], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const report = new Report(req.body);
  await report.save();

  res.send(report);
});

module.exports = router;
