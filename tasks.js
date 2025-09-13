import { readTasks, writeTasks } from "./storage.js";

export function writeToJSON(description) {
  const tasks = readTasks();
  const maxId = tasks.length ? Math.max(...tasks.map((t) => t.id)) : 0;
  const taskId = maxId + 1;

  const newTask = {
    id: taskId,
    description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);

  writeTasks(tasks);
}

export function listAllTasks() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("⚠️ No tasks found.");
    return;
  }
  console.log(tasks);
}

export function listByStatus(status) {
  const tasks = readTasks();
  const filtered = tasks.filter((t) => t.status === status);

  if (filtered.length === 0) {
    console.log(`⚠️ No tasks with status "${status}" found.`);
    return;
  }
  console.log(filtered);
}

export function updateJSON(description, id) {
  let tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date();
  writeTasks(tasks);
}

export function updateStatus(id, newStatus) {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  task.status = newStatus;
  task.updatedAt = new Date();
  writeTasks(tasks);
}

export function markInProgress(id) {
  updateStatus(id, "in-progress");
}

export function markDone(id) {
  updateStatus(id, "done");
}

export function deleteFromJSON(id) {
  const tasks = readTasks();
  const initialLength = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLength) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  writeTasks(tasks);
}
