// Define an array to store our tasks
let tasks = []

// Define task categories
const categories = ['Work', 'Personal', 'School']

// Function to add a new task
function addTask(taskText, category, dueDate, priority, isRecurring, notes) {
    // Create a new task object
    let newTask = {
        id: generateUniqueId(), // Unique identifier for each task
        text: taskText,
        category: category,
        dueDate: dueDate,
        priority: priority,
        completed: false, // Task is initially not completed
        isRecurring: isRecurring,
        notes: notes
    }

    // Add the new task to the tasks array
    tasks.push(newTask)

    // Display the updated list of tasks
    displayTasks()

    // Set a reminder for the task due date if it's not completed
    if (!newTask.completed && !newTask.isRecurring) {
        setReminder(newTask)
    }
}

// Function to generate a unique ID for each task
function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}

// Function to toggle the completion status of a task
function toggleTaskCompletion(taskId) {
    // Find the task with the given ID
    let task = tasks.find(task => task.id === taskId);

    // Toggle the completion status
    task.completed = !task.completed

    // If the task is recurring and completed, reset the due date
    if (task.completed && task.isRecurring) {
        resetDueDate(task)
    }

    // Display the updated list of tasks
    displayTasks()
}

// Function to reset the due date of a recurring task
function resetDueDate(task) {
    let currentDate = new Date()
    let nextDueDate = new Date(task.dueDate)
    while (nextDueDate <= currentDate) {
        nextDueDate.setDate(nextDueDate.getDate() + 7) // Increment due date by one week
    }
    task.dueDate = nextDueDate.toISOString().split('T')[0]
}

// Function to delete a task
function deleteTask(taskId) {
    // Filter out the task with the given ID
    tasks = tasks.filter(task => task.id !== taskId)

    // Display the updated list of tasks
    displayTasks()
}

// Function to edit a task
function editTask(taskId, newText) {
    // Find the task with the given ID
    let task = tasks.find(task => task.id === taskId)

    // Update the task text
    task.text = newText

    // Display the updated list of tasks
    displayTasks()
}

// Function to sort tasks by due date
function sortTasksByDueDate() {
    tasks.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate)
    })

    // Display the sorted list of tasks
    displayTasks()
}

// Function to filter tasks by category
function filterTasksByCategory(category) {
    // Filter tasks by the specified category
    let filteredTasks = tasks.filter(task => task.category === category)

    // Display the filtered list of tasks
    console.clear()
    console.log(`Tasks in category '${category}':`)
    filteredTasks.forEach(task => {
        console.log(`${task.text} - Due Date: ${task.dueDate}, Priority: ${task.priority}`)
    })
}

// Function to search for tasks
function searchTasks(searchText) {
    // Filter tasks based on the search text
    let filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText.toLowerCase()))

    // Display the filtered list of tasks
    console.clear()
    console.log(`Search Results for '${searchText}':`)
    filteredTasks.forEach(task => {
        console.log(`${task.text} - Category: ${task.category}, Due Date: ${task.dueDate}, Priority: ${task.priority}`)
    })
}

// Function to display the list of tasks
function displayTasks() {
    // Clear the existing task list
    console.clear()

    // Log the header
    console.log('To-Do List:')

    // Iterate over each task and log its details
    tasks.forEach(task => {
        console.log(`${task.completed ? '[X]' : '[ ]'} ${task.text} - Category: ${task.category}, Due Date: ${task.dueDate}, Priority: ${task.priority}`)
        console.log(`Notes: ${task.notes}`)
    })
}

// Function to set a reminder for a task due date
function setReminder(task) {
    const dueDate = new Date(task.dueDate)
    const now = new Date()

    // Check if the due date is in the future
    if (dueDate > now) {
        const timeUntilDue = dueDate.getTime() - now.getTime()
        // Set a timeout for the reminder
        setTimeout(() => {
            console.log(`Reminder: ${task.text} is due today!`);
            // You could add code here to display a notification to the user
        }, timeUntilDue)
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    let storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
        tasks = JSON.parse(storedTasks)
        displayTasks()
    }
}

// Function to synchronize tasks with a backend server
function syncTasksWithServer() {
    // Assume there's a function to send tasks to the server and retrieve tasks from the server
    // For demonstration purposes, we'll just log the tasks to the console
    console.log('Syncing tasks with server...')
    console.log('Sending tasks:', tasks)
    console.log('Retrieving tasks from server...')
    // You could add code here to handle the server response and update the tasks array accordingly
}

// Example usage:

// Load tasks from local storage
loadTasksFromLocalStorage()

// Add tasks
addTask('Complete assignment', 'School', '2024-03-01', 'High', false, 'Don\'t forget to include references.')
addTask('Buy groceries', 'Personal', '2024-02-25', 'Medium', false, 'Remember to buy milk and eggs.')
addTask('Call mom', 'Personal', '2024-02-23', 'Low', true, 'Call every Sunday.')

// Mark a task as completed
toggleTaskCompletion(tasks[0].id)

// Delete a task
deleteTask(tasks[1].id)

// Edit a task
editTask(tasks[0].id, 'Complete project')

// Sort tasks by due date
sortTasksByDueDate()

// Filter tasks by category
filterTasksByCategory('Personal')

// Search for tasks
searchTasks('assignment')

// Save tasks to local storage
saveTasksToLocalStorage()

// Synchronize tasks with server
syncTasksWithServer()
