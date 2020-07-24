const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    first_name: req.body.first_name,
    surname: req.body.surname,
    username: req.body.username,
    dob: req.body.dob,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};