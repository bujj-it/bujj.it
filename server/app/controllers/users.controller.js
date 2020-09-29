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
      const createUserParams = {
        TableName: userTable,
        Item: {
          userId: uuid.v1(),
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
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const usersPage = async (req, res) => {
    try {
      const userLookUpParams = {
        AttributesToGet: [ 'userId', 'username', 'email' ],
        ConsistentRead: true,
        Key: {
          'userId': req.userId
        }, 
        TableName: userTable
      }
      const userLookUp = await database.get(userLookUpParams).promise();
      console.log(userLookUp.Count)
      if (userLookUp.userId == null) {
        return res.status(401).send({
          message: 'Unauthorized!',
        });
      }
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }

  return {
    signup,
    usersPage,
  };
}

