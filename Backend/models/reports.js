const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const reportSchema = new mongoose.Schema({
  hrName: {
    type: String,
    minlength: 1,
    required: true
  },
  reportTitle: {
    type: String,
    required: true
  },
  reportText: {
    type: String,
    required: true
  }
});

const Report = mongoose.model("Report", reportSchema);

function validate(report) {
  const schema = {
    hrName: Joi.string()
      .min(1)
      .required(),
    reportTitle: Joi.string().required(),
    reportText: Joi.string().required()
  };

  return Joi.validate(report, schema);
}

exports.Report = Report;
exports.validate = validate;
