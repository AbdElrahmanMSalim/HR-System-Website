const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validate(body) {
  const Schema = {
    employer_id: Joi.objectId().required(),
    date: Joi.date().required(),
    is_reward: Joi.boolean().required(),
    text: Joi.string()
      .min(1)
      .required()
  };
  return Joi.validate(body, Schema);
}

const Rewards = mongoose.model(
  "Rewards",
  new mongoose.Schema({
    employer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: { type: Date, required: true },
    is_reward: { type: Boolean, required: true },
    text: { type: String, required: true }
  })
);

module.exports.Rewards = Rewards;
module.exports.validate = validate;
