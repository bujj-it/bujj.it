const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const debug = require('debug')('express:error:usersController');
const config = require('../config/auth.config');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const signup = async (req, res) => {
    try {
      const uniqueUserId = uuid.v1();
      const createUserParams = {
        TableName: userTable,
        Item: {
          userId: uniqueUserId,
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        },
      };
      await database.put(createUserParams).promise();
      const sessionToken = jwt.sign(
        { id: createUserParams.Item.userId },
        config.secret,
        {
          expiresIn: config.expiresIn,
        },
      );
      res.cookie('x-access-token', sessionToken, config.tokenCookieOptions);
      res.status(200).send({
        message: 'User signup successful',
        userId: uniqueUserId,
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const usersPage = async (req, res) => {
    try {
      const userLookUpParams = {
        AttributesToGet: ['userId', 'username', 'email'],
        ConsistentRead: true,
        Key: {
          userId: req.userId,
        },
        TableName: userTable,
      };
      const userLookUp = await database.get(userLookUpParams).promise();
      if (userLookUp.Item == null) {
        return res.status(401).send({
          message: 'Unauthorized!',
        });
      }
      return res.status(200).send(userLookUp.Item);
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    signup,
    usersPage,
  };
};
