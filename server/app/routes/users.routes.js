const { verifyToken } = require('../middleware/authJwt');
const verifySignUp = require('../middleware/verifySignUp');

module.exports = (app, db) => {
  const usersController = require('../controllers/users.controller')(db);

  app.get('/api/users/:id', verifyToken, usersController.usersPage);

  app.post(
    '/api/users', [
      verifySignUp.verifySignUpParams,
      verifySignUp.processValidationErrors,
      verifySignUp.checkDuplicateUsernameOrEmail(db),
    ],
    usersController.signup,
  );
};
