const _ = require("lodash");
const auth = require("../middleware/auth");
const { Suggestion, validate } = require("../models/suggestions");
const express = require("express");
const router = express.Router();

router.get("/", [auth, Manager], async (req, res) => {
  const suggestions = await Suggestion.find({});
  if (!suggestions.length) return res.status(400).send("No reports found");

  res.send(suggestions);
});

router.post("/", [auth, HR], async (req, res) => {
  req.body.hrId = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const report = new Report(req.body);
  await report.save();

  res.send(report);
});

module.exports = router;
