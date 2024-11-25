import fs from 'fs/promises';
import path from 'path';

// Default path for the tasks JSON file, can be overridden for portability
const defaultTaskFilePath = path.resolve('./tasks.json');

// TaskService class to manage task operations
class TaskService {
    constructor(taskFilePath = defaultTaskFilePath) {
        this.taskFilePath = taskFilePath; // Set the file path for tasks
    }

    // Read all tasks from the JSON file
    async readTasks() {
        try {
            const fileData = await fs.readFile(this.taskFilePath, 'utf-8'); // Read file data
            const taskJSON = JSON.parse(fileData); // Parse JSON data
            return taskJSON.tasks || []; // Return tasks or an empty array if none
        } catch (err) {
            // If the file does not exist or is corrupted, return a default structure
            if (err.code === 'ENOENT') {
                return []; // Return an empty array if the file is not found
            }
            throw new Error('Görevler okunurken bir hata oluştu.'); // Throw error for other issues
        }
    }

    // Add a new task to the task list
    async addTask(task) {
        const taskList = await this.readTasks(); // Get current task list
        const newTask = {
            id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1, // Generate new task ID
            task,
            date: new Date().toLocaleString(), // Set current date and time
            completed: false, // Default completion status
        };
        taskList.push(newTask); // Add new task to the list
        await this.saveTasks(taskList); // Save updated task list
    }

    // Retrieve a specific task by its ID
    async getTask(taskId) {
        const taskList = await this.readTasks(); // Get current task list
        return taskList.find((task) => task.id === taskId); // Find and return the task by ID
    }

    // Delete a specific task by its ID
    async deleteTask(taskId) {
        const taskList = await this.readTasks(); // Get current task list
        const updatedTasks = taskList.filter((task) => task.id !== taskId); // Filter out the task to delete
        await this.saveTasks(updatedTasks); // Save the updated task list
    }

    // Save all tasks to the JSON file
    async saveTasks(taskList) {
        try {
            await fs.writeFile(
                this.taskFilePath,
                JSON.stringify({ tasks: taskList }, null, 2) // Write tasks to file in JSON format
            );
        } catch (err) {
            throw new Error('Görevler kaydedilirken bir hata oluştu.'); // Throw error if saving fails
        }
    }

    // Update the completion status of a task
    async updateTaskCompletion(taskId, isCompleted) {
        const taskList = await this.readTasks(); // Get current task list
        const taskIndex = taskList.findIndex((task) => task.id === taskId); // Find the index of the task
        if (taskIndex !== -1) {
            taskList[taskIndex].completed = isCompleted; // Update completion status
            await this.saveTasks(taskList); // Save the updated task list
        } else {
            throw new Error('Belirtilen ID ile görev bulunamadı.'); // Throw error if task not found
        }
    }
}

export default TaskService;
