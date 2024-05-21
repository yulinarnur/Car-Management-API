import { Sequelize } from "sequelize";

const db = new Sequelize("carAuth_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
