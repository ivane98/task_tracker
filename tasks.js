import { readTasks, writeTasks } from "./storage.js";

export function writeToJSON(newData) {
  let fileData = readTasks();
  const maxId = fileData.length ? Math.max(...fileData.map((t) => t.id)) : 0;
  const taskId = maxId + 1;

  fileData.push({
    id: taskId,
    description: newData,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  writeTasks(fileData);
}

export function listAllTasks() {
  const fileData = readTasks();
  if (fileData.length === 0) {
    console.log("⚠️ No tasks found.");
    return;
  }
  console.log(fileData);
}

export function listByStatus(status) {
  const fileData = readTasks();
  const filtered = fileData.filter((t) => t.status === status);

  if (filtered.length === 0) {
    console.log(`⚠️ No tasks with status "${status}" found.`);
    return;
  }
  console.log(filtered);
}

export function updateJSON(newData, id) {
  let fileData = readTasks();
  const task = fileData.find((t) => t.id === id);

  if (!task) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  task.description = newData;
  task.updatedAt = new Date();
  writeTasks(fileData);
}

export function markInProgress(id) {
  let fileData = readTasks();
  const task = fileData.find((t) => t.id === id);

  if (!task) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  task.status = "in-progress";
  task.updatedAt = new Date();
  writeTasks(fileData);
}

export function markDone(id) {
  let fileData = readTasks();
  const task = fileData.find((t) => t.id === id);

  if (!task) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  task.status = "done";
  task.updatedAt = new Date();
  writeTasks(fileData);
}

export function deleteFromJSON(id) {
  let fileData = readTasks();
  const initialLength = fileData.length;

  fileData = fileData.filter((t) => t.id !== id);

  if (fileData.length === initialLength) {
    console.log(`⚠️ Task with id ${id} not found.`);
    return;
  }

  writeTasks(fileData);
}
