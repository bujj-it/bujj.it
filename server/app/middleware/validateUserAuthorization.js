const debug = require('debug')('express:error:validateSession');
const jwt = require('jsonwebtoken');
const config = require('app/config/auth.config.js');
const { filteredUserAttributesList } = require('app/helpers/usersHelper');

module.exports = (db) => {
  const verifySessionToken = async (req, res, next) => {
    try {
      const token = req.signedCookies['x-access-token'];

      if (!token) {
        return res.status(403).send({
          message: 'No token provided!',
        });
      }

      jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Unauthorized!',
          });
        }
        const userLookUp = await db.getUserById(decoded.id, filteredUserAttributesList);
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

  const validateUserAuthorizedForResource = (req, res, next) => {
    if (req.currentUser.userId !== req.requestedUser.userId) {
      return res.status(403).send({
        message: 'You have insufficient rights to view this page',
      });
    }
    return next();
  };

  return {
    verifySessionToken,
    validateUserAuthorizedForResource,
  };
};
