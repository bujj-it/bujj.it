const dbWrapper = (database, userTable) => {
  // user in -> [] -> user json out or false if no user found
  const searchForUser = async (user) => {
    const generateDynamoSearchParamsUser = (attribute, user) => {
      return {
        TableName: userTable,
        IndexName: `${attribute}Index`,
        KeyConditionExpression: '#attribute = :attributeValue',
        ExpressionAttributeNames: {
          '#attribute': attribute,
        },
        ExpressionAttributeValues: {
          ':attributeValue': user
        }
      }
    };

    try {
      const dbRequests = [
        database.query(generateDynamoSearchParamsUser('username', user)).promise(),
        database.query(generateDynamoSearchParamsUser('email', user)).promise(),
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
