# Task Manager CLI

A simple command-line task manager built with Node.js and the native `fs` module.

## Features

- ✅ Add a new task
- 📋 List all tasks
- ❌ Remove a specific task
- 🧹 Clear all tasks

## Technologies Used

- Node.js
- Native `fs` module (file system)
- **JSON file** for persistent task storage

## Storage Structure

Tasks are stored in a `tasks.json` file with the following format:

```json
[
  "Buy groceries",
  "Review lessons",
  "Go to the gym"
]
