# Task Manager CLI

A simple command-line interface (CLI) application built with Node.js to manage tasks. This app allows users to create, review, and delete tasks interactively via prompts.

## Features
- **Create a New Task**: Add a new task to the list.
- **Review All Tasks**: View all tasks, along with their completion status.
- **Delete a Task**: Delete an existing task from the list.
- **Interactive Prompts**: Uses the `@clack/prompts` library for user-friendly, interactive prompts.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-cli.git
   cd task-manager-cli
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
```bash
   node app.js
   ```
## How it Works
Upon running the application, you will be greeted with an introductory message and prompted to select one of the following options:

Create new task: You can add a new task to your to-do list.
See all tasks: View a list of all tasks and their completion status.
Delete a task: Choose a task to delete from your task list.

## Dependencies
- **@clack/prompts**: A library used for building interactive command-line prompts.


- **Node.js**: The runtime environment for the application.
