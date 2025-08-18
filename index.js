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
  fileData.push({ task: newData, id: fileData.length + 1 });
  console.log(fileData);
  console.log(fileData.length);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`task-tracker `, (input) => {
  const task = input.split('"')[1];
  writeToJSON(task);
  rl.close();
});
