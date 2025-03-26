import express, { json } from "express";
import authRoutes from "./routes/authUsers.js";
import taskRoutes from "./routes/tasks.js";
import { config } from "./config/config.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();
const PORT = config.port || 8080;

app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
