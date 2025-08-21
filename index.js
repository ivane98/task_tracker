import readline from "node:readline";
import {
  writeToJSON,
  listAllTasks,
  listByStatus,
  updateJSON,
  markInProgress,
  markDone,
  deleteFromJSON,
} from "./tasks";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("task-tracker ", (input) => {
  const [command, ...args] = input.trim().split(" ");
  const quoted = input.includes('"') ? input.split('"')[1] : null;

  switch (command) {
    case "add": {
      if (!quoted) {
        console.log("❌ Please provide a task description in quotes.");
        break;
      }
      writeToJSON(quoted);
      break;
    }

    case "update": {
      const id = parseInt(args[0]);
      if (isNaN(id) || !quoted) {
        console.log('❌ Usage: update <id> "new description"');
        break;
      }
      updateJSON(quoted, id);
      break;
    }

    case "delete": {
      const id = parseInt(args[0]);
      if (isNaN(id)) {
        console.log("❌ Usage: delete <id>");
        break;
      }
      deleteFromJSON(id);
      break;
    }

    case "mark-in-progress": {
      const id = parseInt(args[0]);
      if (isNaN(id)) {
        console.log("❌ Usage: mark-in-progress <id>");
        break;
      }
      markInProgress(id);
      break;
    }

    case "mark-done": {
      const id = parseInt(args[0]);
      if (isNaN(id)) {
        console.log("❌ Usage: mark-done <id>");
        break;
      }
      markDone(id);
      break;
    }

    case "list": {
      const status = args[0];
      if (["todo", "in-progress", "done"].includes(status)) {
        listByStatus(status);
      } else {
        listAllTasks();
      }
      break;
    }

    default:
      console.log("❌ Unknown command");
  }

  rl.close();
});
