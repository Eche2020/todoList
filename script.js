document.querySelector('#push').onclick = () => {
        const inputElement = document.querySelector('#new-task input');
        const inputValue = inputElement.value;

        if (inputValue.length === 0) {
            alert('Please enter your text');
        } else {
            // create a new task element
            const taskElement = document.createElement('div');
            taskElement.className = 'task';

            // create a task name element
            const taskNameElement = document.createElement('span');
            taskNameElement.id = 'taskname';
            taskNameElement.textContent = inputValue;

            // create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.textContent = 'delete';

            // add the task and delete button to the taskElement
            taskElement.appendChild(taskNameElement);
            taskElement.appendChild(deleteButton)

            // Add the task element to the task container
            document.querySelector('#tasks').appendChild(taskElement);

            // clear the input field
            inputElement.value = '';

            deleteButton.onclick = function() {
                this.parentNode.remove()
                // remove the deleted task from localstorage
                tasks = tasks.filter(item => item !== task)   
                localStorage.setItem('tasks', JSON.stringify(tasks))
            }

            // add a click event for the delete button
            deleteButton.onclick = function() {
                this.parentNode.remove();
                updateLocalstorage()
            }

            // store task in localStorage
            updateLocalstorage();
    }
           
}



// function to store a task in localStorage
function storeTask(task) {   
    // check to see if task already exist in localStorage
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    // Add the new task to the task array
    tasks.push(task)
    // store the updated task array in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))

} 

// function to update localStorage
function updateLocalstorage() {
    const tasks = Array.from(document.querySelectorAll('.task span#taskname')).map(task => task.textContent)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Function to load task from localStorage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

        for (let task of tasks) {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';

            const taskNameElement = document.createElement('span')
            taskNameElement.className = 'taskname';
            taskNameElement.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.textContent = 'delete';

            // add the task and delete button to the taskElement
            taskElement.appendChild(taskNameElement);
            taskElement.appendChild(deleteButton);

            document.querySelector('#tasks').appendChild(taskElement);

            
        }
        
        }
    



// call the load task function when the page loads S
window.addEventListener('load', loadTasks);


window.addEventListener('beforeunload', () => {
    updateLocalstorage()
})