const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

module.exports = {
  HOST: "localhost",
  USER: POSTGRES_USER,
  PASSWORD: POSTGRES_PASSWORD,
  DB: "bujj_it",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};