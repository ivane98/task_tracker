import readline from "node:readline";
import fs from "fs";

export function writeToJSON(newData) {
  const filePath = "./tasks.json";

  // Read existing data
  let fileData = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    fileData = { raw } ? JSON.parse(raw) : [];
  }

  // Add new data
  const sortedTasks = fileData.slice().sort((a, b) => {
    let x = a.id < b.id ? 1 : -1;
    return x;
  });

  const taskId = sortedTasks[0] ? sortedTasks[0]["id"] + 1 : 1;

  fileData.push({
    id: taskId,
    description: newData,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(fileData);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
}

export function updateJSON(newData, id) {
  const filePath = "./tasks.json";

  // Read existing data
  let fileData = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    fileData = { raw } ? JSON.parse(raw) : [];
  }

  let taskToUpdate = fileData.find((task) => task.id === id);
  taskToUpdate.task = newData;

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
}

export function deleteFromJSON(id) {
  const filePath = "./tasks.json";

  // Read existing data
  let fileData = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    fileData = { raw } ? JSON.parse(raw) : [];
  }

  fileData = fileData.filter((task) => task.id !== id);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`task-tracker `, (input) => {
  let command;
  if (input.split('"')[0].trim().split(" ").length > 1) {
    command = input.split('"')[0].trim().split(" ")[0];
  } else {
    command = input.split('"')[0].trim();
  }
  if (command === "add") {
    const task = input.split('"')[1];
    writeToJSON(task);
  } else if (command === "update") {
    const id = parseInt(input.split('"')[0].trim().split(" ")[1]);
    const task = input.split('"')[1];
    updateJSON(task, id);
  } else if (command === "delete") {
    const id = parseInt(input.split('"')[0].trim().split(" ")[1]);
    deleteFromJSON(id);
  }

  rl.close();
});
