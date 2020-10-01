const validateSession = require('../middleware/validateSession');
const validateExpensesParams = require('../middleware/validateExpensesParams');
const validateRequestedExpense = require('../middleware/validateRequestedExpense');

module.exports = (app, db) => {
  const validateUser = require('../middleware/validateUser')(db);
  const expensesController = require('../controllers/expenses.controller')(db);
  const verifySessionToken = validateSession.verifySessionToken(db)

  app.post('/api/users/:userId/spending-plan/expenses', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateExpensesParams,
  ], expensesController.create);

  app.put('/api/users/:userId/spending-plan/expenses/:expenseId', [
    verifySessionToken,
    validateUser.validateRequestedUserIdParam,
    validateUser.validateUserAuthorizedForResource,
    validateExpensesParams,
    validateRequestedExpense,
  ], expensesController.update);

  app.delete('/api/users/:userId/spending-plan/expenses/:expenseId', [
    verifySessionToken
  ])
};
