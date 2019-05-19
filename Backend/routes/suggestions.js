const _ = require("lodash");
const auth = require("../middleware/auth");
const { Suggestion, validate } = require("../models/suggestions");
const express = require("express");
const router = express.Router();

router.post("/", [auth, HR], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const suggestion = new Suggestion(req.body);
  await suggestion.save();

  res.send(suggestion);
});

module.exports = router;
