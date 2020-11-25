const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const debug = require('debug')('express:error:usersController');
const config = require('app/config/auth.config');
const { filterUserAttributes } = require('app/helpers/usersHelper');

module.exports = (db) => {
  const dbWrapper = db;

  const signup = async (req, res) => {
    try {
      const newUser = {
        userId: uuid.v1(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      };

      await dbWrapper.createUser(newUser);

      const sessionToken = jwt.sign(
        { id: newUser.userId },
        config.secret,
        {
          expiresIn: config.expiresIn,
        },
      );
      res.cookie('x-access-token', sessionToken, config.tokenCookieOptions);
      res.status(200).send({
        message: 'User signup successful',
        user: filterUserAttributes(newUser),
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const usersPage = async (req, res) => res.status(200).send({
    user: req.requestedUser,
  });

  return {
    signup,
    usersPage,
  };
};
