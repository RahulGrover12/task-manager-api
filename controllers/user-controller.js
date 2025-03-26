import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

import { createUser } from "../services/user-services.js";

import db from "../models/index.js";

const User = db.User;

const register = async (req, res, next) => {
  try {
    const userData = req.body;

    const newUser = await createUser(userData);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User?.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid Email or password!");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "24h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export { register, login };
