Task Manager CLI
A simple command-line interface (CLI) application built with Node.js to manage tasks. This app allows users to create, review, and delete tasks interactively via prompts.

Features
Create a New Task: Add a new task to the list.
Review All Tasks: View all tasks, along with their completion status.
Delete a Task: Delete an existing task from the list.
Interactive Prompts: Uses the @clack/prompts library for user-friendly, interactive prompts.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-manager-cli.git
cd task-manager-cli
Install dependencies:

bash
Copy code
npm install
Usage
Running the Application
To run the task manager, simply execute the following command in your terminal:

bash
Copy code
node app.js
How it Works
Upon running the application, you will be greeted with an introductory message and prompted to select one of the following options:

Create new task: You can add a new task to your to-do list.
See all tasks: View a list of all tasks and their completion status.
Delete a task: Choose a task to delete from your task list.
Example Workflow
You will be prompted to pick a process: Create, Review, or Delete a task.
Based on your choice:
For creating a task, you'll be asked to enter the task details, which will be saved.
For reviewing tasks, you can view details of all tasks and update their completion status.
For deleting a task, you will be prompted to select which task to delete.
The application uses local file storage to keep track of tasks, so each change is saved immediately.

Project Structure
bash
Copy code
.
├── app.js            # Main application file
├── taskService.js    # Service file that handles task management
├── package.json      # Node.js dependencies and scripts
└── README.md         # Project documentation
Dependencies
@clack/prompts: A library used for building interactive command-line prompts.
Node.js: The runtime environment for the application.