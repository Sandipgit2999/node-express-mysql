const mysql = require("mysql");

const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "test",
};

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = { connection };
