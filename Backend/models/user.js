const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  departement: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  phone: {
    type: Number,
    required: true,
    minlength: 7,
    maxlength: 14
  },
  photo: String,
  address: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  skills: [String],
  achievments: [String],
  tasks: [String],
  evaluation: Number,
  salary: Number,
  role: String,
  isAdmin: Boolean //todo may need to come back
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(), 
    rePassword: Joi.string().min(5).max(255).required(),
    phone: Joi.number().min(7).required() //todo add the registeration 
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;