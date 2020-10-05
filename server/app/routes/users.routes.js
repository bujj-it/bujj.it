module.exports = (app, db) => {
  const { verifySessionToken, validateUserAuthorizedForResource } = require('app/middleware/validateUserAuthorization')(db);
  const validateRequestedUser = require('app/middleware/validateRequestedUser')(db);
  const validateUserSignUpParams = require('app/middleware/validateUserSignUpParams')(db);
  const usersController = require('app/controllers/users.controller')(db);

  app.post('/api/users', validateUserSignUpParams, usersController.signup);

  app.use('/api/users/:userId', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
  ]);

  app.get('/api/users/:userId', usersController.usersPage);
};
