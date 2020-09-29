const debug = require('debug')('express:error:middleware:verifySignUp');

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

module.exports = {
  checkDuplicateUsernameOrEmail,
};
