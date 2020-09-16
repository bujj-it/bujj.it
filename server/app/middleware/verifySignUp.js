function checkDuplicateUsernameOrEmail(db) {
  const database = db.dynamoDb
  const userTable = db.users

  return (req, res, next) => {
    // Username
    const params = {
      TableName: userTable,
      IndexName: 'usernameIndex',
      KeyConditionExpression: '#username = :username',
      ExpressionAttributeNames: {
        "#username": "username"
      },
      ExpressionAttributeValues: {
        ":username": req.body.username
      }
    }
    
    database.query(params, (err, data) => {
      return res.status(200).send({
        error: err,
        data: data,
        postBody: req.body
      })
    })
    
    // User.findOne({
    //   where: {
    //     username: req.body.username,
    //   },
    // }).then((user) => {
    //   if (user) {
    //     res.status(400).send({
    //       message: "Failed! Username is already in use!",
    //     });
    //     return;
    //   }

    //   // Email
    //   User.findOne({
    //     where: {
    //       email: req.body.email,
    //     },
    //   }).then((user) => {
    //     if (user) {
    //       res.status(400).send({
    //         message: "Failed! Email is already in use!",
    //       });
    //       return;
    //     }

    //     next(); 
    //   });
    // });
  };
}

module.exports = {
  checkDuplicateUsernameOrEmail
};
