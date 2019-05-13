const config = require ('config');
const jwt = require ('jsonwebbtoken');
const Joi = require ('joi');
const mongoose = require ('mongoose');


const reportSchema = new mongoose.Schema ({
    report_id :{
        type : Number,
        required :true,
        minlength :1 ,
        unique :true 
    },   
    hr_id :{
        type : Number,
        minlength :1 ,
        required :true
    },   
    report_title :{
        type : String,
        required :true
     
    },   
    report_text :{
        type : String,
        required :true
    }   
});

const Report = mongoose.model('Report', reportSchema);

function validate(report) {
  const schema = {
    report_id: Joi.number().min(1).required().integer(),
    hr_id: Joi.number().min(1).required().integer(),
    
  };

  return Joi.validate(report, schema);
}

exports.Report = Report; 
exports.validate = validateReport;