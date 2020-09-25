const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const debug = require('debug')('express:error:sessionsController');
const config = require('../config/auth.config');

exports.signin = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  return async (req, res) => {
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

      const sessionToken = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: config.expiresIn,
      });
      res.cookie('x-access-token', sessionToken, config.tokenCookieOptions);
      res.status(200).send({
        message: 'Login Successful',
      });
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Something went wrong!' });
    }
  };
};
