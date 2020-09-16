const serverless = require('serverless-http');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// require('./app/routes/base.routes')(app);
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to bujj.it API'
  })
})

module.exports.handler = serverless(app);
