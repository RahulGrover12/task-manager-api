import "dotenv/config.js";

// // Database configuration
export const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.PORT,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
};
