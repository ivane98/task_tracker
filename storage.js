import fs from "fs";

const filePath = "./tasks.json";

export function readTasks() {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("❌ Error reading tasks:", err.message);
    return [];
  }
}

export function writeTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Error writing tasks:", err.message);
  }
}
