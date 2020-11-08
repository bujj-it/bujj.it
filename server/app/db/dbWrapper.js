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

  return {
    searchForUser,
  };
};

module.exports = dbWrapper;
