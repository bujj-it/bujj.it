const debug = require('debug')('express:error:middleware:validateUser');
const { filteredUserAttributesList } = require('app/helpers/usersHelper');

module.exports = (db) => {
  const dbWrapper = db;

  const validateRequestedUserIdParam = async (req, res, next) => {
    try {
      const userLookUp = await dbWrapper.getUserById(req.params.userId, filteredUserAttributesList);
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
