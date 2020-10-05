module.exports = (app, db) => {
  const validateExpensesParams = require('app/middleware/validateExpensesParams');
  const validateRequestedExpense = require('app/middleware/validateRequestedExpense');
  const expensesController = require('app/controllers/users/spendingPlan/expenses.controller')(db);

  app.post('/api/users/:userId/spending-plan/expenses', [
    validateExpensesParams,
  ], expensesController.create);

  app.put('/api/users/:userId/spending-plan/expenses/:expenseId', [
    validateExpensesParams,
    validateRequestedExpense,
  ], expensesController.update);

  app.delete('/api/users/:userId/spending-plan/expenses/:expenseId', [
    validateRequestedExpense,
  ], expensesController.destroy);
};
