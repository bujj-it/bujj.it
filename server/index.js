require('dotenv').config()

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./app/models");

const app = express();

// ==========================================
// Middleware
// ==========================================

// use cors for local development server
if (app.get("env") === "development") {
  const cors = require("cors");
  var corsOptions = {
    origin: "http://localhost:3000",
  };
  app.use(cors(corsOptions));
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ==========================================
// Database
// ==========================================

// sync db with models
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Resync database complete");
});

// ==========================================
// Routes
// ==========================================

require('./app/routes/base.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// serve the static files from the React app in production environment
if (app.get("env") === "production") {
  const buildPath = path.join(__dirname, "..", "client/build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath + "/index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.redirect('/api')
  });
}

// handles any requests that don't match the ones above

// ==========================================
// Server
// ==========================================
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Starting server in ${app.get("env")} mode`);
  console.log("Server is listening on port " + port);
});
