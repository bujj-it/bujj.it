const debug = require('debug')('express:error:middleware:validateUser');
const { body } = require('express-validator');
const { filteredUserAttributesList } = require('../helpers/usersHelper');

const validateSignUpParams = [
  body('username')
    .not().isEmpty().withMessage('Username cannot be blank!')
    .matches(/[a-zA-Z0-9 ]+/)
    .withMessage('Username can only be letters, numbers, and spaces!')
    .trim(),
  body('email')
    .isEmail().withMessage('Please provide valid email!')
    .normalizeEmail(),
  body('password')
    .not().isEmpty().withMessage('Password cannot be blank!'),
];

const validateLoginParams = [
  body('user')
    .not().isEmpty().withMessage('User field cannot be blank!'),
  body('password')
    .not().isEmpty().withMessage('Password field cannot be blank!'),
];

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      const searchForExistingUsername = {
        TableName: userTable,
        IndexName: 'usernameIndex',
        KeyConditionExpression: '#username = :username',
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: {
          ':username': req.body.username,
        },
      };
      const usersWithUsername = await database
        .query(searchForExistingUsername)
        .promise();
      if (usersWithUsername.Count > 0) {
        return res.status(400).send({
          message: { username: 'Failed! Username is already in use!' },
        });
      }

      const searchForExistingEmail = {
        TableName: userTable,
        IndexName: 'emailIndex',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':email': req.body.email,
        },
      };
      const usersWithEmail = await database
        .query(searchForExistingEmail)
        .promise();
      if (usersWithEmail.Count > 0) {
        return res.status(400).send({
          message: { email: 'Failed! Email is already in use!' },
        });
      }

      next();
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Sorry something went wrong!' });
    }
  };

  const validateRequestedUserIdParam = async (req, res, next) => {
    // validate /api/users/:userId
    const requestedUserId = req.params.userId;
    try {
      // check user exists
      const userLookUpParams = {
        AttributesToGet: filteredUserAttributesList,
        ConsistentRead: true,
        Key: {
          userId: requestedUserId,
        },
        TableName: userTable,
      };
      const userLookUp = await database.get(userLookUpParams).promise();
      if (userLookUp.Item == null) {
        return res.status(404).send({
          message: 'User page not found!',
        });
      }
      req.requestedUser = userLookUp.Item;
      next();
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Sorry something went wrong!' });
    }
  };

  const validateUserAuthorizedForResource = (req, res, next) => {
    if (req.currentUser.userId !== req.requestedUser.userId) {
      return res.status(403).send({
        message: 'You have insufficient rights to view this page',
      });
    }
    return next();
  };

  return {
    validateSignUpParams,
    validateLoginParams,
    validateRequestedUserIdParam,
    validateUserAuthorizedForResource,
    checkDuplicateUsernameOrEmail,
  };
};
