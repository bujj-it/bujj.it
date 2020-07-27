const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.signup = (req, res) => {
  User.create({
    first_name: req.body.first_name,
    surname: req.body.surname,
    username: req.body.username,
    dob: req.body.dob,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }).then((user) => {
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      surname: user.surname,
      accessToken: token
    });
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.userPage = (req, res) => {
  res.json({ 
    message: "Successful login",
    status: 200 
  });
};