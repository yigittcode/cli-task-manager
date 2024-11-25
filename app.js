import TaskService from './taskService.js';
import * as p from '@clack/prompts';

// Initialize TaskService to manage tasks using the default file path
const taskService = new TaskService(); 

// Group prompts for user interaction
const group = await p.group({
    intro: () => p.intro('Welcome to ToDo'),
    process_selection: () => p.select({
        message: 'Pick a process type.',
        options: [
            { value: 'create', label: 'Create new task.' },
            { value: 'review', label: 'See all tasks.' },
            { value: 'delete', label: 'Delete a task.' },
        ],
    }),
    execute_process: async (selection) => {
        const selectedProcess = selection.results.process_selection;

        // Process for creating a new task
        if (selectedProcess === 'create') {
            const task = await p.text({
                message: "Enter Task"
            });
            await taskService.addTask(task); // Add the new task
            p.log.success('Task added successfully!'); // Log success message
        }
        // Process for reviewing tasks
        else if (selectedProcess === 'review') {
            const tasks = await taskService.readTasks(); // Get the list of tasks
            if (tasks.length > 0) {
                const selectedTask = await p.select({
                    message: 'Here are your tasks:',
                    options: tasks.map(task => ({ value: task.id, label: `${task.completed ? '✅' : '⭕'}  ${task.task}` })),
                });
                const taskDetails = await taskService.getTask(selectedTask); // Get details of the selected task
                if (taskDetails) {
                    p.log.success(`Task: ${taskDetails.task}, Date: ${taskDetails.date}, ID: ${taskDetails.id}`); // Display task details
                    const isCompleted = await p.confirm({
                        message: `\nTask: ${taskDetails.task}\nDate: ${taskDetails.date}\nID: ${taskDetails.id}\n\n\n Is this task completed?`,
                        initialValue: taskDetails.completed // Default to current completion status
                    });
                    taskDetails.completed = isCompleted; // Update completion status

                    // Save the updated task list
                    await taskService.saveTasks([...tasks.filter(task => task.id !== taskDetails.id), taskDetails]);
                    p.log.info(`Completed: ${taskDetails.completed}`); // Display completion status
                }
            } else {
                p.log.info('No tasks available.'); // Log info if no tasks
            }
        }
        // Process for deleting a task
        else if (selectedProcess === 'delete') {
            const tasks = await taskService.readTasks(); // Get the list of tasks
            if (tasks.length > 0) {
                const taskToDelete = await p.select({
                    message: 'Select a task to delete:',
                    options: tasks.map(task => ({ value: task.id, label: `${task.completed ? '✅' : '⭕'}  ${task.task}` })),
                });
                await taskService.deleteTask(taskToDelete); // Delete the selected task
                p.log.success('Task deleted successfully!'); // Log success message
            } else {
                p.log.info('No tasks available to delete.'); // Log info if no tasks
            }
        }
    }
});

// Handle cancellation of the operation
if (p.isCancel(group)) {
    p.cancel('Operation cancelled.');
    process.exit();
}
