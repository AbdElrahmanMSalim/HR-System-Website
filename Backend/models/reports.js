const Joi = require ('joi');
const mongoose = require ('mongoose');


const reportSchema = new mongoose.Schema ({
    reportId :{
        type : Number,
        required :true,
        minlength :1 ,
        unique :true 
    },   
    hrId :{
        type : Number,
        minlength :1 ,
        required :true
    },   
    reportTitle :{
        type : String,
        required :true
     
    },   
    reportText :{
        type : String,
        required :true
    }   
});

const Report = mongoose.model('Report', reportSchema);

function validate(report) {
  const schema = {
    reportId: Joi.number().min(1).required().integer(),
    hrId: Joi.number().min(1).required().integer(),
    reportTitle: Joi.string().required(),
    reportText: Joi.string().required()
  };

  return Joi.validate(report, schema);
}

exports.Report = Report; 
exports.validate = validateReport;