const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const uuid = require('uuid')

function signup(db) {
  const database = db.dynamoDb
  const userTable = db.users

  return (req, res) => {
    try {
      const createUserParams = {
        TableName: userTable,
        Item: {
          userId: uuid.v1(),
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8)
        },
      };
      const newUser = await dynamoDb.put(createUserParams).promise();
      const sessionToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.expiresIn
      });
      res.cookie('x-access-token', sessionToken, config.tokenCookieOptions);
      res.status(200).send({
        message: 'User signup successful',
        user: newUser
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
}

function userPage(req, res) {
  res.status(200).json({ 
    message: "Successful login"
  });
}

module.exports = {
  signup,
  userPage
}