const Pool = require("pg").Pool;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "bujj_it",
});

module.exports = pool;
