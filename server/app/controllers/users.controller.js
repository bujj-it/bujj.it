const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const debug = require('debug')('express:error:usersController');
const config = require('../config/auth.config');
const { filterUserAttributes } = require('../helpers/usersHelper');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const signup = async (req, res) => {
    try {
      const newUser = {
        userId: uuid.v1(),
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      };
      const createUserParams = {
        TableName: userTable,
        Item: newUser,
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
        user: filterUserAttributes(newUser),
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const usersPage = async (req, res) => res.status(200).send({
    user: req.currentUser,
  });

  return {
    signup,
    usersPage,
  };
};
