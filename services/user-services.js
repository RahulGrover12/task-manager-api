import bcrypt from "bcrypt";
import db from "../models/index.js";
import logger from "../config/logger.js";

const User = db.User;

export const createUser = async (userData) => {
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    logger.error("Error in creating new user ", error.message);
    throw error;
  }
};
