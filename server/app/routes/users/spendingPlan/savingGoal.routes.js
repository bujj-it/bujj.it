module.exports = (app, db) => {
  const validateSavingGoalParams = require('app/middleware/validateSavingGoalParams');
  const savingGoalController = require('app/controllers/users/spendingPlan/savingGoal.controller')(db);

  app.post('/api/users/:userId/spending-plan/saving-goal', validateSavingGoalParams, savingGoalController.overwrite);

  app.put('/api/users/:userId/spending-plan/saving-goal', validateSavingGoalParams, savingGoalController.overwrite);

  app.delete('/api/users/:userId/spending-plan/saving-goal', savingGoalController.destroy);
};
