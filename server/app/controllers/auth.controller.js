const db = require("../models");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

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
