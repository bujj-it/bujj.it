const { verifySessionToken } = require('../middleware/authJwt');
const processValidationErrors = require('../middleware/processValidationErrors');
const validateSpendingPlan = require('../middleware/validateSpendingPlan');

module.exports = (app, db) => {
  const spendingPlanController = require('../controllers/spendingPlan.controller')(
    db,
  );

  app.post(
    '/api/users/:id/spending-plan', [
      verifySessionToken,
      validateSpendingPlan,
      processValidationErrors,
    ], spendingPlanController.create,
  );

  app.get(
    '/api/users/:id/spending-plan', [
      verifySessionToken,
    ], spendingPlanController.view,
  );
};
