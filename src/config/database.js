const { Sequelize } = require("sequelize");

const { DBNAME, DBUSERNAME, DBPASSWORD, DBHOST } = process.env;

const db = new Sequelize(DBNAME, DBUSERNAME, DBPASSWORD, {
  host: DBHOST,
  dialect: "mysql",
  logging: (msg) => console.log(msg),
});

module.exports = db;
