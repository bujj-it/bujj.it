const dbMock = (queryValues) => {
  return {
    dynamoDb: {
      query: () => {
        return {
          promise: () => {
            return queryValues;
          },
        };
      },
    },
    users: "UsersTableName",
  };
};

module.exports = dbMock;
