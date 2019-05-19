const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const suggestionSchema = new mongoose.Schema({
  hrName: {
    type: String,
    minlength: 1,
    required: true
  },
  suggestionTitle: {
    type: String,
    required: true
  },
  suggestionText: {
    type: String,
    required: true
  }
});

const Suggestion = mongoose.model("suggestion", suggestionSchema);

function validate(suggestion) {
  const schema = {
    hrName: Joi.string()
      .min(1)
      .required(),
    suggestionTitle: Joi.string().required(),
    suggestionText: Joi.string().required()
  };
  return Joi.validate(suggestion, schema);
}

exports.Suggestion = Suggestion;
exports.validate = validate;
