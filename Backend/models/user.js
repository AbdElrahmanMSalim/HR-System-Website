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
  role: {
    type: String,
    enum: ['IT', 'CEO', 'HR', 'Employee', 'Manager'],
    required: true //todo we need to add this to the route and the route validation
  },
  isAdmin: Boolean //todo may need to come back
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email, name: this.name, role: this.role }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    newMail: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required(), 
    rePassword: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(7).max(15).required(),
    role: Joi.string().required().valid('IT', 'CEO', 'HR', 'Employee', 'Manager'),
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;