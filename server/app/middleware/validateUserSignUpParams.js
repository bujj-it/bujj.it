const debug = require('debug')('express:error:middleware:validateUser');
const { body } = require('express-validator');
const processValidationErrors = require('./processValidationErrors');

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

  const validateSignUpParams = [
    body('username')
      .exists().withMessage('Username cannot be blank!')
      .not()
      .isEmpty()
      .withMessage('Username cannot be blank!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Username can only be letters, numbers, and spaces!')
      .trim(),
    body('email')
      .exists().withMessage('Email cannot be blank!')
      .isEmail()
      .withMessage('Please provide valid email!')
      .normalizeEmail(),
    body('password')
      .exists().withMessage('Password cannot be blank!')
      .not()
      .isEmpty()
      .withMessage('Password cannot be blank!'),
    body('passwordConfirmation')
      .exists().withMessage('Password confirmation does not match password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
    processValidationErrors,
    checkDuplicateUsernameOrEmail,
  ];

  return validateSignUpParams;
};
