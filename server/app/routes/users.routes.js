const { verifySessionToken } = require('../middleware/validateSession');

module.exports = (app, db) => {
  const usersController = require('../controllers/users.controller')(db);
  const validateUser = require('../middleware/validateUser')(db);

  app.get('/api/users/:userId', [
    verifySessionToken(db),
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
  ], usersController.usersPage);

  app.post(
    '/api/users',
    [
      validateUser.validateSignUpParams,
      validateUser.checkDuplicateUsernameOrEmail,
    ],
    usersController.signup,
  );
};
