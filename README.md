# Task Tracker CLI

A simple command-line task tracker built with **Node.js**.  
You can add, list, update, delete, and mark tasks as done using simple commands.

---

## Features

- Add new tasks
- List all tasks
- Update task descriptions
- Delete tasks
- Mark tasks as completed

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ivane98/task_tracker.git

   ```

2. Navigate to the project folder:
   cd task-tracker-cli

3. Install dependencies:
   npm install

## Usage

Run the CLI with node:
node index.js <command> [options]

Commands:
add <task> Add a new task
list List all tasks
update <id> <task> Update a task by ID
delete <id> Delete a task by ID

## Example

node index.js add "Buy groceries"
node index.js list
node index.js update 1 "Buy groceries and cook dinner"
node index.js delete 1

## Project structure

task-tracker/
│
├── index.js # Handles command-line parsing
├── tasks.js # Task operations (add, list, update, delete)
├── storage.js # Handles reading/writing tasks.json
├── tasks.json # Local file where tasks are stored
└── package.json
