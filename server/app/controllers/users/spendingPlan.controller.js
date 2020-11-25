const debug = require('debug')('express:error:spendingPlanController');
const uuid = require('uuid');

module.exports = (db) => {
  const create = async (req, res) => {
    try {
      const newExpenses = req.body.expenses;
      const expensesMap = {};
      for (let i = 0; i < newExpenses.length; i += 1) {
        expensesMap[uuid.v1()] = newExpenses[i];
      }

      const spendingPlan = {
        income: req.body.income,
        expenses: expensesMap,
        savingPercentage: req.body.savingPercentage,
      };
      await db.createSpendingPlan(req.requestedUser.userId, spendingPlan);

      res.status(200).send({
        message: 'New Spending Plan created.',
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const view = async (req, res) => res.status(200).send();

  return {
    create,
    view,
  };
};
