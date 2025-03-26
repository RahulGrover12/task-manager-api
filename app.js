import express, { json } from "express";
import authRoutes from "./routes/authUsers.js";
import taskRoutes from "./routes/tasks.js";
import { config } from "./config/config.js";
import errorHandler from "./middlewares/error-handler.js";

import morgan from "morgan";
import logger from "./config/logger.js";

const app = express();
const PORT = config.port || 8080;

app.use(json());

const stream = {
  write: (message) => logger.error(message.trim()),
};

app.use(
  morgan("combined", {
    stream,
    skip: (req, res) => res.statusCode < 400,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Server is running at port ${PORT}`));
