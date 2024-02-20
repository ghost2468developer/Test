// Define an array to store our tasks
let tasks = [];

// Define task categories
const categories = ['Work', 'Personal', 'School'];

// Function to add a new task
function addTask(taskText, category, dueDate, priority) {
    // Create a new task object
    let newTask = {
        id: generateUniqueId(), // Unique identifier for each task
        text: taskText,
        category: category,
        dueDate: dueDate,
        priority: priority,
        completed: false // Task is initially not completed
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Display the updated list of tasks
    displayTasks();
}

// Function to generate a unique ID for each task
function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Function to toggle the completion status of a task
function toggleTaskCompletion(taskId) {
    // Find the task with the given ID
    let task = tasks.find(task => task.id === taskId);

    // Toggle the completion status
    task.completed = !task.completed;

    // Display the updated list of tasks
    displayTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    // Filter out the task with the given ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Display the updated list of tasks
    displayTasks();
}

// Function to display the list of tasks
function displayTasks() {
    // Clear the existing task list
    console.clear();

    // Log the header
    console.log('To-Do List:');

    // Iterate over each task and log its details
    tasks.forEach(task => {
        console.log(`${task.completed ? '[X]' : '[ ]'} ${task.text} - Category: ${task.category}, Due Date: ${task.dueDate}, Priority: ${task.priority}`);
    });
}

// Example usage:

// Add tasks
addTask('Complete assignment', 'School', '2024-03-01', 'High');
addTask('Buy groceries', 'Personal', '2024-02-25', 'Medium');
addTask('Call mom', 'Personal', '2024-02-23', 'Low');

// Mark a task as completed
toggleTaskCompletion(tasks[0].id);

// Delete a task
deleteTask(tasks[1].id);
