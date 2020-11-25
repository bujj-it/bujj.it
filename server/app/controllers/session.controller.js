const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const debug = require('debug')('express:error:sessionController');
const config = require('app/config/auth.config');
const { filterUserAttributes } = require('app/helpers/usersHelper');

module.exports = (db) => {
  const signin = async (req, res) => {
    try {
      const user = await db.searchForUser(req.body.user);

      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (isPasswordValid) {
        const sessionToken = jwt.sign({ id: user.userId }, config.secret, {
          expiresIn: config.expiresIn,
        });
        res.cookie('x-access-token', sessionToken, config.tokenCookieOptions);
        return res.status(200).send({
          message: 'Login Successful',
          user: filterUserAttributes(user),
        });
      }
      return res.status(401).send({
        message: 'Password incorrect',
      });
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const signout = (req, res) => {
    try {
      res.clearCookie('x-access-token');
      return res.status(200).send({
        message: 'Logout successful',
      });
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    signin,
    signout,
  };
};
