const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
