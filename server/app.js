const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (db) => {
  const app = express();

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // manage and sign cookies
  app.use(cookieParser(process.env.SITE_SECRET));

  require('./app/routes/session.routes')(app, db);
  require('./app/routes/users.routes')(app, db);
  require('./app/routes/users/spendingPlan.routes')(app, db);
  require('./app/routes/users/spendingPlan/expenses.routes')(app, db);
  require('./app/routes/users/spendingPlan/savingGoal.routes')(app, db);

  app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'Welcome to bujj.it API',
    });
  });

  return app;
};
