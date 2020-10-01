const { verifySessionToken } = require('../middleware/authJwt');
const processValidationErrors = require('../middleware/processValidationErrors');
const validateSpendingPlan = require('../middleware/validateSpendingPlan');

module.exports = (app, db) => {
  const spendingPlansController = require('../controllers/spendingPlans.controller')(
    db,
  );

  app.post(
    '/api/users/:id/spending-plans', [
      verifySessionToken,
      validateSpendingPlan,
      processValidationErrors,
    ], spendingPlansController.create,
  );
};
