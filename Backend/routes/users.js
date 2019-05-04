const auth = require('../middleware/auth');
const IT = require('../middleware/IT');
const CEO = require('../middleware/CEO');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/me', auth , async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', [auth , CEO], async (req, res) => {
  const user = await User.find().select("-password");
  res.send(user);
});

router.get('/:roleToShow', [auth , CEO], async (req, res) => {
  const rolesToShow = ['Employee', 'HR', 'CEO', 'Manager', 'IT']
  const roleToShow = rolesToShow.find((element) => {
    return element === req.params.roleToShow
  });
  if(!roleToShow) return res.status(400).send('Bad Request.. Please provide a valid route params')
  
  const user = await User.find({role: req.params.roleToShow}).select("-password")
  res.send(user)
});

router.post('/', [auth, IT], async (req, res) => {
  const {
    error
  } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password != req.body.rePassword) return res.status(400).send('Password mismatch') //added

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'rePassword', 'phone', 'role']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/', [auth, IT], async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password != req.body.rePassword) return res.status(400).send('Password mismatch') //added

  if (req.body.newMail) req.body.mail = req.body.newMail; // we use that only for development

  // const salt = await bcrypt.genSalt(10);
  let user = await User.findOneAndUpdate({
    email: req.body.email
  }, {
    $set: {
      name: req.body.name,
      email: req.body.mail,
      password: req.body.password,
      phone: req.body.phone,
      role :req.body.role
       }
  }, {
    new: true
  });
  if (!user) return res.status(400).send('User not found.');

  
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/', [auth, IT], async (req, res) => {
  email = req.body.email;
  let user = await User.findOne({
    email: email
  });
  if (!user) return res.status(404).send("Wrong E-mail..")
  const result = await User.remove({
    email: email
  })
  res.send(result);
})
module.exports = router;