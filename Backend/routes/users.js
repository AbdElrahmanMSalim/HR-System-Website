const auth = require('../middleware/auth');
//const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(_.pick(user, ['_id', 'username', 'email']));
});
router.get('/', async (req, res) => {
  const user = await User.find()
  res.send(user)
});

router.post('/', async (req, res) => {  
  const { error } = validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);
  
  if (req.body.password != req.body.rePassword) return res.status(400).send('Password mismatch') //added

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'rePassword', 'phone']));
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  console.log(user)
  await user.save();

  res.send(_.pick(user, ['_id', 'username', 'email']));
});


router.put('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

   if (req.body.password != req.body.rePassword) return res.status(400).send('Password mismatch') //added

   let user = await User.findOneAndUpdate({ email: req.body.email },
    { $set: _.pick(req.body, ['name', 'email', 'password', 'phone']) }, 
    { new: true },
  );
  if (!user) return res.status(400).send('User not found.');

  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  await user.save();

   res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/',async (req,res)=>{
  email = req.body.email;
  let user = await User.findOne({email :email});
  if (!user) return res.status(404).send("Wrong E-mail..")
  const result = await User.remove({email:email})
  res.send(result);
})
module.exports = router; 
