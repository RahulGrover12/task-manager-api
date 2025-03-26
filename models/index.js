import { Sequelize } from "sequelize";
import UserModel from "./user.js";
import TaskModel from "./tasks.js";
import dotenv from "dotenv";
import { config } from "../config/config.js";

dotenv.config();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.dbPort,
    logging: false,
  }
);

const User = UserModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database.");

    await sequelize.sync();
    console.log("Database tables created or updated.");
  } catch (error) {
    console.log("Failed to connect or sync with database:", error.message);
  }
})();

export default db;
