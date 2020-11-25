const debug = require('debug')('express:error:expensesController');
const uuid = require('uuid');

module.exports = (db) => {
  const dbWrapper = db;

  const create = async (req, res) => {
    try {
      const newExpense = req.body;
      const newExpenseId = uuid.v1();
      await dbWrapper.updateExpense(req.requestedUser.userId, newExpenseId, newExpense);

      res.status(200).send({
        message: 'New expense added.',
        expense: { [newExpenseId]: newExpense },
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const update = async (req, res) => {
    try {
      const expense = req.body;
      const { expenseId } = req.params;
      await dbWrapper.updateExpense(req.requestedUser.userId, expenseId, expense);

      res.status(200).send({
        message: 'Expense updated.',
        expense: { [expenseId]: expense },
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const { expenseId } = req.params;
      await dbWrapper.destroyExpense(req.requestedUser.userId, expenseId);
      res.status(200).send({
        message: 'Expense removed.',
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    create,
    update,
    destroy,
  };
};
