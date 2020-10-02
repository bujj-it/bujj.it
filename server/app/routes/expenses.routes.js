module.exports = (app, db) => {
  const validateExpensesParams = require('../middleware/validateExpensesParams');
  const validateRequestedExpense = require('../middleware/validateRequestedExpense');
  const { verifySessionToken, validateUserAuthorizedForResource } = require('../middleware/validateUserAuthorization')(db);
  const validateRequestedUser = require('../middleware/validateRequestedUser')(db);
  const expensesController = require('../controllers/expenses.controller')(db);

  app.post('/api/users/:userId/spending-plan/expenses', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
    validateExpensesParams,
  ], expensesController.create);

  app.put('/api/users/:userId/spending-plan/expenses/:expenseId', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
    validateExpensesParams,
    validateRequestedExpense,
  ], expensesController.update);

  app.delete('/api/users/:userId/spending-plan/expenses/:expenseId', [
    verifySessionToken,
    validateRequestedUser,
    validateUserAuthorizedForResource,
    validateRequestedExpense,
  ], expensesController.destroy);
};
