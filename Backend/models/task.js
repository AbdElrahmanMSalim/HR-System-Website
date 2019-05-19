const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    minlength: 1
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    minlength: 1
  },
  status: {
    type: String,
    default: "NotDone",
    minlength: 5,
    maxlength: 50,
    enum: ["Done", "NotDone"]
  },
  evaluation: {
    type: Number,
    minlength: 1,
    maxlength: 5,
    default: -1 // mean it did not evaluate yet.
  }
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(user) {
  const schema = {
    task: Joi.string()
      .min(5)
      .max(50)
      .required(),
    employeeId: Joi.objectId()
      .min(1)
      .required(),
    managerId: Joi.objectId()
      .min(1)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateEvaluation(user) {
  const schema = {
    evaluation: Joi.number()
      .min(1)
      .max(5)
      .required()
  };

  return Joi.validate(user, schema);
}

function validateStatus(user) {
  const schema = {
    status: Joi.string()
      .required()
      .valid("Done", "NotDone")
  };

  return Joi.validate(user, schema);
}

exports.Task = Task;
exports.validate = validateTask;
exports.validateEvaluation = validateEvaluation;
exports.validateStatus = validateStatus;
