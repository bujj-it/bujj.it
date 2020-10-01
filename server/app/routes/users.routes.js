const { verifySessionToken } = require('../middleware/authJwt');
const processValidationErrors = require('../middleware/processValidationErrors');

module.exports = (app, db) => {
  const usersController = require('../controllers/users.controller')(db);
  const validateUser = require('../middleware/validateUser')(db);

  app.get('/api/users/:userId', [
    verifySessionToken(db),
    validateUser.validateRequestedUserIdParam,
  ], usersController.usersPage);

  app.post(
    '/api/users',
    [
      validateUser.validateSignUpParams,
      processValidationErrors,
      validateUser.checkDuplicateUsernameOrEmail,
    ],
    usersController.signup,
  );
};
