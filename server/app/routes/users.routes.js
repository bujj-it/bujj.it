const { verifySessionToken } = require('../middleware/authJwt');
const validateUser = require('../middleware/validateUser');
const processValidationErrors = require('../middleware/processValidationErrors');

module.exports = (app, db) => {
  const usersController = require('../controllers/users.controller')(db);

  app.get('/api/users/:userId', verifySessionToken(db), usersController.usersPage);

  app.post(
    '/api/users',
    [
      validateUser.validateSignUpParams,
      processValidationErrors,
      validateUser.checkDuplicateUsernameOrEmail(db),
    ],
    usersController.signup,
  );
};
