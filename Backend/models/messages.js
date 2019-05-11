const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate(body) {
  const Schema = {
    from_id: Joi.objectId().required(),
    to_id: Joi.objectId().required(),
    message: Joi.string().min(1).required(),
    status: Joi.string().min(1).required(),
  };
  return Joi.validate(body, Schema);
}

const Message = mongoose.model('Message', new mongoose.Schema({
  from_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
}));

module.exports.Message = Message;
module.exports.validate = validate;
