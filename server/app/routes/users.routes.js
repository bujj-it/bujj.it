const { verifySessionToken } = require('../middleware/authJwt');
const validateUser = require('../middleware/validateUser');

module.exports = (app, db) => {
  const usersController = require('../controllers/users.controller')(db);

  app.get('/api/users/:id', verifySessionToken, usersController.usersPage);

  app.post(
    '/api/users',
    [
      validateUser.validateSignUpParams,
      validateUser.processValidationErrors,
      validateUser.checkDuplicateUsernameOrEmail(db),
    ],
    usersController.signup,
  );
};
