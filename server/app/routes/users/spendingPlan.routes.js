module.exports = (app, db) => {
  const validateSpendingPlanParams = require('app/middleware/validateSpendingPlanParams');
  const spendingPlanController = require('app/controllers/users/spendingPlan.controller')(db);

  app.post('/api/users/:userId/spending-plan', validateSpendingPlanParams, spendingPlanController.create);
};
