//all tasks listed   are stored in   the "tasks" array
let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


//this addTaskToDOM function is used to display the list in HTML after rendering
function addTaskToDOM(task) {
    let li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? "checked" : ""} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="../images/rubbish-bin.svg" class="delete" data-id="${task.id}">
    `;

    tasksList.appendChild(li);
}

//to update the whole list everytime after performing some task
function renderList () {
    tasksList.innerHTML = '';  //make tasks empty (to refresh the list)

    for (i = 0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]); //here calling dom and add tasks (refreshing the list)
    }

    tasksCounter.innerHTML = tasks.length;
}

//after getting 'taskId', we change (task.done) which matches that particular 'taskId'
function toggleTask (taskId) {
    let task = tasks.filter(function (task){
        return task.id ==  taskId;
    })
    if (task.length > 0){
        let currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
    }
}

//after getting 'taskId', we remove (task.id from array) which matches that particular 'taskId'
function deleteTask (taskId) {
    let newTasks = tasks.filter(function (task){
        return task.id !==  taskId;
    })
    tasks = newTasks;
    showNotification('Task Deleted');
    renderList();

}

// this simply pushes already added tasks to our tasks array
function addTask (task) {
    if(!task){
        showNotification('Cannot add the empty task')
        return;
    }
    tasks.push(task);
    showNotification('Task Added!');

    renderList();
}

function showNotification(text) {
    window.alert(text);
}

//this function is responsible for storing user_typed_text in an array text
//and assign id to task and pass it to addTask function
function handleInputKeyPress(e){
    if (e.key === 'Enter'){
       let  text = e.target.value;
    if (!text){
     showNotification('Cannot add the empty task')
     return;
     }

    text = {
        text : text,
        id: Date.now().toString(),
        done : false,
    }
    addTask(text);
    e.target.value = ''
}
}

// here we detect, which html element is clicked by using its "className", 
//and make function calls by passing taskID to that function
function handleClickListener(e){
    const target = e.target;
    if (target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

//handling the user clicks by invoking appropriate functions
function initApp(){ 
addTaskInput.addEventListener('keyup', handleInputKeyPress )
document.addEventListener('click', handleClickListener);
}

initApp(); //initializing our app