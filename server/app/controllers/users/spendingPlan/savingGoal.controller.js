const debug = require('debug')('express:error:expensesController');

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const overwrite = async (req, res) => {
    try {
      const newSavingGoal = req.body;
      const createSavingGoalParams = {
        TableName: userTable,
        Key: {
          userId: req.requestedUser.userId,
        },
        UpdateExpression: 'SET spendingPlan.savingGoal = :newSavingGoal',
        ExpressionAttributeValues: {
          ':newSavingGoal': newSavingGoal,
        },
      };
      await database.update(createSavingGoalParams).promise();
      res.status(200).send({
        message: 'New saving goal added.',
        savingGoal: newSavingGoal,
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const createDestroySavingGoalParams = {
        TableName: userTable,
        Key: { userId: req.requestedUser.userId },
        UpdateExpression: 'REMOVE spendingPlan.savingGoal',
      };
      await database.update(createDestroySavingGoalParams).promise();
      res.status(200).send({
        message: 'Saving goal removed.',
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: 'Something went wrong!' });
    }
  };

  return {
    overwrite,
    destroy,
  };
};
