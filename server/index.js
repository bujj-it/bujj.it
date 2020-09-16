const serverless = require('serverless-http');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// manage and sign cookies
app.use(cookieParser(process.env.SITE_SECRET))

// setup db
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const db = {dynamoDb, users: USERS_TABLE}

require('./app/routes/user.routes')(app, db);
// require('./app/routes/base.routes')(app);
// require('./app/routes/auth.routes')(app);

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to bujj.it API'
  })
})

module.exports.handler = serverless(app);
