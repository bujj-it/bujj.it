module.exports = (app, db) => {
  const spendingPlansController = require('../controllers/spendingPlans.controller')(db);

  app.post('/api/spending-plans', spendingPlansController.create);
};
