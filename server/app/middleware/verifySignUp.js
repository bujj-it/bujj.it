const debug = require('debug')('express:error:middleware:verifySignUp');
const { body, validationResult } = require('express-validator');

function checkDuplicateUsernameOrEmail(db) {
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
          message: 'Failed! Username is already in use!',
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
          message: 'Failed! Email is already in use!',
        });
      }

      next();
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Sorry something went wrong!' });
    }
  };
}

const verifySignUpParams = [
  body('username')
    .isLength({ min: 1 }).withMessage('Username cannot be blank!'),
];

const processValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.errors.map((err) => err.msg) });
  }
  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  verifySignUpParams,
  processValidationErrors,
};
