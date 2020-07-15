const path = require('path');
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const buildPath = path.join(__dirname, '..', 'client/build')


// middleware
app.use(cors());
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(buildPath));

// Routes
app.post("/users", async (req, res) => {
  try {
    const { first_name, surname, username, dob, email, password_hash } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (first_name, surname, username, dob, email, password_hash) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, surname, username, dob, email, password_hash]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(buildPath + '/index.html'));
});


// Serve on port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
