const { verifyToken } = require('../middleware/authJwt');
const verifySignUp = require('../middleware/verifySignUp');
const usersController = require('../controllers/users.controller');

module.exports = (app, db) => {
  app.get('/api/users/:id', verifyToken, usersController.usersPage);

  app.post(
    '/api/users',
    verifySignUp.checkDuplicateUsernameOrEmail(db),
    usersController.signup(db),
  );
};
