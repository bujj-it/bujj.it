module.exports = (app, db) => {
  const { verifySessionToken, validateUserAuthorizedForResource } = require('../middleware/validateUserAuthorization')(db);
  const validateRequestedUser = require('../middleware/validateRequestedUser')(db);
  const validateUserSignUpParams = require('../middleware/validateUserSignUpParams')(db);
  const usersController = require('../controllers/users.controller')(db);

  app.get('/api/users/:userId', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
  ], usersController.usersPage);

  app.post('/api/users', validateUserSignUpParams, usersController.signup);
};
