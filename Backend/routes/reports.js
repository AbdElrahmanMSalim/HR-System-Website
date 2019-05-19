const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const auth = require('../middleware/auth');
//const {User, validateAuth} = require('../models/user');
const { Report, validate } = require('../models/reports');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const reports = await Report.find({ hrId: req.user._id });
  if(!reports.length) return res.status(400).send('No reports found');

  res.send(reports);
});

router.post('/add', auth, async(req, res) => {
  req.body.hrId = req.user._id;
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const report = new Report(req.body);
  await report.save();
  
  res.send(report);
});

module.exports = router;
