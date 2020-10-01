const { verifySessionToken } = require('../middleware/validateSession');

module.exports = (app, db) => {
  // const expensesController = require('../controllers/expenses.controller')(db);

  app.post('/api/users/:userId/spending-plan/expenses', verifySessionToken(db));
};
