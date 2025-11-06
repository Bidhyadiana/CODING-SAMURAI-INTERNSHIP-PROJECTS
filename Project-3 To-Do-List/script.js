// --- 1. DOM Element Selection (State Management/Variables) ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');

// --- 2. Event Listeners (Event Handling) ---

// Listen for form submission to add a new task
taskForm.addEventListener('submit', addTask);

// Listen for clicks on the entire list (Event Delegation)
taskList.addEventListener('click', handleTaskActions);


// --- 3. Core Functions (DOM Manipulation & State Logic) ---

// Checks if the list is empty and shows/hides the empty message
function checkEmptyState() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

// Function to add a new task
function addTask(e) {
    e.preventDefault(); // Stop the form from submitting normally (reloading the page)

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    
    // Key Skill: DOM Manipulation (Creating elements)
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = ''; // Clear the input field

    checkEmptyState();
}

// Function to handle clicks on the list item or buttons
function handleTaskActions(e) {
    const target = e.target;
    const listItem = target.closest('li');

    if (!listItem) return; // If the click wasn't on a list item, exit

    // 1. Delete Task Logic
    if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
        // Key Skill: DOM Manipulation (Removing element)
        taskList.removeChild(listItem);
        checkEmptyState();
    }
    
    // 2. Mark as Complete/Incomplete Logic
    else if (target.classList.contains('task-text') || target.tagName === 'LI') {
        // Key Skill: State Management (Toggling CSS class for completion)
        listItem.classList.toggle('completed');
    }
}

// Initial check when the page loads
checkEmptyState();