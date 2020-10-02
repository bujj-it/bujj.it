const debug = require('debug')('express:error:middleware:validateUser');
const { filteredUserAttributesList } = require('../helpers/usersHelper');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const validateRequestedUserIdParam = async (req, res, next) => {
    const requestedUserId = req.params.userId;
    try {
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

  return validateRequestedUserIdParam;
};
