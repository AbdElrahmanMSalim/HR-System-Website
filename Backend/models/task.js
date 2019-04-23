const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  task_id: {
    type: Number,
    required: true,
    minlength: 1,
    unique: true
  },
  status: {
    type: String,
    default:"Didn't start yet",
    minlength: 5,
    maxlength: 50
  },
  evaluation: {
    type: Number,
    minlength: 1,
    maxlength: 10,
    default:-1, // mean it did not evaluate yet.
  },
  employeeId: {
    type: Number,
    required: true,
    minlength: 1
  },
  managerId: {
    type: Number,
    required: true,
    minlength: 1
  },
  
});


const Task = mongoose.model('Task', taskSchema);

function validateTask(user) {
  const schema = {
    task: Joi.string().min(5).max(50).required(),
    task_id: Joi.number().min(1).required().integer(),
    employee_id: Joi.number().min(1).required().integer(), 
    manager_id: Joi.number().min(1).required() .integer()
  };

  return Joi.validate(user, schema);
}

exports.Task = Task; 
exports.validate = validateTask;