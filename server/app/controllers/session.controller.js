const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const debug = require('debug')('express:error:sessionController');
const config = require('app/config/auth.config');
const { filterUserAttributes } = require('app/helpers/usersHelper');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const signin = async (req, res) => {
    try {
      const searchForUsername = {
        TableName: userTable,
        IndexName: 'usernameIndex',
        KeyConditionExpression: '#username = :username',
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: {
          ':username': req.body.user,
        },
      };
      const searchForUserEmail = {
        TableName: userTable,
        IndexName: 'emailIndex',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':email': req.body.user,
        },
      };
      const dbRequests = [
        database.query(searchForUsername).promise(),
        database.query(searchForUserEmail).promise(),
      ];
      const results = await Promise.all(dbRequests);
      const usernameResult = results[0];
      const userEmailResult = results[1];

      if (usernameResult.Count === 0 && userEmailResult.Count === 0) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
      const user = usernameResult.Count > 0
        ? usernameResult.Items[0]
        : userEmailResult.Items[0];

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
