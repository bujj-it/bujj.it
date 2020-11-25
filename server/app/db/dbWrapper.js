const dbWrapper = (database, userTable) => {
  // user in -> [] -> user json out or false if no user found
  const searchForUser = async (user) => {
    const generateUserSearchParams = (attribute, userRecord) => ({
      TableName: userTable,
      IndexName: `${attribute}Index`,
      KeyConditionExpression: '#attribute = :attributeValue',
      ExpressionAttributeNames: {
        '#attribute': attribute,
      },
      ExpressionAttributeValues: {
        ':attributeValue': userRecord,
      },
    });

    const dbRequests = [
      database.query(generateUserSearchParams('username', user)).promise(),
      database.query(generateUserSearchParams('email', user)).promise(),
    ];
    const results = await Promise.all(dbRequests);
    const usernameResult = results[0];
    const userEmailResult = results[1];

    if (usernameResult.Count === 0 && userEmailResult.Count === 0) {
      return false;
    }

    return (usernameResult.Count > 0
      ? usernameResult.Items[0]
      : userEmailResult.Items[0]);
  };

  const createUser = async (newUser) => {
    const createUserParams = {
      TableName: userTable,
      Item: newUser,
    };
    await database.put(createUserParams).promise();
  };

  const createSpendingPlan = async (userId, spendingPlan) => {
    const createUserSpendingPlanParams = {
      TableName: userTable,
      Key: { userId },
      UpdateExpression: 'SET spendingPlan = :newSpendingPlan',
      ExpressionAttributeValues: {
        ':newSpendingPlan': spendingPlan,
      },
    };
    await database.update(createUserSpendingPlanParams).promise();
  };

  const updateExpense = async (userId, expenseId, value) => {
    const updateSpendingPlanParams = {
      TableName: userTable,
      Key: { userId },
      UpdateExpression: 'SET spendingPlan.expenses.#expenseId = :value',
      ExpressionAttributeNames: {
        '#expenseId': expenseId,
      },
      ExpressionAttributeValues: {
        ':value': value,
      },
    };
    await database.update(updateSpendingPlanParams).promise();
  };

  const destroyExpense = async (userId, expenseId) => {
    const destroyExpenseParams = {
      TableName: userTable,
      Key: { userId },
      UpdateExpression: 'REMOVE spendingPlan.expenses.#expenseId',
      ExpressionAttributeNames: {
        '#expenseId': expenseId,
      },
    };
    await database.update(destroyExpenseParams).promise();
  };

  const createSavingGoal = async (userId, newSavingGoal) => {
    const createSavingGoalParams = {
      TableName: userTable,
      Key: {
        userId: userId,
      },
      UpdateExpression: 'SET spendingPlan.savingGoal = :newSavingGoal',
      ExpressionAttributeValues: {
        ':newSavingGoal': newSavingGoal,
      },
    };
    await database.update(createSavingGoalParams).promise();
  }

  const destroySavingGoal = async (userId) => {
    const destroySavingGoalParams = {
      TableName: userTable,
      Key: { userId: userId },
      UpdateExpression: 'REMOVE spendingPlan.savingGoal',
    };
    await database.update(destroySavingGoalParams).promise();
  }

  return {
    searchForUser,
    createUser,
    createSpendingPlan,
    updateExpense,
    destroyExpense,
    createSavingGoal,
    destroySavingGoal,
  };
};

module.exports = dbWrapper;
