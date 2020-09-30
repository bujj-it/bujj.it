const debug = require('debug')('express:error:middleware:verifySignUp');
const { body, validationResult } = require('express-validator');

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

const processValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = {};
    for (let i = 0; i < result.errors.length; i += 1) {
      if (!errorMessages[result.errors[i].param]) {
        errorMessages[result.errors[i].param] = result.errors[i].msg;
      }
    }
    return res.status(400).json({ message: errorMessages });
  }
  next();
};

const checkDuplicateUsernameOrEmail = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  return async (req, res, next) => {
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
};

module.exports = {
  validateSignUpParams,
  validateLoginParams,
  processValidationErrors,
  checkDuplicateUsernameOrEmail,
};
