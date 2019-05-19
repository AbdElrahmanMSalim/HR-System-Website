const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const suggestionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  isSuggest: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Suggestion = mongoose.model("suggestion", suggestionSchema);

function validate(suggestion) {
  const schema = {
    employeerId: Joi.objectId()
      .min(1)
      .required()
      .integer(),
    date: Joi.date().required(),
    isSuggest: Joi.boolean().required(),
    text: Joi.string().required()
  };

  return Joi.validate(suggestion, schema);
}

exports.Suggestion = Suggestion;
exports.validate = validate;
