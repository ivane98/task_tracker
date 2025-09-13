import fs from "fs";

const FILE_PATH = "./tasks.json";

export function readTasks() {
  if (!fs.existsSync(FILE_PATH)) return [];

  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("❌ Failed to read tasks:", err.message);
    return [];
  }
}

export function writeTasks(tasks) {
  try {
    const data = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(FILE_PATH, data, "utf-8");
  } catch (err) {
    console.error("❌ Failed to write tasks:", err.message);
  }
}
