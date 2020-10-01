const { verifySessionToken } = require('../middleware/validateSession');
const validateExpensesParams = require('../middleware/validateExpensesParams');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const expensesController = require('../controllers/expenses.controller')(db);

  app.post('/api/users/:userId/spending-plan/expenses', [
    verifySessionToken(db),
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateExpensesParams,
  ], expensesController.create);

  app.put('/api/users/:userId/spending-plan/expenses/:expenseId', [
    verifySessionToken(db),
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateExpensesParams,
  ]);
};
