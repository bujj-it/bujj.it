const dbWrapper = (database, userTable) => {
  // user in -> [] -> user json out or false if no user found
  const searchForUser = async (user) => {
    const searchForUsername = {
      TableName: userTable,
      IndexName: 'usernameIndex',
      KeyConditionExpression: '#username = :username',
      ExpressionAttributeNames: {
        '#username': 'username',
      },
      ExpressionAttributeValues: {
        ':username': user,
      },
    };
    const searchForUserEmail = {
      TableName: userTable,
      IndexName: 'emailIndex',
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': user,
      },
    };

    try {
      const dbRequests = [
        database.query(searchForUsername).promise(),
        database.query(searchForUserEmail).promise(),
      ];
      const results = await Promise.all(dbRequests);
      const usernameResult = results[0];
      const userEmailResult = results[1];

      if (usernameResult.Count === 0 && userEmailResult.Count === 0) {
        return false
      }

      return (usernameResult.Count > 0
        ? usernameResult.Items[0]
        : userEmailResult.Items[0]);
    } catch (err) {
      return err
    }
  };

  return {
    searchForUser
  };
};

module.exports = dbWrapper;
