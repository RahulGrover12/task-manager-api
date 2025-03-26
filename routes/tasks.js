import express from "express";
import authenticate from "../middlewares/authentication.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task-controller.js";

const router = express.Router();

// This will authenticate the user first then it will allow us to go further to any route
router.use(authenticate);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
