const debug = require('debug')('express:error:authJwt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const { filteredUserAttributesList } = require('../helpers/usersHelper');

const verifySessionToken = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  return async (req, res, next) => {
    try {
      const token = req.signedCookies['x-access-token'];

      if (!token) {
        return res.status(403).send({
          message: 'No token provided!',
        });
      }

      jwt.verify(token, config.secret, async (err, decoded) => {
        // invalid or expired session token
        if (err) {
          return res.status(401).send({
            message: 'Unauthorized!',
          });
        }
        // check user exists
        const userLookUpParams = {
          AttributesToGet: filteredUserAttributesList,
          ConsistentRead: true,
          Key: {
            userId: decoded.id,
          },
          TableName: userTable,
        };
        const userLookUp = await database.get(userLookUpParams).promise();
        if (userLookUp.Item == null) {
          return res.status(403).send({
            message: 'User not found!',
          });
        }
        req.currentUser = userLookUp.Item;
        next();
      });
    } catch (err) {
      debug(err);
      return res.status(500).send({ message: 'Sorry something went wrong!' });
    }
  };
};

module.exports = {
  verifySessionToken,
};
