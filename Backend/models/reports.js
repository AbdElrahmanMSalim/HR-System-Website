const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const reportSchema = new mongoose.Schema({
  hrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    reportTitle: Joi.string().required(),
    reportText: Joi.string().required()
  };

  return Joi.validate(report, schema);
}

exports.Report = Report;
exports.validate = validate;
