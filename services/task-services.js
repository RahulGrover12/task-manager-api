import { Op } from "sequelize";
import db from "../models/index.js";

const Task = db.Task;

// Create a new task
export const createTaskForUser = async (userId, taskData) => {
  return await db.Task.create({ ...taskData, userId });
};

// Get all tasks for the authenticated user (with filtering & sorting)
export const getAllTasksForUser = async (userId, query) => {
  const { priority, status, dueDateFrom, dueDateTo, sortBy, page, limit } =
    query;

  const user = { userId };

  if (priority) user.priority = priority;
  if (status) user.status = status;
  if (dueDateFrom || dueDateTo) {
    user.dueDate = {
      ...(dueDateFrom && { [Op.gte]: new Date(dueDateFrom) }),
      ...(dueDateTo && { [Op.lte]: new Date(dueDateTo) }),
    };
  }

  // sorting
  const sort = [];
  if (sortBy == "dueDateAsc") sort.push(["dueDate", "ASC"]);
  else if (sortBy == "dueDateDesc") sort.push(["dueDate", "DESC"]);
  else if (sortBy == "priorityAsc") sort.push(["priority", "ASC"]);
  else if (sortBy == "priorityDesc") sort.push(["priority", "DESC"]);

  const pageNumber = page ? parseInt(page) : 1;
  const pageSize = limit ? parseInt(limit) : 10;
  const offset = (pageNumber - 1) * pageSize;

  return await db.Task.findAndCountAll({
    user,
    order: sort,
    limit: pageSize,
    offset: offset,
  });
};

// Get task by Single ID for the authenticated user
export const getTaskByIdForUser = async (taskId, userId) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });

  if (!task) {
    throw new Error("Task not found or access denied.");
  }
  return task;
};

// Update a task
export const updateTaskForUser = async (taskId, userId, taskData) => {
  const { title, description, priority, dueDate, status } = taskData;

  if (!title && !description && !priority && !dueDate && !status) {
    throw new Error({
      success: false,
      message: "No fields provided to update",
    });
  }

  const task = await getTaskByIdForUser(taskId, userId);

  const updatedTaskFields = { title, description, priority, dueDate, status };

  for (const key in updatedTaskFields) {
    if (updatedTaskFields[key] !== undefined) {
      task[key] = updatedTaskFields[key];
    }
  }

  // It will save the updated task
  await task.save();
  return task;
};

// Delete a task
export const deleteTaskForUser = async (taskId, userId) => {
  const task = await getTaskByIdForUser(taskId, userId);

  // this will delete the user but not hard delete only soft delete because we have paranoid as true.
  await task.destroy();
};
