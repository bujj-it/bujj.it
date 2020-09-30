const debug = require("debug")("express:error:spendingPlansController");

module.exports = (db) => {
  const database = db.dynamoDb;
  const userTable = db.users;

  const create = async (req, res) => {
    try {
      const createUserSpendingPlanParams = {
        TableName: userTable,
        Key: { userId: req.userId },
        UpdateExpression: "SET spendingPlan = :newSpendingPlan",
        ExpressionAttributeValues: {
          ":newSpendingPlan": {
            income: req.body.income,
            expenses: req.body.expenses,
            saving_percentage: req.body.saving_percentage,
          },
        },
      };
      await database.update(createUserSpendingPlanParams).promise();
      res.status(200).send({
        message: "New Spending Plan created.",
      });
    } catch (err) {
      debug(err);
      res.status(500).send({ message: "Something went wrong!" });
    }
  };

  return {
    create,
  };
};
